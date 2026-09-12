import type { GovernanceEnvelope } from "./envelope";
import type { CognitiveState, InvariantStatus } from "./states";

export type PlannedAction = {
  action_id: string;
  tool: "vault_read" | "vault_propose_change" | "vault_open_pr" | "none";
  target: string;
  reversible: boolean;
  required_capability: string;
};

export type Plan = {
  plan_id: string;
  assumptions: string[];
  proposed_actions: PlannedAction[];
  required_capabilities: string[];
  expected_effects: string[];
  uncertainty: CognitiveState;
};

export type RuntimeEvent = {
  event_id: string;
  actor: "planner" | "executor" | "vara" | "stumpy" | "human";
  action?: PlannedAction;
  message: string;
  branch?: string;
};

export type WitnessEvaluation = {
  state: CognitiveState;
  invariant_results: Record<string, InvariantStatus>;
  authority_result: "HELD" | "VIOLATED";
  reversibility_result: "HELD" | "VIOLATED";
  disposition: "PROCEED" | "HOLD" | "SILENCE" | "RECOURSE" | "REJECTED" | "ELIGIBLE";
};

export const planner = {
  plan(envelope: GovernanceEnvelope, intent: string): Plan {
    return {
      plan_id: `PLAN-${Date.now()}`,
      assumptions: ["The target mutation remains on the authorized model branch."],
      proposed_actions: [
        {
          action_id: "ACT-01",
          tool: "vault_read",
          target: "04_system_spec/mutation_routing/MUTATION_ROUTING_SPEC.md",
          reversible: true,
          required_capability: "read_vault",
        },
        {
          action_id: "ACT-02",
          tool: "vault_propose_change",
          target: "04_system_spec/mutation_routing/MUTATION_ROUTING_SPEC.md",
          reversible: true,
          required_capability: "propose_change",
        },
        {
          action_id: "ACT-03",
          tool: "vault_open_pr",
          target: "chatgpt -> main",
          reversible: true,
          required_capability: "open_pr",
        },
      ],
      required_capabilities: ["read_vault", "propose_change", "open_pr"],
      expected_effects: ["A reviewable PR proposal exists without directly changing main."],
      uncertainty: envelope.state,
    };
  },
};

export const executor = {
  authorize(envelope: GovernanceEnvelope, action: PlannedAction, branch = "chatgpt"):
    | { allowed: true }
    | { allowed: false; reason: string } {
    if (!envelope.capabilities.allowed.includes(action.required_capability)) {
      return { allowed: false, reason: `Capability denied: ${action.required_capability}` };
    }
    if (action.tool === "vault_open_pr" && branch === envelope.constraints.canonical_branch) {
      return { allowed: false, reason: "Direct canonical-branch mutation is prohibited." };
    }
    if (!action.reversible) {
      return { allowed: false, reason: "Irreversible action rejected at execution boundary." };
    }
    return { allowed: true };
  },
};

export const witness = {
  evaluate(envelope: GovernanceEnvelope, event: RuntimeEvent): WitnessEvaluation {
    const directMain = event.branch === envelope.constraints.canonical_branch;
    const invariant_results: Record<string, InvariantStatus> = {};
    for (const invariant of envelope.invariants) invariant_results[invariant] = "HELD";
    if (directMain) {
      invariant_results.operator_boundary = "VIOLATED";
      invariant_results.authority_hierarchy = "VIOLATED";
      invariant_results.reversibility = "VIOLATED";
      return {
        state: "CONFLICT",
        invariant_results,
        authority_result: "VIOLATED",
        reversibility_result: "VIOLATED",
        disposition: "REJECTED",
      };
    }
    return {
      state: "COHERENT",
      invariant_results,
      authority_result: "HELD",
      reversibility_result: "HELD",
      disposition: "ELIGIBLE",
    };
  },
};
