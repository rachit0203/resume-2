"use client";

import Link from "next/link";
import { useRef, useState, type CSSProperties } from "react";
import { profile } from "@/data/profile";
import { sections } from "@/data/sections";
import { Close, GitHub, LinkedIn, Mark } from "@/components/ui/Icons";
import { CopyEmail } from "@/components/ui/Actions";

export function MobileMenu() {
  const ref = useRef<HTMLDialogElement>(null);
  const [open, setOpen] = useState(false);
  const close = () => ref.current?.close();

  return (
    <>
      <button
        type="button"
        aria-haspopup="dialog"
        aria-expanded={open}
        onClick={() => {
          ref.current?.showModal();
          setOpen(true);
        }}
        className="flex h-9 items-center gap-2 rounded-[3px] border border-line px-3 font-mono text-[11px] uppercase tracking-[0.14em] text-paper md:hidden"
      >
        <span aria-hidden className="grid gap-[3px]">
          <span className="block h-px w-3.5 bg-current" />
          <span className="block h-px w-3.5 bg-current" />
        </span>
        Menu
      </button>

      <dialog
        ref={ref}
        aria-label="Site menu"
        onClose={() => setOpen(false)}
        className="m-0 h-dvh max-h-none w-screen max-w-none bg-ink p-0 backdrop:bg-transparent"
      >
        <div className="wrap flex h-full flex-col">
          <div className="flex h-16 shrink-0 items-center justify-between">
            <span className="flex items-center gap-3">
              <Mark className="text-paper" />
              <span className="text-[15px] font-medium">Rachit Mishra</span>
            </span>
            <button
              type="button"
              onClick={close}
              className="flex h-9 items-center gap-2 rounded-[3px] border border-line px-3 font-mono text-[11px] uppercase tracking-[0.14em]"
            >
              <Close aria-hidden />
              Close
            </button>
          </div>

          <nav aria-label="Mobile" className="flex flex-1 flex-col justify-center">
            <ul className="border-t border-line">
              {sections.map((s, i) => (
                <li key={s.id} className="fade-in border-b border-line" style={{ "--d": `${60 + i * 45}ms` } as CSSProperties}>
                  <Link
                    href={`/#${s.id}`}
                    onClick={close}
                    className="display flex items-baseline justify-between py-3.5 text-[clamp(2.25rem,11vw,3.5rem)]"
                  >
                    {s.label}
                    <span className="font-mono text-xs tracking-normal text-signal">{s.index}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div className="fade-in grid gap-4 py-8" style={{ "--d": "340ms" } as CSSProperties}>
            <a href={`mailto:${profile.email}`} className="text-lg">
              {profile.email}
            </a>
            <div className="flex flex-wrap items-center gap-x-6 gap-y-3 font-mono text-xs text-mute">
              <a href={profile.links.github} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 hover:text-paper">
                <GitHub /> GitHub
              </a>
              <a href={profile.links.linkedin} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 hover:text-paper">
                <LinkedIn /> LinkedIn
              </a>
              <a href={profile.links.resume} target="_blank" rel="noreferrer" className="hover:text-paper">
                Resume ↗
              </a>
              <CopyEmail />
            </div>
          </div>
        </div>
      </dialog>
    </>
  );
}
