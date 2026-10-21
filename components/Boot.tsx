"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "motion/react";

import { playTypingSound, preloadTypingSounds } from "@/lib/typingSounds";
import { useInitialMedia } from "@/lib/useInitialMedia";
import styles from "./Boot.module.css";
import BlockLoader from "./sacred/BlockLoader";

const COMMAND = "ssh chapmancs.club";
const TAP_TYPE_MS = 65;
const AUTOPLAY_START_MS = 600;
const LINE_MS = 350;
const LOADER_MS = 1900;

const BANNER = String.raw`
  ___ _  _   _   ___ __  __   _   _  _    ___ ___
 / __| || | /_\ | _ \  \/  | /_\ | \| |  / __/ __|
| (__| __ |/ _ \|  _/ |\/| |/ _ \| .${"`"} | | (__\__ \
 \___|_||_/_/ \_\_| |_|  |_/_/ \_\_|\_|  \___|___/`;

export default function Boot({ onDone }: { onDone: () => void }) {
  const [typed, setTyped] = useState(0);
  const [auto, setAuto] = useState(false);
  const [connecting, setConnecting] = useState(false);
  const [printed, setPrinted] = useState(0);
  const [shift, setShift] = useState(0);
  const promptRef = useRef<HTMLDivElement>(null);
  const outputRef = useRef<HTMLDivElement>(null);
  const done = typed >= COMMAND.length;
  // Touch screens have no keyboard to type with, so the command plays on its own.
  const touch = useInitialMedia("(pointer: coarse)");
  const playing = auto || touch;

  const lines = [
    `Connecting to chapmancs.club (Chapman University, Orange, CA)...`,
    `Authenticated as guest.`,
    `Last login: ${new Date().toDateString()} from Swenson-Hall`,
    BANNER,
    `Welcome to the Chapman Computer Science Club.`,
  ];
  const lineCount = lines.length;

  // Desktop: each keystroke types the next character; once complete, Enter (or any key) connects.
  // the page under the boot stays readable to screen readers and scrapers, but keyboard focus shouldn't wander into it
  useEffect(() => {
    const blockTab = (e: KeyboardEvent) => e.key === "Tab" && e.preventDefault();
    window.addEventListener("keydown", blockTab);
    return () => window.removeEventListener("keydown", blockTab);
  }, []);

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

  // Tap / click (or a touch screen): play the whole command, then connect.
  useEffect(() => {
    if (!playing) return;
    if (done) {
      const id = setTimeout(() => setConnecting(true), 350);
      return () => clearTimeout(id);
    }
    // autoplay pauses on the empty prompt first, like someone about to type
    const delay = typed === 0 && !auto ? AUTOPLAY_START_MS : TAP_TYPE_MS + Math.random() * 60;
    const id = setTimeout(() => setTyped((n) => n + 1), delay);
    return () => clearTimeout(id);
  }, [playing, auto, typed, done]);

  useEffect(() => {
    if (!connecting) return;
    const id = setTimeout(onDone, 2600);
    return () => clearTimeout(id);
  }, [connecting, onDone]);

  // print the output one line at a time, then the loader
  useEffect(() => {
    if (!connecting) return;
    const ids = Array.from({ length: lineCount + 1 }, (_, i) =>
      setTimeout(() => setPrinted(i + 1), i < lineCount ? 150 + i * LINE_MS : LOADER_MS)
    );
    return () => ids.forEach(clearTimeout);
  }, [connecting, lineCount]);

  // keep the prompt + printed output centered: lift it by half of what's been printed below the prompt
  useEffect(() => {
    const output = outputRef.current;
    const prompt = promptRef.current;
    if (!output || !prompt) return;
    const ro = new ResizeObserver(() =>
      setShift(output.offsetHeight ? (output.offsetTop + output.offsetHeight - prompt.offsetHeight) / 2 : 0)
    );
    ro.observe(output);
    return () => ro.disconnect();
  }, [connecting]);

  useEffect(preloadTypingSounds, []);

  useEffect(() => {
    if (typed > 0) playTypingSound();
  }, [typed]);

  useEffect(() => {
    if (connecting) playTypingSound();
  }, [connecting]);

  return (
    <motion.div
      className={styles.root}
      aria-hidden
      // one tap animation for touch/pen, triple-click required for mouse
      onPointerDown={(e) => e.pointerType !== "mouse" && !connecting && setAuto(true)}
      onMouseDown={(e) => e.detail >= 3 && !connecting && setAuto(true)}
      exit={{ scaleY: [1, 0.004, 0.004], scaleX: [1, 1, 0], opacity: [1, 1, 0] }}
      transition={{ duration: 0.45, times: [0, 0.6, 1], ease: "easeIn" }}
    >
      <div className={styles.center}>
        <motion.div className={styles.stack} animate={{ y: -shift }} transition={{ duration: 0.2, ease: "easeOut" }}>
          <div className={styles.prompt} ref={promptRef}>
            <span>&gt; </span>
            {COMMAND.slice(0, typed)}
            <span className={styles.cursor} style={connecting ? { visibility: "hidden" } : undefined}>
              _
            </span>
          </div>

          {connecting && (
            <div className={styles.output} ref={outputRef}>
              {lines.slice(0, printed).map((line, i) => (
                <motion.pre
                  key={i}
                  className={i === 3 ? styles.banner : undefined}
                  initial={{ opacity: 0, y: 4 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  {line}
                </motion.pre>
              ))}
              {printed > lineCount && (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                  <BlockLoader mode={1} /> loading session
                </motion.div>
              )}
            </div>
          )}
        </motion.div>
      </div>

      {!connecting && !playing && (
        <div className={styles.hint}>{done ? "press enter" : typed === 0 ? "type or tap · esc to skip" : ""}</div>
      )}
    </motion.div>
  );
}
