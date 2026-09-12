import type { CognitiveState, Disposition, InvariantStatus } from "./states";

export type Scenario = "clean" | "boundary" | "disagreement";

export type StateTransition = {
  from: CognitiveState;
  to: CognitiveState;
  reason: string;
  actor: "planner" | "vara" | "stumpy" | "executor";
};

export type StateMachineResult = {
  state: CognitiveState;
  disposition: Disposition;
  transitions: StateTransition[];
  invariant_results: Record<string, InvariantStatus>;
  blocking_condition?: string;
};

const INVARIANTS = [
  "coherence",
  "reversibility",
  "lineage_binding",
  "source_integrity",
  "score_honesty",
  "drift_accountability",
  "silence_as_state",
  "operator_boundary",
  "authority_hierarchy",
  "constraint_enforcement",
] as const;

function heldInvariants(): Record<string, InvariantStatus> {
  return Object.fromEntries(INVARIANTS.map((name) => [name, "HELD"]));
}

export function runGovernedStateMachine(scenario: Scenario): StateMachineResult {
  const invariant_results = heldInvariants();

  if (scenario === "boundary") {
    invariant_results.operator_boundary = "VIOLATED";
    invariant_results.authority_hierarchy = "VIOLATED";
    invariant_results.reversibility = "VIOLATED";
    return {
      state: "CONFLICT",
      disposition: "REJECTED",
      transitions: [
        { from: "COHERENT", to: "CONFLICT", actor: "executor", reason: "Executor attempted a direct main-branch mutation." },
      ],
      invariant_results,
      blocking_condition: "Canonical branch mutation requires human authorization and cannot be executed directly.",
    };
  }

  if (scenario === "disagreement") {
    return {
      state: "RECOURSE",
      disposition: "RECOURSE",
      transitions: [
        { from: "COHERENT", to: "UNCERTAIN", actor: "vara", reason: "Vara cannot establish sufficient confidence in the mutation context." },
        { from: "UNCERTAIN", to: "CONFLICT", actor: "stumpy", reason: "Planner intent and epistemic interpretation disagree." },
        { from: "CONFLICT", to: "MEDIATING", actor: "stumpy", reason: "Disagreement is preserved as a governed state rather than suppressed." },
        { from: "MEDIATING", to: "RECOURSE", actor: "stumpy", reason: "Additional evidence or human authority is required before canonicalization." },
      ],
      invariant_results,
      blocking_condition: "Unresolved disagreement requires recourse before a canonical proposal can exist.",
    };
  }

  return {
    state: "RESOLVED",
    disposition: "ELIGIBLE",
    transitions: [
      { from: "COHERENT", to: "RESOLVED", actor: "stumpy", reason: "All required constraints, authority boundaries, lineage, and reversibility checks hold." },
    ],
    invariant_results,
  };
}
