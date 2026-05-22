import type { ReactNode } from "react";
import Link from "next/link";
import Breadcrumbs from "@/components/Breadcrumbs";
import QuoteLeadCta from "@/components/QuoteLeadCta";
import RelatedGuides from "@/components/RelatedGuides";
import SiteFooter from "@/components/SiteFooter";
import SiteHeader from "@/components/SiteHeader";
import StructuredData from "@/components/StructuredData";
import { routePaths, sectionPaths } from "@/data/siteRoutes";
import {
  buildArticleSchema,
  buildBreadcrumbSchema,
} from "@/lib/structuredData";

type GuidePageLayoutProps = {
  eyebrow: string;
  title: string;
  description: string;
  currentPath: string;
  children: ReactNode;
};

export default function GuidePageLayout({
  eyebrow,
  title,
  description,
  currentPath,
  children,
}: GuidePageLayoutProps) {
  const breadcrumbSchema = buildBreadcrumbSchema([
    { name: "Home", path: "/" },
    { name: "Guides", path: "/guides" },
    { name: title, path: currentPath },
  ]);

  const articleSchema = buildArticleSchema({
    headline: title,
    description,
    path: currentPath,
  });

  return (
    <main id="main-content" className="min-h-screen bg-slate-50 text-slate-900">
      <StructuredData data={[breadcrumbSchema, articleSchema]} />
      <SiteHeader />

      <section className="bg-slate-950 px-6 py-16 text-white sm:py-20">
        <div className="mx-auto max-w-4xl">
          <Breadcrumbs
            items={[
              { label: "Home", href: routePaths.home },
              { label: "Guides", href: routePaths.guides },
              { label: title },
            ]}
          />

          <p className="mt-8 text-sm font-semibold uppercase tracking-wide text-emerald-300">
            {eyebrow}
          </p>

          <h1 className="mt-4 text-4xl font-bold tracking-tight sm:text-5xl">
            {title}
          </h1>

          <p className="mt-5 max-w-3xl text-lg leading-8 text-slate-300">
            {description}
          </p>

          <div className="mt-8">
            <Link
              href={sectionPaths.calculator}
              className="inline-flex rounded-xl bg-emerald-500 px-6 py-3 text-sm font-semibold text-slate-950 hover:bg-emerald-400"
            >
              Try the calculator
            </Link>
          </div>
        </div>
      </section>

      <article className="mx-auto max-w-4xl px-6 py-12 sm:py-16">
        <div className="space-y-8 rounded-3xl bg-white p-6 leading-7 text-slate-700 shadow-sm ring-1 ring-slate-200 sm:p-8">
          {children}
        </div>

        <div className="mt-10 rounded-3xl bg-emerald-50 p-6 ring-1 ring-emerald-100 sm:p-8">
          <h2 className="text-2xl font-bold text-slate-950">
            Estimate your own numbers
          </h2>

          <p className="mt-3 leading-7 text-slate-700">
            The examples above are only general scenarios. Your result depends
            on your battery size, tariff rates, installed cost, efficiency and
            how often you use the battery.
          </p>

          <Link
            href={sectionPaths.calculator}
            className="mt-5 inline-flex rounded-xl bg-emerald-700 px-6 py-3 text-sm font-semibold text-white hover:bg-emerald-800"
          >
            Use the home battery savings calculator
          </Link>
        </div>

        <div className="mt-10">
          <QuoteLeadCta
            eyebrow="Ready to compare quotes?"
            title="Use this guide to ask better installer questions"
            description="Once you know the numbers that matter, compare any installer quote against your estimated savings, usable capacity and warranty terms."
            compact
          />
        </div>

        <RelatedGuides currentPath={currentPath} />
      </article>

      <SiteFooter />
    </main>
  );
}
