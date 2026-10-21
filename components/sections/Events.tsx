"use client";

import { useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "motion/react";

import { events } from "@/lib/content";
import ActionListItem from "../sacred/ActionListItem";
import s from "./Sections.module.css";

export function EventsSection() {
  const [sel, setSel] = useState(0);
  const e = events[sel];
  return (
    <div className={s.stack}>
      <h2 className={s.h2}>Events for Everyone</h2>
      <p className={s.muted}>From weekly meetings to campus-wide events, we keep the calendar full.</p>
      <div className={s.split}>
        <div className={s.actions}>
          {events.map((ev, i) => (
            <div
              key={ev.title}
              className={s.pick}
              data-active={i === sel || undefined}
              onFocus={() => setSel(i)}
              onMouseEnter={() => setSel(i)}
            >
              <ActionListItem icon={ev.icon} onClick={() => setSel(i)}>
                {ev.title}
              </ActionListItem>
            </div>
          ))}
        </div>
        <AnimatePresence mode="wait" initial={false}>
          <motion.div
            key={sel}
            className={s.stack}
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.15 }}
          >
            <div className={s.frame}>
              <Image src={e.image} alt="" fill sizes="(min-width: 900px) 40vw, 100vw" className={s.cover} />
            </div>
            <p>
              <strong>[{e.icon}]</strong> {e.title}
            </p>
            <p className={s.muted}>{e.desc}</p>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}
