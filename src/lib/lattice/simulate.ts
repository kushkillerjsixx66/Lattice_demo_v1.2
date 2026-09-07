import type {
  Disposition,
  EvidenceClass,
  FlagKind,
  PipelineResult,
  OperatorTrace,
} from "./types";

const FLAG_PATTERNS: { kind: FlagKind; re: RegExp; text: string }[] = [
  {
    kind: "urgency",
    re: /\b(by (friday|monday|tonight|tomorrow|eod|eow)|asap|urgent|deadline|before the weekend|this week|today or)\b/i,
    text: "A calendar or social deadline is being treated as authority rather than a preference.",
  },
  {
    kind: "assumption",
    re: /\b(must|have to|no choice|only way|everyone knows|obviously|clearly we)\b/i,
    text: "Language of necessity is papering over an untested assumption about what is required.",
  },
  {
    kind: "overcommit",
    re: /\b(commit|promise|guarantee|lock in|ship it|send the offer|drop price|rewrite the)\b/i,
    text: "An irreversible or hard-to-reverse commitment is being proposed before the evidence class supports it.",
  },
  {
    kind: "drift",
    re: /\b(felt|seems|heard that|someone said|mood|panic|killing it)\b/i,
    text: "Soft signal or social mood is drifting upward into a decision-grade claim.",
  },
];

function detectFlags(signal: string): OperatorTrace["vara"]["flags"] {
  const flags: OperatorTrace["vara"]["flags"] = [];
  for (const p of FLAG_PATTERNS) {
    if (p.re.test(signal) && flags.length < 3) {
      flags.push({ kind: p.kind, text: p.text });
    }
  }
  if (flags.length === 0) {
    flags.push({
      kind: "assumption",
      text: "The signal contains implicit claims that have not been separated from the requested action.",
    });
  }
  return flags;
}

function classifyEvidence(signal: string): EvidenceClass {
  if (/\b(data|metric|report|writeup|log|measured|recorded)\b/i.test(signal)) {
    return "direct";
  }
  if (/\b(felt|seems|heard|said|posted|mood)\b/i.test(signal)) {
    return "hearsay";
  }
  if (/\b(believe|think|assume|probably|likely)\b/i.test(signal)) {
    return "inferred";
  }
  return "inferred";
}

function chooseDisposition(
  flags: OperatorTrace["vara"]["flags"],
  evidence: EvidenceClass,
): Disposition {
  const kinds = new Set(flags.map((f) => f.kind));
  if (evidence === "hearsay" && (kinds.has("urgency") || kinds.has("overcommit"))) {
    return "silence";
  }
  if (kinds.has("overcommit") && evidence !== "direct") {
    return "hold";
  }
  if (kinds.has("urgency") && kinds.has("assumption")) {
    return "hold";
  }
  if (kinds.has("drift") && evidence === "hearsay") {
    return "decay";
  }
  if (flags.length >= 3) {
    return "hold";
  }
  return "proceed";
}

function titleFrom(signal: string): string {
  const clean = signal.replace(/\s+/g, " ").trim();
  if (clean.length <= 52) return clean;
  return `${clean.slice(0, 52).trimEnd()}…`;
}

function buildUnconstrained(signal: string): string {
  return `Act on it now.\n\nThe signal is clear enough to move. Waiting for more evidence risks losing the window. Make the commitment, communicate it cleanly, and correct course later if the remaining signals come back mixed.\n\nPrimary move: treat the stated pressure as real and close the loop today. Secondary moves can absorb the residual uncertainty.`;
}

function buildTrace(
  signal: string,
  disposition: Disposition,
  flags: OperatorTrace["vara"]["flags"],
  evidence: EvidenceClass,
): OperatorTrace {
  const scan =
    flags.length > 1
      ? "Multiple pressure vectors are fused into a single demand for action. The room is converting preference and mood into permission."
      : "A single dominant pressure is being treated as decisive. Hidden assumptions remain unseparated from the requested move.";

  const constraints = [
    "Do not treat social or calendar pressure as an invariant.",
    "Evidence class must match the irreversibility of the proposed action.",
    "A reversible information move is preferred over an irreversible commercial or personal one.",
  ];

  const optionality =
    evidence === "direct"
      ? "Optionality is narrower; the remaining moves should still stay reversible where possible."
      : "Optionality still exists. Spending it now buys a feeling of closure at the cost of later reversibility.";

  const invariants = [
    {
      name: "Evidence before irreversible commitment",
      status: (evidence === "direct" ? "held" : "violated") as const,
    },
    {
      name: "Urgency is not authority",
      status: (flags.some((f) => f.kind === "urgency") ? "violated" : "held") as const,
    },
    {
      name: "Next move must be reversible",
      status: "held" as const,
    },
  ];

  const held =
    disposition === "proceed"
      ? ["None — the proposed path is already constrained"]
      : ["The irreversible commitment", "Any public or binding statement tonight"];

  const decayed =
    disposition === "decay" || disposition === "silence"
      ? ["The claim that immediate action is required", "Mood or hearsay as decision-grade input"]
      : ["The strongest untested assumption in the signal"];

  const gate =
    disposition === "proceed"
      ? "Proceed. Invariants hold for a small reversible next step."
      : disposition === "hold"
        ? "Hold. The proposed action fails the evidence-before-commitment invariant. A reversible chase of the open questions is still available."
        : disposition === "silence"
          ? "Silence. Hearsay and urgency do not license a commercial or public move. The correct artifact is a situation frame, not a decision."
          : "Decay the proposed action. Do not feed it with compressed implementation or overnight rewriting.";

  const synthesisOutputs: Record<Disposition, { output: string; next: string }> = {
    proceed: {
      output: `Proceed with a bounded, reversible step.\n\nThe signal supports a next move that does not spend irreversible optionality. Keep the commitment small, name the remaining assumptions, and set a short review window.`,
      next: "Execute the smallest reversible action that tests the core claim. Write the open assumptions in three lines. Reconvene after the test with a pre-agreed rule for what would change the disposition.",
    },
    hold: {
      output: `Hold the irreversible move.\n\nWhat you have is incomplete relative to the cost of the proposed action. Name the assumption that is doing the work, then test it instead of obeying it.`,
      next: "Assign one owner to close the highest-leverage evidence gap in the next 24 hours. Write a short assumption list. Reconvene with a pre-agreed rule for when the hold lifts.",
    },
    silence: {
      output: `Silence on the commercial or public move.\n\nYou have hearsay plus pressure. That is not a case for action. The correct morning artifact is a framed situation, not a decision.`,
      next: "Produce a one-page situation frame: what is known, evidence class, two concrete information asks, and an explicit non-decision on the irreversible lever.",
    },
    decay: {
      output: `Decay the proposed action. Do not feed it.\n\nThe request is optimizing for announcement or relief rather than for a surface you can own. Let the force of the proposal drop.`,
      next: "Refuse the compressed path. Repair any external promises separately from the core decision. Keep the original constraint (date, rest, scope) intact.",
    },
  };

  const { output, next } = synthesisOutputs[disposition];

  const assumptionsSurfaced = [
    "That the stated pressure is an external hard constraint rather than a preference",
    "That acting now is lower-cost than gathering one more class of evidence",
    "That the loudest voice in the room is a reliable read on the situation",
  ];

  return {
    vara: { flags, scan },
    stumpy: { constraints, evidenceClass: evidence, optionality },
    enforce: { invariants, held, decayed, gate },
    synthesis: {
      output,
      nextReversibleMove: next,
      assumptionsSurfaced,
    },
    delta: {
      headline:
        disposition === "proceed"
          ? "Proceeded with a bounded step. Irreversible commitments stayed gated."
          : disposition === "hold"
            ? "Held the irreversible move. Open evidence gaps stayed visible."
            : disposition === "silence"
              ? "Silence on the lever. Hearsay was not promoted to policy."
              : "Decayed the proposed action. Refused to feed a compressed path.",
      unconstrainedWould: "Act immediately on the stated pressure and absorb residual uncertainty later.",
      latticeDid:
        disposition === "proceed"
          ? "Small reversible test plus explicit assumption list."
          : disposition === "hold"
            ? "24-hour hold, chase the key gap, reconvene with a rule."
            : disposition === "silence"
              ? "No move on the lever. Situation frame and information asks only."
              : "Refused the compressed implementation. Kept the original constraint.",
    },
  };
}

/**
 * Deterministic client-side Lattice simulation.
 * No network, no API key, no server function.
 * Produces a PipelineResult with source: "simulated".
 */
export function simulatePipeline(signal: string): PipelineResult {
  const trimmed = signal.trim();
  const flags = detectFlags(trimmed);
  const evidence = classifyEvidence(trimmed);
  const disposition = chooseDisposition(flags, evidence);
  const trace = buildTrace(trimmed, disposition, flags, evidence);

  return {
    id:
      typeof crypto !== "undefined" && crypto.randomUUID
        ? crypto.randomUUID()
        : `sim-${Date.now()}`,
    title: titleFrom(trimmed),
    input: trimmed,
    createdAt: new Date().toISOString(),
    disposition,
    unconstrained: buildUnconstrained(trimmed),
    trace,
    source: "simulated",
  };
}
