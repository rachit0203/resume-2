"use client";

import { usePrefersReducedMotion } from "@/lib/hooks";

type Props = { d: string; dur?: number; offset?: number; size?: number };

/** A unit of data travelling along an SVG path. Omitted entirely for reduced motion. */
export function Packet({ d, dur = 3.2, offset = 0, size = 1 }: Props) {
  const reduced = usePrefersReducedMotion();
  if (reduced) return null;
  const timing = { dur: `${dur}s`, begin: `-${offset}s`, repeatCount: "indefinite" };

  return (
    <g opacity={0}>
      <circle r={7 * size} className="fill-signal/15" />
      <circle r={2.6 * size} className="fill-signal" />
      <animateMotion {...timing} path={d} calcMode="spline" keyPoints="0;1" keyTimes="0;1" keySplines="0.45 0 0.55 1" />
      <animate {...timing} attributeName="opacity" values="0;1;1;0" keyTimes="0;0.12;0.85;1" />
    </g>
  );
}
