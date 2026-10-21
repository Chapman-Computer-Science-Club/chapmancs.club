import { EventsSection } from "@/components/sections/Events";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata(
  "/events",
  "Events",
  "Workshops, resume reviews, speaker events, hackathons, and bonding activities from the Chapman Computer Science Club."
);

export default function EventsPage() {
  return <EventsSection />;
}
