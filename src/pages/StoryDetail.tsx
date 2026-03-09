import { useState, useCallback, useEffect, useRef } from "react";
import { useParams, useNavigate, Navigate } from "react-router-dom";
import { stories, type ReadingLevel, type Perspective, type TapToDefine, type Story } from "@/data/stories";
import { loadPreferences } from "@/data/preferences";
import { VOICE_OPTIONS, type VoiceId } from "@/data/constants";
import AudioPlayer from "@/components/AudioPlayer";

type TabId = "happened" | "matters" | "think" | "unknown";

const TABS: { id: TabId; label: string }[] = [
  { id: "happened", label: "What Happened" },
  { id: "matters", label: "Why It Matters" },
  { id: "think", label: "What People Think" },
  { id: "unknown", label: "What We Don't Know" },
];

function getReadingLevelKey(readerLevel: string): "young" | "teen" | "adult" {
  if (readerLevel === "young") return "young";
  if (readerLevel === "teen") return "teen";
  return "adult";
}

/* ── Inline Tap-to-Define ── */

function DefinableText({
  text,
  definitions,
}: {
  text: string;
  definitions: TapToDefine[];
}) {
  const [activeWord, setActiveWord] = useState<string | null>(null);

  const handleTap = useCallback((word: string) => {
    setActiveWord((prev) => (prev === word ? null : word));
  }, []);

  if (definitions.length === 0) {
    return (
      <p className="text-[15px] text-text-primary leading-[1.75] whitespace-pre-line">
        {text}
      </p>
    );
  }

  // Build regex to match any defined word (case-insensitive, whole word for single words)
  const pattern = definitions
    .map((d) => d.word.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"))
    .join("|");
  const regex = new RegExp(`(${pattern})`, "gi");

  const parts = text.split(regex);
  const activeDef = definitions.find(
    (d) => d.word.toLowerCase() === activeWord?.toLowerCase()
  );

  return (
    <div>
      <p className="text-[15px] text-text-primary leading-[1.75] whitespace-pre-line">
        {parts.map((part, i) => {
          const match = definitions.find(
            (d) => d.word.toLowerCase() === part.toLowerCase()
          );
          if (match) {
            const isActive = activeWord?.toLowerCase() === match.word.toLowerCase();
            return (
              <button
                key={i}
                onClick={() => handleTap(match.word)}
                className={`inline cursor-pointer border-b border-dotted transition-colors ${
                  isActive
                    ? "border-navy text-navy font-semibold"
                    : "border-text-muted/50 text-text-primary hover:border-navy/50"
                }`}
              >
                {part}
              </button>
            );
          }
          return <span key={i}>{part}</span>;
        })}
      </p>

      {/* Definition tooltip */}
      {activeDef && (
        <div className="mt-3 rounded-xl bg-navy p-4 animate-[fadeIn_0.15s_ease-out]">
          <div className="flex items-center justify-between mb-1.5">
            <span className="text-xs font-semibold text-warm-white/70 uppercase tracking-wider">
              Definition
            </span>
            <button
              onClick={() => setActiveWord(null)}
              className="text-warm-white/50 hover:text-warm-white cursor-pointer"
              aria-label="Close definition"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
          <p className="text-sm font-semibold text-warm-white mb-1">
            {activeDef.word}
          </p>
          <p className="text-sm text-warm-white/80 leading-relaxed">
            {activeDef.definition}
          </p>
        </div>
      )}
    </div>
  );
}

/* ── Perspective Cards ── */

const PERSPECTIVE_COLORS = [
  "bg-[#eef4fb] border-[#d6e4f0]",
  "bg-warm-gray border-border",
  "bg-[#f0f7f0] border-[#d4e8d4]",
];

function PerspectiveCard({ item, index, definitions }: { item: Perspective; index: number; definitions: TapToDefine[] }) {
  const colorClass = PERSPECTIVE_COLORS[index % PERSPECTIVE_COLORS.length];

  return (
    <div className={`rounded-xl border p-4 ${colorClass}`}>
      <span className="text-[11px] font-semibold text-navy/70 uppercase tracking-wider">
        {item.perspective}
      </span>
      <div className="mt-2">
        <DefinableText text={item.content} definitions={definitions} />
      </div>
    </div>
  );
}

/* ── How We Know Panel ── */

function HowWeKnow({ story }: { story: Story }) {
  const [open, setOpen] = useState(false);
  const sourceCount = story.sources.confirming.length;

  return (
    <section className="mb-8">
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between rounded-xl border border-border bg-white px-4 py-3.5 cursor-pointer hover:border-navy/20 transition-colors"
      >
        <div className="flex items-center gap-2.5">
          <div className="w-7 h-7 rounded-full bg-confidence-muted flex items-center justify-center shrink-0">
            <svg className="w-3.5 h-3.5 text-confidence" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" />
            </svg>
          </div>
          <span className="text-sm font-semibold text-navy">How We Know</span>
          <span className="text-[10px] font-medium text-text-muted bg-warm-gray px-2 py-0.5 rounded-full">
            {sourceCount} sources
          </span>
        </div>
        <svg
          className={`w-4 h-4 text-text-muted transition-transform duration-200 ${open ? "rotate-180" : ""}`}
          fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
        </svg>
      </button>

      {open && (
        <div className="mt-2 rounded-xl border border-border bg-white p-4 animate-[fadeIn_0.15s_ease-out]">
          {/* Sources list */}
          <h4 className="text-xs font-semibold text-navy/70 uppercase tracking-wider mb-3">
            Sources for this story
          </h4>
          <div className="flex flex-col gap-2.5 mb-4">
            {story.sources.confirming.map((source) => (
              <div key={source.name} className="flex items-center gap-2">
                <div className="w-1.5 h-1.5 rounded-full bg-confidence shrink-0" />
                <span className="text-sm text-text-primary flex-1">{source.name}</span>
                <span className="text-[10px] font-medium text-text-muted bg-warm-gray px-2 py-0.5 rounded-full shrink-0">
                  {source.type}
                </span>
              </div>
            ))}
          </div>

          {/* Methodology */}
          <div className="pt-3 border-t border-border/60">
            <h4 className="text-xs font-semibold text-navy/70 uppercase tracking-wider mb-2">
              Methodology
            </h4>
            <p className="text-sm text-text-secondary leading-relaxed">
              {story.sources.methodology}
            </p>
          </div>

          {/* Source count summary */}
          <div className="mt-3 pt-3 border-t border-border/60">
            <p className="text-xs text-text-muted text-center">
              This story was built from {sourceCount} sources
            </p>
          </div>
        </div>
      )}
    </section>
  );
}

/* ── Tab Content ── */

function TabContent({ tab, level }: { tab: TabId; level: ReadingLevel }) {
  const defs = level.tapToDefine;

  if (tab === "happened") {
    return <DefinableText text={level.whatHappened} definitions={defs} />;
  }

  if (tab === "matters") {
    return <DefinableText text={level.whyItMatters} definitions={defs} />;
  }

  if (tab === "think") {
    return (
      <div>
        <p className="text-xs text-text-muted mb-4">
          These are the main viewpoints in this story. No perspective is presented as correct.
        </p>
        <div className="flex flex-col gap-3">
          {level.whatPeopleThink.map((item, i) => (
            <PerspectiveCard key={item.perspective} item={item} index={i} definitions={defs} />
          ))}
        </div>
      </div>
    );
  }

  // "unknown"
  return (
    <div className="rounded-xl bg-[#fdf8f0] border border-[#f0e6d4] p-5">
      <div className="flex items-start gap-3">
        <div className="w-8 h-8 rounded-full bg-developing-muted flex items-center justify-center shrink-0 mt-0.5">
          <svg className="w-4 h-4 text-developing" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M9.879 7.519c1.171-1.025 3.071-1.025 4.242 0 1.172 1.025 1.172 2.687 0 3.712-.203.179-.43.326-.67.442-.745.361-1.45.999-1.45 1.827v.75M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9 5.25h.008v.008H12v-.008z" />
          </svg>
        </div>
        <div className="min-w-0 flex-1">
          <h4 className="text-xs font-semibold text-developing uppercase tracking-wider mb-2">
            Still uncertain
          </h4>
          <DefinableText text={level.whatWeDontKnow} definitions={defs} />
        </div>
      </div>
    </div>
  );
}

/* ── Reading Progress Bar ── */

function useReadingProgress() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (docHeight > 0) {
        setProgress(Math.min((scrollTop / docHeight) * 100, 100));
      }
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return progress;
}

/* ── Confidence Badge Tooltip ── */

const CONFIDENCE_EXPLANATIONS = {
  green: {
    title: "High Confidence",
    text: "This story has been confirmed by multiple independent sources. The key facts are well-established.",
  },
  yellow: {
    title: "Developing Story",
    text: "This story is still evolving. Some details may change as more information becomes available.",
  },
};

function ConfidenceBadge({ isGreen }: { isGreen: boolean }) {
  const [showTooltip, setShowTooltip] = useState(false);
  const tooltipRef = useRef<HTMLDivElement>(null);

  const explanation = CONFIDENCE_EXPLANATIONS[isGreen ? "green" : "yellow"];

  useEffect(() => {
    if (!showTooltip) return;
    const handleClickOutside = (e: MouseEvent) => {
      if (tooltipRef.current && !tooltipRef.current.contains(e.target as Node)) {
        setShowTooltip(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [showTooltip]);

  return (
    <div className="relative shrink-0" ref={tooltipRef}>
      <button
        onClick={() => setShowTooltip(!showTooltip)}
        className={`flex items-center gap-1.5 text-[10px] font-semibold px-2.5 py-1 rounded-full cursor-pointer transition-opacity hover:opacity-80 ${
          isGreen
            ? "bg-confidence-muted text-confidence"
            : "bg-developing-muted text-developing"
        }`}
      >
        <span
          className={`w-1.5 h-1.5 rounded-full ${
            isGreen ? "bg-confidence" : "bg-developing"
          }`}
        />
        {isGreen ? "High Confidence" : "Developing"}
      </button>

      {showTooltip && (
        <div className="absolute right-0 top-full mt-2 w-64 rounded-xl bg-navy p-4 shadow-lg z-50 animate-[fadeIn_0.15s_ease-out]">
          <div className="flex items-center gap-2 mb-2">
            <span
              className={`w-2 h-2 rounded-full ${
                isGreen ? "bg-confidence" : "bg-developing"
              }`}
            />
            <span className="text-xs font-semibold text-warm-white">
              {explanation.title}
            </span>
          </div>
          <p className="text-xs text-warm-white/80 leading-relaxed">
            {explanation.text}
          </p>
        </div>
      )}
    </div>
  );
}

/* ── Share Button ── */

function ShareButton({ storyId }: { storyId: string }) {
  const [copied, setCopied] = useState(false);

  const handleShare = useCallback(async () => {
    const url = `${window.location.origin}/story/${storyId}`;

    // Use native share on mobile if available
    if (navigator.share) {
      try {
        await navigator.share({ url });
        return;
      } catch {
        // User cancelled or share failed — fall through to clipboard
      }
    }

    // Fallback: copy to clipboard
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Last resort fallback
      const textarea = document.createElement("textarea");
      textarea.value = url;
      textarea.style.position = "fixed";
      textarea.style.opacity = "0";
      document.body.appendChild(textarea);
      textarea.select();
      document.execCommand("copy");
      document.body.removeChild(textarea);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  }, [storyId]);

  return (
    <button
      onClick={handleShare}
      className="text-navy hover:text-navy-light transition-colors cursor-pointer shrink-0"
      aria-label="Share story"
    >
      {copied ? (
        <svg className="w-5 h-5 text-confidence" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
        </svg>
      ) : (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M7.217 10.907a2.25 2.25 0 100 2.186m0-2.186c.18.324.283.696.283 1.093s-.103.77-.283 1.093m0-2.186l9.566-5.314m-9.566 7.5l9.566 5.314m0 0a2.25 2.25 0 103.935 2.186 2.25 2.25 0 00-3.935-2.186zm0-12.814a2.25 2.25 0 103.933-2.185 2.25 2.25 0 00-3.933 2.185z" />
        </svg>
      )}
    </button>
  );
}

/* ── Story Detail Page ── */

export default function StoryDetail() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<TabId>("happened");
  const readingProgress = useReadingProgress();

  const story = stories.find((s) => s.id === id);
  if (!story) return <Navigate to="/home" replace />;

  const prefs = loadPreferences();
  const levelKey = getReadingLevelKey(prefs?.readerLevel ?? "adult");
  const level = story.readingLevels[levelKey];
  const isGreen = story.confidenceBadge === "green";

  // Audio setup
  const newsMode = prefs?.newsMode ?? "read";
  const voiceKey = (prefs?.voice ?? "anchor") as VoiceId;
  const voiceMeta = VOICE_OPTIONS.find((v) => v.value === voiceKey);
  const voiceName = voiceMeta?.name ?? "The Anchor";
  const audioSrc = story.audio[levelKey]?.[voiceKey] ?? "";
  const showAudio = newsMode === "listen" || newsMode === "both";

  return (
    <div className="min-h-dvh bg-warm-white pb-8">
      {/* Reading progress bar */}
      <div className="fixed top-0 left-0 right-0 z-50 h-0.5">
        <div
          className={`h-full transition-all duration-150 ${isGreen ? "bg-confidence" : "bg-developing"}`}
          style={{ width: `${readingProgress}%` }}
        />
      </div>

      {/* Top bar */}
      <header className="sticky top-0 z-30 bg-warm-white/95 backdrop-blur-sm border-b border-border">
        <div className="flex items-center gap-3 px-page py-3 max-w-lg mx-auto">
          <button
            onClick={() => navigate(-1)}
            className="text-navy hover:text-navy-light transition-colors cursor-pointer shrink-0"
            aria-label="Back to home"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
            </svg>
          </button>

          <div className="flex items-center gap-2 min-w-0 flex-1">
            <span className="text-sm">{story.topicIcon}</span>
            <span className="text-xs font-medium text-text-secondary truncate">
              {story.topic}
            </span>
          </div>

          <ShareButton storyId={story.id} />
          <ConfidenceBadge isGreen={isGreen} />
        </div>
      </header>

      <main className="px-page max-w-lg mx-auto">
        {/* Headline */}
        <h1 className="text-xl sm:text-2xl font-bold text-navy leading-snug tracking-tight pt-5 pb-4">
          {story.headline}
        </h1>

        {/* Audio Player */}
        {showAudio && audioSrc && (
          <AudioPlayer src={audioSrc} voiceName={voiceName} />
        )}

        {/* Tab bar */}
        <div className="flex gap-1 overflow-x-auto pb-1 mb-5 -mx-page px-page scrollbar-hide">
          {TABS.map((tab) => {
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`whitespace-nowrap px-3.5 py-2 rounded-full text-xs font-semibold transition-all duration-200 cursor-pointer shrink-0 ${
                  isActive
                    ? "bg-navy text-warm-white"
                    : "bg-warm-gray text-text-secondary hover:bg-border"
                }`}
              >
                {tab.label}
              </button>
            );
          })}
        </div>

        {/* Tab content */}
        <section className="mb-8 min-h-[40vh]">
          <TabContent tab={activeTab} level={level} />
        </section>

        {/* How We Know */}
        <HowWeKnow story={story} />

        {/* Go Deeper */}
        {story.goDeeper.length > 0 && (
          <section className="mb-8">
            <h3 className="text-sm font-semibold text-navy mb-3">Go Deeper</h3>
            <div className="flex flex-col gap-2">
              {story.goDeeper.map((link) => (
                <a
                  key={link.url}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-between rounded-xl border border-border bg-white px-4 py-3 hover:border-navy/20 transition-colors"
                >
                  <span className="text-sm font-medium text-navy">{link.label}</span>
                  <svg className="w-4 h-4 text-text-muted shrink-0" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 6H5.25A2.25 2.25 0 003 8.25v10.5A2.25 2.25 0 005.25 21h10.5A2.25 2.25 0 0018 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25" />
                  </svg>
                </a>
              ))}
            </div>
          </section>
        )}
      </main>
    </div>
  );
}
