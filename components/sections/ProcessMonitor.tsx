import { currently } from "@/data/content";
import type { ProcessState } from "@/data/types";
import { cn } from "@/lib/cn";
import { TerminalButton } from "@/components/ui/Actions";
import { Uptime } from "@/components/ui/Uptime";

const WAVE = "M0 12 H14 L17 7 L20 17 L23 12 H44 L46 9 L48 15 L50 12 H70 L73 4 L76 20 L79 12 H100 L102 10 L104 14 L106 12 H120";

const speed: Record<ProcessState, string> = {
  running: "2.4s",
  prototyping: "3.6s",
  exploring: "5.5s",
  reading: "8s",
};

function StateBadge({ state }: { state: ProcessState }) {
  return (
    <span className={cn("inline-flex items-center gap-2", state === "running" ? "text-signal" : "text-paper/85")}>
      {state === "running" && <span aria-hidden className="pulse inline-block size-1.5 rounded-full bg-signal" />}
      {state === "prototyping" && <span aria-hidden className="spinner text-signal" />}
      {state === "exploring" && <span aria-hidden className="caret -ml-1 w-2" />}
      {state === "reading" && (
        <span aria-hidden className="text-dim">
          ◦
        </span>
      )}
      {state}
    </span>
  );
}

function Trace({ state }: { state: ProcessState }) {
  const wave = (
    <svg viewBox="0 0 120 24" className="h-6 w-1/2 shrink-0" aria-hidden>
      <path d={WAVE} fill="none" strokeWidth={1.25} className={state === "running" ? "stroke-signal" : "stroke-paper/40"} />
    </svg>
  );
  return (
    <span className="block w-[120px] overflow-hidden [mask-image:linear-gradient(90deg,transparent,black_20%,black_80%,transparent)]">
      <span className="flex w-[240px]" style={{ animation: `trace ${speed[state]} linear infinite` }}>
        {wave}
        {wave}
      </span>
    </span>
  );
}

export function ProcessMonitor() {
  const counts = currently.reduce<Record<string, number>>((acc, c) => ({ ...acc, [c.state]: (acc[c.state] ?? 0) + 1 }), {});
  const cols = "md:grid md:grid-cols-[64px_minmax(0,1.3fr)_150px_136px_minmax(0,2fr)] md:items-center md:gap-6";

  return (
    <div>
      <div className="reveal overflow-hidden rounded-[3px] border border-line bg-ink-2/40 font-mono text-[13px]">
        <div className="flex items-center justify-between gap-4 border-b border-line px-5 py-3 text-xs text-mute">
          <span>top — rachit@portfolio</span>
          <span>
            uptime <Uptime />
          </span>
        </div>

        <p className="border-b border-line px-5 py-3 text-xs leading-6 text-mute">
          Tasks: <span className="text-paper">{currently.length}</span> total,{" "}
          <span className="text-signal">{counts.running ?? 0}</span> running,{" "}
          <span className="text-paper">{counts.prototyping ?? 0}</span> prototyping,{" "}
          <span className="text-paper">{counts.exploring ?? 0}</span> exploring,{" "}
          <span className="text-paper">{counts.reading ?? 0}</span> reading
        </p>

        <div className={cn("hidden border-b border-line bg-white/[0.02] px-5 py-2.5 text-[11px] uppercase tracking-[0.14em] text-dim", cols)} aria-hidden>
          <span>pid</span>
          <span>process</span>
          <span>state</span>
          <span>activity</span>
          <span>note</span>
        </div>

        <ul>
          {currently.map((c) => (
            <li
              key={c.pid}
              className={cn(
                "grid grid-cols-[1fr_auto] gap-x-4 gap-y-1 border-b border-line px-5 py-4 transition-colors last:border-b-0 hover:bg-white/[0.02]",
                cols,
              )}
            >
              <span className="hidden text-dim md:block">{c.pid}</span>
              <span className="min-w-0">
                <span className="block font-sans text-[15px] text-paper">{c.label}</span>
                <span className="block text-[11px] text-dim">{c.process}</span>
              </span>
              <span className="self-start text-xs md:self-auto md:text-[13px]">
                <StateBadge state={c.state} />
              </span>
              <span className="hidden md:block">
                <Trace state={c.state} />
              </span>
              <span className="col-span-2 text-mute md:col-span-1">{c.note}</span>
            </li>
          ))}
        </ul>
      </div>

      <div className="reveal mt-6 flex flex-wrap items-center gap-x-4 gap-y-2 font-mono text-xs text-mute">
        <span>Prefer a shell?</span>
        <TerminalButton className="text-paper hover:text-signal" />
        <span className="text-dim">
          or press <kbd className="rounded-[3px] border border-line px-1.5 py-0.5 text-[11px] text-paper">`</kbd>
        </span>
      </div>
    </div>
  );
}
