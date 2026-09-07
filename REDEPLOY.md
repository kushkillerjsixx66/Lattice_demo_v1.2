# Redeploy trigger

Production must ship `src/hooks/use-pipeline-run.ts` that calls `simulatePipeline`.

If custom signals still show "Live governance is not available", the deployment is stale — rebuild from this commit or later on `main`.

- Commit that fixed the hook: `80f9812`
- Simulator: `src/lib/lattice/simulate.ts`
- Live API modules removed: `run-pipeline.ts`, `prompt.ts`, `schema.ts`
