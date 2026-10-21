import ActionListItem from "../sacred/ActionListItem";
import { socials } from "@/lib/content";
import s from "./Sections.module.css";

export function ContactSection() {
  return (
    <div className={s.stack}>
      <h2 className={s.h2}>Get involved</h2>
      <p>Follow us on social media, register on Panther Connect, or show up to a weekly meeting. Everyone is welcome.</p>
      <div className={s.actions}>
        {socials.map((so) => (
          <ActionListItem key={so.label} icon={so.icon} href={so.href} target="_blank">
            {so.label}
          </ActionListItem>
        ))}
      </div>
      <p className={s.muted}>
        {new Date().getFullYear()} Chapman Computer Science Club · Fowler School of Engineering
        <br />
        Chapman University, Orange, CA
      </p>
    </div>
  );
}
