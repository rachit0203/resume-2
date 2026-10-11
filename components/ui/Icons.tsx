import type { SVGProps } from "react";

type P = SVGProps<SVGSVGElement>;

const stroke = {
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.5,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
  "aria-hidden": true,
};

export const ArrowUpRight = (p: P) => (
  <svg viewBox="0 0 16 16" width="16" height="16" {...stroke} {...p}>
    <path d="M5 11 11 5M6 5h5v5" />
  </svg>
);

export const ArrowRight = (p: P) => (
  <svg viewBox="0 0 16 16" width="16" height="16" {...stroke} {...p}>
    <path d="M3 8h10M9 4l4 4-4 4" />
  </svg>
);

export const ArrowLeft = (p: P) => (
  <svg viewBox="0 0 16 16" width="16" height="16" {...stroke} {...p}>
    <path d="M13 8H3M7 4 3 8l4 4" />
  </svg>
);

export const ArrowDown = (p: P) => (
  <svg viewBox="0 0 16 16" width="16" height="16" {...stroke} {...p}>
    <path d="M8 3v10M4 9l4 4 4-4" />
  </svg>
);

export const Copy = (p: P) => (
  <svg viewBox="0 0 16 16" width="16" height="16" {...stroke} {...p}>
    <rect x="5.5" y="5.5" width="8" height="8" rx="1" />
    <path d="M10.5 3.5v-1h-8v8h1" />
  </svg>
);

export const Check = (p: P) => (
  <svg viewBox="0 0 16 16" width="16" height="16" {...stroke} {...p}>
    <path d="m3 8.5 3 3 7-7" />
  </svg>
);

export const Plus = (p: P) => (
  <svg viewBox="0 0 16 16" width="16" height="16" {...stroke} {...p}>
    <path d="M8 3v10M3 8h10" />
  </svg>
);

export const Close = (p: P) => (
  <svg viewBox="0 0 16 16" width="16" height="16" {...stroke} {...p}>
    <path d="m4 4 8 8M12 4l-8 8" />
  </svg>
);

export const Prompt = (p: P) => (
  <svg viewBox="0 0 16 16" width="16" height="16" {...stroke} {...p}>
    <path d="m3 4 4 4-4 4M8.5 12H13" />
  </svg>
);

export const GitHub = (p: P) => (
  <svg viewBox="0 0 16 16" width="16" height="16" fill="currentColor" aria-hidden {...p}>
    <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.01 8.01 0 0 0 16 8c0-4.42-3.58-8-8-8Z" />
  </svg>
);

export const LinkedIn = (p: P) => (
  <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor" aria-hidden {...p}>
    <path d="M20.45 20.45h-3.55v-5.57c0-1.33-.03-3.04-1.85-3.04-1.85 0-2.14 1.45-2.14 2.94v5.67H9.35V9h3.41v1.56h.05c.48-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.46v6.28ZM5.34 7.43a2.06 2.06 0 1 1 0-4.12 2.06 2.06 0 0 1 0 4.12ZM7.12 20.45H3.56V9h3.56v11.45ZM22.22 0H1.77C.79 0 0 .77 0 1.73v20.54C0 23.23.79 24 1.77 24h20.45c.98 0 1.78-.77 1.78-1.73V1.73C24 .77 23.2 0 22.22 0Z" />
  </svg>
);

/** The site mark: two nodes, one signal. */
export const Mark = (p: P) => (
  <svg viewBox="0 0 32 32" width="28" height="28" aria-hidden {...p}>
    <rect x="0.5" y="0.5" width="31" height="31" rx="4" fill="none" stroke="currentColor" strokeOpacity="0.2" />
    <path d="M10 22 22 10" stroke="currentColor" strokeWidth="1.5" />
    <circle cx="10" cy="22" r="3" fill="currentColor" />
    <circle cx="22" cy="10" r="3" className="fill-signal" />
  </svg>
);

export const Cross = (p: P) => (
  <svg viewBox="0 0 11 11" width="11" height="11" aria-hidden {...p}>
    <path d="M5.5 0v11M0 5.5h11" stroke="currentColor" strokeWidth="1" />
  </svg>
);
