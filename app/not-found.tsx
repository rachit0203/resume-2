import type { Metadata } from "next";
import Link from "next/link";
import { buttonClass } from "@/components/ui/button";
import { ArrowLeft } from "@/components/ui/Icons";

export const metadata: Metadata = { title: "404 — Segmentation fault", robots: { index: false } };

export default function NotFound() {
  return (
    <section className="wrap flex min-h-[100svh] flex-col justify-center pb-16 pt-28">
      <p className="eyebrow">
        <span className="text-signal">404</span> — Not found
      </p>
      <h1 className="display mt-6 text-[clamp(3rem,9vw,8rem)]">
        Segmentation <em>fault.</em>
      </h1>
      <pre className="mt-10 max-w-full overflow-x-auto rounded-[3px] border border-line bg-ink-2/60 p-5 font-mono text-[12px] leading-6 text-mute">
        <span className="text-signal">Segmentation fault (core dumped)</span>
        {"\n"}    at Router.resolve (app/[this-page]/page.tsx)
        {"\n"}    at Visitor.curiosity (brain.ts:42)
        {"\n"}    at Rachit.didNotBuildThisYet (todo.md:1)
        {"\n\n"}
        <span className="text-paper/80">hint: the page you&apos;re looking for doesn&apos;t exist.</span>
      </pre>
      <div className="mt-10">
        <Link href="/" className={buttonClass("primary")}>
          <ArrowLeft />
          Back to a valid address
        </Link>
      </div>
    </section>
  );
}
