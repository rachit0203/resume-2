import type { ArchivedProject, Project } from "./types";

const GH = "https://github.com/rachit0203";

export const projects: Project[] = [
  {
    slug: "vibely",
    name: "Vibely",
    tagline: "Real-time chat, built on the MERN stack.",
    summary:
      "A real-time messaging app with authenticated users, persistent conversations and live message delivery.",
    kind: "Product",
    role: "Design, frontend & backend",
    stack: ["React", "Node.js", "Express", "MongoDB", "Redis", "JWT"],
    problem:
      "Chat looks simple from the outside, but it forces you to solve several hard parts of web engineering at once: authentication, persistent state, and pushing updates to clients the moment they happen.",
    why: "I wanted a project that couldn't be faked with a static UI — something where the API, the database and the real-time layer all had to work together.",
    architecture: {
      nodes: [
        { id: "client", label: "React client", sub: "UI · socket client", x: 16, y: 122 },
        { id: "api", label: "Express API", sub: "REST · JWT auth", x: 316, y: 24 },
        { id: "rt", label: "Real-time layer", sub: "WebSocket events", x: 316, y: 220, accent: true },
        { id: "mongo", label: "MongoDB", sub: "users · chats · messages", x: 616, y: 24 },
        { id: "redis", label: "Redis", sub: "ephemeral state", x: 616, y: 220 },
      ],
      edges: [
        { from: "client", to: "api", label: "HTTPS" },
        { from: "client", to: "rt", label: "socket" },
        { from: "api", to: "mongo", label: "Mongoose" },
        { from: "rt", to: "mongo", label: "persist", dashed: true },
        { from: "rt", to: "redis", label: "presence" },
      ],
      notes: [
        "REST endpoints handle auth, users and message history; a persistent socket connection handles live delivery.",
        "MongoDB, through Mongoose models, is the source of truth for users, conversations and messages.",
        "Redis holds fast, short-lived state that doesn't belong in the primary database.",
      ],
    },
    decisions: [
      {
        title: "JWT for stateless auth",
        body: "Signed tokens let both the REST API and the real-time layer verify a user without a shared server-side session.",
      },
      {
        title: "Redis for ephemeral state",
        body: "Data like presence changes constantly and doesn't need to be durable. Keeping it in memory keeps MongoDB focused on data that matters long-term.",
      },
      {
        title: "History and live delivery are separate paths",
        body: "Loading history over REST and streaming new messages over sockets keeps each path simple and easier to reason about.",
      },
    ],
    challenges: [
      {
        title: "Keeping clients in sync",
        body: "A message sent from one client should appear once, in order, on every other client in the conversation.",
      },
      {
        title: "Authenticating socket connections",
        body: "Carrying the same identity from the HTTP API into the long-lived real-time connection.",
      },
    ],
    links: { repo: `${GH}/vibely`, demo: undefined },
    draft: true,
  },
  {
    slug: "ai-resume-builder",
    name: "AI Resume Builder",
    tagline: "Structured resumes, written with AI assistance.",
    summary:
      "An app that helps people build a resume section by section, using a language model to draft and improve the content.",
    kind: "Product",
    role: "Design, frontend & backend",
    stack: ["React", "Node.js", "LLM API", "Prompt Engineering"],
    problem:
      "Writing a resume is mostly staring at an empty field. People know what they did — the hard part is phrasing it clearly.",
    why: "A practical way to put a language model behind a real product feature, with structured input and output instead of a free-form chat box.",
    architecture: {
      nodes: [
        { id: "editor", label: "Resume editor", sub: "structured sections", x: 16, y: 122 },
        { id: "api", label: "API", sub: "validation · prompts", x: 316, y: 122 },
        { id: "llm", label: "LLM", sub: "draft · rewrite", x: 616, y: 24, accent: true },
        { id: "store", label: "Storage", sub: "resume data", x: 616, y: 220 },
        { id: "export", label: "Export", sub: "print-ready output", x: 16, y: 280 },
      ],
      edges: [
        { from: "editor", to: "api", label: "section + intent" },
        { from: "api", to: "llm", label: "prompt" },
        { from: "api", to: "store", label: "save" },
        { from: "editor", to: "export", dashed: true },
      ],
      notes: [
        "The editor works with typed resume sections rather than one big document.",
        "The API builds prompts from a section and the user's intent, then returns suggestions in the same shape.",
        "Suggestions are applied only when the user accepts them.",
      ],
    },
    decisions: [
      {
        title: "Structured data, not a document",
        body: "Storing resumes as typed sections makes content reusable across templates and gives the model a predictable input.",
      },
      {
        title: "AI as an assistant, not an author",
        body: "Suggestions are drafts the user edits. The person stays in control of their own resume.",
      },
    ],
    challenges: [
      {
        title: "Predictable model output",
        body: "Shaping prompts so each response fits the section it's meant for, instead of generic filler.",
      },
    ],
    links: { repo: `${GH}/ai-resume-builder`, demo: undefined },
    draft: true,
  },
  {
    slug: "disease-prediction",
    name: "Multiple Disease Prediction",
    tagline: "Three ML classifiers behind one simple interface.",
    summary:
      "A machine learning system that predicts heart disease, diabetes and Parkinson's disease from clinical inputs.",
    kind: "ML",
    role: "ML Intern — Softpro India",
    stack: ["Python", "Pandas", "NumPy", "Scikit-learn", "Matplotlib", "Seaborn"],
    problem:
      "Screening for several conditions usually means several separate tools. The goal was one interface where a user enters medical parameters and gets a prediction for the relevant condition.",
    why: "Built during my ML internship at Softpro India — my first end-to-end run from raw data through cleaning, modelling and evaluation to something a person could actually use.",
    architecture: {
      nodes: [
        { id: "data", label: "Datasets", sub: "3 × tabular", x: 16, y: 24 },
        { id: "prep", label: "Preprocessing", sub: "Pandas · NumPy", x: 316, y: 24 },
        { id: "train", label: "Training", sub: "Scikit-learn", x: 616, y: 24 },
        { id: "eda", label: "EDA", sub: "Matplotlib · Seaborn", x: 316, y: 180 },
        { id: "models", label: "Models × 3", sub: "heart · diabetes · parkinson's", x: 616, y: 180, accent: true },
        { id: "inputs", label: "Clinical inputs", sub: "user parameters", x: 16, y: 336 },
        { id: "ui", label: "Prediction UI", sub: "inputs → result", x: 316, y: 336 },
      ],
      edges: [
        { from: "data", to: "prep" },
        { from: "prep", to: "train", label: "features" },
        { from: "prep", to: "eda", dashed: true },
        { from: "train", to: "models", label: "persist" },
        { from: "inputs", to: "ui" },
        { from: "ui", to: "models", label: "inference" },
      ],
      notes: [
        "Each disease has its own dataset, preprocessing and classifier — they share a pipeline shape, not a model.",
        "Exploratory analysis informed feature choices before training.",
        "Trained models are saved and loaded by the interface for inference.",
      ],
    },
    decisions: [
      {
        title: "One model per disease",
        body: "The three problems have different features and labels. Separate classifiers are simpler to train, evaluate and explain.",
      },
      {
        title: "Evaluate before choosing",
        body: "Candidate models were compared on held-out data rather than trusting training accuracy.",
      },
    ],
    challenges: [
      {
        title: "Small medical datasets",
        body: "Making sure metrics reflected real predictive power rather than the majority class.",
      },
      {
        title: "Honest framing",
        body: "It's a screening aid, not a diagnosis — and the interface should say so.",
      },
    ],
    links: { repo: `${GH}/multiple-disease-prediction`, demo: undefined },
    draft: true,
  },
  {
    slug: "x-clone",
    name: "X Clone",
    tagline: "A social feed, rebuilt to understand how one works.",
    summary: "A social media app inspired by X — posting, following and a personalised timeline.",
    kind: "Clone",
    role: "Frontend & backend",
    stack: ["React", "Node.js", "Express", "MongoDB", "JWT"],
    problem:
      "A timeline looks like a list, but behind it are relationships: who follows whom, what each person should see, and in what order.",
    why: "Rebuilding a familiar product removes the question of what it should do and leaves the interesting part — how to make it work.",
    architecture: {
      nodes: [
        { id: "client", label: "React client", sub: "feed · compose · profile", x: 16, y: 100 },
        { id: "api", label: "REST API", sub: "posts · follows · users", x: 316, y: 100, accent: true },
        { id: "db", label: "MongoDB", sub: "users · posts · follows", x: 616, y: 24 },
        { id: "auth", label: "Auth", sub: "JWT", x: 616, y: 180 },
      ],
      edges: [
        { from: "client", to: "api", label: "HTTPS" },
        { from: "api", to: "db", label: "queries" },
        { from: "api", to: "auth", label: "verify" },
      ],
      notes: [
        "Follows are stored as their own relationship, so a timeline is a query rather than a special case.",
        "The API exposes resources for posts, users and follows.",
      ],
    },
    decisions: [
      {
        title: "Model relationships explicitly",
        body: "Treating follows as first-class data keeps timeline logic simple and makes profile views cheap.",
      },
    ],
    challenges: [
      {
        title: "Building the timeline",
        body: "Assembling a feed from followed accounts efficiently and in the right order.",
      },
    ],
    links: { repo: `${GH}/x-clone`, demo: undefined },
    draft: true,
  },
  {
    slug: "spotify-clone",
    name: "Spotify Clone",
    tagline: "A music player interface, down to the details.",
    summary:
      "A Spotify-inspired streaming interface with a persistent player, library views and playback controls.",
    kind: "Clone",
    role: "Frontend",
    stack: ["HTML", "CSS", "JavaScript", "UI State"],
    problem:
      "Media apps live or die by their UI state: what's playing, what's next, and what happens when you navigate while the music keeps going.",
    why: "A focused frontend exercise. Recreating a polished interface is the fastest way to learn what makes it feel polished.",
    architecture: {
      nodes: [
        { id: "views", label: "Library views", sub: "browse · playlists", x: 16, y: 24 },
        { id: "controls", label: "Controls", sub: "play · seek · volume", x: 16, y: 180 },
        { id: "state", label: "Player state", sub: "track · queue · progress", x: 316, y: 100, accent: true },
        { id: "audio", label: "Audio element", sub: "playback events", x: 616, y: 100 },
      ],
      edges: [
        { from: "views", to: "state", label: "select" },
        { from: "controls", to: "state", label: "commands" },
        { from: "state", to: "audio", label: "sync" },
      ],
      notes: [
        "Player state lives outside individual views, so playback continues while the user navigates.",
        "The UI listens to audio events instead of guessing where playback is.",
      ],
    },
    decisions: [
      {
        title: "A single source of truth for playback",
        body: "Every control reads from and writes to one player state, which keeps the UI consistent.",
      },
    ],
    challenges: [
      {
        title: "Keeping UI and audio in step",
        body: "Progress, time and controls have to follow the audio element's events precisely.",
      },
    ],
    links: { repo: `${GH}/spotify-clone`, demo: undefined },
    draft: true,
  },
];

export const archive: ArchivedProject[] = [
  { name: "Portfolio v1", note: "The previous version of this site", href: GH },
];

export const getProject = (slug: string) => projects.find((p) => p.slug === slug);
