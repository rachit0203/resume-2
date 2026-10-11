"use client";

import { useSyncExternalStore } from "react";

let start = 0;

const store = {
  subscribe(cb: () => void) {
    if (!start) start = Date.now();
    const t = window.setInterval(cb, 1000);
    return () => window.clearInterval(t);
  },
  get: () => (start ? Math.floor((Date.now() - start) / 1000) : 0),
};

const pad = (n: number) => String(n).padStart(2, "0");

/** Seconds since this page was opened. */
export function Uptime() {
  const s = useSyncExternalStore(store.subscribe, store.get, () => 0);
  return (
    <span className="tabular-nums">
      {pad(Math.floor(s / 3600))}:{pad(Math.floor(s / 60) % 60)}:{pad(s % 60)}
    </span>
  );
}
