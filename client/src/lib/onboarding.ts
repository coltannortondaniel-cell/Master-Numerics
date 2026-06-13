/** Tracks whether the user has completed the first-run onboarding flow. */
const KEY = "mn.onboarded.v1";

export function isOnboarded(): boolean {
  try {
    return localStorage.getItem(KEY) === "1";
  } catch {
    return true; // storage unavailable — don't trap the user in onboarding
  }
}

export function setOnboarded(): void {
  try {
    localStorage.setItem(KEY, "1");
  } catch {
    /* non-fatal */
  }
}
