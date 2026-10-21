import { HomeSection } from "@/components/sections/Home";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata(
  "/",
  null,
  "Chapman University's Computer Science Club brings together students from all disciplines to build skills, explore technology, and shape their future in tech."
);

export default function HomePage() {
  return <HomeSection />;
}
