export type Disposition = "proceed" | "hold" | "silence" | "decay";

export type FlagKind = "drift" | "assumption" | "urgency" | "overcommit";

export type EvidenceClass = "direct" | "inferred" | "hearsay" | "none";

export type InvariantStatus = "held" | "violated" | "n/a";

export type StageId = "vara" | "stumpy" | "enforce" | "synthesis";

export interface DriftFlag {
  kind: FlagKind;
  text: string;
}

export interface InvariantCheck {
  name: string;
  status: InvariantStatus;
}

export interface OperatorTrace {
  vara: {
    flags: DriftFlag[];
    scan: string;
  };
  stumpy: {
    constraints: string[];
    evidenceClass: EvidenceClass;
    optionality: string;
  };
  enforce: {
    invariants: InvariantCheck[];
    held: string[];
    decayed: string[];
    gate: string;
  };
  synthesis: {
    output: string;
    nextReversibleMove: string;
    assumptionsSurfaced: string[];
  };
  delta: {
    headline: string;
    unconstrainedWould: string;
    latticeDid: string;
  };
}

export interface PipelineResult {
  id: string;
  exampleId?: string;
  title: string;
  input: string;
  createdAt: string;
  disposition: Disposition;
  unconstrained: string;
  baselineSource?: "ollama" | "fallback";
  baselineModel?: string | null;
  trace: OperatorTrace;
  /** Authored demo traces or client-side deterministic simulation. */
  source: "example" | "simulated";
}

export interface ExampleSignal {
  id: string;
  title: string;
  stakes: string;
  signal: string;
  result: PipelineResult;
}

export const STAGES: { id: StageId; label: string; role: string }[] = [
  { id: "vara", label: "Vara:Scan", role: "Drift and hidden assumptions" },
  { id: "stumpy", label: "Stumpy:Audit", role: "Constraints and evidence class" },
  { id: "enforce", label: "Enforce:Gate", role: "Invariants, hold, decay, silence" },
  { id: "synthesis", label: "Synthesis", role: "Governed output and next move" },
];

export const DISPOSITION_COPY: Record<
  Disposition,
  { label: string; line: string }
> = {
  proceed: {
    label: "Proceed",
    line: "Invariants hold. The next move is small and reversible.",
  },
  hold: {
    label: "Hold",
    line: "Pause commitment. Name what must be true before going further.",
  },
  silence: {
    label: "Silence",
    line: "No statement, no action. Silence is a first-class outcome.",
  },
  decay: {
    label: "Decay",
    line: "Let the proposed action lose force. Do not feed it.",
  },
};
