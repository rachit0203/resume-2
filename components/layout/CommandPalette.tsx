"use client";

import { Command } from "cmdk";
import { usePathname, useRouter } from "next/navigation";
import type { ReactNode } from "react";
import { profile } from "@/data/profile";
import { projects } from "@/data/projects";
import { sections } from "@/data/sections";
import { mailto } from "@/lib/site";
import { ArrowRight, ArrowUpRight, Copy, GitHub, LinkedIn, Prompt } from "@/components/ui/Icons";
import { useUI } from "./UIProvider";

type Props = { open: boolean; onOpenChange: (open: boolean) => void };

const itemClass =
  "flex cursor-pointer select-none items-center gap-3 rounded-[3px] px-3 py-2.5 text-[14px] text-paper/85 outline-none data-[selected=true]:bg-white/[0.06] data-[selected=true]:text-paper";

function Item({ children, onSelect, hint, icon }: { children: ReactNode; onSelect: () => void; hint?: string; icon?: ReactNode }) {
  return (
    <Command.Item onSelect={onSelect} className={itemClass}>
      <span className="grid size-5 place-items-center text-mute">{icon ?? <ArrowRight />}</span>
      <span className="flex-1">{children}</span>
      {hint && <span className="font-mono text-[11px] text-dim">{hint}</span>}
    </Command.Item>
  );
}

export default function CommandPalette({ open, onOpenChange }: Props) {
  const router = useRouter();
  const pathname = usePathname();
  const { openTerminal, toggleDebug, toast } = useUI();

  // Let the dialog release scroll lock before navigating.
  const run = (fn: () => void) => {
    onOpenChange(false);
    window.setTimeout(fn, 40);
  };

  const goSection = (id: string) =>
    run(() => {
      if (pathname === "/") {
        document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
        history.replaceState(null, "", `#${id}`);
      } else router.push(`/#${id}`);
    });

  const external = (href: string) => run(() => window.open(href, "_blank", "noopener,noreferrer"));

  return (
    <Command.Dialog
      open={open}
      onOpenChange={onOpenChange}
      label="Command menu"
      loop
      overlayClassName="fixed inset-0 z-[96] bg-ink/70 backdrop-blur-sm"
      contentClassName="fixed left-1/2 top-[14vh] z-[97] w-[min(640px,calc(100vw-2rem))] -translate-x-1/2 overflow-hidden rounded-md border border-line-strong bg-ink-2 shadow-[0_40px_120px_-30px_rgb(0_0_0/0.9)] fade-in"
    >
      <div className="flex items-center gap-3 border-b border-line px-4">
        <span className="font-mono text-sm text-signal" aria-hidden>
          ›
        </span>
        <Command.Input
          placeholder="Where to? Try “vibely”, “github” or “terminal”"
          className="h-14 flex-1 bg-transparent text-[15px] text-paper outline-none placeholder:text-dim"
        />
        <kbd className="rounded-[3px] border border-line px-1.5 py-0.5 font-mono text-[10px] text-mute">esc</kbd>
      </div>
      <Command.List className="max-h-[min(420px,60vh)] overflow-y-auto overscroll-contain p-2 [&_[cmdk-group-heading]]:eyebrow [&_[cmdk-group-heading]]:px-3 [&_[cmdk-group-heading]]:pb-1.5 [&_[cmdk-group-heading]]:pt-3">
        <Command.Empty className="px-3 py-8 text-center font-mono text-xs text-mute">
          No results. Maybe the terminal knows? (press `)
        </Command.Empty>

        <Command.Group heading="Navigate">
          <Item onSelect={() => run(() => router.push("/"))} hint="00">
            Home
          </Item>
          {sections.map((s) => (
            <Item key={s.id} onSelect={() => goSection(s.id)} hint={s.index}>
              Go to {s.label}
            </Item>
          ))}
        </Command.Group>

        <Command.Group heading="Case studies">
          {projects.map((p) => (
            <Item key={p.slug} onSelect={() => run(() => router.push(`/work/${p.slug}`))} hint={p.kind}>
              {p.name}
            </Item>
          ))}
        </Command.Group>

        <Command.Group heading="Elsewhere">
          <Item icon={<GitHub />} onSelect={() => external(profile.links.github)}>
            Open GitHub
          </Item>
          <Item icon={<LinkedIn />} onSelect={() => external(profile.links.linkedin)}>
            Open LinkedIn
          </Item>
          <Item icon={<ArrowUpRight />} onSelect={() => external(profile.links.resume)}>
            View resume
          </Item>
          <Item icon={<ArrowUpRight />} onSelect={() => run(() => (window.location.href = mailto()))}>
            Contact Rachit
          </Item>
        </Command.Group>

        <Command.Group heading="Actions">
          <Item
            icon={<Copy />}
            onSelect={() =>
              run(async () => {
                await navigator.clipboard?.writeText(profile.email);
                toast("Email copied to clipboard.");
              })
            }
          >
            Copy email address
          </Item>
          <Item icon={<Prompt />} onSelect={openTerminal} hint="`">
            Open terminal
          </Item>
          <Item onSelect={() => run(toggleDebug)} hint="↑↑↓↓←→←→BA">
            Toggle blueprint mode
          </Item>
        </Command.Group>
      </Command.List>
    </Command.Dialog>
  );
}
