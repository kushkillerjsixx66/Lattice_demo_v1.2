import { Badge } from "@/components/ui/badge";
import { DISPOSITION_COPY, type Disposition } from "@/lib/lattice/types";

export function DispositionMark({
  disposition,
}: {
  disposition: Disposition;
}) {
  const copy = DISPOSITION_COPY[disposition];
  return (
    <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
      <div>
        <p className="font-mono text-[0.6875rem] tracking-widest text-subtle uppercase">
          Disposition
        </p>
        <p className="font-display text-4xl leading-none tracking-tight text-fg md:text-5xl">
          {copy.label}
        </p>
      </div>
      <div className="flex max-w-md flex-col items-start gap-2 sm:items-end">
        <Badge variant={disposition}>{copy.label}</Badge>
        <p className="text-sm text-muted text-pretty sm:text-right">
          {copy.line}
        </p>
      </div>
    </div>
  );
}
