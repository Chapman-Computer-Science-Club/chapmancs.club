import { BoardSection } from "@/components/sections/Board";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata(
  "/board",
  "Board",
  "Meet the Chapman Computer Science Club executive board, from this year's officers back to 2022/23."
);

export default function BoardPage() {
  return <BoardSection />;
}
