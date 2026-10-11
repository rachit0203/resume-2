"use client";

import { useMotionValue, useSpring, useTransform } from "motion/react";
import * as m from "motion/react-m";
import { useState } from "react";
import type { ArchEdge, ArchNode } from "@/data/types";
import { cn } from "@/lib/cn";
import { route } from "@/lib/diagram";
import { useFinePointer, usePrefersReducedMotion } from "@/lib/hooks";
import { Packet } from "./Packet";

const W = 140;
const H = 50;

const nodes: ArchNode[] = [
  { id: "client", label: "Client", sub: "React · Next.js", x: 16, y: 86 },
  { id: "api", label: "API", sub: "Node · Express", x: 210, y: 86 },
  { id: "cache", label: "Cache", sub: "Redis", x: 404, y: 40 },
  { id: "store", label: "Store", sub: "MongoDB", x: 404, y: 134 },
  { id: "sf", label: "Salesforce", sub: "Apex · LWC", x: 16, y: 316 },
  { id: "flow", label: "Flow", sub: "automation", x: 210, y: 316 },
  { id: "agent", label: "Agentforce", sub: "topics · actions", x: 404, y: 270, accent: true },
  { id: "llm", label: "LLM", sub: "Prompt Builder", x: 404, y: 364 },
];

const edges: ArchEdge[] = [
  { from: "client", to: "api" },
  { from: "api", to: "cache" },
  { from: "api", to: "store" },
  { from: "api", to: "flow", label: "integration", dashed: true },
  { from: "sf", to: "flow" },
  { from: "flow", to: "agent" },
  { from: "agent", to: "llm" },
];

const byId = new Map(nodes.map((n) => [n.id, n]));
const routed = edges.map((e) => ({ ...e, ...route(byId.get(e.from)!, byId.get(e.to)!, W, H) }));

const boundaries = [
  { label: "product · aws", x: 4, y: 24, w: 552, h: 176 },
  { label: "enterprise · salesforce org", x: 4, y: 254, w: 552, h: 178 },
];

export function SystemGraph({ className }: { className?: string }) {
  const [hover, setHover] = useState<string | null>(null);
  const fine = useFinePointer();
  const reduced = usePrefersReducedMotion();
  const px = useMotionValue(0);
  const py = useMotionValue(0);
  const sx = useSpring(px, { stiffness: 60, damping: 18 });
  const sy = useSpring(py, { stiffness: 60, damping: 18 });
  const x = useTransform(sx, (v) => v * 10);
  const y = useTransform(sy, (v) => v * 10);
  const interactive = fine && !reduced;

  return (
    <figure className={cn("relative", className)}>
      <m.div
        style={interactive ? { x, y } : undefined}
        onPointerMove={
          interactive
            ? (e) => {
                const r = e.currentTarget.getBoundingClientRect();
                px.set((e.clientX - r.left) / r.width - 0.5);
                py.set((e.clientY - r.top) / r.height - 0.5);
              }
            : undefined
        }
        onPointerLeave={() => {
          px.set(0);
          py.set(0);
          setHover(null);
        }}
      >
        <svg viewBox="0 0 560 440" className="h-auto w-full overflow-visible" aria-hidden>
          {boundaries.map((b) => (
            <g key={b.label}>
              <rect x={b.x} y={b.y} width={b.w} height={b.h} rx={4} fill="none" className="stroke-line" strokeDasharray="2 5" />
              <text x={b.x} y={b.y - 9} className="fill-dim font-mono" fontSize={10} letterSpacing="0.12em">
                {`// ${b.label}`.toUpperCase()}
              </text>
            </g>
          ))}

          {routed.map((e) => {
            const lit = hover !== null && (e.from === hover || e.to === hover);
            return (
              <path
                key={`${e.from}-${e.to}`}
                d={e.d}
                fill="none"
                strokeWidth={1}
                strokeDasharray={e.dashed ? "4 8" : undefined}
                className={cn(
                  "transition-[stroke] duration-300",
                  lit ? "stroke-signal/70" : "stroke-line-strong",
                  e.dashed && "flow-dash",
                )}
              />
            );
          })}

          {routed
            .filter((e) => e.label)
            .map((e) => (
              <text key={`l-${e.from}-${e.to}`} x={e.mx + 8} y={e.my + 3} className="fill-mute font-mono" fontSize={10}>
                {e.label}
              </text>
            ))}

          {routed.map((e, i) => (
            <Packet key={`p-${e.from}-${e.to}`} d={e.d} dur={1.4 + e.length / 150} offset={i * 0.9} />
          ))}

          {nodes.map((n) => {
            const lit = hover === n.id;
            return (
              <g
                key={n.id}
                transform={`translate(${n.x} ${n.y})`}
                onPointerEnter={() => setHover(n.id)}
                onPointerLeave={() => setHover(null)}
                className="cursor-default"
              >
                <rect
                  width={W}
                  height={H}
                  rx={3}
                  className={cn(
                    "fill-ink-2 transition-[stroke] duration-300",
                    lit ? "stroke-signal" : n.accent ? "stroke-signal/50" : "stroke-line-strong",
                  )}
                />
                {n.accent && <rect width={3} height={H} rx={1} className="fill-signal" />}
                <text x={14} y={22} className="fill-paper font-sans" fontSize={13} fontWeight={500}>
                  {n.label}
                </text>
                <text x={14} y={38} className="fill-mute font-mono" fontSize={10}>
                  {n.sub}
                </text>
                <circle cx={W - 12} cy={14} r={2.5} className={cn(lit || n.accent ? "fill-signal" : "fill-dim")} />
              </g>
            );
          })}
        </svg>
      </m.div>
      <figcaption className="eyebrow mt-6 flex items-center justify-between gap-4">
        <span>Fig. 0 — The two systems I work across</span>
        <span className="hidden text-dim xl:inline">hover a node</span>
      </figcaption>
    </figure>
  );
}
