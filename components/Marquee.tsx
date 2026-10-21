"use client";

import { useEffect, useRef, useState } from "react";

import s from "./Marquee.module.css";

// Single-line text that ellipsizes when it overflows, and loops continuously while hovered/focused
export default function Marquee({ children, className }: { children: React.ReactNode; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const text = useRef<HTMLSpanElement>(null);
  const [width, setWidth] = useState(0); // text width when overflowing, else 0
  useEffect(() => {
    const el = ref.current!;
    const t = text.current!;
    const ro = new ResizeObserver(() => {
      const w = t.offsetWidth;
      setWidth(w > el.clientWidth ? w : 0);
    });
    ro.observe(el);
    return () => ro.disconnect();
  }, []);
  return (
    <div ref={ref} className={`${s.root} ${className ?? ""}`}>
      <span data-scroll={width > 0 || undefined} style={{ "--dur": `${width / 25}s` } as React.CSSProperties}>
        <span ref={text}>{children}</span>
        {width > 0 && (
          // second copy for a continuous loop
          <span aria-hidden>
            <span className={s.gap} />
            {children}
            <span className={s.gap} />
          </span>
        )}
      </span>
    </div>
  );
}
