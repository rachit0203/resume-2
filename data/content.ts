import type { CurrentItem, Principle } from "./types";

export const principles: Principle[] = [
  {
    id: "users",
    title: "Build for real users",
    body: "I'd rather ship one thing people use than ten that only fill a GitHub grid. Every project starts with who it's for and what gets easier for them.",
    practice: ["start from the problem", "ship, observe, iterate"],
  },
  {
    id: "system",
    title: "Understand the system",
    body: "Before writing code I want to know how data moves: which part owns it, what happens when a call fails, where the boundaries are. Good interfaces come from understanding what sits underneath.",
    practice: ["data flow first", "explicit boundaries", "failure paths"],
  },
  {
    id: "automate",
    title: "Automate the repetitive",
    body: "If something is done by hand twice, it's a candidate for a Flow, a script or an agent. Much of my Salesforce work is exactly that — turning manual steps into reliable, increasingly AI-assisted workflows.",
    practice: ["Flows", "Apex", "Agentforce actions"],
  },
  {
    id: "learn",
    title: "Keep learning",
    body: "Cloud, distributed systems and AI agents move fast. I learn by building small things end to end, then going one layer deeper than I strictly need to.",
    practice: ["build to learn", "one layer deeper"],
  },
];

// States describe what I'm doing with a topic — not how good I am at it.
export const currently: CurrentItem[] = [
  { pid: 1024, process: "agentforce", label: "AI agents & Agentforce", state: "running", note: "Designing agent topics and actions at work." },
  { pid: 1061, process: "genai", label: "Generative AI", state: "prototyping", note: "Prompt design, grounding and structured output." },
  { pid: 1098, process: "backend-arch", label: "Backend architecture", state: "prototyping", note: "Service boundaries, queues and caching." },
  { pid: 1135, process: "docker", label: "Docker", state: "exploring", note: "Containerising small Node services." },
  { pid: 1172, process: "kubernetes", label: "Kubernetes", state: "exploring", note: "Deployments, services and scheduling." },
  { pid: 1209, process: "aws", label: "Cloud engineering", state: "exploring", note: "Going deeper on AWS beyond the fundamentals." },
  { pid: 1246, process: "kafka", label: "Kafka", state: "reading", note: "Event streams, partitions and consumer groups." },
  { pid: 1283, process: "dist-sys", label: "Distributed systems", state: "reading", note: "Consistency, replication and failure." },
];
