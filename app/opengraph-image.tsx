import { profile } from "@/data/profile";
import { OG_SIZE, ogImage } from "@/lib/og";

export const alt = `${profile.name} — ${profile.role}`;
export const size = OG_SIZE;
export const contentType = "image/png";

export default function Image() {
  return ogImage({
    eyebrow: `${profile.role} · ${profile.company}`,
    title: profile.name,
    sub: profile.statement,
  });
}
