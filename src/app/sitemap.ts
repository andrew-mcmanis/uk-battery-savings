import type { MetadataRoute } from "next";
import { siteConfig } from "@/data/siteConfig";
import { publicRoutes } from "@/data/siteRoutes";

function buildUrl(path: string) {
  if (path === "/") {
    return siteConfig.url;
  }

  return `${siteConfig.url}${path}`;
}

export default function sitemap(): MetadataRoute.Sitemap {
  return publicRoutes.map((route) => ({
    url: buildUrl(route.path),
    changeFrequency: route.changeFrequency,
    priority: route.priority,
  }));
}
