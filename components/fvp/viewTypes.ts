import type { useFvpController } from "@/components/fvp/useFvpController";

export type FvpController = ReturnType<typeof useFvpController>;

export function formatShortDate(value: string) {
  return new Intl.DateTimeFormat(undefined, {
    month: "short",
    day: "numeric",
    hour: "numeric",
    minute: "2-digit",
  }).format(new Date(value));
}

export function getOutcomeLabel(outcome?: string, startedWithOverride = false) {
  const prefix = startedWithOverride ? "started from the list, " : "";
  if (outcome === "readded") return `${prefix}put back at the end`;
  if (outcome === "stopped") return `${prefix}stopped for now`;
  return `${prefix}done`;
}
