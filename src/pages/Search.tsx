import { useState, useRef, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { loadPreferences } from "@/data/preferences";
import { stories, type Story } from "@/data/stories";
import { TOPICS } from "@/data/topics";

/* ── Helpers ── */

function getAgeGateAllowed(readerLevel: string): string[] {
  if (readerLevel === "adult") return ["all", "teen", "adult"];
  if (readerLevel === "teen") return ["all", "teen"];
  return ["all"];
}

function formatDate(dateStr: string): string {
  return new Date(dateStr).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

function timeAgo(dateStr: string): string {
  const diff = Date.now() - new Date(dateStr).getTime();
  const hours = Math.floor(diff / 3_600_000);
  if (hours < 1) return "Just now";
  if (hours < 24) return `${hours}h ago`;
  const days = Math.floor(hours / 24);
  return `${days}d ago`;
}

type SortMode = "newest" | "relevant";

/** Score a story against a search query. Returns 0 if no match. */
function scoreStory(story: Story, query: string, readerLevel: string): number {
  const q = query.toLowerCase();

  let score = 0;

  // Headline match (highest weight)
  if (story.headline.toLowerCase().includes(q)) score += 100;

  // Summary match
  if (story.summary.toLowerCase().includes(q)) score += 50;

  // Body text match (whatHappened at current reading level)
  const level = readerLevel as "young" | "teen" | "adult";
  const readingLevel = story.readingLevels[level];
  if (readingLevel?.whatHappened.toLowerCase().includes(q)) score += 25;

  // Topic match
  if (story.topic.toLowerCase().includes(q)) score += 10;

  return score;
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
      path: "/search",
      label: "Search",
      icon: (active: boolean) => (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={active ? 2.5 : 2} viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
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

/* ── Result Card ── */

function ResultCard({ story, onClick }: { story: Story; onClick: () => void }) {
  const isGreen = story.confidenceBadge === "green";

  return (
    <div
      onClick={onClick}
      className="w-full text-left rounded-2xl border border-border bg-white p-4 hover:shadow-md hover:border-navy/20 transition-all duration-200 cursor-pointer active:scale-[0.99]"
    >
      <div className="flex items-center gap-2 mb-2">
        <span className="text-sm">{story.topicIcon}</span>
        <span className="text-xs font-medium text-text-secondary">{story.topic}</span>
        <span
          className={`ml-auto text-[10px] font-semibold px-2 py-0.5 rounded-full ${
            isGreen
              ? "bg-confidence-muted text-confidence"
              : "bg-developing-muted text-developing"
          }`}
        >
          {isGreen ? "Verified" : "Developing"}
        </span>
      </div>

      <h3 className="text-[15px] font-semibold text-navy leading-snug mb-1">
        {story.headline}
      </h3>
      <p className="text-sm text-text-secondary leading-relaxed line-clamp-2 mb-2">
        {story.summary}
      </p>

      <div className="flex items-center justify-between">
        <span className="text-xs font-medium text-navy/70">
          {formatDate(story.publishedAt)}
        </span>
        <span className="text-[11px] text-text-muted">
          {timeAgo(story.publishedAt)}
        </span>
      </div>
    </div>
  );
}

/* ── Topic Grid ── */

function TopicGrid({ onSelectTopic }: { onSelectTopic: (label: string) => void }) {
  return (
    <section className="mt-6">
      <h3 className="text-base font-semibold text-navy mb-3">Browse by topic</h3>
      <div className="grid grid-cols-2 gap-2.5">
        {TOPICS.map((topic) => (
          <button
            key={topic.label}
            onClick={() => onSelectTopic(topic.label)}
            className="flex items-center gap-2.5 rounded-xl border border-border bg-white px-3.5 py-3 text-left cursor-pointer hover:shadow-md hover:border-navy/20 transition-all duration-200 active:scale-[0.98]"
          >
            <span className="text-lg">{topic.icon}</span>
            <span className="text-sm font-medium text-navy leading-tight">{topic.label}</span>
          </button>
        ))}
      </div>
    </section>
  );
}

/* ── Search Page ── */

export default function Search() {
  const navigate = useNavigate();
  const prefs = loadPreferences();
  const readerLevel = prefs?.readerLevel ?? "adult";
  const allowedAgeGates = getAgeGateAllowed(readerLevel);

  const inputRef = useRef<HTMLInputElement>(null);
  const [query, setQuery] = useState("");
  const [sortMode, setSortMode] = useState<SortMode>("newest");
  const [selectedTopic, setSelectedTopic] = useState<string | null>(null);
  const [topicSortAsc, setTopicSortAsc] = useState(false);

  // Autofocus on mount
  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  // Age-gate filtered stories (no topic filter — search finds anything)
  const ageFilteredStories = stories.filter((s) =>
    allowedAgeGates.includes(s.ageGate)
  );

  // ── Topic Timeline View ──
  if (selectedTopic) {
    const topicStories = ageFilteredStories
      .filter((s) => s.topic === selectedTopic)
      .sort((a, b) => {
        const diff = new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime();
        return topicSortAsc ? -diff : diff;
      });

    const topicData = TOPICS.find((t) => t.label === selectedTopic);

    return (
      <div className="min-h-dvh bg-warm-white pb-20">
        {/* Header */}
        <header className="sticky top-0 z-30 bg-warm-white/95 backdrop-blur-sm border-b border-border">
          <div className="flex items-center gap-3 px-page py-3 max-w-lg mx-auto">
            <button
              onClick={() => setSelectedTopic(null)}
              className="p-1 -ml-1 cursor-pointer hover:bg-warm-gray rounded-lg transition-colors"
              aria-label="Back to search"
            >
              <svg className="w-5 h-5 text-navy" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
              </svg>
            </button>
            <div className="flex items-center gap-2 flex-1 min-w-0">
              <span className="text-lg">{topicData?.icon}</span>
              <h1 className="text-base font-semibold text-navy truncate">{selectedTopic}</h1>
            </div>
          </div>
        </header>

        <main className="px-page max-w-lg mx-auto">
          {/* Sort toggle */}
          <div className="flex items-center justify-between py-4">
            <span className="text-sm text-text-secondary">
              {topicStories.length} {topicStories.length === 1 ? "story" : "stories"}
            </span>
            <button
              onClick={() => setTopicSortAsc(!topicSortAsc)}
              className="text-xs font-medium text-navy cursor-pointer hover:underline"
            >
              {topicSortAsc ? "Oldest first" : "Newest first"}
            </button>
          </div>

          {topicStories.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-text-secondary text-sm">No stories in this topic yet.</p>
            </div>
          ) : (
            <div className="flex flex-col gap-3">
              {topicStories.map((story) => (
                <ResultCard
                  key={story.id}
                  story={story}
                  onClick={() => navigate(`/story/${story.id}`)}
                />
              ))}
            </div>
          )}
        </main>

        <BottomNav />
      </div>
    );
  }

  // ── Keyword Search ──
  const trimmedQuery = query.trim();
  const hasQuery = trimmedQuery.length > 0;

  const searchResults = hasQuery
    ? ageFilteredStories
        .map((story) => ({
          story,
          score: scoreStory(story, trimmedQuery, readerLevel),
        }))
        .filter((r) => r.score > 0)
        .sort((a, b) => {
          if (sortMode === "relevant") return b.score - a.score;
          return new Date(b.story.publishedAt).getTime() - new Date(a.story.publishedAt).getTime();
        })
        .map((r) => r.story)
    : [];

  return (
    <div className="min-h-dvh bg-warm-white pb-20">
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
        {/* Search bar */}
        <div className="pt-4 pb-1">
          <div className="relative">
            {/* Magnifying glass icon */}
            <svg
              className="absolute left-3.5 top-1/2 -translate-y-1/2 w-5 h-5 text-text-muted pointer-events-none"
              fill="none"
              stroke="currentColor"
              strokeWidth={2}
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
            </svg>
            <input
              ref={inputRef}
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search stories..."
              className="w-full pl-11 pr-10 py-3.5 rounded-xl border border-border bg-white text-base text-navy placeholder:text-text-muted focus:outline-none focus:border-navy/30 focus:ring-2 focus:ring-navy/10 transition-all"
            />
            {/* Clear button */}
            {hasQuery && (
              <button
                onClick={() => {
                  setQuery("");
                  inputRef.current?.focus();
                }}
                className="absolute right-3 top-1/2 -translate-y-1/2 p-0.5 cursor-pointer rounded-full hover:bg-warm-gray transition-colors"
                aria-label="Clear search"
              >
                <svg className="w-5 h-5 text-text-muted" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            )}
          </div>
        </div>

        {/* Empty state: Browse by topic */}
        {!hasQuery && (
          <TopicGrid onSelectTopic={setSelectedTopic} />
        )}

        {/* Results */}
        {hasQuery && (
          <section className="mt-4">
            {/* Results header */}
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-base font-semibold text-navy">
                Results{" "}
                <span className="text-sm font-normal text-text-secondary">
                  {searchResults.length} {searchResults.length === 1 ? "result" : "results"}
                </span>
              </h3>
              <div className="flex items-center gap-1 text-xs">
                <button
                  onClick={() => setSortMode("newest")}
                  className={`px-2 py-1 rounded-lg cursor-pointer transition-colors ${
                    sortMode === "newest"
                      ? "bg-navy text-warm-white font-semibold"
                      : "text-text-secondary hover:bg-warm-gray"
                  }`}
                >
                  Newest
                </button>
                <button
                  onClick={() => setSortMode("relevant")}
                  className={`px-2 py-1 rounded-lg cursor-pointer transition-colors ${
                    sortMode === "relevant"
                      ? "bg-navy text-warm-white font-semibold"
                      : "text-text-secondary hover:bg-warm-gray"
                  }`}
                >
                  Most relevant
                </button>
              </div>
            </div>

            {/* No results */}
            {searchResults.length === 0 ? (
              <div className="text-center py-10">
                <p className="text-text-secondary text-sm mb-1">
                  No stories found for "{trimmedQuery}".
                </p>
                <p className="text-text-muted text-sm">
                  Try a different search term or browse by topic.
                </p>
                <TopicGrid onSelectTopic={(topic) => {
                  setQuery("");
                  setSelectedTopic(topic);
                }} />
              </div>
            ) : (
              <div className="flex flex-col gap-3">
                {searchResults.map((story) => (
                  <ResultCard
                    key={story.id}
                    story={story}
                    onClick={() => navigate(`/story/${story.id}`)}
                  />
                ))}
              </div>
            )}
          </section>
        )}
      </main>

      <BottomNav />
    </div>
  );
}
