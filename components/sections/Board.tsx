"use client";

import { useRef, useState } from "react";
import { motion } from "motion/react";

import { boardYears } from "@/lib/boardData";
import { playTypingSound } from "@/lib/typingSounds";
import Marquee from "../Marquee";
import ActionListItem from "../sacred/ActionListItem";
import Avatar from "../sacred/Avatar";
import s from "./Sections.module.css";

const initials = (name: string) => {
  const w = name.split(" ");
  return w[0][0] + (w.length > 1 ? w[w.length - 1][0] : "");
};

export function BoardSection() {
  const [sel, setSel] = useState(0);
  // only stagger members in on a year switch, so the server-rendered first year isn't hidden
  const [switched, setSwitched] = useState(false);
  const yearsRef = useRef<HTMLDivElement>(null);
  let n = 0;

  const select = (i: number) => {
    if (i === sel) return;
    setSel(i);
    setSwitched(true);
  };

  const onYearKey = (e: React.KeyboardEvent) => {
    const prev = e.key === "ArrowLeft" || e.key === "h";
    const next = e.key === "ArrowRight" || e.key === "l";
    if (!(prev || next) || (prev && sel === 0)) return;
    e.preventDefault();
    e.stopPropagation();
    if (!e.repeat) playTypingSound();
    const i = Math.min(boardYears.length - 1, sel + (next ? 1 : -1));
    yearsRef.current?.querySelectorAll<HTMLElement>("[role=button]")[i]?.focus();
  };
  return (
    <div className={s.stack}>
      <h2 className={s.h2}>Meet the Board</h2>
      <p className={s.muted}>
        Our executive board keeps the club running. Interested in joining the board? Come to a meeting and get involved.
      </p>
      <div className={s.years} ref={yearsRef} onKeyDown={onYearKey} data-mode="year">
        {boardYears.map((y, i) => (
          <div key={y.year} className={s.pick} data-active={i === sel || undefined} onFocus={() => select(i)}>
            <ActionListItem icon={i === sel ? "●" : "○"} tabIndex={i === sel ? 0 : -1} onClick={() => select(i)}>
              {y.year}
            </ActionListItem>
          </div>
        ))}
      </div>
      <div key={sel} className={s.stack}>
        {boardYears[sel].tiers.map((tier) => (
          <section key={tier.label} className={s.stack}>
            <h3 className={s.tier}>{tier.label}</h3>
            <div className={s.members}>
              {tier.members.map((m) => {
                const card = (
                  <Avatar src={m.photo} initials={initials(m.name)} style={{ width: "6ch", height: "3.75rem" }}>
                    <div>{m.name}</div>
                    <Marquee className={s.role}>{m.role}</Marquee>
                  </Avatar>
                );
                return (
                  <motion.div
                    key={m.name + m.role}
                    className={s.member}
                    data-marquee-host
                    data-mode="person"
                    initial={switched ? { opacity: 0, x: -6 } : false}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: n++ * 0.035 }}
                  >
                    {m.linkedin ? (
                      <a className={s.memberLink} data-avatar-host href={m.linkedin} target="_blank" rel="noreferrer">
                        {card}
                      </a>
                    ) : (
                      card
                    )}
                  </motion.div>
                );
              })}
            </div>
          </section>
        ))}
      </div>
    </div>
  );
}
