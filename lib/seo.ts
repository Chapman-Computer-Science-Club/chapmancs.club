import type { Metadata } from "next";

export const SITE_URL = "https://chapmancs.club";
export const SITE_NAME = "Chapman Computer Science Club";

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
      images: ["/old_cs_logo.png"],
    },
  };
}
