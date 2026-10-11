import { ImageResponse } from "next/og";

export const OG_SIZE = { width: 1200, height: 630 };

/** Shared Open Graph card: blueprint grid, one signal accent. */
export function ogImage({ eyebrow, title, sub }: { eyebrow: string; title: string; sub: string }) {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: 72,
          background: "#0b0b0c",
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.06) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.06) 1px, transparent 1px)",
          backgroundSize: "64px 64px",
          color: "#eceae5",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 16, fontSize: 22, color: "#97958f", letterSpacing: 3 }}>
          <div style={{ width: 14, height: 14, borderRadius: 7, background: "#ff5c35" }} />
          {eyebrow.toUpperCase()}
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
          <div style={{ fontSize: 96, fontWeight: 600, letterSpacing: -4, lineHeight: 1 }}>{title}</div>
          <div style={{ fontSize: 34, color: "#97958f", maxWidth: 900, lineHeight: 1.3 }}>{sub}</div>
        </div>
        <div style={{ display: "flex", justifyContent: "space-between", fontSize: 20, color: "#5f5e59", letterSpacing: 2 }}>
          <span>RACHIT MISHRA</span>
          <span>SOFTWARE ENGINEER</span>
        </div>
      </div>
    ),
    OG_SIZE,
  );
}
