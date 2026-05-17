import { siteConfig } from "@/data/siteConfig";
import type { MetadataRoute } from "next";

const routes = [
  "",
  "/about",
  "/methodology",
  "/guides",
  "/feedback",
  "/privacy",
  "/disclaimer",
  "/terms",
  "/is-a-home-battery-worth-it-uk",
  "/home-battery-without-solar-uk",
  "/home-battery-payback-period-uk",
  "/home-battery-savings-examples-uk",
  "/home-battery-quote-checklist-uk",
];

export default function sitemap(): MetadataRoute.Sitemap {
  const currentDate = new Date();

  return routes.map((route) => ({
    url: `${siteConfig.url}${route}`,
    lastModified: currentDate,
    changeFrequency: route === "" ? "weekly" : "monthly",
    priority: route === "" ? 1 : 0.6,
  }));
}
