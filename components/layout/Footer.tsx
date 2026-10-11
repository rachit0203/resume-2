import { profile } from "@/data/profile";
import { Mark } from "@/components/ui/Icons";
import { PaletteButton, TerminalButton } from "@/components/ui/Actions";

const rev = process.env.VERCEL_GIT_COMMIT_SHA?.slice(0, 7) ?? "local";

export function Footer() {
  const built = new Date();

  return (
    <footer className="border-t border-line">
      <div className="wrap grid gap-8 py-10 md:grid-cols-12 md:items-end">
        <div className="flex items-start gap-4 md:col-span-5">
          <Mark className="mt-0.5 shrink-0 text-paper" />
          <div>
            <p className="text-sm">
              Designed &amp; built by {profile.name}.
            </p>
            <p className="mt-1 text-sm text-mute">Next.js, TypeScript, Tailwind CSS &amp; Motion. Set in Geist and Instrument Serif.</p>
          </div>
        </div>
        <p className="font-mono text-[11px] leading-5 text-dim md:col-span-4">
          © {built.getFullYear()} · rev {rev} · built {built.toISOString().slice(0, 10)}
        </p>
        <div className="flex flex-wrap items-center gap-5 md:col-span-3 md:justify-end">
          <PaletteButton className="hidden md:inline-flex" />
          <TerminalButton label="Terminal" />
          <a href="#top" className="font-mono text-xs text-mute transition-colors hover:text-paper">
            Top ↑
          </a>
        </div>
      </div>
    </footer>
  );
}
