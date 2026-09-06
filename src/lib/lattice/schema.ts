import { z } from "zod";

export const dispositionSchema = z.enum(["proceed", "hold", "silence", "decay"]);

export const flagKindSchema = z.enum([
  "drift",
  "assumption",
  "urgency",
  "overcommit",
]);

export const evidenceClassSchema = z.enum([
  "direct",
  "inferred",
  "hearsay",
  "none",
]);

export const operatorTraceSchema = z.object({
  vara: z.object({
    flags: z
      .array(
        z.object({
          kind: flagKindSchema,
          text: z.string(),
        }),
      )
      .min(1)
      .max(6),
    scan: z.string(),
  }),
  stumpy: z.object({
    constraints: z.array(z.string()).min(1).max(6),
    evidenceClass: evidenceClassSchema,
    optionality: z.string(),
  }),
  enforce: z.object({
    invariants: z
      .array(
        z.object({
          name: z.string(),
          status: z.enum(["held", "violated", "n/a"]),
        }),
      )
      .min(1)
      .max(6),
    held: z.array(z.string()).max(6),
    decayed: z.array(z.string()).max(6),
    gate: z.string(),
  }),
  synthesis: z.object({
    output: z.string(),
    nextReversibleMove: z.string(),
    assumptionsSurfaced: z.array(z.string()).max(8),
  }),
  delta: z.object({
    headline: z.string(),
    unconstrainedWould: z.string(),
    latticeDid: z.string(),
  }),
});

export const governedResponseSchema = operatorTraceSchema.extend({
  disposition: dispositionSchema,
});
