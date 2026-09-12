import { createGovernanceEnvelope, type GovernanceEnvelope } from "./envelope";
import { planner, executor, witness, type RuntimeEvent } from "./agents";
import { appendTrace, createTrace, type GovernanceTrace } from "./governance";
import { createMutationEnvelope, type MutationEnvelope } from "./mutation";

export type GovernedRun = {
  envelope: GovernanceEnvelope;
  plan: ReturnType<typeof planner.plan>;
  trace: GovernanceTrace;
  mutation?: MutationEnvelope;
};

export function runGovernedMutation(intent: string): GovernedRun {
  const envelope = createGovernanceEnvelope(intent);
  let trace = createTrace(envelope);
  const plan = planner.plan(envelope, intent);

  const planEvent: RuntimeEvent = {
    event_id: "EVT-PLAN",
    actor: "planner",
    message: `Plan created for: ${intent}`,
  };
  trace = appendTrace(trace, { state: "COHERENT", actor: "planner", event: planEvent });

  for (const action of plan.proposed_actions) {
    const authorization = executor.authorize(envelope, action, "chatgpt");
    const event: RuntimeEvent = {
      event_id: `EVT-${action.action_id}`,
      actor: "executor",
      action,
      branch: "chatgpt",
      message: authorization.allowed
        ? `Authorized: ${action.tool}`
        : `Blocked: ${authorization.reason}`,
    };

    const evaluation = witness.evaluate(envelope, event);
    trace = appendTrace(trace, {
      state: evaluation.state,
      actor: "stumpy",
      event,
      witness: evaluation,
    });

    if (evaluation.disposition === "REJECTED") break;
  }

  const finalEntry = trace.entries.at(-1);
  if (finalEntry?.witness?.disposition === "ELIGIBLE") {
    return {
      envelope,
      plan,
      trace,
      mutation: createMutationEnvelope({
        branch: "chatgpt",
        actor: "model",
        path: "04_system_spec/mutation_routing/MUTATION_ROUTING_SPEC.md",
        operation: "update",
        summary: intent,
        state: finalEntry.witness.state,
        disposition: finalEntry.witness.disposition,
        reversible: true,
      }),
    };
  }

  return { envelope, plan, trace };
}
