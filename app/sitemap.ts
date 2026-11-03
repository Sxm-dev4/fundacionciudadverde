import type { MetadataRoute } from "next";
import { createSitemapEntries } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  return createSitemapEntries();
}
