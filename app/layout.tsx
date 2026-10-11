import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono, Instrument_Serif } from "next/font/google";
import type { ReactNode } from "react";
import { profile } from "@/data/profile";
import { projects } from "@/data/projects";
import { siteTitle, siteUrl } from "@/lib/site";
import { MotionProvider } from "@/components/animations/MotionProvider";
import { Footer } from "@/components/layout/Footer";
import { Nav } from "@/components/layout/Nav";
import { UIProvider } from "@/components/layout/UIProvider";
import "./globals.css";

const sans = Geist({ subsets: ["latin"], variable: "--font-geist-sans", display: "swap" });
const mono = Geist_Mono({ subsets: ["latin"], variable: "--font-geist-mono", display: "swap" });
const serif = Instrument_Serif({
  subsets: ["latin"],
  weight: "400",
  style: "italic",
  variable: "--font-instrument-serif",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: { default: siteTitle, template: `%s — ${profile.name}` },
  description: profile.description,
  applicationName: profile.name,
  authors: [{ name: profile.name, url: siteUrl }],
  creator: profile.name,
  keywords: [
    profile.name,
    "Software Engineer",
    "Salesforce Developer",
    "Agentforce",
    "Apex",
    "Lightning Web Components",
    "Full-stack Developer",
    "React",
    "Next.js",
    "Node.js",
    "AWS",
    "Portfolio",
  ],
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    url: "/",
    siteName: profile.name,
    title: siteTitle,
    description: profile.description,
    locale: "en_US",
  },
  twitter: { card: "summary_large_image", title: siteTitle, description: profile.description },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  themeColor: "#0b0b0c",
  colorScheme: "dark",
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Person",
      "@id": `${siteUrl}/#person`,
      name: profile.name,
      url: siteUrl,
      email: `mailto:${profile.email}`,
      jobTitle: profile.role,
      worksFor: { "@type": "Organization", name: profile.company },
      alumniOf: { "@type": "CollegeOrUniversity", name: profile.education.school },
      sameAs: [profile.links.github, profile.links.linkedin],
      knowsAbout: ["Software Engineering", "Salesforce", "Agentforce", "Apex", "Lightning Web Components", "React", "Next.js", "Node.js", "MongoDB", "AWS", "Machine Learning"],
    },
    {
      "@type": "WebSite",
      "@id": `${siteUrl}/#website`,
      url: siteUrl,
      name: siteTitle,
      author: { "@id": `${siteUrl}/#person` },
      hasPart: projects.map((p) => ({ "@type": "CreativeWork", name: p.name, url: `${siteUrl}/work/${p.slug}` })),
    },
  ],
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" data-scroll-behavior="smooth" className={`${sans.variable} ${mono.variable} ${serif.variable}`}>
      <body className="grain min-h-dvh overflow-x-clip">
        <div id="top" />
        <a
          href="#main"
          className="fixed left-4 top-3 z-[99] -translate-y-20 rounded-[3px] bg-paper px-4 py-2 text-sm font-medium text-ink transition-transform focus-visible:translate-y-0"
        >
          Skip to content
        </a>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c") }}
        />
        <UIProvider>
          <MotionProvider>
            <Nav />
            <main id="main" tabIndex={-1} className="outline-none">
              {children}
            </main>
            <Footer />
          </MotionProvider>
        </UIProvider>
      </body>
    </html>
  );
}
