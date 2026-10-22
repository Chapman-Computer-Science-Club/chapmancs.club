import type { Metadata } from "next";

export const SITE_URL = "https://chapmancs.club";
export const SITE_NAME = "Chapman Computer Science Club";
export const OG_IMAGE = { url: "/og.png", width: 1200, height: 630, alt: SITE_NAME };

export function pageMetadata(path: string, title: string | null, description: string): Metadata {
  return {
    ...(title && { title }),
    description,
    alternates: { canonical: path },
    openGraph: {
      title: title ? `${title} • ${SITE_NAME}` : SITE_NAME,
      description,
      url: path,
      siteName: SITE_NAME,
      type: "website",
      images: [OG_IMAGE],
    },
  };
}
