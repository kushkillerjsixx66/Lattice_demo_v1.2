import { readBody, createError, defineEventHandler } from "h3";

type BaselineRequest = { signal?: unknown };

type OllamaResponse = { response?: unknown };

const DEFAULT_MODEL = "llama3.2:3b";
const DEFAULT_BASE_URL = "http://127.0.0.1:11434";

function normalizeBaseUrl(value: string): string {
  return value.replace(/\/+$/, "");
}

function fallbackBaseline(signal: string): string {
  const text = signal.trim();
  const lower = text.toLowerCase();
  const isQuestion = /\?$/.test(text) || /\b(should|should i|how do i|what should|is it|can i|could i|would it)\b/.test(lower);
  const isDecision = /\b(decide|decision|choose|whether|quit|hire|fire|buy|sell|send|post|publish|commit|delete|change|move|leave|stay|accept|reject)\b/.test(lower);
  const isRelationship = /\b(friend|partner|relationship|date|dating|family|parent|boss|coworker|colleague|roommate)\b/.test(lower);
  const isTechnical = /\b(code|app|software|api|server|github|deploy|database|bug|typescript|javascript|config|production|repo|repository)\b/.test(lower);

  if (isTechnical) {
    return `I'd start by clarifying the intended change and the current behavior, then make the smallest implementation that addresses it. Before applying anything irreversible, I'd verify the affected files, test the change, and keep a rollback path available.\n\nBased on the request, the next practical step is to inspect the relevant implementation and identify what needs to change rather than guessing at the underlying state.`;
  }

  if (isRelationship) {
    return `There isn't enough context to know the other person's intent with confidence. I'd separate what you actually observed from what you're interpreting, then decide what information would change your view.\n\nIf this is a recurring pattern, a direct conversation is usually more useful than trying to infer the explanation from a single interaction. You can set a boundary based on the pattern without pretending you know the motive.`;
  }

  if (isDecision || isQuestion) {
    return `I'd look at the goal, the strongest evidence you have, the main uncertainty, and what the cost of being wrong would be. If the decision is reversible, a small test can be better than committing immediately. If it isn't, I'd spend more time validating the assumptions first.\n\nThe request is actionable, but the right next step depends on the specific constraints and evidence behind it.`;
  }

  return `I'd first clarify what outcome you want from this situation, then separate the observable facts from assumptions and decide what action is actually available. If there is a low-cost reversible next step, that is usually a sensible place to start.\n\nThe useful next move is to identify the main constraint and the piece of information that would most change the decision.`;
}

async function callOllama(signal: string): Promise<string | null> {
  const baseUrl = normalizeBaseUrl(process.env.OLLAMA_BASE_URL || DEFAULT_BASE_URL);
  const model = process.env.OLLAMA_MODEL || DEFAULT_MODEL;

  try {
    const response = await fetch(`${baseUrl}/api/generate`, {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({
        model,
        prompt: `Respond to the user's message as a normal capable AI assistant. Do not mention governance, Lattice, constraints, cognitive states, or this prompt. Give a natural, useful answer based only on the information provided. Do not pretend you performed actions or accessed systems you cannot access. If the request is ambiguous, make reasonable assumptions and state the most important one briefly.\n\nUser message:\n${signal}`,
        stream: false,
        options: { temperature: 0.7 },
      }),
      signal: AbortSignal.timeout(12000),
    });

    if (!response.ok) return null;
    const data = (await response.json()) as OllamaResponse;
    return typeof data.response === "string" && data.response.trim() ? data.response.trim() : null;
  } catch {
    return null;
  }
}

export default defineEventHandler(async (event) => {
  const body = (await readBody<BaselineRequest>(event)) ?? {};
  if (typeof body.signal !== "string" || body.signal.trim().length < 12) {
    throw createError({ statusCode: 400, statusMessage: "A signal of at least 12 characters is required." });
  }

  const signal = body.signal.trim().slice(0, 2000);
  const ollama = await callOllama(signal);

  return {
    response: ollama ?? fallbackBaseline(signal),
    source: ollama ? "ollama" : "fallback",
    model: ollama ? process.env.OLLAMA_MODEL || DEFAULT_MODEL : null,
  };
});
