import Link from "next/link";
import type { CSSProperties } from "react";
import { profile } from "@/data/profile";
import { SHEET_TOTAL } from "@/data/sections";
import { ArrowDown, GitHub, LinkedIn } from "@/components/ui/Icons";
import { Clock } from "@/components/ui/Clock";
import { Magnetic } from "@/components/ui/Magnetic";
import { Packet } from "@/components/ui/Packet";
import { SplitWords } from "@/components/ui/SplitWords";
import { SystemGraph } from "@/components/ui/SystemGraph";
import { buttonClass } from "@/components/ui/button";

const d = (ms: number) => ({ "--d": `${ms}ms` }) as CSSProperties;

function MiniPipeline() {
  const steps = ["client", "api", "agent", "llm"];
  const segments = [0, 1, 2].map((i) => `M${i * 96 + 72} 28 L${(i + 1) * 96} 28`);
  return (
    <svg viewBox="0 0 360 56" className="h-auto w-full" aria-hidden>
      {segments.map((s) => (
        <path key={s} d={s} className="stroke-line-strong" strokeWidth={1} />
      ))}
      {segments.map((s, i) => (
        <Packet key={`p${s}`} d={s} dur={1.4} offset={i * 0.45} size={0.8} />
      ))}
      {steps.map((label, i) => (
        <g key={label} transform={`translate(${i * 96} 12)`}>
          <rect width={72} height={32} rx={3} className={i === 2 ? "fill-ink-2 stroke-signal/60" : "fill-ink-2 stroke-line-strong"} />
          <text x={36} y={20} textAnchor="middle" className="fill-paper font-mono" fontSize={11}>
            {label}
          </text>
        </g>
      ))}
    </svg>
  );
}

export function Hero() {
  const cells = [
    { k: "Drawn by", v: profile.name },
    { k: "Role", v: `${profile.role}, ${profile.company}` },
    { k: "Disciplines", v: profile.disciplines.join(" · ") },
    { k: "Based in", v: <>{profile.location} · <Clock timeZone={profile.timeZone} label={profile.timeZoneLabel} /></> },
  ];

  return (
    <section aria-labelledby="hero-title" className="relative flex min-h-[100svh] flex-col overflow-hidden pt-24 md:pt-28">
      <div
        aria-hidden
        className="bg-grid pointer-events-none absolute inset-0 [mask-image:radial-gradient(ellipse_60%_55%_at_72%_42%,black,transparent)]"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute right-[-10%] top-[10%] size-[42rem] rounded-full bg-signal/[0.07] blur-[140px]"
      />

      <div className="wrap relative grid flex-1 items-center gap-x-10 gap-y-14 py-10 lg:grid-cols-12">
        <div className="lg:col-span-7">
          <p className="fade-in flex items-center gap-3 font-mono text-xs text-mute" style={d(0)}>
            <span className="pulse inline-block size-1.5 rounded-full bg-signal" aria-hidden />
            Open to interesting problems
          </p>

          <p className="fade-in mt-8 text-[17px] tracking-[-0.01em]" style={d(80)}>
            {profile.name}
            <span className="text-mute">
              {" "}— {profile.role} at {profile.company}
            </span>
          </p>

          <h1 id="hero-title" className="display mt-4 text-[clamp(2.9rem,7.4vw,7rem)]">
            <SplitWords parts={["I build the", { em: "systems" }, "behind simple experiences."]} />
          </h1>

          <p className="fade-in mt-8 max-w-[52ch] text-[17px] leading-relaxed text-mute md:text-lg" style={d(650)}>
            {profile.intro}
          </p>

          <div className="fade-in mt-10 flex flex-wrap items-center gap-3" style={d(780)}>
            <Magnetic>
              <Link href="#work" className={buttonClass("primary")}>
                Explore the work
                <ArrowDown className="transition-transform duration-500 ease-[var(--ease-out-expo)] group-hover:translate-y-0.5" />
              </Link>
            </Magnetic>
            <Link href="#contact" className={buttonClass("ghost")}>
              Start a conversation
            </Link>
            <span className="mx-1 hidden h-6 w-px bg-line sm:block" aria-hidden />
            <a
              href={profile.links.github}
              target="_blank"
              rel="noreferrer"
              aria-label="GitHub"
              className="grid size-12 place-items-center rounded-[3px] text-mute transition-colors hover:bg-white/[0.04] hover:text-paper"
            >
              <GitHub className="size-[18px]" />
            </a>
            <a
              href={profile.links.linkedin}
              target="_blank"
              rel="noreferrer"
              aria-label="LinkedIn"
              className="grid size-12 place-items-center rounded-[3px] text-mute transition-colors hover:bg-white/[0.04] hover:text-paper"
            >
              <LinkedIn className="size-[17px]" />
            </a>
          </div>

          <div className="fade-in mt-12 md:hidden" style={d(900)}>
            <MiniPipeline />
          </div>
        </div>

        <div className="fade-in hidden md:block lg:col-span-5" style={d(400)}>
          <SystemGraph className="mx-auto max-w-[560px]" />
        </div>
      </div>

      <div className="wrap relative pb-6 md:pb-8">
        <dl className="fade-in grid grid-cols-2 gap-px overflow-hidden rounded-[3px] border border-line bg-line md:grid-cols-4 lg:grid-cols-5" style={d(950)}>
          {cells.map((c) => (
            <div key={c.k} className="bg-ink px-4 py-3.5">
              <dt className="eyebrow text-dim">{c.k}</dt>
              <dd className="mt-1 truncate text-[13px] text-paper/90">{c.v}</dd>
            </div>
          ))}
          <div className="hidden bg-ink px-4 py-3.5 lg:block">
            <dt className="eyebrow text-dim">Sheet</dt>
            <dd className="mt-1 flex items-center justify-between font-mono text-[13px] text-paper/90">
              00 / {SHEET_TOTAL}
              <a href="#about" className="text-[11px] uppercase tracking-[0.14em] text-mute transition-colors hover:text-signal">
                Scroll ↓
              </a>
            </dd>
          </div>
        </dl>
      </div>
    </section>
  );
}
