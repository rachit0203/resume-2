import type { TimelineEntry } from "./types";

// Newest first, like `git log`. Add `period` values (e.g. "2024 — now") when ready.
export const timeline: TimelineEntry[] = [
  {
    id: "adecco",
    hash: "f4c21e9",
    lane: 0,
    head: true,
    refs: ["HEAD → main"],
    kind: "Work",
    title: "Software Engineer",
    org: "The Adecco Group",
    summary:
      "Building on Salesforce — Apex, Lightning Web Components, Flows and Agentforce — plus the integrations and automation around them.",
    details: [
      "Develop Apex and Lightning Web Components for enterprise workflows.",
      "Replace manual processes with Flows and automation.",
      "Build AI-powered workflows with Agentforce and Prompt Builder.",
      "Integrate Salesforce with other systems through APIs.",
    ],
  },
  {
    id: "projects",
    hash: "9b07d3a",
    lane: 1,
    mergeAbove: true,
    refs: ["projects"],
    kind: "Projects",
    title: "Building end to end",
    org: "Personal projects",
    summary:
      "Vibely, the AI Resume Builder, an X clone and a Spotify clone — each one chosen to learn a different layer of the stack.",
    details: [
      "Real-time systems and auth with Vibely (MERN + Redis).",
      "LLM-backed product features with the AI Resume Builder.",
      "Relational data and feeds with the X clone; UI state with the Spotify clone.",
    ],
    project: "vibely",
  },
  {
    id: "virtual",
    hash: "5e8a1f0",
    lane: 1,
    kind: "Programs",
    title: "Virtual experience programs",
    org: "AWS · Deloitte",
    summary: "AWS APAC Solutions Architecture and Deloitte Australia Technology job simulations.",
    details: [
      "AWS APAC — Solutions Architecture: proposing a scalable hosting architecture for a client scenario.",
      "Deloitte Australia — Technology: development and data tasks in a consulting context.",
      // TODO: confirm AWS Cloud Practitioner status (certified vs. in progress).
      "AWS Cloud Practitioner: core services, pricing and architecture principles.",
    ],
  },
  {
    id: "softpro",
    hash: "c3d9b72",
    lane: 1,
    forkBelow: true,
    refs: ["ml-internship"],
    kind: "Internship",
    title: "Machine Learning Intern",
    org: "Softpro India",
    summary: "Built a Multiple Disease Prediction system for heart disease, diabetes and Parkinson's.",
    details: [
      "Cleaned and explored medical datasets with Pandas, NumPy, Matplotlib and Seaborn.",
      "Trained and evaluated Scikit-learn classifiers for each condition.",
      "Put the models behind a single prediction interface.",
    ],
    project: "disease-prediction",
  },
  {
    id: "biet",
    hash: "0a1b2c3",
    lane: 0,
    refs: ["init"],
    kind: "Education",
    title: "Computer Science & Engineering",
    org: "BIET Jhansi",
    summary:
      "Graduated from Bundelkhand Institute of Engineering and Technology with a degree in Computer Science.",
    details: [
      "Data structures, algorithms, operating systems, databases and networks.",
      "Started with C and C++, then Java and Python.",
    ],
  },
];
