"use client";

import { useRouter } from "next/navigation";
import { useEffect, useRef, useState, type KeyboardEvent } from "react";
import { currently } from "@/data/content";
import { timeline } from "@/data/experience";
import { profile } from "@/data/profile";
import { projects } from "@/data/projects";
import { domains, techs } from "@/data/stack";
import { mailto } from "@/lib/site";
import { Close } from "@/components/ui/Icons";

type Kind = "in" | "out" | "dim" | "ok" | "err" | "accent";
type Line = { kind: Kind; text: string };

const PROMPT = "rachit@portfolio:~$";

const COMMANDS = ["help", "whoami", "ls", "open", "stack", "log", "now", "contact", "clear", "exit"];
const OPEN_TARGETS = [...projects.map((p) => p.slug), "github", "linkedin", "resume"];

const out = (text: string, kind: Kind = "out"): Line => ({ kind, text });

const HELP: Line[] = [
  out("available commands", "dim"),
  out("  whoami          who is this"),
  out("  ls              list projects"),
  out("  open <name>     open a project, github, linkedin or resume"),
  out("  stack           the stack, grouped by domain"),
  out("  log             experience, git-style"),
  out("  now             what I'm exploring"),
  out("  contact         how to reach me"),
  out("  clear           clear the screen"),
  out("  exit            close the terminal"),
  out("tab completes · ↑↓ history · esc closes", "dim"),
];

const WELCOME: Line[] = [
  out(`${profile.name} — portfolio shell v1.0`, "accent"),
  out("Type `help` to see what this can do.", "dim"),
];

export default function Terminal({ open, onClose }: { open: boolean; onClose: () => void }) {
  const router = useRouter();
  const dialogRef = useRef<HTMLDialogElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const [lines, setLines] = useState<Line[]>(WELCOME);
  const [value, setValue] = useState("");
  const [history, setHistory] = useState<string[]>([]);
  const [cursor, setCursor] = useState(-1);

  useEffect(() => {
    const d = dialogRef.current;
    if (!d) return;
    if (open && !d.open) {
      d.showModal();
      inputRef.current?.focus();
    } else if (!open && d.open) d.close();
  }, [open]);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight });
  }, [lines]);

  const navigate = (href: string, external = false) => {
    onClose();
    if (external) window.open(href, "_blank", "noopener,noreferrer");
    else router.push(href);
  };

  function execute(raw: string): Line[] | "clear" {
    const input = raw.trim();
    const [cmd = "", ...args] = input.split(/\s+/);
    const arg = args.join(" ").toLowerCase();

    switch (cmd.toLowerCase()) {
      case "":
        return [];
      case "help":
        return HELP;
      case "whoami":
        return [
          out(profile.name, "accent"),
          out(`${profile.role} @ ${profile.company}`),
          out(`${profile.disciplines.join(" · ")} — based in ${profile.location}`, "dim"),
        ];
      case "ls":
      case "./projects":
        return [
          ...projects.map((p) => out(`${p.slug.padEnd(22)}${p.tagline}`)),
          out("open <name> to read the case study", "dim"),
        ];
      case "open": {
        if (!arg) return [out("usage: open <name>. Try `ls`.", "err")];
        if (arg === "github") return navigate(profile.links.github, true), [out("opening github…", "ok")];
        if (arg === "linkedin") return navigate(profile.links.linkedin, true), [out("opening linkedin…", "ok")];
        if (arg === "resume") return navigate(profile.links.resume, true), [out("opening resume…", "ok")];
        const p = projects.find((x) => x.slug === arg || x.name.toLowerCase() === arg);
        if (p) return navigate(`/work/${p.slug}`), [out(`opening ${p.slug}…`, "ok")];
        return [out(`open: ${arg}: no such project`, "err")];
      }
      case "stack":
      case "./skills":
        return domains.map((d) =>
          out(`${d.name.padEnd(26)}${techs.filter((t) => t.domain === d.id).map((t) => t.name).join(", ")}`),
        );
      case "log":
      case "git":
        if (cmd === "git" && arg === "blame") {
          return [out("^f4c21e9 (Rachit Mishra  2am)  every single line of this site", "accent"), out("no regrets.", "dim")];
        }
        if (cmd === "git" && arg !== "log") return [out(`git: '${arg}' is not a git command here. Try \`git log\` or \`git blame\`.`, "err")];
        return timeline.map((t) =>
          out(`* ${t.hash}${t.refs ? ` (${t.refs.join(", ")})` : ""} ${t.title} — ${t.org}`, t.head ? "accent" : "out"),
        );
      case "now":
      case "top":
        return currently.map((c) => out(`${String(c.pid).padEnd(7)}${c.state.padEnd(13)}${c.label}`));
      case "contact":
      case "email":
        return [out(profile.email, "accent"), out("or: `sudo hire rachit`", "dim")];
      case "sudo":
        if (arg === "hire rachit" || arg === "hire-rachit") {
          window.setTimeout(() => (window.location.href = mailto("Let's work together")), 900);
          return [out("[sudo] password for recruiter: ********", "dim"), out("access granted. opening mail client…", "ok")];
        }
        return [out(`${profile.firstName.toLowerCase()} is not in the sudoers file. This incident will be reported.`, "err")];
      case "rm":
        return [out("nice try.", "err")];
      case "cd":
        return [out("there's only one directory here, and you're in it.", "dim")];
      case "clear":
        return "clear";
      case "exit":
        onClose();
        return [];
      default:
        return [out(`command not found: ${cmd}. Try \`help\`.`, "err")];
    }
  }

  function submit() {
    const result = execute(value);
    if (result === "clear") setLines([]);
    else setLines((l) => [...l, { kind: "in", text: value }, ...result]);
    if (value.trim()) setHistory((h) => [...h, value]);
    setCursor(-1);
    setValue("");
  }

  function onKeyDown(e: KeyboardEvent<HTMLInputElement>) {
    if (e.key === "Enter") {
      e.preventDefault();
      submit();
    } else if (e.key === "ArrowUp" && history.length) {
      e.preventDefault();
      const next = cursor === -1 ? history.length - 1 : Math.max(0, cursor - 1);
      setCursor(next);
      setValue(history[next]);
    } else if (e.key === "ArrowDown" && cursor !== -1) {
      e.preventDefault();
      const next = cursor + 1;
      if (next >= history.length) {
        setCursor(-1);
        setValue("");
      } else {
        setCursor(next);
        setValue(history[next]);
      }
    } else if (e.key === "Tab") {
      e.preventDefault();
      const [cmd, ...rest] = value.split(" ");
      if (rest.length === 0) {
        const match = COMMANDS.filter((c) => c.startsWith(cmd));
        if (match.length === 1) setValue(`${match[0]} `);
      } else if (cmd === "open") {
        const match = OPEN_TARGETS.filter((t) => t.startsWith(rest.join(" ")));
        if (match.length === 1) setValue(`open ${match[0]}`);
      }
    } else if (e.key === "l" && e.ctrlKey) {
      e.preventDefault();
      setLines([]);
    }
  }

  const color: Record<Kind, string> = {
    in: "text-paper",
    out: "text-paper/80",
    dim: "text-mute",
    ok: "text-ok",
    err: "text-signal",
    accent: "text-signal",
  };

  return (
    <dialog
      ref={dialogRef}
      aria-label="Terminal"
      onClose={onClose}
      onClick={(e) => e.target === dialogRef.current && onClose()}
      className="m-auto w-[min(760px,calc(100vw-1.5rem))] overflow-hidden rounded-md border border-line-strong bg-ink p-0 shadow-[0_40px_120px_-30px_rgb(0_0_0/0.9)] backdrop:bg-transparent"
    >
      <div className="flex h-10 items-center gap-2 border-b border-line bg-ink-2 px-4">
        <span aria-hidden className="size-2.5 rounded-full bg-signal" />
        <span aria-hidden className="size-2.5 rounded-full bg-line-strong" />
        <span aria-hidden className="size-2.5 rounded-full bg-line-strong" />
        <p className="ml-3 flex-1 font-mono text-[11px] text-mute">rachit@portfolio — zsh</p>
        <button
          type="button"
          onClick={onClose}
          className="grid size-7 place-items-center rounded-[3px] text-mute hover:bg-white/5 hover:text-paper"
          aria-label="Close terminal"
        >
          <Close />
        </button>
      </div>

      <div
        ref={scrollRef}
        className="h-[min(440px,60vh)] overflow-y-auto overscroll-contain px-4 py-4 font-mono text-[13px] leading-6"
        onClick={() => inputRef.current?.focus()}
      >
        <div role="log" aria-live="polite" aria-relevant="additions">
          {lines.map((line, i) => (
            <p key={i} className={`whitespace-pre-wrap break-words ${color[line.kind]}`}>
              {line.kind === "in" && (
                <span className="mr-2 text-signal" aria-hidden>
                  {PROMPT}
                </span>
              )}
              {line.text}
            </p>
          ))}
        </div>
        <form
          className="flex items-center"
          onSubmit={(e) => {
            e.preventDefault();
            submit();
          }}
        >
          <label htmlFor="terminal-input" className="mr-2 shrink-0 text-signal">
            <span aria-hidden>{PROMPT}</span>
            <span className="sr-only">Command</span>
          </label>
          <input
            id="terminal-input"
            ref={inputRef}
            value={value}
            onChange={(e) => setValue(e.target.value)}
            onKeyDown={onKeyDown}
            autoComplete="off"
            autoCapitalize="off"
            autoCorrect="off"
            spellCheck={false}
            className="min-w-0 flex-1 bg-transparent text-paper caret-signal outline-none"
          />
        </form>
      </div>
    </dialog>
  );
}
