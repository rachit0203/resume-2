"use client";

import Link from "next/link";
import { useState, type CSSProperties } from "react";
import { timeline } from "@/data/experience";
import { cn } from "@/lib/cn";
import { Plus } from "@/components/ui/Icons";

const L0 = 12;
const L1 = 40;
const DOT_Y = 34;

function Rails({ i, lane, mergeAbove, forkBelow }: { i: number; lane: 0 | 1; mergeAbove?: boolean; forkBelow?: boolean }) {
  const first = i === 0;
  const last = i === timeline.length - 1;
  const main: CSSProperties = last ? { top: 0, height: DOT_Y } : { top: first ? DOT_Y : 0, bottom: 0 };
  const branch: CSSProperties | null =
    lane === 1 ? (mergeAbove ? { top: DOT_Y, bottom: 0 } : forkBelow ? { top: 0, height: DOT_Y } : { top: 0, bottom: 0 }) : null;

  return (
    <>
      <span aria-hidden className="absolute w-px bg-line-strong" style={{ left: L0, ...main }} />
      {branch && <span aria-hidden className="absolute w-px bg-signal/40" style={{ left: L1, ...branch }} />}
      {mergeAbove && (
        <svg aria-hidden className="absolute left-0 top-0 overflow-visible" width={L1 + 2} height={DOT_Y}>
          <path
            d={`M${L1 + 0.5} ${DOT_Y} C${L1 + 0.5} ${DOT_Y * 0.4}, ${L0 + 0.5} ${DOT_Y * 0.6}, ${L0 + 0.5} 0`}
            fill="none"
            className="stroke-signal/40"
          />
        </svg>
      )}
      {forkBelow && (
        <svg aria-hidden className="absolute left-0 overflow-visible" style={{ top: DOT_Y }} width={L1 + 2} height={44}>
          <path d={`M${L1 + 0.5} 0 C${L1 + 0.5} 24, ${L0 + 0.5} 20, ${L0 + 0.5} 44`} fill="none" className="stroke-signal/40" />
        </svg>
      )}
    </>
  );
}

export function GitLog() {
  const [open, setOpen] = useState<Set<string>>(() => new Set([timeline[0].id]));

  const toggle = (id: string) =>
    setOpen((s) => {
      const next = new Set(s);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });

  return (
    <ol className="relative">
      {timeline.map((t, i) => {
        const isOpen = open.has(t.id);
        const x = t.lane === 0 ? L0 : L1;
        return (
          <li key={t.id} className="reveal relative pl-16 md:pl-20">
            <Rails i={i} lane={t.lane} mergeAbove={t.mergeAbove} forkBelow={t.forkBelow} />
            <span
              aria-hidden
              className={cn(
                "absolute rounded-full",
                t.head ? "pulse size-[11px] bg-signal" : "size-[9px] border-2 bg-ink",
                !t.head && (t.lane === 0 ? "border-paper" : "border-signal/80"),
              )}
              style={{ left: x - (t.head ? 5 : 4), top: DOT_Y - (t.head ? 5 : 4) }}
            />

            <div className="border-b border-line pb-6 pt-6 md:pb-9">
              <button
                type="button"
                aria-expanded={isOpen}
                aria-controls={`commit-${t.id}`}
                onClick={() => toggle(t.id)}
                className="group grid w-full grid-cols-[1fr_auto] gap-x-6 text-left"
              >
                <span className="flex flex-wrap items-center gap-x-3 gap-y-1 font-mono text-xs leading-5 text-dim">
                  <span>{t.hash}</span>
                  {t.refs?.map((r) => (
                    <span key={r} className={t.head ? "text-signal" : "text-mute"}>
                      ({r})
                    </span>
                  ))}
                  <span className="text-mute">{t.kind}</span>
                  {t.period && <span className="text-mute">· {t.period}</span>}
                </span>
                <span
                  aria-hidden
                  className="row-span-3 grid size-9 place-items-center self-center rounded-full border border-line text-mute transition-[transform,color,border-color] duration-500 ease-[var(--ease-out-expo)] group-hover:border-line-strong group-hover:text-paper"
                  style={{ transform: isOpen ? "rotate(45deg)" : undefined }}
                >
                  <Plus />
                </span>
                <span className="mt-3 text-[clamp(1.5rem,2.6vw,2.25rem)] font-medium leading-tight tracking-[-0.035em]">
                  {t.title}
                  <span className="text-mute"> · {t.org}</span>
                </span>
                <span className="mt-2 max-w-[62ch] leading-relaxed text-mute">{t.summary}</span>
              </button>

              <div
                id={`commit-${t.id}`}
                className={cn(
                  "grid transition-[grid-template-rows] duration-500 ease-[var(--ease-out-expo)]",
                  isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]",
                )}
              >
                <div className="overflow-hidden" inert={!isOpen}>
                  <ul className="space-y-2 pt-6 text-[15px] text-paper/85">
                    {t.details.map((d) => (
                      <li key={d} className="flex gap-3">
                        <span aria-hidden className="font-mono text-signal">
                          +
                        </span>
                        {d}
                      </li>
                    ))}
                  </ul>
                  {t.project && (
                    <Link
                      href={`/work/${t.project}`}
                      className="mt-5 inline-flex items-center gap-2 font-mono text-xs text-mute transition-colors hover:text-signal"
                    >
                      Read the case study →
                    </Link>
                  )}
                </div>
              </div>
            </div>
          </li>
        );
      })}
    </ol>
  );
}
