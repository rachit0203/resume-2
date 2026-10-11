"use client";

import Link from "next/link";
import { useMemo, useRef, useState, type KeyboardEvent } from "react";
import { getProject } from "@/data/projects";
import { domains, relatedOf, techById, techs } from "@/data/stack";
import type { Tech } from "@/data/types";
import { cn } from "@/lib/cn";
import { Close } from "@/components/ui/Icons";

const ordered = domains.flatMap((d) => techs.filter((t) => t.domain === d.id));
const domainById = new Map(domains.map((d) => [d.id, d]));

function RelationGraph({ related }: { related: Tech[] }) {
  const cx = 150;
  const cy = 104;
  const pts = related.slice(0, 6).map((t, i, arr) => {
    const a = -Math.PI / 2 + (i / arr.length) * Math.PI * 2;
    return { t, x: +(cx + 108 * Math.cos(a)).toFixed(1), y: +(cy + 74 * Math.sin(a)).toFixed(1) };
  });
  return (
    <svg viewBox="0 0 300 208" className="h-auto w-full overflow-visible" aria-hidden>
      <ellipse cx={cx} cy={cy} rx={108} ry={74} fill="none" className="stroke-line" strokeDasharray="2 5" />
      {pts.map((p) => (
        <path key={`e${p.t.id}`} d={`M${cx} ${cy} L${p.x} ${p.y}`} className="stroke-signal/40" />
      ))}
      {pts.map((p) => (
        <g key={p.t.id}>
          <circle cx={p.x} cy={p.y} r={3.5} className="fill-ink stroke-paper/70" />
          <text
            x={p.x}
            y={p.y + (p.y < cy ? -10 : 17)}
            textAnchor="middle"
            className="fill-mute font-mono"
            fontSize={10}
          >
            {p.t.name.length > 16 ? `${p.t.name.slice(0, 15)}…` : p.t.name}
          </text>
        </g>
      ))}
      <circle cx={cx} cy={cy} r={6} className="fill-signal" />
      <circle cx={cx} cy={cy} r={14} className="fill-signal/10" />
    </svg>
  );
}

function Inspector({ tech, onSelect }: { tech: Tech; onSelect: (id: string) => void }) {
  const domain = domainById.get(tech.domain)!;
  const related = relatedOf(tech.id).map((id) => techById.get(id)!).filter(Boolean);
  const used = (tech.projects ?? []).map(getProject).filter((p) => p !== undefined);

  return (
    <div>
      <p className="eyebrow flex items-center gap-2">
        <span className="text-signal">{domain.code}</span>
        <span>{domain.name}</span>
      </p>
      <h3 className="mt-3 text-[2rem] font-medium leading-none tracking-[-0.04em]">{tech.name}</h3>
      <p className="mt-4 leading-relaxed text-mute">{tech.context}</p>

      {related.length > 0 && (
        <div className="mt-6 rounded-[3px] border border-line px-3 py-4">
          <RelationGraph related={related} />
        </div>
      )}

      {used.length > 0 && (
        <div className="mt-6">
          <p className="eyebrow text-dim">Used in</p>
          <ul className="mt-2 divide-y divide-line border-y border-line">
            {used.map((p) => (
              <li key={p.slug}>
                <Link href={`/work/${p.slug}`} className="group flex items-center justify-between py-2.5 text-[15px] hover:text-signal">
                  {p.name}
                  <span className="font-mono text-xs text-mute transition-transform group-hover:translate-x-1 group-hover:text-signal">→</span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      )}

      {related.length > 0 && (
        <div className="mt-6">
          <p className="eyebrow text-dim">Connects to</p>
          <ul className="mt-3 flex flex-wrap gap-2">
            {related.map((r) => (
              <li key={r.id}>
                <button
                  type="button"
                  onClick={() => onSelect(r.id)}
                  className="rounded-[3px] border border-line px-2.5 py-1 font-mono text-xs text-paper/80 transition-colors hover:border-signal/60 hover:text-paper"
                >
                  {r.name}
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

export function StackMap() {
  const [selected, setSelected] = useState("agentforce");
  const [focusId, setFocusId] = useState(ordered[0].id);
  const buttons = useRef(new Map<string, HTMLButtonElement>());
  const sheet = useRef<HTMLDialogElement>(null);
  const related = useMemo(() => new Set(relatedOf(selected)), [selected]);
  const tech = techById.get(selected)!;

  const isDesktop = () => window.matchMedia("(min-width: 1024px)").matches;

  function onKeyDown(e: KeyboardEvent<HTMLDivElement>) {
    const i = ordered.findIndex((t) => t.id === focusId);
    const next =
      e.key === "ArrowRight" || e.key === "ArrowDown"
        ? (i + 1) % ordered.length
        : e.key === "ArrowLeft" || e.key === "ArrowUp"
          ? (i - 1 + ordered.length) % ordered.length
          : e.key === "Home"
            ? 0
            : e.key === "End"
              ? ordered.length - 1
              : -1;
    if (next < 0) return;
    e.preventDefault();
    const id = ordered[next].id;
    setFocusId(id);
    buttons.current.get(id)?.focus();
    if (isDesktop()) setSelected(id);
  }

  const select = (id: string) => {
    setSelected(id);
    setFocusId(id);
  };

  return (
    <div className="grid gap-10 lg:grid-cols-12">
      <div className="lg:col-span-8">
        <p id="stack-hint" className="sr-only">
          Use the arrow keys to move between technologies. Press Enter to inspect one.
        </p>
        <div
          role="group"
          aria-label="Technologies by domain"
          aria-describedby="stack-hint"
          onKeyDown={onKeyDown}
          className="grid gap-px overflow-hidden rounded-[3px] border border-line bg-line sm:grid-cols-2 xl:grid-cols-4"
        >
          {domains.map((d) => {
            const items = techs.filter((t) => t.domain === d.id);
            const active = tech.domain === d.id;
            return (
              <section key={d.id} aria-label={d.name} className="bg-ink p-5">
                <header className="mb-4">
                  <p className="eyebrow flex items-center gap-2">
                    <span className={cn("transition-colors", active ? "text-signal" : "text-dim")}>{d.code}</span>
                    <span className="text-paper/85">{d.name}</span>
                  </p>
                  <p className="mt-1 text-[13px] text-dim">{d.blurb}</p>
                </header>
                <ul className="flex flex-wrap gap-2 lg:block lg:space-y-0.5">
                  {items.map((t) => {
                    const isSel = t.id === selected;
                    const isRel = related.has(t.id);
                    return (
                      <li key={t.id}>
                        <button
                          type="button"
                          ref={(el) => {
                            if (el) buttons.current.set(t.id, el);
                            else buttons.current.delete(t.id);
                          }}
                          tabIndex={t.id === focusId ? 0 : -1}
                          aria-pressed={isSel}
                          onPointerEnter={(e) => {
                            if (e.pointerType === "mouse" && isDesktop()) select(t.id);
                          }}
                          onClick={() => {
                            select(t.id);
                            if (!isDesktop()) sheet.current?.showModal();
                          }}
                          className={cn(
                            "flex items-center gap-2.5 rounded-[3px] border border-line px-2.5 py-1.5 text-left text-[14px] transition-colors duration-300 lg:w-full lg:border-transparent lg:px-1.5 lg:py-1",
                            isSel ? "border-signal/60 text-paper lg:bg-white/[0.04]" : isRel ? "text-paper" : "text-mute hover:text-paper",
                          )}
                        >
                          <span
                            aria-hidden
                            className={cn(
                              "size-1.5 shrink-0 rounded-full transition-colors duration-300",
                              isSel ? "bg-signal" : isRel ? "bg-signal/50" : "bg-line-strong",
                            )}
                          />
                          {t.name}
                        </button>
                      </li>
                    );
                  })}
                </ul>
              </section>
            );
          })}
        </div>
      </div>

      <aside aria-label="Technology inspector" className="hidden lg:col-span-4 lg:block">
        <div className="sticky top-28 rounded-[3px] border border-line bg-ink-2/40 p-6">
          <p className="eyebrow mb-6 flex items-center justify-between border-b border-line pb-4">
            <span>Inspector</span>
            <span className="text-dim">
              {related.size} connection{related.size === 1 ? "" : "s"}
            </span>
          </p>
          <Inspector tech={tech} onSelect={select} />
        </div>
      </aside>

      <dialog
        ref={sheet}
        aria-label={`${tech.name} details`}
        onClick={(e) => e.target === sheet.current && sheet.current?.close()}
        className="mx-0 mb-0 mt-auto max-h-[85dvh] w-full max-w-none overflow-y-auto rounded-t-lg border-t border-line-strong bg-ink-2 p-0 lg:hidden"
      >
        <div className="wrap py-6">
          <div className="mb-6 flex items-center justify-between">
            <span aria-hidden className="h-1 w-10 rounded-full bg-line-strong" />
            <button
              type="button"
              onClick={() => sheet.current?.close()}
              className="flex items-center gap-2 font-mono text-xs text-mute"
            >
              <Close /> Close
            </button>
          </div>
          <Inspector tech={tech} onSelect={select} />
        </div>
      </dialog>
    </div>
  );
}
