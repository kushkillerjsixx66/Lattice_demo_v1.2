import { cn } from "@/lib/utils";

export function LatticeMark({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      className={cn("text-fg", className)}
      aria-hidden="true"
      fill="none"
    >
      <g stroke="currentColor" strokeWidth="1.25">
        <rect x="3.25" y="3.25" width="17.5" height="17.5" />
        <path d="M12 3.25v17.5M3.25 12h17.5" />
        <rect x="7.5" y="7.5" width="9" height="9" />
      </g>
    </svg>
  );
}
