import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  loadPreferences,
  savePreferences,
  clearPreferences,
} from "@/data/preferences";
import { TOPICS } from "@/data/topics";
import {
  READER_OPTIONS,
  NEWS_MODE_OPTIONS,
  VOICE_OPTIONS,
  type ReaderLevel,
  type NewsMode,
  type VoiceId,
} from "@/data/constants";

function SectionHeader({ children }: { children: React.ReactNode }) {
  return (
    <h3 className="text-base font-semibold text-navy mb-3">{children}</h3>
  );
}

export default function Settings() {
  const navigate = useNavigate();
  const prefs = loadPreferences()!;

  const [readerLevel, setReaderLevel] = useState<ReaderLevel>(
    prefs.readerLevel as ReaderLevel
  );
  const [topics, setTopics] = useState<Set<string>>(new Set(prefs.topics));
  const [newsMode, setNewsMode] = useState<NewsMode>(
    prefs.newsMode as NewsMode
  );
  const [voice, setVoice] = useState<VoiceId | null>(
    (prefs.voice as VoiceId) ?? null
  );

  function persist(patch: Partial<{
    readerLevel: string;
    topics: string[];
    newsMode: string;
    voice: string | null;
  }>) {
    const updated = {
      readerLevel: patch.readerLevel ?? readerLevel,
      topics: patch.topics ?? [...topics],
      newsMode: patch.newsMode ?? newsMode,
      voice: patch.voice !== undefined ? patch.voice : voice,
    };
    savePreferences(updated);
  }

  function handleReaderLevel(level: ReaderLevel) {
    setReaderLevel(level);
    persist({ readerLevel: level });
  }

  function handleToggleTopic(label: string) {
    setTopics((prev) => {
      const next = new Set(prev);
      if (next.has(label)) {
        if (next.size === 1) return prev; // keep at least one
        next.delete(label);
      } else {
        next.add(label);
      }
      persist({ topics: [...next] });
      return next;
    });
  }

  function handleSelectAllTopics() {
    setTopics((prev) => {
      const allSelected = prev.size === TOPICS.length;
      const next = allSelected ? new Set([TOPICS[0].label]) : new Set(TOPICS.map((t) => t.label));
      persist({ topics: [...next] });
      return next;
    });
  }

  function handleNewsMode(mode: NewsMode) {
    setNewsMode(mode);
    const newVoice = mode === "read" ? null : voice;
    if (mode === "read") setVoice(null);
    persist({ newsMode: mode, voice: newVoice });
  }

  function handleVoice(v: VoiceId) {
    setVoice(v);
    persist({ voice: v });
  }

  const previewAudioRef = useRef<HTMLAudioElement | null>(null);
  const [playingVoice, setPlayingVoice] = useState<VoiceId | null>(null);

  useEffect(() => {
    return () => {
      previewAudioRef.current?.pause();
      previewAudioRef.current = null;
    };
  }, []);

  function handlePreview(e: React.MouseEvent, voiceId: VoiceId) {
    e.stopPropagation();

    if (playingVoice === voiceId) {
      previewAudioRef.current?.pause();
      previewAudioRef.current = null;
      setPlayingVoice(null);
      return;
    }

    previewAudioRef.current?.pause();

    const audio = new Audio(`/audio/potomac-sewage-spill-2026_young_${voiceId}.mp3`);
    previewAudioRef.current = audio;
    setPlayingVoice(voiceId);

    audio.addEventListener("ended", () => {
      setPlayingVoice(null);
      previewAudioRef.current = null;
    });

    audio.play();
  }

  function handleReset() {
    clearPreferences();
    navigate("/onboarding", { replace: true });
  }

  const showVoice = newsMode === "listen" || newsMode === "both";
  const allTopicsSelected = topics.size === TOPICS.length;

  return (
    <div className="min-h-dvh bg-warm-white pb-12">
      {/* Header */}
      <header className="sticky top-0 z-30 bg-warm-white/95 backdrop-blur-sm border-b border-border">
        <div className="flex items-center gap-3 px-page py-3 max-w-lg mx-auto">
          <button
            onClick={() => navigate("/home")}
            className="text-navy hover:text-navy-light transition-colors cursor-pointer"
            aria-label="Back to home"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
            </svg>
          </button>
          <h1 className="text-lg font-semibold text-navy">Settings</h1>
        </div>
      </header>

      <main className="px-page max-w-lg mx-auto pt-6 flex flex-col gap-8">
        {/* ── Your Profile ── */}
        <section>
          <SectionHeader>Your Profile</SectionHeader>
          <div className="flex flex-col gap-2">
            {READER_OPTIONS.map((opt) => {
              const isSelected = readerLevel === opt.value;
              return (
                <button
                  key={opt.value}
                  onClick={() => handleReaderLevel(opt.value)}
                  className={`w-full text-left rounded-xl border-2 px-4 py-3 transition-all duration-200 cursor-pointer ${
                    isSelected
                      ? "border-navy bg-navy text-warm-white"
                      : "border-border bg-white hover:border-navy/30"
                  }`}
                >
                  <span className={`text-sm font-semibold block ${isSelected ? "text-warm-white" : "text-navy"}`}>
                    {opt.label}
                  </span>
                  <span className={`text-xs block ${isSelected ? "text-warm-white/70" : "text-text-secondary"}`}>
                    {opt.subtitle}
                  </span>
                </button>
              );
            })}
          </div>
        </section>

        {/* ── Your Topics ── */}
        <section>
          <SectionHeader>Your Topics</SectionHeader>
          <div className="grid grid-cols-2 gap-2">
            {TOPICS.map((topic) => {
              const isSelected = topics.has(topic.label);
              return (
                <button
                  key={topic.label}
                  onClick={() => handleToggleTopic(topic.label)}
                  className={`flex flex-col items-center justify-center rounded-xl border-2 py-3 px-2 transition-all duration-200 cursor-pointer ${
                    isSelected
                      ? "border-navy bg-navy text-warm-white"
                      : "border-border bg-white hover:border-navy/30"
                  }`}
                >
                  <span className="text-lg mb-0.5">{topic.icon}</span>
                  <span className={`text-xs font-medium text-center leading-tight ${isSelected ? "text-warm-white" : "text-navy"}`}>
                    {topic.label}
                  </span>
                </button>
              );
            })}
            <button
              onClick={handleSelectAllTopics}
              className={`col-span-2 flex items-center justify-center rounded-xl border-2 py-3 px-3 transition-all duration-200 cursor-pointer ${
                allTopicsSelected
                  ? "border-navy bg-navy text-warm-white"
                  : "border-border bg-white hover:border-navy/30"
              }`}
            >
              <span className="text-lg mr-2">✨</span>
              <span className={`text-xs font-semibold ${allTopicsSelected ? "text-warm-white" : "text-navy"}`}>
                All Topics
              </span>
            </button>
          </div>
        </section>

        {/* ── Your News Format ── */}
        <section>
          <SectionHeader>Your News Format</SectionHeader>
          <div className="flex flex-col gap-2">
            {NEWS_MODE_OPTIONS.map((opt) => {
              const isSelected = newsMode === opt.value;
              return (
                <button
                  key={opt.value}
                  onClick={() => handleNewsMode(opt.value)}
                  className={`w-full text-left rounded-xl border-2 px-4 py-3 transition-all duration-200 cursor-pointer ${
                    isSelected
                      ? "border-navy bg-navy text-warm-white"
                      : "border-border bg-white hover:border-navy/30"
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <span className="text-xl">{opt.icon}</span>
                    <div>
                      <span className={`text-sm font-semibold block ${isSelected ? "text-warm-white" : "text-navy"}`}>
                        {opt.label}
                      </span>
                      <span className={`text-xs block ${isSelected ? "text-warm-white/70" : "text-text-secondary"}`}>
                        {opt.description}
                      </span>
                    </div>
                  </div>
                </button>
              );
            })}
          </div>
        </section>

        {/* ── Your Voice ── */}
        {showVoice && (
          <section>
            <SectionHeader>Your Voice</SectionHeader>
            <div className="flex flex-col gap-2">
              {VOICE_OPTIONS.map((v) => {
                const isSelected = voice === v.value;
                return (
                  <button
                    key={v.value}
                    onClick={() => handleVoice(v.value)}
                    className={`w-full text-left rounded-xl border-2 px-4 py-3 transition-all duration-200 cursor-pointer ${
                      isSelected
                        ? "border-navy bg-navy text-warm-white"
                        : "border-border bg-white hover:border-navy/30"
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <div className="min-w-0 flex-1">
                        <span className={`text-sm font-semibold block ${isSelected ? "text-warm-white" : "text-navy"}`}>
                          {v.name}
                        </span>
                        <span className={`text-xs block ${isSelected ? "text-warm-white/70" : "text-text-secondary"}`}>
                          {v.description}
                        </span>
                      </div>
                      <span
                        role="button"
                        tabIndex={0}
                        onClick={(e) => handlePreview(e, v.value)}
                        onKeyDown={(e) => { if (e.key === "Enter" || e.key === " ") handlePreview(e as unknown as React.MouseEvent, v.value); }}
                        className={`text-xs font-medium px-2.5 py-1 rounded-full shrink-0 ml-3 transition-all duration-200 ${
                          playingVoice === v.value
                            ? isSelected
                              ? "bg-warm-white/30 text-warm-white ring-2 ring-warm-white/40"
                              : "bg-navy text-warm-white ring-2 ring-navy/30"
                            : isSelected
                              ? "bg-warm-white/20 text-warm-white hover:bg-warm-white/30"
                              : "bg-warm-gray text-text-secondary hover:bg-border"
                        }`}
                      >
                        {playingVoice === v.value ? "Stop" : "Preview"}
                      </span>
                    </div>
                  </button>
                );
              })}
            </div>
          </section>
        )}

        {/* ── About Lens ── */}
        <section>
          <SectionHeader>About Lens</SectionHeader>
          <div className="rounded-xl border-2 border-border bg-white p-4">
            <p className="text-sm text-text-secondary leading-relaxed">
              Lens pulls reporting from more than a hundred sources, cross-references
              the facts, and strips out the spin. Every story shows you what happened,
              why it matters, what people think, and what we don't know yet — so you
              can form your own opinion.
            </p>
            <p className="text-xs text-text-muted mt-3">Version 0.1.0</p>
          </div>
        </section>

        {/* ── Reset ── */}
        <section>
          <div className="rounded-xl border-2 border-border bg-white p-4">
            <h3 className="text-sm font-semibold text-navy mb-1">Reset Onboarding</h3>
            <p className="text-xs text-text-secondary mb-3">
              Clear your preferences and go through setup again.
            </p>
            <button
              onClick={handleReset}
              className="px-4 py-2 rounded-lg text-xs font-semibold bg-navy text-warm-white hover:bg-navy-light transition-colors cursor-pointer"
            >
              Reset &amp; Restart
            </button>
          </div>
        </section>
      </main>
    </div>
  );
}
