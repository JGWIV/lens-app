import { useState, useRef, useEffect, useCallback } from "react";

function formatTime(seconds: number): string {
  if (!isFinite(seconds) || seconds < 0) return "0:00";
  const m = Math.floor(seconds / 60);
  const s = Math.floor(seconds % 60);
  return `${m}:${s.toString().padStart(2, "0")}`;
}

interface AudioPlayerProps {
  src: string;
  voiceName: string;
  compact?: boolean;
}

export default function AudioPlayer({ src, voiceName, compact }: AudioPlayerProps) {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [playing, setPlaying] = useState(false);
  const [duration, setDuration] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Reset state when src changes
    setPlaying(false);
    setCurrentTime(0);
    setDuration(0);
    setError(false);
    setLoading(true);
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.load();
    }
  }, [src]);

  const handleLoadedMetadata = useCallback(() => {
    if (audioRef.current) {
      setDuration(audioRef.current.duration);
      setLoading(false);
    }
  }, []);

  const handleTimeUpdate = useCallback(() => {
    if (audioRef.current) {
      setCurrentTime(audioRef.current.currentTime);
    }
  }, []);

  const handleEnded = useCallback(() => {
    setPlaying(false);
    setCurrentTime(0);
  }, []);

  const handleError = useCallback(() => {
    setError(true);
    setLoading(false);
  }, []);

  const togglePlay = useCallback(() => {
    if (!audioRef.current || error) return;
    if (playing) {
      audioRef.current.pause();
    } else {
      audioRef.current.play().catch(() => setError(true));
    }
    setPlaying(!playing);
  }, [playing, error]);

  const handleSeek = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    if (!audioRef.current || !duration) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const ratio = Math.max(0, Math.min(1, (e.clientX - rect.left) / rect.width));
    audioRef.current.currentTime = ratio * duration;
    setCurrentTime(ratio * duration);
  }, [duration]);

  const progress = duration > 0 ? (currentTime / duration) * 100 : 0;
  const remaining = duration - currentTime;

  if (error) {
    return (
      <div className={`rounded-xl border border-border bg-warm-gray px-4 py-3 ${compact ? "" : "mb-5"}`}>
        <p className="text-xs text-text-muted text-center">
          Audio unavailable for this story
        </p>
      </div>
    );
  }

  return (
    <div className={`rounded-xl border border-border bg-white px-4 py-3 ${compact ? "" : "mb-5"}`}>
      <audio
        ref={audioRef}
        src={src}
        preload="metadata"
        onLoadedMetadata={handleLoadedMetadata}
        onTimeUpdate={handleTimeUpdate}
        onEnded={handleEnded}
        onError={handleError}
      />

      <div className="flex items-center gap-3">
        {/* Play/Pause */}
        <button
          onClick={togglePlay}
          disabled={loading}
          className={`w-9 h-9 rounded-full flex items-center justify-center shrink-0 transition-colors cursor-pointer ${
            loading
              ? "bg-warm-gray text-text-muted"
              : "bg-navy text-warm-white hover:bg-navy-light"
          }`}
          aria-label={playing ? "Pause" : "Play"}
        >
          {playing ? (
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M5.75 3a.75.75 0 00-.75.75v12.5c0 .414.336.75.75.75h1.5a.75.75 0 00.75-.75V3.75A.75.75 0 007.25 3h-1.5zm7 0a.75.75 0 00-.75.75v12.5c0 .414.336.75.75.75h1.5a.75.75 0 00.75-.75V3.75a.75.75 0 00-.75-.75h-1.5z" clipRule="evenodd" />
            </svg>
          ) : (
            <svg className="w-4 h-4 ml-0.5" fill="currentColor" viewBox="0 0 20 20">
              <path d="M6.3 2.84A1.5 1.5 0 004 4.11v11.78a1.5 1.5 0 002.3 1.27l9.344-5.891a1.5 1.5 0 000-2.538L6.3 2.841z" />
            </svg>
          )}
        </button>

        {/* Info + Progress */}
        <div className="flex-1 min-w-0">
          <div className="flex items-center justify-between mb-1.5">
            <span className="text-xs font-medium text-navy truncate">
              🎧 Listen &middot; {voiceName}
            </span>
            <span className="text-[10px] text-text-muted shrink-0 ml-2">
              {loading ? "--:--" : `-${formatTime(remaining)}`}
            </span>
          </div>

          {/* Progress bar */}
          <div
            className="h-1.5 bg-warm-gray rounded-full cursor-pointer"
            onClick={handleSeek}
          >
            <div
              className="h-full bg-navy rounded-full transition-all duration-100"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

/* ── Briefing Player (plays multiple stories sequentially) ── */

interface BriefingPlayerProps {
  audioUrls: string[];
  voiceName: string;
  storyCount: number;
  estimatedMinutes: number;
}

export function BriefingPlayer({ audioUrls, voiceName, storyCount, estimatedMinutes }: BriefingPlayerProps) {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [playing, setPlaying] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [duration, setDuration] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [error, setError] = useState(false);
  const [started, setStarted] = useState(false);

  const currentSrc = audioUrls[currentIndex] ?? "";
  const hasAudio = audioUrls.length > 0 && audioUrls.some((u) => u);

  useEffect(() => {
    if (audioRef.current && started) {
      audioRef.current.load();
      if (playing) {
        audioRef.current.play().catch(() => setError(true));
      }
    }
  }, [currentIndex]);

  const handleEnded = useCallback(() => {
    if (currentIndex < audioUrls.length - 1) {
      setCurrentIndex((i) => i + 1);
    } else {
      setPlaying(false);
      setCurrentIndex(0);
      setStarted(false);
    }
  }, [currentIndex, audioUrls.length]);

  const togglePlay = useCallback(() => {
    if (!audioRef.current || !hasAudio) return;
    if (!started) setStarted(true);
    if (playing) {
      audioRef.current.pause();
    } else {
      audioRef.current.play().catch(() => setError(true));
    }
    setPlaying(!playing);
  }, [playing, hasAudio, started]);

  const progress = duration > 0 ? (currentTime / duration) * 100 : 0;

  if (!hasAudio) {
    return null;
  }

  return (
    <div className="w-full rounded-2xl bg-navy p-4 sm:p-5 mb-5 text-left">
      <audio
        ref={audioRef}
        src={currentSrc}
        preload="metadata"
        onLoadedMetadata={() => {
          if (audioRef.current) setDuration(audioRef.current.duration);
        }}
        onTimeUpdate={() => {
          if (audioRef.current) setCurrentTime(audioRef.current.currentTime);
        }}
        onEnded={handleEnded}
        onError={() => setError(true)}
      />

      <div className="flex items-center justify-between">
        <div className="flex-1 min-w-0">
          <h3 className="text-base sm:text-lg font-semibold text-warm-white mb-0.5">
            Your Daily Briefing
          </h3>
          <p className="text-xs sm:text-sm text-warm-white/60">
            {storyCount} stories &middot; ~{estimatedMinutes} min &middot; {voiceName}
          </p>

          {/* Progress bar when playing */}
          {started && (
            <div className="mt-3">
              <div className="h-1 bg-warm-white/20 rounded-full">
                <div
                  className="h-full bg-warm-white/70 rounded-full transition-all duration-100"
                  style={{ width: `${progress}%` }}
                />
              </div>
              <div className="flex items-center justify-between mt-1">
                <span className="text-[10px] text-warm-white/40">
                  Story {currentIndex + 1} of {audioUrls.length}
                </span>
                <span className="text-[10px] text-warm-white/40">
                  {duration > 0 ? `-${formatTime(duration - currentTime)}` : ""}
                </span>
              </div>
            </div>
          )}
        </div>

        <button
          onClick={togglePlay}
          className="w-11 h-11 rounded-full bg-warm-white/15 hover:bg-warm-white/25 flex items-center justify-center shrink-0 ml-3 cursor-pointer transition-colors"
          aria-label={playing ? "Pause briefing" : "Play briefing"}
        >
          {playing ? (
            <svg className="w-5 h-5 text-warm-white" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M5.75 3a.75.75 0 00-.75.75v12.5c0 .414.336.75.75.75h1.5a.75.75 0 00.75-.75V3.75A.75.75 0 007.25 3h-1.5zm7 0a.75.75 0 00-.75.75v12.5c0 .414.336.75.75.75h1.5a.75.75 0 00.75-.75V3.75a.75.75 0 00-.75-.75h-1.5z" clipRule="evenodd" />
            </svg>
          ) : (
            <svg className="w-5 h-5 text-warm-white ml-0.5" fill="currentColor" viewBox="0 0 20 20">
              <path d="M6.3 2.84A1.5 1.5 0 004 4.11v11.78a1.5 1.5 0 002.3 1.27l9.344-5.891a1.5 1.5 0 000-2.538L6.3 2.841z" />
            </svg>
          )}
        </button>
      </div>

      {error && (
        <p className="text-xs text-warm-white/40 mt-2">
          Some audio files may be unavailable.
        </p>
      )}
    </div>
  );
}
