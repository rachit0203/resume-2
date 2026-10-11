import { cn } from "@/lib/cn";

type Variant = "primary" | "ghost";

export function buttonClass(variant: Variant = "primary", className?: string) {
  return cn(
    "group relative inline-flex h-12 select-none items-center gap-3 rounded-[3px] px-5 text-[15px] font-medium tracking-[-0.01em] transition-[background-color,border-color,color] duration-300",
    variant === "primary" && "bg-paper text-ink hover:bg-signal",
    variant === "ghost" && "border border-line-strong text-paper hover:border-paper/60 hover:bg-white/[0.03]",
    className,
  );
}

export const arrowNudge =
  "transition-transform duration-500 ease-[var(--ease-out-expo)] group-hover:translate-x-0.5 group-hover:-translate-y-0.5";
