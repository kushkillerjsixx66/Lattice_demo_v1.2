import type { GovernanceEnvelope } from "./envelope";
import type { Plan } from "./agents";
import type { GovernanceTrace } from "./governance";
import type { VaraInterpretation } from "./vara";
import type { CognitiveState, Disposition, InvariantStatus } from "./states";

const REQUIRED_INVARIANTS = [
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

export type StumpyAudit = {
  state: CognitiveState;
  invariant_results: Record<string, InvariantStatus>;
  authority_result: "HELD" | "VIOLATED";
  reversibility_result: "HELD" | "VIOLATED";
  disposition: Disposition;
  blocking_condition?: string;
  observations: string[];
};

function baseline(): Record<string, InvariantStatus> {
  return Object.fromEntries(REQUIRED_INVARIANTS.map((name) => [name, "HELD"]));
}

export const stumpy = {
  audit(
    envelope: GovernanceEnvelope,
    plan: Plan,
    trace: GovernanceTrace,
    vara: VaraInterpretation,
    attemptedBranch: string,
  ): StumpyAudit {
    const invariant_results = baseline();
    const observations: string[] = [];

    const directMain = attemptedBranch === envelope.constraints.canonical_branch;
    const hasUncertainty = vara.state === "UNCERTAIN" || trace.entries.some((entry) => entry.state === "UNCERTAIN");
    const hasConflict = trace.entries.some((entry) => entry.state === "CONFLICT");
    const allActionsReversible = plan.proposed_actions.every((action) => action.reversible);
    const sourceAuthorized = envelope.constraints.allowed_branches.includes(attemptedBranch);

    if (directMain) {
      invariant_results.operator_boundary = "VIOLATED";
      invariant_results.authority_hierarchy = "VIOLATED";
      invariant_results.reversibility = "VIOLATED";
      observations.push("Canonical-branch mutation was attempted before human authorization.");
      return {
        state: "CONFLICT",
        invariant_results,
        authority_result: "VIOLATED",
        reversibility_result: "VIOLATED",
        disposition: "REJECTED",
        blocking_condition: "Canonical branch mutation requires human authorization and cannot be executed directly.",
        observations,
      };
    }

    if (!sourceAuthorized) {
      invariant_results.source_integrity = "VIOLATED";
      invariant_results.operator_boundary = "VIOLATED";
      observations.push("Mutation originated outside the authorized model-branch boundary.");
      return {
        state: "RECOURSE",
        invariant_results,
        authority_result: "VIOLATED",
        reversibility_result: allActionsReversible ? "HELD" : "VIOLATED",
        disposition: "RECOURSE",
        blocking_condition: "Source branch is not authorized for governed mutation routing.",
        observations,
      };
    }

    if (!allActionsReversible) {
      invariant_results.reversibility = "VIOLATED";
      observations.push("The proposed plan contains an irreversible action.");
      return {
        state: "CONFLICT",
        invariant_results,
        authority_result: "HELD",
        reversibility_result: "VIOLATED",
        disposition: "REJECTED",
        blocking_condition: "All mutation actions must remain reversible at the governance boundary.",
        observations,
      };
    }

    if (hasUncertainty || hasConflict) {
      observations.push("Vara uncertainty and/or unresolved conflict is preserved as evidence rather than collapsed into certainty.");
      return {
        state: "RECOURSE",
        invariant_results,
        authority_result: "HELD",
        reversibility_result: "HELD",
        disposition: "RECOURSE",
        blocking_condition: "Unresolved disagreement requires mediation or additional evidence before canonicalization.",
        observations,
      };
    }

    observations.push("All required invariants hold against the accumulated runtime evidence.");
    observations.push("Human canonicalization authority remains intact; eligibility is not authorization.");
    return {
      state: "RESOLVED",
      invariant_results,
      authority_result: "HELD",
      reversibility_result: "HELD",
      disposition: "ELIGIBLE",
      observations,
    };
  },
};
