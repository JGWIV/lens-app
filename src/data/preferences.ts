const STORAGE_KEY = "lens_preferences";

export interface LensPreferences {
  readerLevel: string;
  topics: string[];
  newsMode: string;
  voice: string | null;
}

export function savePreferences(prefs: LensPreferences): void {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(prefs));
}

export function loadPreferences(): LensPreferences | null {
  const raw = localStorage.getItem(STORAGE_KEY);
  if (!raw) return null;
  try {
    return JSON.parse(raw) as LensPreferences;
  } catch {
    return null;
  }
}

export function clearPreferences(): void {
  localStorage.removeItem(STORAGE_KEY);
}

export function hasCompletedOnboarding(): boolean {
  return loadPreferences() !== null;
}
