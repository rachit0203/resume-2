"use client";

import { useState } from "react";
import { profile } from "@/data/profile";
import { cn } from "@/lib/cn";
import { useIsMac } from "@/lib/hooks";
import { Check, Copy, Prompt } from "./Icons";
import { useUI } from "@/components/layout/UIProvider";

export function CopyEmail({ className }: { className?: string }) {
  const { toast } = useUI();
  const [copied, setCopied] = useState(false);

  return (
    <button
      type="button"
      className={cn(
        "inline-flex items-center gap-2 font-mono text-xs text-mute transition-colors hover:text-paper",
        className,
      )}
      onClick={async () => {
        try {
          await navigator.clipboard.writeText(profile.email);
          setCopied(true);
          toast("Email copied to clipboard.");
          window.setTimeout(() => setCopied(false), 2000);
        } catch {
          toast(profile.email);
        }
      }}
    >
      {copied ? <Check className="text-ok" /> : <Copy />}
      {copied ? "Copied" : "Copy email"}
    </button>
  );
}

export function PaletteButton({ className }: { className?: string }) {
  const { openPalette } = useUI();
  const mac = useIsMac();
  return (
    <button
      type="button"
      onClick={openPalette}
      className={cn(
        "inline-flex h-8 items-center gap-2 rounded-[3px] border border-line px-2.5 font-mono text-[11px] text-mute transition-colors hover:border-line-strong hover:text-paper",
        className,
      )}
      aria-label="Open command menu"
      aria-keyshortcuts={mac ? "Meta+K" : "Control+K"}
    >
      <span aria-hidden>{mac ? "⌘" : "Ctrl"}</span>
      <span aria-hidden>K</span>
    </button>
  );
}

export function TerminalButton({ className, label = "Open terminal" }: { className?: string; label?: string }) {
  const { openTerminal } = useUI();
  return (
    <button
      type="button"
      onClick={openTerminal}
      aria-keyshortcuts="`"
      className={cn("inline-flex items-center gap-2 font-mono text-xs text-mute transition-colors hover:text-paper", className)}
    >
      <Prompt />
      {label}
    </button>
  );
}
