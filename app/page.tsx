import { archive } from "@/data/projects";
import { principles } from "@/data/content";
import { Section } from "@/components/ui/Section";
import { Contact } from "@/components/sections/Contact";
import { GitLog } from "@/components/sections/GitLog";
import { Hero } from "@/components/sections/Hero";
import { PrinciplesList } from "@/components/sections/PrinciplesList";
import { ProcessMonitor } from "@/components/sections/ProcessMonitor";
import { StackMap } from "@/components/sections/StackMap";
import { WorkIndex } from "@/components/sections/WorkIndex";

export default function Home() {
  return (
    <>
      <Hero />

      <Section
        id="about"
        index="01"
        label="How I think"
        title={
          <>
            Software is a <em>system</em> before it&apos;s a screen.
          </>
        }
        intro={`${principles.length} principles I keep coming back to — whether it's an Apex service, a React interface or an AI agent.`}
      >
        <PrinciplesList />
      </Section>

      <Section
        id="work"
        index="02"
        label="Selected work"
        title={
          <>
            Things I&apos;ve <em>built</em>, end to end.
          </>
        }
        intro="Each project is a short case study: the problem, the architecture, and the decisions behind it."
      >
        <WorkIndex />
        <div className="mt-10 flex flex-wrap items-baseline gap-x-6 gap-y-2 font-mono text-xs">
          <span className="eyebrow text-dim">Archive</span>
          {archive.map((a) => (
            <a key={a.name} href={a.href} target="_blank" rel="noreferrer" className="text-mute transition-colors hover:text-paper">
              {a.name} <span className="text-dim">— {a.note}</span> ↗
            </a>
          ))}
        </div>
      </Section>

      <Section
        id="stack"
        index="03"
        label="How I work"
        title={
          <>
            A working <em>map</em> of my stack.
          </>
        }
        intro="Grouped by where each tool sits in a system. Pick anything to see where I've used it and what it connects to."
      >
        <StackMap />
      </Section>

      <Section
        id="experience"
        index="04"
        label="Experience"
        title={
          <>
            The <em>commit history</em> so far.
          </>
        }
        intro="Newest first, like any good log — from a CS degree to shipping Salesforce and AI workflows at work."
      >
        <div className="lg:grid lg:grid-cols-12 lg:gap-x-10">
          <div className="lg:col-span-9 lg:col-start-4">
            <GitLog />
          </div>
        </div>
      </Section>

      <Section
        id="now"
        index="05"
        label="Currently"
        title={
          <>
            What&apos;s <em>running</em> right now.
          </>
        }
        intro="Topics I'm actively working through — tracked by state, not by a made-up percentage."
      >
        <ProcessMonitor />
      </Section>

      <Contact />
    </>
  );
}
