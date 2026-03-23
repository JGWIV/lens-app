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

// Fixed editorial order for the demo brief
const BRIEF_IDS = [
  "oil-prices-strait-hormuz-2026",
  "russia-ukraine-war-2026",
  "measles-vaccines-federal-policy-2026",
  "new-food-pyramid-2026",
  "2026-midterm-elections",
];

/* ── Daily Brief Page ── */

export default function DailyBrief() {
  const navigate = useNavigate();
  const prefs = loadPreferences();
  const voiceKey = (prefs?.voice ?? "anchor") as VoiceId;
  const voiceMeta = VOICE_OPTIONS.find((v) => v.value === voiceKey);
  const voiceName = voiceMeta?.name ?? "The Anchor";

  const briefStories = BRIEF_IDS
    .map((id) => stories.find((s) => s.id === id))
    .filter((s): s is NonNullable<typeof s> => s != null);

  // Build the full playlist: intro + 5 brief stories
  const introSrc = `/audio/daily-brief-intro_${voiceKey}.mp3`;
  const storySrcs = briefStories.map(
    (s) => `/audio/${s.id}_brief_${voiceKey}.mp3`
  );
  // playlist[0] = intro, playlist[1..5] = stories
  const playlist = [introSrc, ...storySrcs];

  // Single persistent audio element — critical for iOS Safari
  const audioRef = useRef<HTMLAudioElement>(null);
  const gapTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const [state, setState] = useState<BriefState>("idle");
  const [trackIndex, setTrackIndex] = useState(0); // 0 = intro, 1-5 = stories
  const [audioSrc, setAudioSrc] = useState(introSrc);
  const [duration, setDuration] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [headlineVisible, setHeadlineVisible] = useState(true);

  // Derived state
  const isIntro = trackIndex === 0;
  const storyIndex = trackIndex - 1; // -1 when intro
  const currentStory = briefStories[storyIndex];
  const isActive = state === "playing" || state === "paused" || state === "intro";
  const progress = duration > 0 ? (currentTime / duration) * 100 : 0;

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (gapTimerRef.current) clearTimeout(gapTimerRef.current);
    };
  }, []);

  // Switch to a track and play it
  const playTrack = useCallback(
    (index: number) => {
      if (gapTimerRef.current) { clearTimeout(gapTimerRef.current); gapTimerRef.current = null; }

      // Fade out headline
      setHeadlineVisible(false);

      setTimeout(() => {
        setTrackIndex(index);
        setAudioSrc(playlist[index]);
        setDuration(0);
        setCurrentTime(0);
        setHeadlineVisible(true);
        setState(index === 0 ? "intro" : "playing");

        // The audio element's src will update via React, triggering load+play
        // We need a microtask to let React commit the new src before we call load/play
        requestAnimationFrame(() => {
          const audio = audioRef.current;
          if (!audio) return;
          audio.load();
          audio.play().catch(() => {
            // If play fails (e.g. missing file), skip to next
            if (index < playlist.length - 1) {
              playTrack(index + 1);
            } else {
              setState("done");
            }
          });
        });
      }, 300);
    },
    [playlist]
  );

  // Called when a track ends naturally
  const handleEnded = useCallback(() => {
    if (trackIndex < playlist.length - 1) {
      // 1-second gap, then swap src and play on the same element
      gapTimerRef.current = setTimeout(() => {
        const nextIndex = trackIndex + 1;
        setTrackIndex(nextIndex);
        setAudioSrc(playlist[nextIndex]);
        setDuration(0);
        setCurrentTime(0);
        setHeadlineVisible(false);

        setTimeout(() => {
          setHeadlineVisible(true);
          setState(nextIndex === 0 ? "intro" : "playing");

          requestAnimationFrame(() => {
            const audio = audioRef.current;
            if (!audio) return;
            audio.load();
            audio.play().catch(() => {
              if (nextIndex < playlist.length - 1) {
                playTrack(nextIndex + 1);
              } else {
                setState("done");
              }
            });
          });
        }, 300);
      }, 1000);
    } else {
      setState("done");
    }
  }, [trackIndex, playlist, playTrack]);

  const handleError = useCallback(() => {
    // Skip broken tracks
    if (trackIndex < playlist.length - 1) {
      playTrack(trackIndex + 1);
    } else {
      setState("done");
    }
  }, [trackIndex, playlist.length, playTrack]);

  const handlePause = useCallback(() => {
    audioRef.current?.pause();
    setState("paused");
  }, []);

  const handleResume = useCallback(() => {
    audioRef.current?.play();
    setState(trackIndex === 0 ? "intro" : "playing");
  }, [trackIndex]);

  const handlePlay = useCallback(() => {
    if (state === "idle" || state === "done") {
      playTrack(0);
    } else if (state === "paused") {
      handleResume();
    }
  }, [state, playTrack, handleResume]);

  const handleSkip = useCallback(() => {
    if (gapTimerRef.current) { clearTimeout(gapTimerRef.current); gapTimerRef.current = null; }
    audioRef.current?.pause();

    if (trackIndex < playlist.length - 1) {
      playTrack(trackIndex + 1);
    } else {
      setState("done");
    }
  }, [trackIndex, playlist.length, playTrack]);

  const handleReplay = useCallback(() => {
    playTrack(0);
  }, [playTrack]);

  return (
    <div className="min-h-dvh bg-white flex flex-col relative">
      {/* Single persistent audio element for iOS Safari compatibility */}
      <audio
        ref={audioRef}
        src={audioSrc}
        preload="auto"
        onLoadedMetadata={() => {
          if (audioRef.current) setDuration(audioRef.current.duration);
        }}
        onTimeUpdate={() => {
          if (audioRef.current) setCurrentTime(audioRef.current.currentTime);
        }}
        onEnded={handleEnded}
        onError={handleError}
      />

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
            <span className="text-[120px] leading-none select-none" style={{ fontFamily: "serif" }}>
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
            <p className="text-xs text-text-muted/70">
              The facts, briefly.
            </p>
          </div>
        )}

        {/* ── PLAYING / PAUSED STATE ── */}
        {isActive && (
          <div className="flex flex-col items-center gap-8 w-full max-w-sm animate-[fadeIn_0.3s_ease-out]">
            {/* Symbol at top — pulses while audio is playing */}
            <span
              className={`text-[80px] leading-none text-navy/30 select-none ${
                state === "playing" || state === "intro" ? "animate-[briefPulse_2s_ease-in-out_infinite]" : ""
              }`}
              style={{ fontFamily: "serif" }}
            >
              &#9678;
            </span>

            {/* Current summary text */}
            <div className="min-h-[120px] flex items-center justify-center">
              <h2
                className={`font-bold text-navy leading-snug tracking-tight transition-opacity duration-300 ${
                  headlineVisible ? "opacity-100" : "opacity-0"
                } ${isIntro ? "text-xl sm:text-2xl" : "text-base sm:text-lg"}`}
              >
                {isIntro ? INTRO_TEXT : currentStory?.summary}
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
            <span className="text-[120px] leading-none select-none" style={{ fontFamily: "serif" }}>
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
