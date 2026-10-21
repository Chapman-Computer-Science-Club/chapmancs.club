import Image from "next/image";

import { heroStats, PANTHER_CONNECT } from "@/lib/content";
import ActionListItem from "../sacred/ActionListItem";
import SimpleTable from "../sacred/SimpleTable";
import s from "./Sections.module.css";

type SectionProps = { go: (id: string) => void };

export function HomeSection({ go }: SectionProps) {
  return (
    <div className={s.stack}>
      <div className={s.hero}>
        <div className={s.stack}>
          <h1 className={s.h1}>
            Create.
            <br />
            Connect.
            <br />
            <strong>Collaborate.</strong>
          </h1>
          <p>
            Chapman University&apos;s Computer Science Club brings together students from all disciplines to build
            skills, explore technology, and shape their future in tech.
          </p>
        </div>
        <Image src="/old_cs_logo.png" alt="" width={180} height={180} className={s.logo} priority data-mode="logo" />
      </div>
      <div data-mode="stat">
        <SimpleTable data={heroStats} align={["left", "right"]} />
      </div>
      <div className={s.actions}>
        <div className={s.cta}>
          <ActionListItem icon="↗" href={PANTHER_CONNECT} target="_blank">
            PantherConnect
          </ActionListItem>
        </div>
        <ActionListItem icon="→" onClick={() => go("about")}>
          Learn more
        </ActionListItem>
      </div>
    </div>
  );
}
