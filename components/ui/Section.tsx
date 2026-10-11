import type { ReactNode } from "react";
import { SHEET_TOTAL } from "@/data/sections";
import { cn } from "@/lib/cn";
import { Cross } from "./Icons";

type Props = {
  id: string;
  index: string;
  label: string;
  title: ReactNode;
  intro?: ReactNode;
  children: ReactNode;
  className?: string;
};

export function SectionLabel({ index, label }: { index: string; label: string }) {
  return (
    <p className="eyebrow flex items-center gap-3">
      <span className="text-signal">{index}</span>
      <span aria-hidden className="h-px w-8 bg-line-strong" />
      <span className="text-paper/80">{label}</span>
      <span aria-hidden className="ml-auto text-dim lg:hidden">
        {index}/{SHEET_TOTAL}
      </span>
    </p>
  );
}

export function Section({ id, index, label, title, intro, children, className }: Props) {
  return (
    <section id={id} aria-labelledby={`${id}-title`} className={cn("relative border-t border-line py-24 md:py-32 lg:py-40", className)}>
      <div aria-hidden className="wrap pointer-events-none absolute inset-x-0 top-0 text-line-strong">
        <div className="relative">
          <Cross className="absolute left-0 -translate-x-1/2 -translate-y-1/2" />
          <Cross className="absolute right-0 translate-x-1/2 -translate-y-1/2" />
          <span className="eyebrow absolute right-0 top-3 hidden text-dim lg:block">
            sheet {index} / {SHEET_TOTAL}
          </span>
        </div>
      </div>

      <div className="wrap">
        <header className="grid gap-y-6 lg:grid-cols-12 lg:gap-x-10">
          <div className="lg:col-span-3 lg:pt-4">
            <SectionLabel index={index} label={label} />
          </div>
          <div className="lg:col-span-9">
            <h2 id={`${id}-title`} className="display reveal text-[clamp(2.5rem,5.8vw,5.25rem)]">
              {title}
            </h2>
            {intro && <p className="reveal mt-6 max-w-[54ch] text-lg leading-relaxed text-mute">{intro}</p>}
          </div>
        </header>
        <div className="mt-16 md:mt-24">{children}</div>
      </div>
    </section>
  );
}
