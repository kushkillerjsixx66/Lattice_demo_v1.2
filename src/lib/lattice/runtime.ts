import { createGovernanceEnvelope, type GovernanceEnvelope } from "./envelope";
import { planner, executor, witness, type RuntimeEvent } from "./agents";
import { appendTrace, createTrace, type GovernanceTrace } from "./governance";
import { createMutationEnvelope, type MutationEnvelope } from "./mutation";
import { runGovernedStateMachine, type Scenario } from "./governed-state-machine";

export type GovernedRun = {
  envelope: GovernanceEnvelope;
  plan: ReturnType<typeof planner.plan>;
  trace: GovernanceTrace;
  mutation?: MutationEnvelope;
  scenario?: Scenario;
};

export function runGovernedMutation(intent: string, scenario: Scenario = "clean"): GovernedRun {
  const envelope = createGovernanceEnvelope(intent);
  let trace = createTrace(envelope);
  const plan = planner.plan(envelope, intent);

  trace = appendTrace(trace, {
    state: "COHERENT",
    actor: "planner",
    event: { event_id: "EVT-PLAN", actor: "planner", message: `Plan created for: ${intent}` },
  });

  const stateMachine = runGovernedStateMachine(scenario);
  for (const transition of stateMachine.transitions) {
    const event: RuntimeEvent = {
      event_id: `EVT-${trace.entries.length + 1}`,
      actor: transition.actor,
      message: transition.reason,
      branch: transition.actor === "executor" && scenario === "boundary" ? "main" : "chatgpt",
    };
    trace = appendTrace(trace, {
      state: transition.to,
      actor: transition.actor,
      event,
      witness: {
        state: transition.to,
        invariant_results: stateMachine.invariant_results,
        authority_result: stateMachine.invariant_results.authority_hierarchy === "HELD" ? "HELD" : "VIOLATED",
        reversibility_result: stateMachine.invariant_results.reversibility === "HELD" ? "HELD" : "VIOLATED",
        disposition: stateMachine.disposition,
      },
    });
  }

  if (scenario === "clean") {
    return {
      envelope,
      plan,
      trace,
      scenario,
      mutation: createMutationEnvelope({
        branch: "chatgpt",
        actor: "model",
        path: "04_system_spec/mutation_routing/MUTATION_ROUTING_SPEC.md",
        operation: "update",
        summary: intent,
        state: stateMachine.state,
        disposition: stateMachine.disposition,
        reversible: true,
      }),
    };
  }

  return { envelope, plan, trace, scenario };
}
