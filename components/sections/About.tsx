"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "motion/react";

import { gallery } from "@/lib/content";
import s from "./Sections.module.css";

function Gallery() {
  const [i, setI] = useState(0);
  const [paused, setPaused] = useState(false);
  const next = () => setI((n) => (n + 1) % gallery.length);

  useEffect(() => {
    if (paused) return;
    const id = setInterval(next, 2500);
    return () => clearInterval(id);
  }, [paused]);

  return (
    <div
      className={s.gallery}
      tabIndex={0}
      onClick={next}
      onKeyDown={(e) => e.key === "Enter" && next()}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocus={() => setPaused(true)}
      onBlur={() => setPaused(false)}
    >
      <div className={s.frame}>
        <AnimatePresence initial={false}>
          <motion.div
            key={i}
            className={s.fill}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.6 }}
          >
            <Image
              src={gallery[i]}
              alt=""
              fill
              sizes="(min-width: 640px) 60vw, 100vw"
              className={s.cover}
              priority={i === 0}
            />
          </motion.div>
        </AnimatePresence>
      </div>
      <div className={s.caption}>
        [{String(i + 1).padStart(2, "0")}/{gallery.length}] {gallery.map((_, j) => (j === i ? "■" : "□")).join("")}
        <span className={s.muted}> {paused ? "enter: next" : ""}</span>
      </div>
    </div>
  );
}

export function AboutSection() {
  return (
    <div className={s.stack}>
      <h2 className={s.h2}>A community built for curious minds</h2>
      <p>
        The CS Club is open to anyone at Chapman who&apos;s into <strong>computer science</strong>. You don&apos;t have
        to be a CS major or even know how to code. If you&apos;re curious about tech and innovation, you belong here.
      </p>
      <p>
        There are no dues and no applications. Just show up, <strong>meet people who share your interests</strong>,
        sharpen your skills, and grow alongside us.
      </p>
      <Gallery />
    </div>
  );
}
