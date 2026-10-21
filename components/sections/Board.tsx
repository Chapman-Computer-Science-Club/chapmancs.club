"use client";

import { useState } from "react";
import { motion } from "motion/react";

import { boardYears } from "@/lib/boardData";
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
  let n = 0;
  return (
    <div className={s.stack}>
      <h2 className={s.h2}>Meet the Board</h2>
      <p className={s.muted}>
        Our executive board keeps the club running. Interested in joining the board? Come to a meeting and get involved.
      </p>
      <div className={s.years}>
        {boardYears.map((y, i) => (
          <div key={y.year} className={s.pick} data-active={i === sel || undefined} onFocus={() => setSel(i)}>
            <ActionListItem icon={i === sel ? "●" : "○"} onClick={() => setSel(i)}>
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
                    initial={{ opacity: 0, x: -6 }}
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
