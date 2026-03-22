import { useState, useRef, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { stories } from "@/data/stories";
import { loadPreferences } from "@/data/preferences";
import { VOICE_OPTIONS, type VoiceId } from "@/data/constants";

/* ── Helpers ── */

function formatDate(): string {
  return new Date().toLocaleDateString("en-US", {
    weekday: "long",
    month: "long",
    day: "numeric",
    year: "numeric",
  });
}

function formatTime(seconds: number): string {
  if (!isFinite(seconds) || seconds < 0) return "0:00";
  const m = Math.floor(seconds / 60);
  const s = Math.floor(seconds % 60);
  return `${m}:${s.toString().padStart(2, "0")}`;
}

type BriefState = "idle" | "intro" | "playing" | "paused" | "done";

const INTRO_TEXT = "Welcome to your Lens Daily Brief. Here are today's top stories.";

/* ── Daily Brief Page ── */

export default function DailyBrief() {
  const navigate = useNavigate();
  const prefs = loadPreferences();
  const voiceKey = (prefs?.voice ?? "anchor") as VoiceId;
  const voiceMeta = VOICE_OPTIONS.find((v) => v.value === voiceKey);
  const voiceName = voiceMeta?.name ?? "The Anchor";
  const readerLevel = (prefs?.readerLevel ?? "adult") as "young" | "teen" | "adult";

  // Fixed editorial order for the demo brief
  const BRIEF_IDS = [
    "oil-prices-strait-hormuz-2026",
    "russia-ukraine-war-2026",
    "measles-vaccines-federal-policy-2026",
    "new-food-pyramid-2026",
    "2026-midterm-elections",
  ];
  const briefStories = BRIEF_IDS
    .map((id) => stories.find((s) => s.id === id))
    .filter((s): s is NonNullable<typeof s> => s != null);

  const audioUrls = briefStories.map(
    (s) => s.audio[readerLevel]?.[voiceKey] ?? ""
  );

  const [state, setState] = useState<BriefState>("idle");
  const [storyIndex, setStoryIndex] = useState(-1); // -1 = intro
  const [duration, setDuration] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [headlineVisible, setHeadlineVisible] = useState(true);
  const introSrc = `/audio/daily-brief-intro_${voiceKey}.mp3`;
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const gapTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      audioRef.current?.pause();
      audioRef.current = null;
      if (gapTimerRef.current) clearTimeout(gapTimerRef.current);
    };
  }, []);

  const playStory = useCallback(
    (index: number) => {
      // Fade out current headline
      setHeadlineVisible(false);

      const src = audioUrls[index];
      if (!src) {
        // Skip stories with missing audio
        if (index < briefStories.length - 1) {
          playStory(index + 1);
        } else {
          setState("done");
        }
        return;
      }

      // Small delay for headline transition
      setTimeout(() => {
        setStoryIndex(index);
        setHeadlineVisible(true);

        if (audioRef.current) {
          audioRef.current.pause();
        }

        const audio = new Audio(src);
        audioRef.current = audio;
        setDuration(0);
        setCurrentTime(0);

        audio.addEventListener("loadedmetadata", () => {
          setDuration(audio.duration);
        });

        audio.addEventListener("timeupdate", () => {
          setCurrentTime(audio.currentTime);
        });

        audio.addEventListener("ended", () => {
          if (index < briefStories.length - 1) {
            // 1-second pause between stories
            gapTimerRef.current = setTimeout(() => {
              playStory(index + 1);
            }, 1000);
          } else {
            setState("done");
          }
        });

        audio.addEventListener("error", () => {
          // Skip on error
          if (index < briefStories.length - 1) {
            playStory(index + 1);
          } else {
            setState("done");
          }
        });

        audio.play().catch(() => {
          if (index < briefStories.length - 1) {
            playStory(index + 1);
          } else {
            setState("done");
          }
        });

        setState("playing");
      }, 300);
    },
    [audioUrls, briefStories.length]
  );

  const playIntro = useCallback(
    (onDone: () => void) => {
      if (audioRef.current) audioRef.current.pause();

      const audio = new Audio(introSrc);
      audioRef.current = audio;
      setStoryIndex(-1);
      setHeadlineVisible(true);
      setDuration(0);
      setCurrentTime(0);
      setState("intro");

      audio.addEventListener("loadedmetadata", () => setDuration(audio.duration));
      audio.addEventListener("timeupdate", () => setCurrentTime(audio.currentTime));
      audio.addEventListener("ended", () => {
        gapTimerRef.current = setTimeout(onDone, 1000);
      });
      audio.addEventListener("error", () => onDone());

      audio.play().catch(() => onDone());
    },
    [introSrc]
  );

  const handlePause = useCallback(() => {
    audioRef.current?.pause();
    setState("paused");
  }, []);

  const handleResume = useCallback(() => {
    audioRef.current?.play();
    setState(storyIndex === -1 ? "intro" : "playing");
  }, [storyIndex]);

  const handlePlay = useCallback(() => {
    if (state === "idle" || state === "done") {
      playIntro(() => playStory(0));
    } else if (state === "paused") {
      handleResume();
    }
  }, [state, playStory, playIntro, handleResume]);

  const handleSkip = useCallback(() => {
    if (gapTimerRef.current) clearTimeout(gapTimerRef.current);
    if (state === "intro" || storyIndex === -1) {
      audioRef.current?.pause();
      playStory(0);
      return;
    }
    if (storyIndex < briefStories.length - 1) {
      playStory(storyIndex + 1);
    } else {
      audioRef.current?.pause();
      setState("done");
    }
  }, [state, storyIndex, briefStories.length, playStory]);

  const handleReplay = useCallback(() => {
    playIntro(() => playStory(0));
  }, [playIntro, playStory]);

  const progress = duration > 0 ? (currentTime / duration) * 100 : 0;
  const isActive = state === "playing" || state === "paused" || state === "intro";
  const isIntro = storyIndex === -1;
  const currentStory = briefStories[storyIndex];

  return (
    <div className="min-h-dvh bg-white flex flex-col relative">
      {/* Back button */}
      <button
        onClick={() => {
          audioRef.current?.pause();
          navigate("/home");
        }}
        className="absolute top-4 left-4 z-10 text-navy/60 hover:text-navy transition-colors cursor-pointer"
        aria-label="Back to home"
      >
        <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
        </svg>
      </button>

      {/* Main content area */}
      <div className="flex-1 flex flex-col items-center justify-center px-8 text-center">

        {/* ── IDLE STATE ── */}
        {state === "idle" && (
          <div className="flex flex-col items-center gap-6 animate-[fadeIn_0.4s_ease-out]">
            <span className="text-[80px] leading-none select-none" style={{ fontFamily: "serif" }}>
              &#9678;
            </span>
            <div>
              <h1 className="text-2xl font-bold text-navy tracking-tight">
                Lens Daily Brief
              </h1>
              <p className="text-sm text-text-muted mt-1">{formatDate()}</p>
            </div>
            <button
              onClick={handlePlay}
              className="w-16 h-16 rounded-full bg-navy text-warm-white flex items-center justify-center cursor-pointer hover:bg-navy-light transition-colors shadow-lg"
              aria-label="Play daily brief"
            >
              <svg className="w-7 h-7 ml-1" fill="currentColor" viewBox="0 0 20 20">
                <path d="M6.3 2.84A1.5 1.5 0 004 4.11v11.78a1.5 1.5 0 002.3 1.27l9.344-5.891a1.5 1.5 0 000-2.538L6.3 2.841z" />
              </svg>
            </button>
            <p className="text-xs text-text-muted/70 max-w-[240px]">
              {briefStories.length} stories. ~{briefStories.length} minutes. Everything that matters.
            </p>
          </div>
        )}

        {/* ── PLAYING / PAUSED STATE ── */}
        {isActive && (
          <div className="flex flex-col items-center gap-8 w-full max-w-sm animate-[fadeIn_0.3s_ease-out]">
            {/* Small symbol at top */}
            <span className="text-[36px] leading-none text-navy/30 select-none" style={{ fontFamily: "serif" }}>
              &#9678;
            </span>

            {/* Current headline */}
            <div className="min-h-[100px] flex items-center justify-center">
              <h2
                className={`text-xl sm:text-2xl font-bold text-navy leading-snug tracking-tight transition-opacity duration-300 ${
                  headlineVisible ? "opacity-100" : "opacity-0"
                }`}
              >
                {isIntro ? INTRO_TEXT : currentStory?.headline}
              </h2>
            </div>

            {/* Story indicator */}
            <p className="text-xs text-text-muted">
              {isIntro ? "Introduction" : `Story ${storyIndex + 1} of ${briefStories.length}`}
              <span className="mx-2 text-text-muted/40">|</span>
              {voiceName}
            </p>

            {/* Controls */}
            <div className="flex items-center gap-6">
              {/* Play/Pause */}
              <button
                onClick={state === "playing" || state === "intro" ? handlePause : handlePlay}
                className="w-14 h-14 rounded-full bg-navy text-warm-white flex items-center justify-center cursor-pointer hover:bg-navy-light transition-colors shadow-lg"
                aria-label={state === "playing" || state === "intro" ? "Pause" : "Play"}
              >
                {state === "playing" || state === "intro" ? (
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M5.75 3a.75.75 0 00-.75.75v12.5c0 .414.336.75.75.75h1.5a.75.75 0 00.75-.75V3.75A.75.75 0 007.25 3h-1.5zm7 0a.75.75 0 00-.75.75v12.5c0 .414.336.75.75.75h1.5a.75.75 0 00.75-.75V3.75a.75.75 0 00-.75-.75h-1.5z" clipRule="evenodd" />
                  </svg>
                ) : (
                  <svg className="w-6 h-6 ml-0.5" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M6.3 2.84A1.5 1.5 0 004 4.11v11.78a1.5 1.5 0 002.3 1.27l9.344-5.891a1.5 1.5 0 000-2.538L6.3 2.841z" />
                  </svg>
                )}
              </button>

              {/* Skip */}
              <button
                onClick={handleSkip}
                className="w-10 h-10 rounded-full bg-warm-gray text-navy flex items-center justify-center cursor-pointer hover:bg-border transition-colors"
                aria-label="Skip to next story"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3 8.689c0-.864.933-1.405 1.683-.977l7.108 4.061a1.125 1.125 0 010 1.954l-7.108 4.061A1.125 1.125 0 013 16.811V8.69zM12.75 8.689c0-.864.933-1.405 1.683-.977l7.108 4.061a1.125 1.125 0 010 1.954l-7.108 4.061a1.125 1.125 0 01-1.683-.977V8.69z" />
                </svg>
              </button>
            </div>

            {/* Time display */}
            <p className="text-[11px] text-text-muted/60">
              {formatTime(currentTime)} / {duration > 0 ? formatTime(duration) : "--:--"}
            </p>
          </div>
        )}

        {/* ── DONE STATE ── */}
        {state === "done" && (
          <div className="flex flex-col items-center gap-6 animate-[fadeIn_0.4s_ease-out]">
            <span className="text-[80px] leading-none select-none" style={{ fontFamily: "serif" }}>
              &#9678;
            </span>
            <div>
              <h2 className="text-xl font-bold text-navy tracking-tight">
                That's your Lens Daily Brief.
              </h2>
              <p className="text-sm text-text-muted mt-2">
                Read any story in full
              </p>
            </div>
            <div className="flex flex-col gap-3 w-full max-w-[240px]">
              <button
                onClick={() => navigate("/home")}
                className="w-full py-3 rounded-2xl bg-navy text-warm-white font-semibold cursor-pointer hover:bg-navy-light transition-colors"
              >
                Go to Stories
              </button>
              <button
                onClick={handleReplay}
                className="w-full py-3 rounded-2xl border-2 border-border text-navy font-semibold cursor-pointer hover:bg-warm-gray transition-colors"
              >
                Replay
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Bottom progress bar (during playback) */}
      {isActive && (
        <div className="h-1 bg-warm-gray">
          <div
            className="h-full bg-navy transition-all duration-200"
            style={{ width: `${progress}%` }}
          />
        </div>
      )}
    </div>
  );
}
