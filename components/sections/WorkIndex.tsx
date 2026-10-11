"use client";

import { AnimatePresence, useMotionValue, useSpring } from "motion/react";
import * as m from "motion/react-m";
import Link from "next/link";
import { useState } from "react";
import { projects } from "@/data/projects";
import { cn } from "@/lib/cn";
import { useFinePointer } from "@/lib/hooks";
import { ArchitectureDiagram } from "@/components/ui/ArchitectureDiagram";
import { ArrowUpRight } from "@/components/ui/Icons";

export function WorkIndex() {
  const [hovered, setHovered] = useState<string | null>(null);
  const fine = useFinePointer();
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 320, damping: 32, mass: 0.6 });
  const sy = useSpring(y, { stiffness: 320, damping: 32, mass: 0.6 });
  const project = projects.find((p) => p.slug === hovered);
  const index = project ? projects.indexOf(project) : -1;

  return (
    <div
      onPointerMove={(e) => {
        x.set(e.clientX);
        y.set(e.clientY);
      }}
      onPointerLeave={() => setHovered(null)}
    >
      <ul className="border-t border-line">
        {projects.map((p, i) => (
          <li key={p.slug} className="border-b border-line">
            <Link
              href={`/work/${p.slug}`}
              onPointerEnter={() => setHovered(p.slug)}
              className={cn(
                "group relative grid grid-cols-[auto_1fr_auto] items-baseline gap-x-5 gap-y-2 py-7 transition-opacity duration-500 md:py-9 lg:grid-cols-12 lg:items-center lg:gap-x-8",
                hovered && hovered !== p.slug && "lg:opacity-35",
              )}
            >
              <span
                aria-hidden
                className="absolute inset-0 origin-bottom scale-y-0 bg-white/[0.025] transition-transform duration-500 ease-[var(--ease-out-expo)] group-hover:scale-y-100"
              />
              <span className="relative font-mono text-xs text-mute lg:col-span-1">{String(i + 1).padStart(2, "0")}</span>
              <span className="relative text-[clamp(1.9rem,3.6vw,3.25rem)] font-medium leading-none tracking-[-0.04em] transition-transform duration-700 ease-[var(--ease-out-expo)] lg:col-span-4 lg:group-hover:translate-x-3">
                {p.name}
              </span>
              <span className="relative col-start-3 row-start-1 font-mono text-[11px] uppercase tracking-[0.14em] text-mute lg:order-last lg:col-span-1 lg:col-start-auto lg:row-start-auto lg:flex lg:items-center lg:justify-end lg:gap-3">
                <span className="hidden xl:inline">{p.kind}</span>
                <ArrowUpRight className="inline size-5 text-paper/70 transition-all duration-500 ease-[var(--ease-out-expo)] group-hover:rotate-45 group-hover:text-signal" />
              </span>
              <span className="relative col-span-3 max-w-[40ch] text-mute lg:col-span-4">{p.tagline}</span>
              <span className="relative col-span-3 font-mono text-[11px] text-dim lg:col-span-2 lg:text-mute">
                {p.stack.slice(0, 3).join(" · ")}
              </span>
            </Link>
          </li>
        ))}
      </ul>

      {fine && (
        <m.div
          aria-hidden
          className="pointer-events-none fixed left-0 top-0 z-40 hidden lg:block"
          style={{ x: sx, y: sy }}
        >
          <AnimatePresence>
            {project && (
              <m.div
                key="preview"
                initial={{ opacity: 0, scale: 0.92 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.92 }}
                transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
                className="w-[400px] origin-top-left translate-x-8 -translate-y-1/2 overflow-hidden rounded-[3px] border border-line-strong bg-ink/95 shadow-[0_30px_80px_-20px_rgb(0_0_0/0.85)] backdrop-blur"
              >
                <div className="flex items-center justify-between border-b border-line px-4 py-2.5">
                  <span className="eyebrow">Case {String(index + 1).padStart(2, "0")}</span>
                  <span className="eyebrow text-paper/80">{project.slug}</span>
                </div>
                <div className="px-5 py-5">
                  <ArchitectureDiagram key={project.slug} arch={project.architecture} compact />
                </div>
                <div className="flex items-center justify-between border-t border-line px-4 py-2.5 font-mono text-[11px] text-mute">
                  <span>{project.stack.length} technologies</span>
                  <span className="text-signal">Open case study →</span>
                </div>
              </m.div>
            )}
          </AnimatePresence>
        </m.div>
      )}
    </div>
  );
}
