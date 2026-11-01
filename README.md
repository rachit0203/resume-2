# Rachit Mishra | Portfolio & Resume

A modern portfolio and resume website for Rachit Mishra, built with Next.js and designed to showcase software engineering work, technical strengths, experience, and selected projects.

The site highlights a systems-first approach to software development, with focus areas spanning Salesforce, full-stack engineering, cloud platforms, and AI-driven workflows.

## Overview

This project is a personal portfolio site that presents:

- A professional introduction and personal statement
- Experience and commit-history style timeline
- Selected work and case studies
- Technology stack overview by domain and responsibility
- Current focus areas and active work streams
- Contact and profile links

## Tech Stack

- Next.js 16
- React 19
- TypeScript
- Tailwind CSS
- ESLint
- Motion / animation utilities

## Project Structure

```bash
.
├── app/                 # App routes and metadata
├── components/          # Reusable UI and page sections
├── data/                # Profile, projects, experience, and content data
├── lib/                 # Shared utilities and helpers
├── public/              # Static assets (if added later)
├── .gitignore
├── eslint.config.mjs
├── next.config.ts
├── package.json
├── postcss.config.mjs
├── tsconfig.json
├── README.md
└── package-lock.json
```

## Key Files

- `data/profile.ts` — personal details, role, socials, and bio
- `data/projects.ts` — project and case study data
- `data/experience.ts` — work history and timeline entries
- `data/stack.ts` — technology map and categories
- `app/page.tsx` — homepage composition and sections

## Getting Started

### Prerequisites

- Node.js 18 or later
- npm

### Install dependencies

```bash
npm install
```

### Run locally

```bash
npm run dev
```

Then open:

```bash
http://localhost:3000
```

## Available Scripts

```bash
npm run dev       # Start the development server
npm run build     # Create a production build
npm run start     # Run the production build locally
npm run lint      # Run ESLint checks
npm run typecheck # Run TypeScript checks
```

## Customization

Update the profile and portfolio content by editing the files under `data/`:

- `data/profile.ts`
- `data/projects.ts`
- `data/experience.ts`
- `data/content.ts`
- `data/sections.ts`

You can also refine the visual structure and layout in `app/` and `components/`.

## Deployment

This app is ready to deploy on platforms like Vercel, which works well with Next.js.

Typical deployment flow:

1. Push the repository to GitHub
2. Import it into Vercel
3. Configure the project as a Next.js app
4. Deploy

## Notes

This repository is a personal portfolio site, so content such as company names, profile links, education details, and contact information should be updated to match the current owner and career profile.

## Contact

For professional inquiries, use the email and social profiles configured in `data/profile.ts`.
