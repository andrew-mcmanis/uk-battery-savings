import { siteConfig } from "@/data/siteConfig";
import type { MetadataRoute } from "next";

const routes = ["", "/about", "/privacy", "/disclaimer", "/terms"];

export default function sitemap(): MetadataRoute.Sitemap {
  const currentDate = new Date();

  return routes.map((route) => ({
    url: `${siteConfig.url}${route}`,
    lastModified: currentDate,
    changeFrequency: route === "" ? "weekly" : "monthly",
    priority: route === "" ? 1 : 0.6,
  }));
}
