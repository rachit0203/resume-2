import { profile } from "@/data/profile";
import { mailto } from "@/lib/site";
import { CopyEmail } from "@/components/ui/Actions";
import { ArrowRight, ArrowUpRight, Cross } from "@/components/ui/Icons";
import { Magnetic } from "@/components/ui/Magnetic";
import { SectionLabel } from "@/components/ui/Section";
import { buttonClass } from "@/components/ui/button";

const links = [
  { label: "Email", value: profile.email, href: `mailto:${profile.email}`, external: false },
  { label: "GitHub", value: profile.links.github.replace(/^https?:\/\/(www\.)?/, ""), href: profile.links.github, external: true },
  { label: "LinkedIn", value: profile.links.linkedin.replace(/^https?:\/\/(www\.)?/, ""), href: profile.links.linkedin, external: true },
  { label: "Resume", value: "PDF", href: profile.links.resume, external: true },
];

export function Contact() {
  return (
    <section id="contact" aria-labelledby="contact-title" className="relative overflow-hidden border-t border-line pb-16 pt-24 md:pb-24 md:pt-40">
      <div
        aria-hidden
        className="bg-grid pointer-events-none absolute inset-0 [mask-image:radial-gradient(ellipse_70%_60%_at_30%_100%,black,transparent)]"
      />
      <div aria-hidden className="wrap pointer-events-none absolute inset-x-0 top-0 text-line-strong">
        <div className="relative">
          <Cross className="absolute left-0 -translate-x-1/2 -translate-y-1/2" />
          <Cross className="absolute right-0 translate-x-1/2 -translate-y-1/2" />
        </div>
      </div>

      <div className="wrap relative">
        <div className="max-w-xs">
          <SectionLabel index="06" label="Contact" />
        </div>

        <h2 id="contact-title" className="display reveal mt-10 max-w-[14ch] text-[clamp(3rem,9.2vw,9.5rem)] md:mt-14">
          Let&apos;s build something <em>worth talking about.</em>
        </h2>

        <div className="mt-16 grid gap-14 md:mt-24 lg:grid-cols-12 lg:items-end">
          <div className="reveal lg:col-span-6">
            <p className="max-w-[44ch] text-lg leading-relaxed text-mute">
              Have an interesting problem — a system to design, a workflow to automate, or an agent to build? I&apos;d like to hear
              about it.
            </p>
            <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-4">
              <Magnetic>
                <a href={mailto()} className={buttonClass("primary")}>
                  Start a conversation
                  <ArrowRight className="transition-transform duration-500 ease-[var(--ease-out-expo)] group-hover:translate-x-1" />
                </a>
              </Magnetic>
              <CopyEmail />
            </div>
          </div>

          <ul className="reveal border-t border-line lg:col-span-5 lg:col-start-8">
            {links.map((l) => (
              <li key={l.label} className="border-b border-line">
                <a
                  href={l.href}
                  {...(l.external ? { target: "_blank", rel: "noreferrer" } : {})}
                  className="group flex items-center justify-between gap-4 py-4 transition-colors hover:text-signal"
                >
                  <span className="eyebrow w-20 shrink-0 group-hover:text-signal">{l.label}</span>
                  <span className="min-w-0 flex-1 truncate text-right text-[15px]">{l.value}</span>
                  <ArrowUpRight className="shrink-0 text-mute transition-transform duration-500 ease-[var(--ease-out-expo)] group-hover:rotate-45 group-hover:text-signal" />
                </a>
              </li>
            ))}
          </ul>
        </div>

        <p className="mt-24 font-mono text-[11px] text-dim md:mt-32">
          <span className="text-signal">EOF</span> — thanks for reading this far.
        </p>
      </div>
    </section>
  );
}
