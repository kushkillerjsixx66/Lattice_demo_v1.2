import type { CognitiveState, Disposition } from "./states";

export type MutationEnvelope = {
  mutation_id: string;
  schema_version: string;
  source: {
    branch: string;
    actor: string;
  };
  mutation: {
    path: string;
    operation: "create" | "update" | "delete";
    summary: string;
  };
  lineage: {
    parent_ids: string[];
    append_only: true;
  };
  governance: {
    state: CognitiveState;
    disposition: Disposition;
    reversible: boolean;
  };
  canonicalization: {
    status: "PROPOSED" | "AUTHORIZED" | "REJECTED";
    authority: "human";
  };
};

export function createMutationEnvelope(input: {
  branch: string;
  actor: string;
  path: string;
  operation: MutationEnvelope["mutation"]["operation"];
  summary: string;
  state: CognitiveState;
  disposition: Disposition;
  parentIds?: string[];
  reversible?: boolean;
}): MutationEnvelope {
  return {
    mutation_id: `MUT-${Date.now()}`,
    schema_version: "0.1",
    source: { branch: input.branch, actor: input.actor },
    mutation: {
      path: input.path,
      operation: input.operation,
      summary: input.summary,
    },
    lineage: {
      parent_ids: input.parentIds ?? [],
      append_only: true,
    },
    governance: {
      state: input.state,
      disposition: input.disposition,
      reversible: input.reversible ?? true,
    },
    canonicalization: {
      status: "PROPOSED",
      authority: "human",
    },
  };
}
