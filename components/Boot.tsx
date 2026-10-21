"use client";

import { useEffect, useState } from "react";
import { motion } from "motion/react";
import BlockLoader from "./sacred/BlockLoader";
import styles from "./Boot.module.css";

const COMMAND = "ssh chapmancs.club";
const TAP_TYPE_MS = 65;

const BANNER = String.raw`
  ___ _  _   _   ___ __  __   _   _  _    ___ ___
 / __| || | /_\ | _ \  \/  | /_\ | \| |  / __/ __|
| (__| __ |/ _ \|  _/ |\/| |/ _ \| .${"`"} | | (__\__ \
 \___|_||_/_/ \_\_| |_|  |_/_/ \_\_|\_|  \___|___/`;

export default function Boot({ onDone }: { onDone: () => void }) {
  const [typed, setTyped] = useState(0);
  const [auto, setAuto] = useState(false);
  const [connecting, setConnecting] = useState(false);
  const done = typed >= COMMAND.length;

  // Desktop: each keystroke types the next character; once complete, Enter (or any key) connects.
  useEffect(() => {
    if (connecting) return;
    function onKey(e: KeyboardEvent) {
      if (e.metaKey || e.ctrlKey || e.altKey || e.repeat) return;
      if (e.key === "Escape") return onDone();
      if (["Shift", "CapsLock", "Tab"].includes(e.key)) return;
      e.preventDefault();
      if (done) setConnecting(true);
      else setTyped((n) => n + 1);
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [done, connecting, onDone]);

  // Tap / click: play the whole command, then connect.
  useEffect(() => {
    if (!auto) return;
    if (done) {
      const id = setTimeout(() => setConnecting(true), 350);
      return () => clearTimeout(id);
    }
    const id = setTimeout(() => setTyped((n) => n + 1), TAP_TYPE_MS + Math.random() * 60);
    return () => clearTimeout(id);
  }, [auto, typed, done]);

  useEffect(() => {
    if (!connecting) return;
    const id = setTimeout(onDone, 2600);
    return () => clearTimeout(id);
  }, [connecting, onDone]);

  const lines = [
    `Connecting to chapmancs.club (Chapman University, Orange, CA)...`,
    `Authenticated as guest.`,
    `Last login: ${new Date().toDateString()} from Swenson-Hall`,
    BANNER,
    `Welcome to the Chapman Computer Science Club.`,
  ];

  return (
    <motion.div
      className={styles.root}
      // one tap animation for touch/pen, triple-click required for mouse
      onPointerDown={(e) => e.pointerType !== "mouse" && !connecting && setAuto(true)}
      onMouseDown={(e) => e.detail >= 3 && !connecting && setAuto(true)}
      exit={{ scaleY: [1, 0.004, 0.004], scaleX: [1, 1, 0], opacity: [1, 1, 0] }}
      transition={{ duration: 0.45, times: [0, 0.6, 1], ease: "easeIn" }}
    >
      <div className={styles.center}>
        <div className={styles.prompt}>
          <span>&gt; </span>
          {COMMAND.slice(0, typed)}
          {!connecting && <span className={styles.cursor}>_</span>}
        </div>

        {connecting && (
          <div className={styles.output}>
            {lines.map((line, i) => (
              <motion.pre
                key={i}
                className={i === 3 ? styles.banner : undefined}
                initial={{ opacity: 0, y: 4 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.15 + i * 0.35, duration: 0.2 }}
              >
                {line}
              </motion.pre>
            ))}
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.9 }}>
              <BlockLoader mode={1} /> loading session
            </motion.div>
          </div>
        )}
      </div>

      {!connecting && (
        <div className={styles.hint}>{done ? "press enter" : typed === 0 ? "type or tap · esc to skip" : ""}</div>
      )}
    </motion.div>
  );
}
