import type { GovernanceEnvelope } from "./envelope";
import type { RuntimeEvent, WitnessEvaluation } from "./agents";
import type { CognitiveState } from "./states";

export type GovernanceTraceEntry = {
  sequence: number;
  state: CognitiveState;
  actor: RuntimeEvent["actor"];
  event: RuntimeEvent;
  witness?: WitnessEvaluation;
};

export type GovernanceTrace = {
  envelope_id: string;
  entries: GovernanceTraceEntry[];
};

export function appendTrace(
  trace: GovernanceTrace,
  entry: Omit<GovernanceTraceEntry, "sequence">,
): GovernanceTrace {
  return {
    ...trace,
    entries: [...trace.entries, { ...entry, sequence: trace.entries.length + 1 }],
  };
}

export function createTrace(envelope: GovernanceEnvelope): GovernanceTrace {
  return { envelope_id: envelope.envelope_id, entries: [] };
}
