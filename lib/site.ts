import { profile } from "@/data/profile";

function resolveSiteUrl() {
  if (process.env.NEXT_PUBLIC_SITE_URL) return process.env.NEXT_PUBLIC_SITE_URL;
  if (process.env.VERCEL_PROJECT_PRODUCTION_URL) return `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`;
  return "https://resume-2-six-ruby.vercel.app";
}

export const siteUrl = resolveSiteUrl().replace(/\/$/, "");

export const siteTitle = `${profile.name} — ${profile.role}`;

export const mailto = (subject = "Hello Rachit") =>
  `mailto:${profile.email}?subject=${encodeURIComponent(subject)}`;
