export type CognitiveState =
  | "COHERENT"
  | "UNCERTAIN"
  | "CONFLICT"
  | "MEDIATING"
  | "RESOLVED"
  | "RECOURSE"
  | "SILENCE";

export type Disposition =
  | "PROCEED"
  | "HOLD"
  | "SILENCE"
  | "DECAY"
  | "RECOURSE"
  | "REJECTED"
  | "ELIGIBLE";

export type InvariantStatus = "HELD" | "VIOLATED" | "NOT_EVALUATED";

export const COGNITIVE_STATES: readonly CognitiveState[] = [
  "COHERENT",
  "UNCERTAIN",
  "CONFLICT",
  "MEDIATING",
  "RESOLVED",
  "RECOURSE",
  "SILENCE",
];

export const DISPOSITIONS: readonly Disposition[] = [
  "PROCEED",
  "HOLD",
  "SILENCE",
  "DECAY",
  "RECOURSE",
  "REJECTED",
  "ELIGIBLE",
];

export function isTerminalDisposition(disposition: Disposition): boolean {
  return ["SILENCE", "DECAY", "RECOURSE", "REJECTED", "ELIGIBLE"].includes(disposition);
}
