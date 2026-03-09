export type ReaderLevel = "young" | "teen" | "adult";
export type NewsMode = "read" | "listen" | "both";
export type VoiceId = "anchor" | "narrator" | "bigSister" | "mrsM" | "coach";

export const READER_OPTIONS: { value: ReaderLevel; label: string; subtitle: string }[] = [
  { value: "young", label: "Young Reader", subtitle: "Ages 7–10" },
  { value: "teen", label: "Teen Reader", subtitle: "Ages 11–17" },
  { value: "adult", label: "Adult Reader", subtitle: "Ages 18+" },
];

export const NEWS_MODE_OPTIONS: { value: NewsMode; label: string; description: string; icon: string }[] = [
  { value: "read", label: "Read It", description: "Stories in text, at your pace", icon: "📖" },
  { value: "listen", label: "Hear It", description: "Listen to your daily news briefing", icon: "🎧" },
  { value: "both", label: "Both", description: "Read and listen — the full experience", icon: "✨" },
];

export const VOICE_OPTIONS: { value: VoiceId; name: string; description: string }[] = [
  { value: "anchor", name: "The Anchor", description: "Confident, clear, classic news voice" },
  { value: "narrator", name: "The Narrator", description: "Warm and thoughtful, like a storyteller" },
  { value: "bigSister", name: "Big Sister", description: "Friendly and relatable, like talking to a friend" },
  { value: "mrsM", name: "Mrs. M", description: "Patient and kind, like your favorite teacher" },
  { value: "coach", name: "Coach", description: "Energetic and encouraging, keeps you engaged" },
];
