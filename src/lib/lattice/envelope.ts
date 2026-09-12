import type { CognitiveState } from "./states";

export type GovernanceEnvelope = {
  envelope_id: string;
  schema_version: string;
  intent: string;
  operator: {
    id: string;
    role: string;
  };
  authority: {
    canonicalization: "human";
  };
  capabilities: {
    allowed: string[];
    denied: string[];
  };
  constraints: {
    max_tool_calls: number;
    allowed_branches: string[];
    canonical_branch: string;
  };
  invariants: string[];
  sigil: {
    id: string;
    posture: string;
  };
  state: CognitiveState;
};

export function createGovernanceEnvelope(intent: string): GovernanceEnvelope {
  return {
    envelope_id: `GE-${Date.now()}`,
    schema_version: "0.1",
    intent,
    operator: { id: "human-operator", role: "canonicalization-authority" },
    authority: { canonicalization: "human" },
    capabilities: {
      allowed: ["read_vault", "propose_change", "open_pr"],
      denied: ["merge_main", "direct_main_mutation", "authorize_canonicalization"],
    },
    constraints: {
      max_tool_calls: 8,
      allowed_branches: ["chatgpt", "claude", "grok", "gemini", "copilot"],
      canonical_branch: "main",
    },
    invariants: [
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
    ],
    sigil: { id: "SIGIL-Ω-KERN-2026.08", posture: "MIDLINE" },
    state: "COHERENT",
  };
}
