import { ContactSection } from "@/components/sections/Contact";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata(
  "/contact",
  "Contact",
  "Find the Chapman Computer Science Club on PantherConnect, Instagram, LinkedIn, Discord, and Linktree."
);

export default function ContactPage() {
  return <ContactSection />;
}
