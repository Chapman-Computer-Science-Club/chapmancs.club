"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "motion/react";

import { playTypingSound, toggleMuted, useMuted } from "@/lib/typingSounds";
import ActionListItem from "./sacred/ActionListItem";
import Card from "./sacred/Card";
import { AboutSection } from "./sections/About";
import { BoardSection } from "./sections/Board";
import { ContactSection } from "./sections/Contact";
import { EventsSection } from "./sections/Events";
import { HomeSection } from "./sections/Home";
import { PantherHacksSection } from "./sections/PantherHacks";
import styles from "./Terminal.module.css";

const SECTIONS = [
  { id: "home", label: "Home", Body: HomeSection },
  { id: "about", label: "About", Body: AboutSection },
  { id: "events", label: "Events", Body: EventsSection },
  { id: "pantherhacks", label: "PantherHacks", Body: PantherHacksSection },
  { id: "board", label: "Board", Body: BoardSection },
  { id: "contact", label: "Contact", Body: ContactSection },
];

const FOCUSABLE = 'a[href], [tabindex="0"]';

const NAV_KEYS = new Set(["ArrowUp", "ArrowDown", "ArrowLeft", "ArrowRight", "h", "j", "k", "l", "Enter", "Escape"]);

function toggleTheme() {
  const b = document.body;
  const next = b.classList.contains("theme-dark") ? "light" : "dark";
  b.classList.remove("theme-light", "theme-dark");
  b.classList.add(`theme-${next}`);
  try {
    localStorage.setItem("theme", next);
  } catch {}
}

// Retypes its text whenever it changes, like a shell echoing a new cwd.
function Typed({ text }: { text: string }) {
  const [n, setN] = useState(0);
  const [prevText, setPrevText] = useState(text);
  if (text !== prevText) {
    setPrevText(text);
    setN(0);
  }
  useEffect(() => {
    if (n >= text.length) return;
    const id = setTimeout(() => setN(n + 1), 18);
    return () => clearTimeout(id);
  }, [n, text]);
  return <>{text.slice(0, n)}</>;
}

function Clock() {
  const [now, setNow] = useState("");
  useEffect(() => {
    const tick = () => setNow(new Date().toLocaleTimeString([], { hour12: false }));
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, []);
  return <span>{now}</span>;
}

export default function Terminal() {
  const [idx, setIdx] = useState(0);
  const [zone, setZone] = useState<"menu" | "body">("menu");
  const menuRef = useRef<HTMLDivElement>(null);
  const bodyRef = useRef<HTMLDivElement>(null);
  const section = SECTIONS[idx];
  const muted = useMuted();

  const go = useCallback((id: string) => {
    setIdx(SECTIONS.findIndex((s) => s.id === id));
    setZone("menu");
  }, []);

  const focusables = () =>
    Array.from(
      bodyRef.current?.querySelectorAll<HTMLElement>(`[data-section="${SECTIONS[idx].id}"] ${FOCUSABLE}`) ?? []
    );

  // Keep DOM focus on the highlighted menu entry while the menu zone is active.
  useEffect(() => {
    if (zone === "menu") menuRef.current?.querySelectorAll<HTMLElement>("[role=menuitem]")[idx]?.focus();
  }, [idx, zone]);

  useEffect(() => {
    bodyRef.current?.scrollTo({ top: 0 });
  }, [idx]);

  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.metaKey || e.ctrlKey || e.altKey) return;
      const k = e.key;
      if (k === "t") return toggleTheme();
      if (k === "m") return toggleMuted();
      const n = Number(k);
      const jump = n >= 1 && n <= SECTIONS.length;
      if (!e.repeat && (jump || NAV_KEYS.has(k))) playTypingSound();
      if (jump) return go(SECTIONS[n - 1].id);

      const down = k === "ArrowDown" || k === "j";
      const up = k === "ArrowUp" || k === "k";

      if (zone === "menu") {
        if (down || up) {
          e.preventDefault();
          setIdx((i) => (i + (down ? 1 : -1) + SECTIONS.length) % SECTIONS.length);
        } else if (k === "ArrowRight" || k === "l" || k === "Enter") {
          e.preventDefault();
          setZone("body");
          (focusables()[0] ?? bodyRef.current)?.focus();
        }
        return;
      }

      if (down || up) {
        e.preventDefault();
        const items = focusables();
        // Nothing to focus: arrows scroll the body instead.
        if (!items.length) return bodyRef.current?.scrollBy({ top: down ? 80 : -80 });
        const cur = items.indexOf(document.activeElement as HTMLElement);
        const next = cur === -1 ? 0 : Math.max(0, Math.min(items.length - 1, cur + (down ? 1 : -1)));
        items[next].focus();
        if (next === 0 && up) bodyRef.current?.scrollTo({ top: 0 });
      } else if (k === "ArrowLeft" || k === "h" || k === "Escape") {
        e.preventDefault();
        setZone("menu");
      }
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  });

  return (
    <motion.div
      className={styles.shell}
      initial={{ opacity: 0, filter: "blur(6px)" }}
      animate={{
        opacity: 1,
        filter: ["blur(6px)", "blur(6px)", "blur(0px)"],
        transitionEnd: { filter: "none" },
      }}
      transition={{
        opacity: { duration: 0.3, ease: "easeOut" },
        filter: { duration: 0.75, times: [0, 0.3, 1], ease: "easeOut" },
      }}
    >
      <header className={styles.top}>
        <span>guest@chapmancs.club:~/{section.id === "home" ? "" : section.id}$</span>
        <Clock />
      </header>

      <nav className={styles.menu} ref={menuRef} onFocus={() => setZone("menu")}>
        <Card title="MENU" mode="left">
          <div className={styles.menuList} role="menu">
            {SECTIONS.map((s, i) => (
              <div key={s.id} className={styles.row} data-active={i === idx || undefined}>
                <span className={styles.gutter}>
                  {i === idx && (
                    <motion.span layoutId="caret" transition={{ type: "spring", stiffness: 600, damping: 40 }}>
                      ▸
                    </motion.span>
                  )}
                </span>
                <ActionListItem role="menuitem" icon={i + 1} onClick={() => setIdx(i)}>
                  {s.label}
                </ActionListItem>
              </div>
            ))}
          </div>
        </Card>
      </nav>

      <main className={styles.body} ref={bodyRef} tabIndex={-1} onFocus={() => setZone("body")}>
        <Card title={<Typed text={`~/${section.id}`} />} mode="left">
          <AnimatePresence mode="wait" initial={false}>
            <motion.div
              key={section.id}
              data-section={section.id}
              initial={{ opacity: 0, x: 10, filter: "blur(3px)" }}
              animate={{ opacity: 1, x: 0, filter: "blur(0px)" }}
              exit={{ opacity: 0, x: -10, filter: "blur(3px)" }}
              transition={{ duration: 0.14 }}
            >
              <section.Body go={go} />
            </motion.div>
          </AnimatePresence>
        </Card>
      </main>

      <footer className={styles.status}>
        <span className={styles.hints}>
          <b>↑↓</b> select <b>→</b> open <b>←</b> back <b>1-6</b> jump
        </span>
        <span className={styles.hints}>{zone === "menu" ? "-- MENU --" : "-- BODY --"}</span>
        <button type="button" className={styles.key} onClick={toggleMuted}>
          <b>m</b> {muted ? "unmute" : "mute"}
        </button>
        <button type="button" className={styles.key} onClick={toggleTheme}>
          <b>t</b> theme
        </button>
      </footer>
    </motion.div>
  );
}
