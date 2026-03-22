import { useState, useEffect, useRef, useCallback } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { loadPreferences } from "@/data/preferences";
import { stories, type Story } from "@/data/stories";
import { VOICE_OPTIONS, type VoiceId } from "@/data/constants";
import { BriefingPlayer } from "@/components/AudioPlayer";

/* ── Helpers ── */

function getGreeting(): string {
  const hour = new Date().getHours();
  if (hour < 12) return "Good morning";
  if (hour < 17) return "Good afternoon";
  return "Good evening";
}

/**
 * Determines which age-gated content a reader may see.
 * Classification criteria (including the war/conflict 4-test exception)
 * are documented on the Story.ageGate field in src/data/stories.ts.
 */
function getAgeGateAllowed(readerLevel: string): string[] {
  if (readerLevel === "adult") return ["all", "teen", "adult"];
  if (readerLevel === "teen") return ["all", "teen"];
  return ["all"];
}

function timeAgo(dateStr: string): string {
  const diff = Date.now() - new Date(dateStr).getTime();
  const hours = Math.floor(diff / 3_600_000);
  if (hours < 1) return "Just now";
  if (hours < 24) return `${hours}h ago`;
  const days = Math.floor(hours / 24);
  return `${days}d ago`;
}

/* ── Skeleton ── */

function SkeletonScreen() {
  return (
    <div className="min-h-dvh bg-warm-white">
      {/* Header skeleton */}
      <div className="border-b border-border px-page py-3 max-w-lg mx-auto flex items-center justify-between">
        <div className="skeleton h-6 w-14" />
        <div className="skeleton h-6 w-28" />
      </div>
      <div className="px-page max-w-lg mx-auto">
        {/* Greeting skeleton */}
        <div className="pt-6 pb-5">
          <div className="skeleton h-7 w-52" />
        </div>
        {/* Card skeletons */}
        <div className="flex flex-col gap-3">
          <div className="skeleton h-24 w-full" />
          <div className="mt-3">
            <div className="skeleton h-5 w-32 mb-4" />
            <div className="skeleton h-32 w-full mb-3" />
            <div className="skeleton h-32 w-full" />
          </div>
        </div>
      </div>
    </div>
  );
}

/* ── Pull to Refresh ── */

function usePullToRefresh(onRefresh: () => Promise<void>) {
  const [pulling, setPulling] = useState(false);
  const [pullY, setPullY] = useState(0);
  const [refreshing, setRefreshing] = useState(false);
  const startY = useRef(0);
  const scrollRef = useRef<HTMLDivElement>(null);

  const THRESHOLD = 80;

  const handleTouchStart = useCallback((e: React.TouchEvent) => {
    if (scrollRef.current && scrollRef.current.scrollTop === 0) {
      startY.current = e.touches[0].clientY;
      setPulling(true);
    }
  }, []);

  const handleTouchMove = useCallback((e: React.TouchEvent) => {
    if (!pulling) return;
    const diff = e.touches[0].clientY - startY.current;
    if (diff > 0) {
      setPullY(Math.min(diff * 0.4, 120));
    }
  }, [pulling]);

  const handleTouchEnd = useCallback(async () => {
    if (pullY >= THRESHOLD && !refreshing) {
      setRefreshing(true);
      setPullY(50);
      await onRefresh();
      setRefreshing(false);
    }
    setPullY(0);
    setPulling(false);
  }, [pullY, refreshing, onRefresh]);

  return { scrollRef, pullY, refreshing, handleTouchStart, handleTouchMove, handleTouchEnd };
}

/* ── Bottom Nav ── */

function BottomNav() {
  const navigate = useNavigate();
  const location = useLocation();

  const tabs = [
    {
      path: "/home",
      label: "Home",
      icon: (active: boolean) => (
        <svg className="w-5 h-5" fill={active ? "currentColor" : "none"} stroke="currentColor" strokeWidth={active ? 0 : 2} viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 12l8.954-8.955a1.126 1.126 0 011.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25" />
        </svg>
      ),
    },
    {
      path: "/settings",
      label: "Settings",
      icon: (active: boolean) => (
        <svg className="w-5 h-5" fill={active ? "currentColor" : "none"} stroke="currentColor" strokeWidth={active ? 0 : 2} viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M9.594 3.94c.09-.542.56-.94 1.11-.94h2.593c.55 0 1.02.398 1.11.94l.213 1.281c.063.374.313.686.645.87.074.04.147.083.22.127.325.196.72.257 1.075.124l1.217-.456a1.125 1.125 0 011.37.49l1.296 2.247a1.125 1.125 0 01-.26 1.431l-1.003.827c-.293.241-.438.613-.431.992a6.759 6.759 0 010 .255c-.007.378.138.75.43.991l1.004.827c.424.35.534.955.26 1.43l-1.298 2.247a1.125 1.125 0 01-1.369.491l-1.217-.456c-.355-.133-.75-.072-1.076.124a6.57 6.57 0 01-.22.128c-.331.183-.581.495-.644.869l-.213 1.28c-.09.543-.56.941-1.11.941h-2.594c-.55 0-1.02-.398-1.11-.94l-.213-1.281c-.062-.374-.312-.686-.644-.87a6.52 6.52 0 01-.22-.127c-.325-.196-.72-.257-1.076-.124l-1.217.456a1.125 1.125 0 01-1.369-.49l-1.297-2.247a1.125 1.125 0 01.26-1.431l1.004-.827c.292-.24.437-.613.43-.992a6.932 6.932 0 010-.255c.007-.378-.138-.75-.43-.99l-1.004-.828a1.125 1.125 0 01-.26-1.43l1.297-2.247a1.125 1.125 0 011.37-.491l1.216.456c.356.133.751.072 1.076-.124.072-.044.146-.087.22-.128.332-.183.582-.495.644-.869l.214-1.281z" />
          <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
        </svg>
      ),
    },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-40 bg-warm-white/95 backdrop-blur-sm border-t border-border">
      <div className="flex max-w-lg mx-auto">
        {tabs.map((tab) => {
          const isActive = location.pathname === tab.path;
          return (
            <button
              key={tab.path}
              onClick={() => navigate(tab.path)}
              className={`flex-1 flex flex-col items-center gap-0.5 py-2.5 cursor-pointer transition-colors ${
                isActive ? "text-navy" : "text-text-muted hover:text-text-secondary"
              }`}
            >
              {tab.icon(isActive)}
              <span className={`text-[10px] font-medium ${isActive ? "text-navy" : ""}`}>
                {tab.label}
              </span>
            </button>
          );
        })}
      </div>
    </nav>
  );
}

/* ── Story Card ── */

function StoryCard({ story, onClick }: { story: Story; onClick: () => void }) {
  const isGreen = story.confidenceBadge === "green";
  const [showBadgeTip, setShowBadgeTip] = useState(false);

  return (
    <div
      onClick={onClick}
      className="w-full text-left rounded-2xl border border-border bg-white p-4 hover:shadow-md hover:border-navy/20 transition-all duration-200 cursor-pointer active:scale-[0.99]"
    >
      <div className="flex items-center gap-2 mb-2.5">
        <span className="text-sm">{story.topicIcon}</span>
        <span className="text-xs font-medium text-text-secondary">
          {story.topic}
        </span>
        <div className="ml-auto relative">
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              setShowBadgeTip(!showBadgeTip);
            }}
            className={`text-[10px] font-semibold px-2 py-0.5 rounded-full cursor-pointer transition-opacity hover:opacity-80 ${
              isGreen
                ? "bg-confidence-muted text-confidence"
                : "bg-developing-muted text-developing"
            }`}
          >
            {isGreen ? "Verified" : "Developing"}
          </button>
          {showBadgeTip && (
            <div className="absolute right-0 top-full mt-1.5 w-60 rounded-xl bg-navy p-3 shadow-lg z-50 animate-[fadeIn_0.15s_ease-out]">
              <div className="flex items-center gap-1.5 mb-1">
                <span className={`w-1.5 h-1.5 rounded-full ${isGreen ? "bg-confidence" : "bg-developing"}`} />
                <span className="text-[11px] font-semibold text-warm-white">
                  {isGreen ? "High Confidence" : "Developing"}
                </span>
              </div>
              <p className="text-xs text-warm-white/80 leading-relaxed">
                {isGreen
                  ? "Every fact confirmed by multiple sources with different perspectives."
                  : "Some details still being confirmed or sources disagree."}
              </p>
            </div>
          )}
        </div>
      </div>

      <h3 className="text-[15px] font-semibold text-navy leading-snug mb-1.5">
        {story.headline}
      </h3>
      <p className="text-sm text-text-secondary leading-relaxed line-clamp-2">
        {story.summary}
      </p>

      <div className="mt-3 pt-2.5 border-t border-border/60 flex items-center justify-between">
        <span className="text-xs text-text-muted">
          {timeAgo(story.publishedAt)}
        </span>
        <span className="text-xs font-medium text-navy">
          Read &rarr;
        </span>
      </div>
    </div>
  );
}

/* ── Home ── */

const SCROLL_KEY = "lens-home-scroll";

export default function Home() {
  const navigate = useNavigate();
  const prefs = loadPreferences();
  const [loading, setLoading] = useState(true);

  // Save scroll position before navigating away
  useEffect(() => {
    const handleScroll = () => {
      sessionStorage.setItem(SCROLL_KEY, String(window.scrollY));
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Restore scroll position after loading completes
  useEffect(() => {
    if (!loading) {
      const saved = sessionStorage.getItem(SCROLL_KEY);
      if (saved) {
        requestAnimationFrame(() => window.scrollTo(0, parseInt(saved, 10)));
      }
    }
  }, [loading]);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 500);
    return () => clearTimeout(timer);
  }, []);

  const handleRefresh = useCallback(async () => {
    // Simulate refresh — will connect to backend later
    await new Promise((r) => setTimeout(r, 800));
  }, []);

  const { scrollRef, pullY, refreshing, handleTouchStart, handleTouchMove, handleTouchEnd } =
    usePullToRefresh(handleRefresh);

  const readerLevel = prefs?.readerLevel ?? "adult";
  const selectedTopics = prefs?.topics ?? [];
  const newsMode = prefs?.newsMode ?? "read";
  const voiceKey = (prefs?.voice ?? "anchor") as VoiceId;
  const voiceMeta = VOICE_OPTIONS.find((v) => v.value === voiceKey);
  const voiceName = voiceMeta?.name ?? "The Anchor";

  const allowedAgeGates = getAgeGateAllowed(readerLevel);
  const levelKey = readerLevel === "young" ? "young" : readerLevel === "teen" ? "teen" : "adult" as const;

  const filteredStories = stories
    .filter(
      (s) =>
        allowedAgeGates.includes(s.ageGate) &&
        (selectedTopics.length === 0 || selectedTopics.includes(s.topic))
    )
    .sort((a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime());

  const showBriefing = newsMode === "listen" || newsMode === "both";

  // Build briefing audio URLs from top stories (ordered by source count)
  const briefingStories = [...filteredStories]
    .sort((a, b) => b.sources.confirming.length - a.sources.confirming.length)
    .slice(0, 5);
  const briefingAudioUrls = briefingStories
    .map((s) => s.audio[levelKey]?.[voiceKey] ?? "")
    .filter((url) => url !== "");

  if (loading) return <SkeletonScreen />;

  return (
    <div
      ref={scrollRef}
      className="min-h-dvh bg-warm-white pb-20"
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
    >
      {/* Pull-to-refresh indicator */}
      {(pullY > 0 || refreshing) && (
        <div
          className="flex items-center justify-center overflow-hidden transition-all duration-200"
          style={{ height: pullY }}
        >
          <div className={`w-5 h-5 border-2 border-navy/30 border-t-navy rounded-full ${refreshing ? "animate-spin" : ""}`}
            style={{ opacity: Math.min(pullY / 80, 1) }}
          />
        </div>
      )}

      {/* Header */}
      <header className="sticky top-0 z-30 bg-warm-white/95 backdrop-blur-sm border-b border-border">
        <div className="flex items-center justify-between px-page py-3 max-w-lg mx-auto">
          <h1 className="lens-wordmark text-xl">lens.</h1>
          <span className="flex items-center gap-1.5 text-[11px] font-semibold text-confidence bg-confidence-muted px-2.5 py-1 rounded-full select-none">
            <span className="w-1.5 h-1.5 rounded-full bg-confidence" />
            Bias Filter ON
          </span>
        </div>
      </header>

      <main className="px-page max-w-lg mx-auto">
        {/* Greeting */}
        <div className="pt-5 pb-4">
          <h2 className="text-xl sm:text-2xl font-semibold tracking-tight text-navy">
            {getGreeting()}
          </h2>
        </div>

        {/* Daily Briefing Player */}
        {showBriefing && briefingAudioUrls.length > 0 && (
          <BriefingPlayer
            audioUrls={briefingAudioUrls}
            voiceName={voiceName}
            storyCount={briefingStories.length}
            estimatedMinutes={briefingStories.length * 2}
          />
        )}
        {showBriefing && briefingAudioUrls.length === 0 && (
          <div className="w-full rounded-2xl bg-navy p-4 sm:p-5 mb-5">
            <h3 className="text-base font-semibold text-warm-white mb-0.5">
              Your Daily Briefing
            </h3>
            <p className="text-xs text-warm-white/50">
              Audio not yet available. Check back soon.
            </p>
          </div>
        )}

        {/* Stories Feed */}
        <section>
          <h3 className="text-base font-semibold text-navy mb-3">Today's Stories</h3>

          {filteredStories.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-text-secondary text-sm">
                No stories match your selected topics.
              </p>
              <button
                onClick={() => navigate("/settings")}
                className="mt-3 text-sm font-medium text-navy hover:underline cursor-pointer"
              >
                Update your preferences
              </button>
            </div>
          ) : (
            <div className="flex flex-col gap-3">
              {filteredStories.map((story) => (
                <StoryCard
                  key={story.id}
                  story={story}
                  onClick={() => navigate(`/story/${story.id}`)}
                />
              ))}
            </div>
          )}
        </section>
      </main>

      {/* Bottom Navigation */}
      <BottomNav />

    </div>
  );
}
