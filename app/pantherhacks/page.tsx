import { PantherHacksSection } from "@/components/sections/PantherHacks";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata(
  "/pantherhacks",
  "PantherHacks",
  "PantherHacks is Chapman University's annual 48-hour hackathon, organized and run by the Chapman Computer Science Club."
);

export default function PantherHacksPage() {
  return <PantherHacksSection />;
}
