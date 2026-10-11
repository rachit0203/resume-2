"use client";

import { useClock } from "@/lib/hooks";

export function Clock({ timeZone, label }: { timeZone: string; label: string }) {
  const time = useClock(timeZone);
  return (
    <span className="tabular-nums">
      <time suppressHydrationWarning>{time}</time> {label}
    </span>
  );
}
