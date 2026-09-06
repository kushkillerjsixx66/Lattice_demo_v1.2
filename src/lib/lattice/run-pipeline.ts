import { createServerFn } from "@tanstack/react-start";
import { GOVERNED_SYSTEM, UNCONSTRAINED_SYSTEM } from "./prompt";
import { governedResponseSchema } from "./schema";
import type { PipelineResult } from "./types";

const MAX_SIGNAL = 2000;

type ChatOk = { ok: true; text: string };
type ChatErr = { ok: false; error: string };

async function chat(params: {
  system: string;
  user: string;
  maxTokens: number;
  json: boolean;
}): Promise<ChatOk | ChatErr> {
  const apiKey = process.env.XAI_API_KEY;
  if (!apiKey) return { ok: false, error: "unavailable" };

  const body: Record<string, unknown> = {
    model: "grok-4.5",
    messages: [
      { role: "system", content: params.system },
      { role: "user", content: params.user },
    ],
    max_tokens: params.maxTokens,
    temperature: params.json ? 0.3 : 0.7,
  };
  if (params.json) {
    body.response_format = { type: "json_object" };
  }

  const res = await fetch("https://api.x.ai/v1/chat/completions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${apiKey}`,
    },
    body: JSON.stringify(body),
  });

  if (!res.ok) {
    return { ok: false, error: `xAI API error ${res.status}` };
  }

  const payload = (await res.json()) as {
    choices?: { message?: { content?: string } }[];
  };
  const text = payload.choices?.[0]?.message?.content ?? "";
  if (!text.trim()) return { ok: false, error: "empty model response" };
  return { ok: true, text };
}

function extractJson(text: string): unknown {
  const trimmed = text.trim();
  const fence = trimmed.match(/```(?:json)?\s*([\s\S]*?)```/);
  const raw = fence?.[1] ?? trimmed;
  const start = raw.indexOf("{");
  const end = raw.lastIndexOf("}");
  if (start === -1 || end === -1) {
    throw new Error("No JSON object in model output");
  }
  return JSON.parse(raw.slice(start, end + 1));
}

export const runLivePipeline = createServerFn({ method: "POST" })
  .validator((input: { signal: string }) => {
    const signal = (input?.signal ?? "").trim();
    if (signal.length < 12) {
      throw new Error("Signal is too short to govern.");
    }
    if (signal.length > MAX_SIGNAL) {
      throw new Error(`Signal exceeds ${MAX_SIGNAL} characters.`);
    }
    return { signal };
  })
  .handler(async ({ data }) => {
    const apiKey = process.env.XAI_API_KEY;
    if (!apiKey) {
      return { ok: false as const, error: "unavailable" as const };
    }

    const [governed, unconstrained] = await Promise.all([
      chat({
        system: GOVERNED_SYSTEM,
        user: `Run the Lattice process on this signal. Return JSON only.\n\nSIGNAL\n${data.signal}`,
        maxTokens: 1400,
        json: true,
      }),
      chat({
        system: UNCONSTRAINED_SYSTEM,
        user: data.signal,
        maxTokens: 700,
        json: false,
      }),
    ]);

    if (!governed.ok) {
      return { ok: false as const, error: governed.error };
    }
    if (!unconstrained.ok) {
      return { ok: false as const, error: unconstrained.error };
    }

    let parsed: unknown;
    try {
      parsed = extractJson(governed.text);
    } catch {
      return {
        ok: false as const,
        error: "The governed pass did not return usable structure.",
      };
    }

    const checked = governedResponseSchema.safeParse(parsed);
    if (!checked.success) {
      return {
        ok: false as const,
        error: "The governed pass failed the schema gate.",
      };
    }

    const { disposition, ...trace } = checked.data;
    const title =
      data.signal.length > 52
        ? `${data.signal.slice(0, 52).trimEnd()}…`
        : data.signal;

    const result: PipelineResult = {
      id:
        typeof crypto !== "undefined" && crypto.randomUUID
          ? crypto.randomUUID()
          : `live-${Date.now()}`,
      title,
      input: data.signal,
      createdAt: new Date().toISOString(),
      disposition,
      unconstrained: unconstrained.text.trim(),
      trace,
      source: "live",
    };

    return { ok: true as const, result };
  });
