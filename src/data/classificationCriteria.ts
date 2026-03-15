/**
 * Content age-gating classification criteria (Project Bible §Content-Age-Gating).
 *
 * This is the canonical, structured representation of the rules used to assign
 * the `ageGate` value on every Story. The same rules are documented as a
 * JSDoc comment on the Story.ageGate field in src/data/stories.ts.
 */

/* ── Types ── */

export type AgeGateTier = "all" | "teen" | "adult";

export interface ClassificationTest {
  id: string;
  name: string;
  question: string;
}

export interface TierCriteria {
  tier: AgeGateTier;
  label: string;
  minAge: number;
  description: string;
  /** Content categories that automatically trigger this tier. */
  autoTriggers: string[];
}

export interface ConflictException {
  description: string;
  /** All tests must pass for a war/conflict story to qualify as "all". */
  tests: ClassificationTest[];
  /** Tier assigned when any test fails or is uncertain. */
  failDefault: AgeGateTier;
}

/* ── Tier Definitions ── */

export const TIER_ALL: TierCriteria = {
  tier: "all",
  label: "ALL AGES",
  minAge: 7,
  description:
    "Safe for Young Readers. Content is factual, age-appropriate, and free of graphic or distressing material.",
  autoTriggers: [],
};

export const TIER_TEEN: TierCriteria = {
  tier: "teen",
  label: "TEEN AND ABOVE",
  minAge: 11,
  description:
    "Contains content unsuitable for young children. May include moderate references to violence, complex mature themes, or emotionally intense material.",
  autoTriggers: [
    "Non-graphic references to war casualties or armed conflict that fail the conflict exception tests",
    "Drug policy and substance abuse",
    "Crimes described in moderate detail",
    "Content involving emotionally distressing themes (e.g., famine, displacement) presented with emphasis on human suffering",
  ],
};

export const TIER_ADULT: TierCriteria = {
  tier: "adult",
  label: "ADULT ONLY",
  minAge: 18,
  description:
    "Contains material that must never be shown to any minor. Reserved for the most sensitive content categories.",
  autoTriggers: [
    "Graphic violence details",
    "Sexual content",
    "Exploitation",
    "Suicide or self-harm",
    "Torture",
  ],
};

export const TIERS = [TIER_ALL, TIER_TEEN, TIER_ADULT] as const;

/* ── War & Armed Conflict Exception ── */

export const CONFLICT_EXCEPTION: ConflictException = {
  description:
    "A war or armed conflict story may be classified ALL AGES instead of TEEN AND ABOVE if — and only if — it passes every one of the following tests.",
  tests: [
    {
      id: "focus",
      name: "FOCUS TEST",
      question:
        "Does the Young Reader version focus on what is happening, why, and consequences for daily life — without centering on casualties, suffering, or the mechanics of violence?",
    },
    {
      id: "casualties-as-context",
      name: "CASUALTIES AS CONTEXT TEST",
      question:
        "If casualty numbers appear, do they appear once as factual context only — not repeated, emphasized, or used as the emotional hook?",
    },
    {
      id: "no-graphic-content",
      name: "NO GRAPHIC CONTENT TEST",
      question:
        "Is the story free of physical descriptions of injuries, death, destruction of human life, or suffering — with events described by strategic and political significance only?",
    },
    {
      id: "classroom",
      name: "CLASSROOM TEST",
      question:
        "Would a responsible elementary school teacher be comfortable discussing this story with a class of 8-year-olds?",
    },
  ],
  failDefault: "teen",
};
