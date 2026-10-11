import { cn } from "@/lib/utils";

type DoodleProps = {
  variant?: "loop" | "wave" | "arc";
  className?: string;
};

const paths = {
  loop: "M10 120C60 20 150 10 190 70s-20 90-60 50 40-110 120-90 120 90 200 70",
  wave: "M0 60C50 10 90 110 140 60s90-50 140 0 90 50 140 0",
  arc: "M10 190C20 90 120 20 240 30",
} as const;

/** Dashed hand-drawn style line, purely decorative background texture. */
export function Doodle({ variant = "loop", className }: DoodleProps) {
  return (
    <svg
      viewBox="0 0 440 200"
      fill="none"
      aria-hidden="true"
      className={cn("pointer-events-none absolute text-primary-500/25", className)}
    >
      <path
        d={paths[variant]}
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeDasharray="3 8"
      />
    </svg>
  );
}
