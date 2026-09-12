import type { GovernanceEnvelope } from "./envelope";
import type { CognitiveState } from "./states";

export type VeilIntake = {
  accepted: boolean;
  state: CognitiveState;
  source_branch: string;
  reason: string;
  next_actor: "vara" | "stumpy" | "human";
};

export const veil = {
  intake(envelope: GovernanceEnvelope, branch: string): VeilIntake {
    if (branch === envelope.constraints.canonical_branch) {
      return {
        accepted: false,
        state: "CONFLICT",
        source_branch: branch,
        reason: "Veil blocks intake from the canonical branch before interpretation or execution.",
        next_actor: "stumpy",
      };
    }
    if (!envelope.constraints.allowed_branches.includes(branch)) {
      return {
        accepted: false,
        state: "RECOURSE",
        source_branch: branch,
        reason: "Source branch is outside the authorized model-branch boundary.",
        next_actor: "human",
      };
    }
    return {
      accepted: true,
      state: "COHERENT",
      source_branch: branch,
      reason: "Mutation entered the liminal boundary without crossing canonical authority.",
      next_actor: "vara",
    };
  },
};
