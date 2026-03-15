export interface TapToDefine {
  word: string;
  definition: string;
}

export interface Perspective {
  perspective: string;
  content: string;
}

export interface ReadingLevel {
  whatHappened: string;
  whyItMatters: string;
  whatPeopleThink: Perspective[];
  whatWeDontKnow: string;
  tapToDefine: TapToDefine[];
}

export interface Source {
  name: string;
  type: string;
}

export interface AudioVoices {
  anchor: string;
  narrator: string;
  bigSister: string;
  mrsM: string;
  coach: string;
}

export interface Story {
  id: string;
  headline: string;
  summary: string;
  topic: string;
  topicIcon: string;
  confidenceBadge: "green" | "yellow";
  publishedAt: string;

  /**
   * Content age-gating classification (Project Bible §Content-Age-Gating).
   *
   * "all"   — ALL AGES. Safe for Young Readers (ages 7-10).
   * "teen"  — TEEN AND ABOVE (11+). Contains content unsuitable for young children.
   * "adult" — ADULT ONLY (18+). Graphic violence details, sexual content,
   *           exploitation, suicide/self-harm, or torture. Never shown to minors.
   *
   * ── War & Armed Conflict Exception ──
   * A war or conflict story may be classified "all" if it passes ALL FOUR tests:
   *
   *   1. FOCUS TEST — The Young Reader version focuses on what is happening, why,
   *      and consequences for daily life. It does not center on casualties,
   *      suffering, or the mechanics of violence.
   *
   *   2. CASUALTIES AS CONTEXT TEST — If casualty numbers appear, they appear once
   *      as factual context only — not repeated, emphasized, or used as the
   *      emotional hook.
   *
   *   3. NO GRAPHIC CONTENT TEST — No physical descriptions of injuries, death,
   *      destruction of human life, or suffering. Events described by strategic
   *      and political significance only.
   *
   *   4. CLASSROOM TEST — A responsible elementary school teacher would be
   *      comfortable discussing this story with a class of 8-year-olds.
   *
   * If ANY test fails or is uncertain → "teen" (conservative default).
   */
  ageGate: "all" | "teen" | "adult";
  readingLevels: {
    young: ReadingLevel;
    teen: ReadingLevel;
    adult: ReadingLevel;
  };
  sources: {
    confirming: Source[];
    methodology: string;
  };
  goDeeper: { label: string; url: string }[];
  audio: {
    young: AudioVoices;
    teen: AudioVoices;
    adult: AudioVoices;
  };
}

export const stories: Story[] = [];
