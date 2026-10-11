export const profile = {
  name: "Rachit Mishra",
  firstName: "Rachit",
  role: "Software Engineer",
  company: "The Adecco Group",
  // TODO: replace with your city, e.g. "Noida, India".
  location: "India",
  timeZone: "Asia/Kolkata",
  timeZoneLabel: "IST",
  email: "mishrarachitalld@gmail.com",
  links: {
    // TODO: replace with your real profiles.
    github: "https://github.com/your-username",
    linkedin: "https://www.linkedin.com/in/your-handle",
    // TODO: add your resume at public/resume.pdf.
    resume: "/resume.pdf",
  },
  education: {
    school: "Bundelkhand Institute of Engineering and Technology",
    short: "BIET Jhansi",
    field: "Computer Science & Engineering",
  },
  disciplines: ["Salesforce", "Full-stack", "Cloud", "AI"],
  statement: "I build the systems behind simple experiences.",
  intro:
    "Software engineer at The Adecco Group, working across Salesforce, Agentforce and full-stack web. I care about how the pieces of a system fit together — data, APIs, automation — and about making the result feel simple for the person using it.",
  description:
    "Rachit Mishra is a software engineer at The Adecco Group building Salesforce, Agentforce and full-stack systems — from Apex, Lightning Web Components and Flows to React, Node.js and AWS.",
} as const;
