import type { MetadataRoute } from "next";
import { createRobotsConfig } from "@/lib/site";

export default function robots(): MetadataRoute.Robots {
  return createRobotsConfig();
}
