import { create } from "zustand";

/**
 * User-facing display, accessibility, and audio preferences.
 * Persisted to localStorage and applied as data-* attributes on <html>,
 * which the CSS in styles/index.css reads to flip theme / a11y modes.
 */
export type Theme = "dark" | "light";
export type Motion = "full" | "reduced";
export type Contrast = "normal" | "high";
export type TextSize = "normal" | "large" | "xlarge";
export type FontPref = "default" | "dyslexic";

export interface Settings {
  theme: Theme;
  motion: Motion;
  contrast: Contrast;
  textSize: TextSize;
  font: FontPref;
  /** Sound-effect volume (0–1). */
  sfxVolume: number;
  /** Background-music volume (0–1). */
  musicVolume: number;
  /** Master mute — silences both SFX and music. */
  muted: boolean;
}

const STORAGE_KEY = "mn.settings.v1";

const DEFAULTS: Settings = {
  theme: "dark",
  motion: "full",
  contrast: "normal",
  textSize: "normal",
  font: "default",
  sfxVolume: 0.7,
  musicVolume: 0.4,
  muted: false,
};

function load(): Settings {
  if (typeof window === "undefined") return DEFAULTS;
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) {
      // First visit: honour the OS reduce-motion preference.
      const prefersReduced = window.matchMedia?.(
        "(prefers-reduced-motion: reduce)"
      ).matches;
      return { ...DEFAULTS, motion: prefersReduced ? "reduced" : "full" };
    }
    return { ...DEFAULTS, ...(JSON.parse(raw) as Partial<Settings>) };
  } catch {
    return DEFAULTS;
  }
}

/** Reflect the active settings onto <html> so the CSS theme/a11y rules apply. */
export function applySettings(s: Settings): void {
  if (typeof document === "undefined") return;
  const el = document.documentElement;
  el.dataset.theme = s.theme;
  if (s.motion === "reduced") el.dataset.motion = "reduced";
  else delete el.dataset.motion;
  if (s.contrast === "high") el.dataset.contrast = "high";
  else delete el.dataset.contrast;
  if (s.textSize !== "normal") el.dataset.text = s.textSize;
  else delete el.dataset.text;
  if (s.font === "dyslexic") el.dataset.font = "dyslexic";
  else delete el.dataset.font;
  // Keep the mobile browser chrome colour in sync with the theme.
  const meta = document.querySelector('meta[name="theme-color"]');
  if (meta) meta.setAttribute("content", s.theme === "light" ? "#F7F8FB" : "#06070B");
}

interface SettingsState extends Settings {
  set: <K extends keyof Settings>(key: K, value: Settings[K]) => void;
  reset: () => void;
  /** Effective playback volume for a channel, accounting for mute. */
  effectiveVolume: (channel: "sfx" | "music") => number;
}

export const useSettings = create<SettingsState>((set, get) => {
  const initial = load();
  applySettings(initial);

  const persist = (s: Settings) => {
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(s));
    } catch {
      /* storage unavailable — non-fatal */
    }
  };

  return {
    ...initial,

    set: (key, value) => {
      set({ [key]: value } as Pick<SettingsState, typeof key>);
      const s = get();
      const snapshot: Settings = {
        theme: s.theme,
        motion: s.motion,
        contrast: s.contrast,
        textSize: s.textSize,
        font: s.font,
        sfxVolume: s.sfxVolume,
        musicVolume: s.musicVolume,
        muted: s.muted,
      };
      applySettings(snapshot);
      persist(snapshot);
    },

    reset: () => {
      set({ ...DEFAULTS });
      applySettings(DEFAULTS);
      persist(DEFAULTS);
    },

    effectiveVolume: (channel) => {
      const s = get();
      if (s.muted) return 0;
      return channel === "sfx" ? s.sfxVolume : s.musicVolume;
    },
  };
});
