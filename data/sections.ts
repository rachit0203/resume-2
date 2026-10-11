export const sections = [
  { id: "about", label: "About", index: "01" },
  { id: "work", label: "Work", index: "02" },
  { id: "stack", label: "Stack", index: "03" },
  { id: "experience", label: "Experience", index: "04" },
  { id: "now", label: "Now", index: "05" },
  { id: "contact", label: "Contact", index: "06" },
] as const;

export const navSections = sections.filter((s) => s.id !== "now");

export const SHEET_TOTAL = String(sections.length).padStart(2, "0");
