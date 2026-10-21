import Image from "next/image";

import ActionListItem from "../sacred/ActionListItem";
import Badge from "../sacred/Badge";
import s from "./Sections.module.css";

export function PantherHacksSection() {
  return (
    <div className={s.split}>
      <div className={s.stack}>
        <div>
          <Badge>2nd Annual Hackathon</Badge>
        </div>
        <h2 className={s.h2}>PantherHacks: Chapman&apos;s annual hackathon</h2>
        <p>
          PantherHacks is our flagship event: a hackathon organized and run entirely by Chapman CS Club. 2026 marks our{" "}
          <strong>second annual</strong> run, bringing together over 80 students from UCLA, UCI, CSULB, and more to
          build, compete, and collaborate over a 48-hour timespan.
        </p>
        <ActionListItem icon="↗" href="https://pantherhacks.dev/" target="_blank">
          Visit pantherhacks.dev
        </ActionListItem>
      </div>
      <figure className={s.frame} data-mode="photo">
        <Image
          src="/PantherHacks.webp"
          alt="PantherHacks hackathon"
          fill
          sizes="(min-width: 900px) 40vw, 100vw"
          className={s.cover}
        />
      </figure>
    </div>
  );
}
