import { useState, useRef, useEffect } from "react";
import { useNavigate, Navigate } from "react-router-dom";
import { TOPICS } from "@/data/topics";
import { hasCompletedOnboarding, savePreferences } from "@/data/preferences";
import {
  READER_OPTIONS,
  NEWS_MODE_OPTIONS,
  VOICE_OPTIONS,
  type ReaderLevel,
  type NewsMode,
  type VoiceId,
} from "@/data/constants";

function getTotalSteps(newsMode: NewsMode | null) {
  if (newsMode === "listen" || newsMode === "both") return 4;
  return 3;
}

/* ── Transition wrapper ── */

function FadeSlide({ stepKey, children }: { stepKey: number; children: React.ReactNode }) {
  const [visible, setVisible] = useState(false);
  const prevKey = useRef(stepKey);

  useEffect(() => {
    if (stepKey !== prevKey.current) {
      setVisible(false);
      const id = requestAnimationFrame(() => {
        prevKey.current = stepKey;
        setVisible(true);
      });
      return () => cancelAnimationFrame(id);
    } else {
      setVisible(true);
    }
  }, [stepKey]);

  return (
    <div
      className={`transition-all duration-300 ease-out ${
        visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-3"
      }`}
    >
      {children}
    </div>
  );
}

/* ── Shared components ── */

function StepIndicator({ current, total }: { current: number; total: number }) {
  return (
    <div className="flex gap-2 justify-center">
      {Array.from({ length: total }, (_, i) => (
        <div
          key={i}
          className={`h-1.5 rounded-full transition-all duration-300 ${
            i === current ? "w-8 bg-navy" : "w-4 bg-border"
          }`}
        />
      ))}
    </div>
  );
}

function OnboardingHeader({ tagline }: { tagline?: boolean }) {
  return (
    <div className="mb-2">
      <h1 className="lens-wordmark text-2xl">lens.</h1>
      {tagline && (
        <p className="text-text-secondary text-sm mt-1">The news without the noise</p>
      )}
    </div>
  );
}

function BottomBar({
  stepIndex,
  totalSteps,
  canAdvance,
  onBack,
  onNext,
  nextLabel = "Next",
}: {
  stepIndex: number;
  totalSteps: number;
  canAdvance: boolean;
  onBack?: () => void;
  onNext: () => void;
  nextLabel?: string;
}) {
  return (
    <div className="px-page pb-8 pt-4 max-w-lg mx-auto w-full flex flex-col gap-5">
      <StepIndicator current={stepIndex} total={totalSteps} />
      <div className="flex gap-3">
        {onBack && (
          <button
            onClick={onBack}
            className="flex-1 py-3.5 rounded-2xl text-base font-semibold border-2 border-border text-navy hover:bg-warm-gray transition-all duration-200 cursor-pointer"
          >
            Back
          </button>
        )}
        <button
          disabled={!canAdvance}
          onClick={onNext}
          className={`${onBack ? "flex-[2]" : "w-full"} py-3.5 rounded-2xl text-base font-semibold transition-all duration-200 ${
            canAdvance
              ? "bg-navy text-warm-white hover:bg-navy-light cursor-pointer"
              : "bg-warm-gray text-text-muted cursor-not-allowed"
          }`}
        >
          {nextLabel}
        </button>
      </div>
    </div>
  );
}

/* ── Screen 1 ── */

function WhoAreYou({
  selected,
  onSelect,
  onNext,
  totalSteps,
}: {
  selected: ReaderLevel | null;
  onSelect: (level: ReaderLevel) => void;
  onNext: () => void;
  totalSteps: number;
}) {
  return (
    <div className="flex flex-col min-h-dvh bg-warm-white">
      <div className="flex-1 flex flex-col justify-center px-page max-w-lg mx-auto w-full">
        <OnboardingHeader tagline />
        <h2 className="text-2xl sm:text-3xl font-semibold tracking-tight text-navy mb-1.5 mt-6">
          Who are you?
        </h2>
        <p className="text-text-secondary text-sm sm:text-base mb-8">
          We'll tailor the news to your reading level.
        </p>

        <div className="flex flex-col gap-3">
          {READER_OPTIONS.map((opt) => {
            const isSelected = selected === opt.value;
            return (
              <button
                key={opt.value}
                onClick={() => onSelect(opt.value)}
                className={`w-full text-left rounded-2xl border-2 px-5 py-4 transition-all duration-200 cursor-pointer ${
                  isSelected
                    ? "border-navy bg-navy text-warm-white shadow-lg scale-[1.02]"
                    : "border-border bg-white hover:border-navy/30 hover:shadow-md"
                }`}
              >
                <span
                  className={`text-base sm:text-lg font-semibold block ${
                    isSelected ? "text-warm-white" : "text-navy"
                  }`}
                >
                  {opt.label}
                </span>
                <span
                  className={`text-sm mt-0.5 block ${
                    isSelected ? "text-warm-white/70" : "text-text-secondary"
                  }`}
                >
                  {opt.subtitle}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      <BottomBar
        stepIndex={0}
        totalSteps={totalSteps}
        canAdvance={!!selected}
        onNext={onNext}
      />
    </div>
  );
}

/* ── Screen 2 ── */

function WhatDoYouCareAbout({
  selected,
  onToggle,
  onSelectAll,
  onBack,
  onNext,
  totalSteps,
}: {
  selected: Set<string>;
  onToggle: (topic: string) => void;
  onSelectAll: () => void;
  onBack: () => void;
  onNext: () => void;
  totalSteps: number;
}) {
  const allSelected = selected.size === TOPICS.length;

  return (
    <div className="flex flex-col min-h-dvh bg-warm-white">
      <div className="flex-1 flex flex-col px-page max-w-lg mx-auto w-full pt-10">
        <OnboardingHeader />
        <h2 className="text-2xl sm:text-3xl font-semibold tracking-tight text-navy mb-1.5 mt-4">
          What do you care about?
        </h2>
        <p className="text-text-secondary text-sm sm:text-base mb-6">
          Pick topics that interest you. You can change these anytime.
        </p>

        <div className="grid grid-cols-2 gap-2.5">
          {TOPICS.map((topic) => {
            const isSelected = selected.has(topic.label);
            return (
              <button
                key={topic.label}
                onClick={() => onToggle(topic.label)}
                className={`flex flex-col items-center justify-center rounded-2xl border-2 py-4 px-2 transition-all duration-200 cursor-pointer ${
                  isSelected
                    ? "border-navy bg-navy text-warm-white shadow-lg"
                    : "border-border bg-white hover:border-navy/30 hover:shadow-md"
                }`}
              >
                <span className="text-xl mb-1">{topic.icon}</span>
                <span
                  className={`text-xs sm:text-sm font-medium text-center leading-tight ${
                    isSelected ? "text-warm-white" : "text-navy"
                  }`}
                >
                  {topic.label}
                </span>
              </button>
            );
          })}

          <button
            onClick={onSelectAll}
            className={`col-span-2 flex items-center justify-center rounded-2xl border-2 py-3.5 px-3 transition-all duration-200 cursor-pointer ${
              allSelected
                ? "border-navy bg-navy text-warm-white shadow-lg"
                : "border-border bg-white hover:border-navy/30 hover:shadow-md"
            }`}
          >
            <span className="text-xl mr-2">✨</span>
            <span
              className={`text-xs sm:text-sm font-semibold ${
                allSelected ? "text-warm-white" : "text-navy"
              }`}
            >
              All Topics
            </span>
          </button>
        </div>
      </div>

      <BottomBar
        stepIndex={1}
        totalSteps={totalSteps}
        canAdvance={selected.size > 0}
        onBack={onBack}
        onNext={onNext}
      />
    </div>
  );
}

/* ── Screen 3 ── */

function HowDoYouWantNews({
  selected,
  onSelect,
  onBack,
  onNext,
  totalSteps,
}: {
  selected: NewsMode | null;
  onSelect: (mode: NewsMode) => void;
  onBack: () => void;
  onNext: () => void;
  totalSteps: number;
}) {
  return (
    <div className="flex flex-col min-h-dvh bg-warm-white">
      <div className="flex-1 flex flex-col justify-center px-page max-w-lg mx-auto w-full">
        <OnboardingHeader />
        <h2 className="text-2xl sm:text-3xl font-semibold tracking-tight text-navy mb-1.5 mt-4">
          How do you want your news?
        </h2>
        <p className="text-text-secondary text-sm sm:text-base mb-8">
          Choose how you'd like to experience stories.
        </p>

        <div className="flex flex-col gap-3">
          {NEWS_MODE_OPTIONS.map((opt) => {
            const isSelected = selected === opt.value;
            return (
              <button
                key={opt.value}
                onClick={() => onSelect(opt.value)}
                className={`w-full text-left rounded-2xl border-2 px-5 py-4 transition-all duration-200 cursor-pointer ${
                  isSelected
                    ? "border-navy bg-navy text-warm-white shadow-lg scale-[1.02]"
                    : "border-border bg-white hover:border-navy/30 hover:shadow-md"
                }`}
              >
                <div className="flex items-center gap-3">
                  <span className="text-2xl">{opt.icon}</span>
                  <div>
                    <span
                      className={`text-base sm:text-lg font-semibold block ${
                        isSelected ? "text-warm-white" : "text-navy"
                      }`}
                    >
                      {opt.label}
                    </span>
                    <span
                      className={`text-sm mt-0.5 block ${
                        isSelected ? "text-warm-white/70" : "text-text-secondary"
                      }`}
                    >
                      {opt.description}
                    </span>
                  </div>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      <BottomBar
        stepIndex={2}
        totalSteps={totalSteps}
        canAdvance={!!selected}
        onBack={onBack}
        onNext={onNext}
        nextLabel={selected === "read" ? "Get Started" : "Next"}
      />
    </div>
  );
}

/* ── Screen 4 ── */

function PickYourVoice({
  selected,
  onSelect,
  onBack,
  onFinish,
  totalSteps,
}: {
  selected: VoiceId | null;
  onSelect: (voice: VoiceId) => void;
  onBack: () => void;
  onFinish: () => void;
  totalSteps: number;
}) {
  return (
    <div className="flex flex-col min-h-dvh bg-warm-white">
      <div className="flex-1 flex flex-col px-page max-w-lg mx-auto w-full pt-10">
        <OnboardingHeader />
        <h2 className="text-2xl sm:text-3xl font-semibold tracking-tight text-navy mb-1.5 mt-4">
          Pick your voice
        </h2>
        <p className="text-text-secondary text-sm sm:text-base mb-6">
          Choose who reads the news to you.
        </p>

        <div className="flex flex-col gap-3">
          {VOICE_OPTIONS.map((voice) => {
            const isSelected = selected === voice.value;
            return (
              <button
                key={voice.value}
                onClick={() => onSelect(voice.value)}
                className={`w-full text-left rounded-2xl border-2 px-5 py-4 transition-all duration-200 cursor-pointer ${
                  isSelected
                    ? "border-navy bg-navy text-warm-white shadow-lg scale-[1.02]"
                    : "border-border bg-white hover:border-navy/30 hover:shadow-md"
                }`}
              >
                <div className="flex items-center justify-between">
                  <div className="min-w-0 flex-1">
                    <span
                      className={`text-base sm:text-lg font-semibold block ${
                        isSelected ? "text-warm-white" : "text-navy"
                      }`}
                    >
                      {voice.name}
                    </span>
                    <span
                      className={`text-xs sm:text-sm mt-0.5 block ${
                        isSelected ? "text-warm-white/70" : "text-text-secondary"
                      }`}
                    >
                      {voice.description}
                    </span>
                  </div>
                  <span
                    className={`text-xs font-medium px-3 py-1.5 rounded-full shrink-0 ml-3 ${
                      isSelected
                        ? "bg-warm-white/20 text-warm-white"
                        : "bg-warm-gray text-text-secondary"
                    }`}
                  >
                    Preview
                  </span>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      <BottomBar
        stepIndex={3}
        totalSteps={totalSteps}
        canAdvance={!!selected}
        onBack={onBack}
        onNext={onFinish}
        nextLabel="Get Started"
      />
    </div>
  );
}

/* ── Orchestrator ── */

export default function Onboarding() {
  const navigate = useNavigate();
  const [step, setStep] = useState(0);
  const [readerLevel, setReaderLevel] = useState<ReaderLevel | null>(null);
  const [selectedTopics, setSelectedTopics] = useState<Set<string>>(new Set());
  const [newsMode, setNewsMode] = useState<NewsMode | null>(null);
  const [voice, setVoice] = useState<VoiceId | null>(null);

  // Redirect if already onboarded
  if (hasCompletedOnboarding()) {
    return <Navigate to="/home" replace />;
  }

  const totalSteps = getTotalSteps(newsMode);

  function toggleTopic(topic: string) {
    setSelectedTopics((prev) => {
      const next = new Set(prev);
      if (next.has(topic)) {
        next.delete(topic);
      } else {
        next.add(topic);
      }
      return next;
    });
  }

  function selectAllTopics() {
    setSelectedTopics((prev) => {
      if (prev.size === TOPICS.length) {
        return new Set();
      }
      return new Set(TOPICS.map((t) => t.label));
    });
  }

  function handleFinish() {
    savePreferences({
      readerLevel: readerLevel!,
      topics: [...selectedTopics],
      newsMode: newsMode!,
      voice: voice,
    });
    navigate("/home", { replace: true });
  }

  function handleNewsModeNext() {
    if (newsMode === "read") {
      handleFinish();
    } else {
      setStep(3);
    }
  }

  let screen: React.ReactNode;

  if (step === 0) {
    screen = (
      <WhoAreYou
        selected={readerLevel}
        onSelect={setReaderLevel}
        onNext={() => setStep(1)}
        totalSteps={totalSteps}
      />
    );
  } else if (step === 1) {
    screen = (
      <WhatDoYouCareAbout
        selected={selectedTopics}
        onToggle={toggleTopic}
        onSelectAll={selectAllTopics}
        onBack={() => setStep(0)}
        onNext={() => setStep(2)}
        totalSteps={totalSteps}
      />
    );
  } else if (step === 2) {
    screen = (
      <HowDoYouWantNews
        selected={newsMode}
        onSelect={setNewsMode}
        onBack={() => setStep(1)}
        onNext={handleNewsModeNext}
        totalSteps={totalSteps}
      />
    );
  } else {
    screen = (
      <PickYourVoice
        selected={voice}
        onSelect={setVoice}
        onBack={() => setStep(2)}
        onFinish={handleFinish}
        totalSteps={totalSteps}
      />
    );
  }

  return <FadeSlide stepKey={step}>{screen}</FadeSlide>;
}
