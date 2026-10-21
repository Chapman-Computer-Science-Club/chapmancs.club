import { AboutSection } from "@/components/sections/About";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata(
  "/about",
  "About",
  "The Chapman Computer Science Club is open to anyone at Chapman who's curious about tech. No CS major, dues, or applications required."
);

export default function AboutPage() {
  return <AboutSection />;
}
