import { siteConfig } from "@/data/siteConfig";

type BreadcrumbSchemaItem = {
  name: string;
  path: string;
};

type ArticleSchemaArgs = {
  headline: string;
  description: string;
  path: string;
  datePublished?: string;
  dateModified?: string;
};

type CollectionPageSchemaArgs = {
  name: string;
  description: string;
  path: string;
};

export function buildBreadcrumbSchema(items: BreadcrumbSchemaItem[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: `${siteConfig.url}${item.path}`,
    })),
  };
}

export function buildArticleSchema({
  headline,
  description,
  path,
  datePublished = "2026-05-17",
  dateModified = "2026-05-17",
}: ArticleSchemaArgs) {
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline,
    description,
    datePublished,
    dateModified,
    author: {
      "@type": "Organization",
      name: siteConfig.name,
      url: siteConfig.url,
    },
    publisher: {
      "@type": "Organization",
      name: siteConfig.name,
      url: siteConfig.url,
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `${siteConfig.url}${path}`,
    },
  };
}

export function buildCollectionPageSchema({
  name,
  description,
  path,
}: CollectionPageSchemaArgs) {
  return {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name,
    description,
    url: `${siteConfig.url}${path}`,
    isPartOf: {
      "@type": "WebSite",
      name: siteConfig.name,
      url: siteConfig.url,
    },
  };
}
