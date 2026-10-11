import { getProject, projects } from "@/data/projects";
import { OG_SIZE, ogImage } from "@/lib/og";

export const alt = "Case study — Rachit Mishra";
export const size = OG_SIZE;
export const contentType = "image/png";

export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

export default async function Image({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const p = getProject(slug);
  return ogImage({
    eyebrow: `Case study · ${p?.kind ?? "Project"}`,
    title: p?.name ?? "Case study",
    sub: p?.tagline ?? "",
  });
}
