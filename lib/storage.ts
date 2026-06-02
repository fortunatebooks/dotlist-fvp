import type { FvpState } from "@/lib/types";
import { createEmptyState, normalizeState } from "@/lib/fvp";

const LOCAL_KEY = "fvp.state.v1";

export function loadLocalState(): FvpState {
  if (typeof window === "undefined") return createEmptyState();

  const raw = window.localStorage.getItem(LOCAL_KEY);
  if (!raw) return createEmptyState();

  try {
    return normalizeState(JSON.parse(raw));
  } catch {
    return createEmptyState();
  }
}

export function saveLocalState(state: FvpState) {
  if (typeof window === "undefined") return;
  window.localStorage.setItem(LOCAL_KEY, JSON.stringify(state));
}
