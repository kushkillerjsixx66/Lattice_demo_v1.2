import type { GovernanceEnvelope } from "./envelope";
import type { CognitiveState } from "./states";

export type VaraInterpretation = {
  state: CognitiveState;
  confidence: "sufficient" | "insufficient";
  observations: string[];
  reason: string;
};

export const vara = {
  interpret(envelope: GovernanceEnvelope, intent: string, scenario: "clean" | "boundary" | "disagreement"): VaraInterpretation {
    if (scenario === "disagreement") {
      return {
        state: "UNCERTAIN",
        confidence: "insufficient",
        observations: ["Intent is structurally valid but its mutation context is not sufficiently established."],
        reason: "Vara preserves uncertainty instead of converting missing evidence into certainty.",
      };
    }
    return {
      state: "COHERENT",
      confidence: "sufficient",
      observations: [
        `Intent received: ${intent}`,
        `Sigil posture observed: ${envelope.sigil.posture}`,
        "Source remains outside the canonical branch.",
      ],
      reason: "Epistemic scan found no scenario-specific uncertainty requiring recourse.",
    };
  },
};
