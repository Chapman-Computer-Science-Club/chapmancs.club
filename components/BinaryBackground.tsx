"use client";

import { useEffect, useRef } from "react";

// Approximate dimensions of one character at font-vt + text-sm + leading-snug
const CHAR_WIDTH = 8;
const LINE_HEIGHT = 18;

function generate(rows: number, cols: number) {
  return Array.from({ length: rows }, () =>
    Array.from({ length: cols }, () => (Math.random() > 0.5 ? "1" : "0")).join("")
  ).join("\n");
}

export default function BinaryBackground() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function fill() {
      if (!ref.current) return;
      const cols = Math.ceil(window.innerWidth / CHAR_WIDTH) + 4;
      const rows = Math.ceil(window.innerHeight / LINE_HEIGHT) + 4;
      ref.current.textContent = generate(rows, cols);
    }
    fill();
    let timer: ReturnType<typeof setTimeout> | null = null;
    function onResize() {
      if (timer) clearTimeout(timer);
      timer = setTimeout(fill, 150);
    }
    window.addEventListener("resize", onResize);
    return () => {
      window.removeEventListener("resize", onResize);
      if (timer) clearTimeout(timer);
    };
  }, []);

  return (
    <div
      ref={ref}
      aria-hidden="true"
      className="fixed inset-0 -z-10 font-vt text-sm leading-snug text-maroon/[0.06] dark:text-maroon/[0.22] pointer-events-none overflow-hidden whitespace-pre p-6 select-none"
    />
  );
}
