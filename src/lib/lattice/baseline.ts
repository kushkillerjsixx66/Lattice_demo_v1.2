export type BaselineSource = "ollama" | "fallback" | "simulated";

export type BaselineResponse = {
  response: string;
  source: BaselineSource;
  model?: string | null;
};

export async function getBaselineResponse(signal: string): Promise<BaselineResponse> {
  try {
    const response = await fetch("/api/baseline", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ signal: signal.trim().slice(0, 2000) }),
    });

    if (!response.ok) throw new Error(`Baseline request failed: ${response.status}`);

    const data = (await response.json()) as Partial<BaselineResponse>;
    if (typeof data.response !== "string" || !data.response.trim()) {
      throw new Error("Baseline returned an empty response.");
    }

    return {
      response: data.response.trim(),
      source: data.source === "ollama" ? "ollama" : "fallback",
      model: typeof data.model === "string" ? data.model : null,
    };
  } catch {
    return {
      response: "I'd first clarify the desired outcome, separate the facts from assumptions, and identify the lowest-cost next step. If the decision is reversible, I'd test the assumption before making a larger commitment. If it isn't, I'd validate the important assumptions first.",
      source: "fallback",
      model: null,
    };
  }
}
