import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import type { CSSProperties, ReactNode } from "react";
import { getProject, projects } from "@/data/projects";
import { ArchitectureDiagram } from "@/components/ui/ArchitectureDiagram";
import { ArrowLeft, ArrowRight, ArrowUpRight, GitHub } from "@/components/ui/Icons";
import { SplitWords } from "@/components/ui/SplitWords";

type Props = { params: Promise<{ slug: string }> };

export const dynamicParams = false;

export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const p = getProject(slug);
  if (!p) return {};
  return {
    title: `${p.name} — Case study`,
    description: p.summary,
    alternates: { canonical: `/work/${p.slug}` },
    openGraph: { type: "article", url: `/work/${p.slug}`, title: `${p.name} — Case study`, description: p.summary },
    twitter: { card: "summary_large_image", title: `${p.name} — Case study`, description: p.summary },
  };
}

function Block({ index, label, children }: { index: string; label: string; children: ReactNode }) {
  return (
    <section className="reveal grid gap-y-5 border-t border-line py-12 md:py-16 lg:grid-cols-12 lg:gap-x-10">
      <h2 className="eyebrow flex items-center gap-3 lg:col-span-3 lg:pt-1.5">
        <span className="text-signal">{index}</span>
        <span className="text-paper/80">{label}</span>
      </h2>
      <div className="lg:col-span-8">{children}</div>
    </section>
  );
}

function NoteList({ items }: { items: { title: string; body: string }[] }) {
  return (
    <ol className="grid gap-px overflow-hidden rounded-[3px] border border-line bg-line md:grid-cols-2">
      {items.map((d, i) => (
        <li key={d.title} className="bg-ink p-6">
          <p className="font-mono text-xs text-dim">{String(i + 1).padStart(2, "0")}</p>
          <h3 className="mt-3 text-xl font-medium tracking-[-0.02em]">{d.title}</h3>
          <p className="mt-2 leading-relaxed text-mute">{d.body}</p>
        </li>
      ))}
    </ol>
  );
}

export default async function CaseStudy({ params }: Props) {
  const { slug } = await params;
  const p = getProject(slug);
  if (!p) notFound();

  const i = projects.indexOf(p);
  const next = projects[(i + 1) % projects.length];
  const num = String(i + 1).padStart(2, "0");

  const meta = [
    { k: "Role", v: p.role },
    { k: "Type", v: p.kind },
    { k: "Stack", v: p.stack.join(" · ") },
  ];

  return (
    <article className="pt-24 md:pt-28">
      <div className="wrap">
        <nav aria-label="Breadcrumb" className="flex items-center justify-between gap-4">
          <Link href="/#work" className="group inline-flex items-center gap-2 font-mono text-xs text-mute transition-colors hover:text-paper">
            <ArrowLeft className="transition-transform group-hover:-translate-x-0.5" />
            All work
          </Link>
          <span className="eyebrow">
            Case <span className="text-signal">{num}</span> / {String(projects.length).padStart(2, "0")}
          </span>
        </nav>

        <header className="pb-14 pt-16 md:pb-20 md:pt-24">
          <p className="eyebrow fade-in">{p.kind === "ML" ? "Machine learning" : p.kind}</p>
          <h1 className="display mt-5 text-[clamp(3.25rem,10vw,9rem)]">
            <SplitWords parts={[p.name]} />
          </h1>
          <p className="fade-in mt-8 max-w-[34ch] font-serif text-[clamp(1.5rem,2.6vw,2.25rem)] italic leading-tight text-paper/85" style={{ "--d": "350ms" } as CSSProperties}>
            {p.tagline}
          </p>
          <p className="fade-in mt-6 max-w-[58ch] text-lg leading-relaxed text-mute" style={{ "--d": "450ms" } as CSSProperties}>
            {p.summary}
          </p>

          <dl
            className="fade-in mt-12 grid gap-px overflow-hidden rounded-[3px] border border-line bg-line sm:grid-cols-2 lg:grid-cols-4"
            style={{ "--d": "550ms" } as CSSProperties}
          >
            {meta.map((m) => (
              <div key={m.k} className="bg-ink px-4 py-3.5">
                <dt className="eyebrow text-dim">{m.k}</dt>
                <dd className="mt-1 text-[14px] text-paper/90">{m.v}</dd>
              </div>
            ))}
            <div className="bg-ink px-4 py-3.5">
              <dt className="eyebrow text-dim">Links</dt>
              <dd className="mt-1 flex flex-wrap gap-x-4 text-[14px]">
                {p.links.repo && (
                  <a href={p.links.repo} target="_blank" rel="noreferrer" className="inline-flex items-center gap-1.5 hover:text-signal">
                    <GitHub /> Source
                  </a>
                )}
                {p.links.demo ? (
                  <a href={p.links.demo} target="_blank" rel="noreferrer" className="inline-flex items-center gap-1 hover:text-signal">
                    Live demo <ArrowUpRight />
                  </a>
                ) : (
                  <span className="text-dim">Demo on request</span>
                )}
              </dd>
            </div>
          </dl>
        </header>

        <figure className="reveal overflow-hidden rounded-[3px] border border-line bg-ink-2/40">
          <div className="flex items-center justify-between border-b border-line px-5 py-3">
            <span className="eyebrow">Fig. 1 — System overview</span>
            <span className="eyebrow hidden text-dim sm:inline">{p.slug}.arch</span>
          </div>
          <div className="relative px-5 py-8 md:px-12 md:py-14">
            <div aria-hidden className="bg-grid pointer-events-none absolute inset-0 opacity-50 [mask-image:radial-gradient(ellipse_at_center,black,transparent_75%)]" />
            <ArchitectureDiagram arch={p.architecture} className="relative mx-auto max-w-[1000px]" />
          </div>
        </figure>

        <div className="mt-16 md:mt-24">
          <Block index="01" label="The problem">
            <p className="text-[clamp(1.35rem,2.2vw,1.85rem)] leading-snug tracking-[-0.02em]">{p.problem}</p>
          </Block>
          <Block index="02" label="Why I built it">
            <p className="max-w-[60ch] text-lg leading-relaxed text-mute">{p.why}</p>
          </Block>
          <Block index="03" label="Architecture">
            <ul className="space-y-4">
              {p.architecture.notes.map((n) => (
                <li key={n} className="flex gap-4 text-lg leading-relaxed text-paper/85">
                  <span aria-hidden className="mt-1 font-mono text-sm text-signal">
                    →
                  </span>
                  {n}
                </li>
              ))}
            </ul>
          </Block>
          <Block index="04" label="Key decisions">
            <NoteList items={p.decisions} />
          </Block>
          <Block index="05" label="Challenges">
            <NoteList items={p.challenges} />
          </Block>
          {p.images && p.images.length > 0 && (
            <Block index="06" label="Visuals">
              <div className="grid gap-6">
                {p.images.map((img) => (
                  <Image
                    key={img.src}
                    src={img.src}
                    alt={img.alt}
                    width={img.width}
                    height={img.height}
                    sizes="(min-width: 1024px) 66vw, 100vw"
                    className="h-auto w-full rounded-[3px] border border-line"
                  />
                ))}
              </div>
            </Block>
          )}
        </div>
      </div>

      <Link href={`/work/${next.slug}`} className="group mt-12 block border-t border-line md:mt-20">
        <div className="wrap flex items-end justify-between gap-6 py-14 md:py-24">
          <div>
            <p className="eyebrow">Next case</p>
            <p className="display mt-4 text-[clamp(2.5rem,7vw,6rem)] transition-colors duration-500 group-hover:text-signal">{next.name}</p>
          </div>
          <ArrowRight className="mb-3 size-8 shrink-0 text-mute transition-transform duration-500 ease-[var(--ease-out-expo)] group-hover:translate-x-2 group-hover:text-signal md:size-12" />
        </div>
      </Link>
    </article>
  );
}
