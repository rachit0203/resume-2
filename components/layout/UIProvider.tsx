"use client";

import dynamic from "next/dynamic";
import { createContext, useCallback, useContext, useEffect, useMemo, useRef, useState, type ReactNode } from "react";

const CommandPalette = dynamic(() => import("./CommandPalette"), { ssr: false });
const Terminal = dynamic(() => import("./Terminal"), { ssr: false });

type UIContext = {
  openPalette: () => void;
  openTerminal: () => void;
  toggleDebug: () => void;
  toast: (message: string) => void;
};

const Ctx = createContext<UIContext | null>(null);

export function useUI() {
  const ctx = useContext(Ctx);
  if (!ctx) throw new Error("useUI must be used inside <UIProvider>");
  return ctx;
}

const KONAMI = ["ArrowUp", "ArrowUp", "ArrowDown", "ArrowDown", "ArrowLeft", "ArrowRight", "ArrowLeft", "ArrowRight", "b", "a"];

const isTyping = (el: EventTarget | null) =>
  el instanceof HTMLElement && (el.isContentEditable || /^(INPUT|TEXTAREA|SELECT)$/.test(el.tagName));

let greeted = false;

export function UIProvider({ children }: { children: ReactNode }) {
  const [palette, setPalette] = useState(false);
  const [terminal, setTerminal] = useState(false);
  const [loaded, setLoaded] = useState({ palette: false, terminal: false });
  const [toastState, setToastState] = useState({ message: "", n: 0 });
  const timer = useRef<number | undefined>(undefined);

  const toast = useCallback((message: string) => {
    setToastState((t) => ({ message, n: t.n + 1 }));
    window.clearTimeout(timer.current);
    timer.current = window.setTimeout(() => setToastState((t) => ({ ...t, message: "" })), 2800);
  }, []);

  const openPalette = useCallback(() => {
    setLoaded((l) => ({ ...l, palette: true }));
    setPalette(true);
  }, []);

  const openTerminal = useCallback(() => {
    setPalette(false);
    setLoaded((l) => ({ ...l, terminal: true }));
    setTerminal(true);
  }, []);

  const toggleDebug = useCallback(() => {
    const root = document.documentElement;
    const on = !("debug" in root.dataset);
    if (on) root.dataset.debug = "";
    else delete root.dataset.debug;
    toast(on ? "Blueprint mode on. Same code again to exit." : "Blueprint mode off.");
  }, [toast]);

  useEffect(() => {
    let seq = 0;
    const onKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setLoaded((l) => ({ ...l, palette: true }));
        setPalette((p) => !p);
        return;
      }
      if (isTyping(e.target) || e.metaKey || e.ctrlKey || e.altKey) return;
      if (e.key === "`") {
        e.preventDefault();
        openTerminal();
        return;
      }
      const key = e.key.length === 1 ? e.key.toLowerCase() : e.key;
      if (key === KONAMI[seq]) seq++;
      else seq = key === "ArrowUp" ? (seq === 2 ? 2 : 1) : 0;
      if (seq === KONAMI.length) {
        seq = 0;
        toggleDebug();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [openTerminal, toggleDebug]);

  useEffect(() => {
    if (greeted) return;
    greeted = true;
    console.log(
      "%c● rachit.mishra%c\n\nReading the source? Good — that's how I learn too.\nThere's a shell hidden behind the ` key, and the Konami code does something.\n\nSay hi → mishrarachitalld@gmail.com",
      "color:#ff5c35;font:600 14px ui-monospace,monospace",
      "color:#97958f;font:12px ui-monospace,monospace",
    );
  }, []);

  const value = useMemo(() => ({ openPalette, openTerminal, toggleDebug, toast }), [openPalette, openTerminal, toggleDebug, toast]);

  return (
    <Ctx.Provider value={value}>
      {children}
      {loaded.palette && <CommandPalette open={palette} onOpenChange={setPalette} />}
      {loaded.terminal && <Terminal open={terminal} onClose={() => setTerminal(false)} />}
      <div role="status" aria-live="polite" className="pointer-events-none fixed inset-x-0 bottom-6 z-[95] flex justify-center px-4">
        {toastState.message && (
          <p
            key={toastState.n}
            className="fade-in rounded-[3px] border border-line-strong bg-ink-2/95 px-4 py-2.5 font-mono text-xs text-paper shadow-[0_20px_60px_-20px_rgb(0_0_0/0.8)]"
          >
            <span className="mr-2 text-signal" aria-hidden>
              ●
            </span>
            {toastState.message}
          </p>
        )}
      </div>
    </Ctx.Provider>
  );
}
