"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useLayoutEffect, useRef, useSyncExternalStore } from "react";
import { navSections, sections } from "@/data/sections";
import { cn } from "@/lib/cn";
import { useActiveSection } from "@/lib/hooks";
import { Mark } from "@/components/ui/Icons";
import { PaletteButton } from "@/components/ui/Actions";
import { MobileMenu } from "./MobileMenu";

const IDS = sections.map((s) => s.id);

const scrollStore = {
  subscribe(cb: () => void) {
    window.addEventListener("scroll", cb, { passive: true });
    return () => window.removeEventListener("scroll", cb);
  },
  get: () => window.scrollY > 12,
};

export function Nav() {
  const pathname = usePathname();
  const active = useActiveSection(IDS, pathname === "/");
  const scrolled = useSyncExternalStore(scrollStore.subscribe, scrollStore.get, () => false);
  const listRef = useRef<HTMLUListElement>(null);
  const dotRef = useRef<HTMLSpanElement>(null);

  useLayoutEffect(() => {
    const dot = dotRef.current;
    const link = active ? listRef.current?.querySelector<HTMLElement>(`[data-id="${active}"]`) : null;
    if (!dot) return;
    if (!link) {
      dot.style.opacity = "0";
      return;
    }
    dot.style.opacity = "1";
    dot.style.transform = `translateX(${link.offsetLeft + link.offsetWidth / 2 - 2}px)`;
  }, [active]);

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 border-b transition-[background-color,border-color] duration-500",
        scrolled ? "border-line bg-ink/80 backdrop-blur-md" : "border-transparent bg-transparent",
      )}
    >
      <nav aria-label="Primary" className="wrap flex h-16 items-center justify-between gap-6">
        <Link href="/" className="group flex items-center gap-3 rounded-[3px]" aria-label="Rachit Mishra, home">
          <Mark className="text-paper transition-transform duration-700 ease-[var(--ease-out-expo)] group-hover:rotate-90" />
          <span className="text-[15px] font-medium tracking-[-0.01em]">Rachit Mishra</span>
          <span className="eyebrow hidden lg:inline">/ Software Engineer</span>
        </Link>

        <div className="hidden items-center gap-8 md:flex">
          <ul ref={listRef} className="relative flex items-center gap-7">
            {navSections.map((s) => (
              <li key={s.id}>
                <Link
                  href={`/#${s.id}`}
                  data-id={s.id}
                  aria-current={active === s.id ? "location" : undefined}
                  className={cn(
                    "font-mono text-[11px] uppercase tracking-[0.14em] transition-colors hover:text-paper",
                    active === s.id ? "text-paper" : "text-mute",
                  )}
                >
                  {s.label}
                </Link>
              </li>
            ))}
            <span
              ref={dotRef}
              aria-hidden
              className="absolute -bottom-3 left-0 size-1 rounded-full bg-signal opacity-0 transition-[transform,opacity] duration-500 ease-[var(--ease-out-expo)]"
            />
          </ul>
          <PaletteButton />
        </div>

        <MobileMenu />
      </nav>
    </header>
  );
}
