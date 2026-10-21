import type { MetadataRoute } from "next";

import { SECTIONS } from "@/lib/sections";
import { SITE_URL } from "@/lib/seo";

export default function sitemap(): MetadataRoute.Sitemap {
  return SECTIONS.map((s) => ({
    url: s.path === "/" ? SITE_URL : `${SITE_URL}${s.path}`,
    changeFrequency: "monthly",
    priority: s.path === "/" ? 1 : 0.8,
  }));
}
