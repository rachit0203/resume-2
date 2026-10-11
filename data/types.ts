export type ArchNode = {
  id: string;
  label: string;
  sub?: string;
  /** Top-left position inside an 800-wide canvas. */
  x: number;
  y: number;
  accent?: boolean;
};

export type ArchEdge = {
  from: string;
  to: string;
  label?: string;
  dashed?: boolean;
};

export type Architecture = {
  nodes: ArchNode[];
  edges: ArchEdge[];
  notes: string[];
};

export type Note = { title: string; body: string };

export type ProjectImage = { src: string; alt: string; width: number; height: number };

export type Project = {
  slug: string;
  name: string;
  tagline: string;
  summary: string;
  kind: "Product" | "Clone" | "ML";
  role: string;
  stack: string[];
  problem: string;
  why: string;
  architecture: Architecture;
  decisions: Note[];
  challenges: Note[];
  links: { repo?: string; demo?: string };
  images?: ProjectImage[];
  /** Copy drafted from the brief — review before publishing. */
  draft?: boolean;
};

export type ArchivedProject = { name: string; note: string; href: string };

export type DomainId =
  | "languages"
  | "interface"
  | "services"
  | "data"
  | "intelligence"
  | "cloud"
  | "salesforce"
  | "tooling";

export type Domain = { id: DomainId; code: string; name: string; blurb: string };

export type Tech = {
  id: string;
  name: string;
  domain: DomainId;
  context: string;
  projects?: string[];
  related?: string[];
};

export type TimelineEntry = {
  id: string;
  hash: string;
  lane: 0 | 1;
  refs?: string[];
  head?: boolean;
  /** Branch rejoins main above this row (newest-first log). */
  mergeAbove?: boolean;
  /** Branch leaves main below this row (newest-first log). */
  forkBelow?: boolean;
  kind: string;
  title: string;
  org: string;
  period?: string;
  summary: string;
  details: string[];
  project?: string;
};

export type ProcessState = "running" | "prototyping" | "exploring" | "reading";

export type CurrentItem = {
  pid: number;
  process: string;
  label: string;
  state: ProcessState;
  note: string;
};

export type Principle = {
  id: "users" | "system" | "automate" | "learn";
  title: string;
  body: string;
  practice: string[];
};
