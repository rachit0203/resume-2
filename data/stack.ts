import type { Domain, Tech } from "./types";

export const domains: Domain[] = [
  { id: "salesforce", code: "A", name: "Salesforce & Agentforce", blurb: "Where I spend most working days." },
  { id: "interface", code: "B", name: "Interface", blurb: "What people see and touch." },
  { id: "services", code: "C", name: "Services", blurb: "APIs, auth and business logic." },
  { id: "data", code: "D", name: "Data", blurb: "Where state lives." },
  { id: "cloud", code: "E", name: "Cloud", blurb: "Where it all runs." },
  { id: "intelligence", code: "F", name: "Data science & ML", blurb: "Learning from data." },
  { id: "languages", code: "G", name: "Languages", blurb: "The fundamentals." },
  { id: "tooling", code: "H", name: "Tooling", blurb: "How the work gets done." },
];

export const techs: Tech[] = [
  // Salesforce & Agentforce
  {
    id: "salesforce",
    name: "Salesforce",
    domain: "salesforce",
    context: "The platform I build on day to day at The Adecco Group.",
    related: ["apex", "lwc", "flows", "agentforce"],
  },
  {
    id: "apex",
    name: "Apex",
    domain: "salesforce",
    context: "Server-side business logic, triggers and integration code on Salesforce.",
    related: ["salesforce", "java", "sf-integrations", "flows"],
  },
  {
    id: "lwc",
    name: "Lightning Web Components",
    domain: "salesforce",
    context: "Custom UI components on the Lightning platform — standards-based JavaScript and HTML.",
    related: ["javascript", "html", "css", "apex"],
  },
  {
    id: "flows",
    name: "Flows",
    domain: "salesforce",
    context: "Declarative automation — often the fastest way to remove a manual step.",
    related: ["apex", "agentforce"],
  },
  {
    id: "agentforce",
    name: "Agentforce",
    domain: "salesforce",
    context: "Building AI agents: topics, actions and the Apex and Flow logic they call.",
    related: ["prompt-builder", "flows", "apex", "salesforce"],
  },
  {
    id: "prompt-builder",
    name: "Prompt Builder",
    domain: "salesforce",
    context: "Prompt templates grounded in CRM data, used inside AI-powered workflows.",
    related: ["agentforce", "flows"],
  },
  {
    id: "sf-integrations",
    name: "Integrations",
    domain: "salesforce",
    context: "Connecting Salesforce with external systems through APIs.",
    related: ["rest", "apex"],
  },

  // Interface
  {
    id: "react",
    name: "React",
    domain: "interface",
    context: "Component-driven UIs for Vibely, the AI Resume Builder and the X clone.",
    projects: ["vibely", "ai-resume-builder", "x-clone"],
    related: ["javascript", "nextjs", "tailwind", "node"],
  },
  {
    id: "nextjs",
    name: "Next.js",
    domain: "interface",
    context: "This site — App Router, server components and static generation.",
    related: ["react", "tailwind"],
  },
  {
    id: "tailwind",
    name: "Tailwind CSS",
    domain: "interface",
    context: "Utility-first styling with a small design-token layer, including this site.",
    related: ["css", "nextjs", "react"],
  },
  {
    id: "html",
    name: "HTML",
    domain: "interface",
    context: "Semantic, accessible markup is the foundation of every interface.",
    projects: ["spotify-clone"],
    related: ["css", "javascript"],
  },
  {
    id: "css",
    name: "CSS",
    domain: "interface",
    context: "Layout, motion and responsive design — the Spotify clone was mostly a CSS exercise.",
    projects: ["spotify-clone"],
    related: ["html", "tailwind", "bootstrap"],
  },
  {
    id: "bootstrap",
    name: "Bootstrap",
    domain: "interface",
    context: "Quick responsive layouts for early projects.",
    related: ["css"],
  },

  // Services
  {
    id: "node",
    name: "Node.js",
    domain: "services",
    context: "Runtime for the APIs and real-time layer in my MERN projects.",
    projects: ["vibely", "x-clone", "ai-resume-builder"],
    related: ["express", "javascript", "mongodb"],
  },
  {
    id: "express",
    name: "Express",
    domain: "services",
    context: "Routing and middleware for REST APIs.",
    projects: ["vibely", "x-clone"],
    related: ["node", "rest", "jwt"],
  },
  {
    id: "rest",
    name: "REST APIs",
    domain: "services",
    context: "Designing resources and contracts — for web apps and for Salesforce integrations.",
    projects: ["vibely", "x-clone"],
    related: ["express", "sf-integrations", "jwt"],
  },
  {
    id: "jwt",
    name: "JWT",
    domain: "services",
    context: "Stateless authentication across the API and real-time layer in Vibely.",
    projects: ["vibely", "x-clone"],
    related: ["express", "rest"],
  },
  {
    id: "mongoose",
    name: "Mongoose",
    domain: "services",
    context: "Schemas and models on top of MongoDB.",
    projects: ["vibely"],
    related: ["mongodb", "node"],
  },

  // Data
  {
    id: "mongodb",
    name: "MongoDB",
    domain: "data",
    context: "Primary store for users, conversations and posts in my MERN projects.",
    projects: ["vibely", "x-clone"],
    related: ["mongoose", "node", "redis"],
  },
  {
    id: "postgresql",
    name: "PostgreSQL",
    domain: "data",
    context: "Relational modelling and SQL when the data has strong structure.",
    related: ["mongodb"],
  },
  {
    id: "redis",
    name: "Redis",
    domain: "data",
    context: "In-memory store for fast, short-lived state in Vibely.",
    projects: ["vibely"],
    related: ["mongodb", "node"],
  },

  // Cloud
  {
    id: "aws",
    name: "AWS",
    domain: "cloud",
    context: "Cloud Practitioner-level foundations, plus the AWS APAC Solutions Architecture virtual experience.",
    related: ["s3", "cloudfront", "cloudwatch", "beanstalk"],
  },
  {
    id: "s3",
    name: "S3",
    domain: "cloud",
    context: "Object storage and static hosting.",
    related: ["cloudfront", "aws"],
  },
  {
    id: "cloudfront",
    name: "CloudFront",
    domain: "cloud",
    context: "CDN in front of static assets.",
    related: ["s3", "aws"],
  },
  {
    id: "cloudwatch",
    name: "CloudWatch",
    domain: "cloud",
    context: "Logs, metrics and alarms.",
    related: ["aws", "beanstalk"],
  },
  {
    id: "beanstalk",
    name: "Elastic Beanstalk",
    domain: "cloud",
    context: "Managed deployment for web applications.",
    related: ["aws", "node", "cloudwatch"],
  },

  // Data science & ML
  {
    id: "pandas",
    name: "Pandas",
    domain: "intelligence",
    context: "Cleaning and shaping the medical datasets for the Disease Prediction models.",
    projects: ["disease-prediction"],
    related: ["python", "numpy", "sklearn"],
  },
  {
    id: "numpy",
    name: "NumPy",
    domain: "intelligence",
    context: "Numerical work underneath the data pipeline.",
    projects: ["disease-prediction"],
    related: ["pandas", "python"],
  },
  {
    id: "sklearn",
    name: "Scikit-learn",
    domain: "intelligence",
    context: "Trained and evaluated classifiers for heart disease, diabetes and Parkinson's.",
    projects: ["disease-prediction"],
    related: ["python", "pandas"],
  },
  {
    id: "matplotlib",
    name: "Matplotlib",
    domain: "intelligence",
    context: "Plots for exploratory analysis.",
    projects: ["disease-prediction"],
    related: ["seaborn", "pandas"],
  },
  {
    id: "seaborn",
    name: "Seaborn",
    domain: "intelligence",
    context: "Statistical visualisation to understand feature distributions.",
    projects: ["disease-prediction"],
    related: ["matplotlib", "pandas"],
  },

  // Languages
  {
    id: "javascript",
    name: "JavaScript",
    domain: "languages",
    context: "The language behind most of my web work, front to back — and inside LWC.",
    projects: ["vibely", "x-clone", "spotify-clone", "ai-resume-builder"],
    related: ["react", "node", "lwc"],
  },
  {
    id: "python",
    name: "Python",
    domain: "languages",
    context: "Data work and machine learning.",
    projects: ["disease-prediction"],
    related: ["pandas", "sklearn", "numpy"],
  },
  {
    id: "java",
    name: "Java",
    domain: "languages",
    context: "Object-oriented foundations — and the closest mental model to Apex.",
    related: ["apex", "cpp"],
  },
  {
    id: "cpp",
    name: "C++",
    domain: "languages",
    context: "Data structures and algorithms; how I learned to reason about complexity.",
    related: ["c", "java"],
  },
  {
    id: "c",
    name: "C",
    domain: "languages",
    context: "Systems fundamentals — memory, pointers and how programs actually run.",
    related: ["cpp"],
  },

  // Tooling
  {
    id: "git",
    name: "Git",
    domain: "tooling",
    context: "Small, well-described commits. Yes, the experience section is a git log.",
    related: ["github"],
  },
  {
    id: "github",
    name: "GitHub",
    domain: "tooling",
    context: "Code hosting, reviews and project history.",
    related: ["git", "copilot"],
  },
  {
    id: "vscode",
    name: "VS Code",
    domain: "tooling",
    context: "Where the code gets written.",
    related: ["copilot"],
  },
  {
    id: "copilot",
    name: "GitHub Copilot",
    domain: "tooling",
    context: "AI pair programming — useful for momentum, never a substitute for understanding.",
    related: ["vscode", "github"],
  },
];

export const techById = new Map(techs.map((t) => [t.id, t]));

/** Relationships are declared one way; the map treats them as undirected. */
export function relatedOf(id: string): string[] {
  const out = new Set(techById.get(id)?.related ?? []);
  for (const t of techs) if (t.related?.includes(id)) out.add(t.id);
  out.delete(id);
  return [...out];
}
