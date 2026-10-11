"use client";

import { AnimatePresence } from "motion/react";
import * as m from "motion/react-m";
import { useEffect, useRef, useState } from "react";
import { principles } from "@/data/content";
import { cn } from "@/lib/cn";
import { PrincipleDiagram } from "@/components/ui/PrincipleDiagram";

export function PrinciplesList() {
  const [active, setActive] = useState(0);
  const refs = useRef<(HTMLLIElement | null)[]>([]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        for (const e of entries) if (e.isIntersecting) setActive(Number((e.target as HTMLElement).dataset.index));
      },
      { rootMargin: "-48% 0px -48% 0px" },
    );
    refs.current.forEach((el) => el && observer.observe(el));
    return () => observer.disconnect();
  }, []);

  const current = principles[active];

  return (
    <div className="grid gap-x-10 lg:grid-cols-12">
      <div className="hidden lg:col-span-5 lg:block">
        <div className="sticky top-28 overflow-hidden rounded-[3px] border border-line bg-ink-2/40">
          <div className="flex items-center justify-between border-b border-line px-5 py-3">
            <span className="eyebrow">Fig. 01.{active + 1}</span>
            <span className="eyebrow text-paper/80">{current.title}</span>
          </div>
          <div className="relative px-8 py-10">
            <AnimatePresence mode="wait" initial={false}>
              <m.div
                key={current.id}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
              >
                <PrincipleDiagram id={current.id} />
              </m.div>
            </AnimatePresence>
          </div>
          <div className="flex gap-1.5 border-t border-line px-5 py-3">
            {principles.map((p, i) => (
              <span
                key={p.id}
                aria-hidden
                className={cn("h-0.5 flex-1 transition-colors duration-500", i === active ? "bg-signal" : "bg-line-strong")}
              />
            ))}
          </div>
        </div>
      </div>

      <ol className="lg:col-span-6 lg:col-start-7">
        {principles.map((p, i) => (
          <li
            key={p.id}
            ref={(el) => {
              refs.current[i] = el;
            }}
            data-index={i}
            className="reveal flex flex-col justify-center border-t border-line py-12 first:border-t-0 first:pt-0 lg:min-h-[62vh] lg:py-16 lg:first:pt-16"
          >
            <div className="mb-8 rounded-[3px] border border-line px-6 py-6 lg:hidden">
              <PrincipleDiagram id={p.id} />
            </div>
            <p className="font-mono text-xs text-signal">0{i + 1}</p>
            <h3 className="mt-4 text-[clamp(1.75rem,3.2vw,2.75rem)] font-medium leading-[1.05] tracking-[-0.035em]">{p.title}</h3>
            <p className="mt-5 max-w-[46ch] text-lg leading-relaxed text-mute">{p.body}</p>
            <ul className="mt-7 flex flex-wrap gap-x-5 gap-y-2 font-mono text-xs text-paper/70">
              {p.practice.map((x) => (
                <li key={x} className="flex items-center gap-2">
                  <span aria-hidden className="text-signal">
                    →
                  </span>
                  {x}
                </li>
              ))}
            </ul>
          </li>
        ))}
      </ol>
    </div>
  );
}
