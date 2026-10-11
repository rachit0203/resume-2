import { ImageResponse } from "next/og";

export const size = { width: 180, height: 180 };
export const contentType = "image/png";

export default function AppleIcon() {
  return new ImageResponse(
    (
      <div style={{ width: "100%", height: "100%", display: "flex", background: "#0b0b0c" }}>
        <svg width="180" height="180" viewBox="0 0 32 32">
          <path d="M10 22 22 10" stroke="#eceae5" strokeWidth="1.6" />
          <circle cx="10" cy="22" r="3" fill="#eceae5" />
          <circle cx="22" cy="10" r="3" fill="#ff5c35" />
        </svg>
      </div>
    ),
    size,
  );
}
