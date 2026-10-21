import ActionListItem from "@/components/sacred/ActionListItem";
import s from "@/components/sections/Sections.module.css";

export const metadata = { title: "Not found" };

export default function NotFound() {
  return (
    <div className={s.stack}>
      <h2 className={s.h2}>No such file or directory</h2>
      <p className={s.muted}>That page doesn&apos;t exist.</p>
      <div className={s.actions}>
        <ActionListItem icon="→" href="/">
          Back home
        </ActionListItem>
      </div>
    </div>
  );
}
