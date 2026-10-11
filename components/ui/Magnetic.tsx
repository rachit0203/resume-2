"use client";

import type { ReactNode } from "react";
import { useMotionValue, useSpring } from "motion/react";
import * as m from "motion/react-m";
import { cn } from "@/lib/cn";
import { useFinePointer, usePrefersReducedMotion } from "@/lib/hooks";

/** Pulls its child slightly toward the cursor. Inert on touch and reduced motion. */
export function Magnetic({ children, strength = 0.28, className }: { children: ReactNode; strength?: number; className?: string }) {
  const fine = useFinePointer();
  const reduced = usePrefersReducedMotion();
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const spring = { stiffness: 260, damping: 18, mass: 0.35 };
  const sx = useSpring(x, spring);
  const sy = useSpring(y, spring);
  const active = fine && !reduced;

  return (
    <m.span
      className={cn("inline-flex", className)}
      style={{ x: sx, y: sy }}
      onPointerMove={
        active
          ? (e) => {
              const r = e.currentTarget.getBoundingClientRect();
              x.set((e.clientX - (r.left + r.width / 2)) * strength);
              y.set((e.clientY - (r.top + r.height / 2)) * strength);
            }
          : undefined
      }
      onPointerLeave={() => {
        x.set(0);
        y.set(0);
      }}
    >
      {children}
    </m.span>
  );
}
