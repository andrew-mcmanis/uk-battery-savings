import type { Metadata } from "next";
import Breadcrumbs from "@/components/Breadcrumbs";
import SiteFooter from "@/components/SiteFooter";
import SiteHeader from "@/components/SiteHeader";
import StructuredData from "@/components/StructuredData";
import ToolCard from "@/components/ToolCard";
import { routePaths } from "@/data/siteRoutes";
import { tools } from "@/data/tools";
import {
  buildBreadcrumbSchema,
  buildCollectionPageSchema,
} from "@/lib/structuredData";

export const metadata: Metadata = {
  title: "Home Battery Tools UK",
  description:
    "Use practical UK home battery tools including a savings calculator and quote comparison worksheet.",
  alternates: {
    canonical: "/tools",
  },
};

export default function ToolsPage() {
  const breadcrumbSchema = buildBreadcrumbSchema([
    { name: "Home", path: routePaths.home },
    { name: "Tools", path: routePaths.tools },
  ]);

  const collectionPageSchema = buildCollectionPageSchema({
    name: "UK home battery tools",
    description:
      "Practical UK home battery tools including a savings calculator and quote comparison worksheet.",
    path: routePaths.tools,
  });

  return (
    <main id="main-content" className="min-h-screen bg-slate-50 text-slate-900">
      <StructuredData data={[breadcrumbSchema, collectionPageSchema]} />
      <SiteHeader />

      <section className="bg-slate-950 px-6 py-16 text-white sm:py-20">
        <div className="mx-auto max-w-4xl">
          <Breadcrumbs
            items={[
              { label: "Home", href: routePaths.home },
              { label: "Tools" },
            ]}
          />

          <p className="mt-8 text-sm font-semibold uppercase tracking-wide text-emerald-300">
            Tools
          </p>

          <h1 className="mt-4 text-4xl font-bold tracking-tight sm:text-5xl">
            UK home battery tools
          </h1>

          <p className="mt-5 max-w-3xl text-lg leading-8 text-slate-300">
            Use these simple tools to estimate battery savings, compare quotes
            and make better decisions before speaking to installers.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-6 py-12 sm:py-16">
        <div className="grid items-stretch gap-5 md:grid-cols-2">
          {tools.map((tool) => (
            <ToolCard
              key={tool.href}
              title={tool.title}
              description={tool.description}
              href={tool.href}
              label={tool.label}
            />
          ))}
        </div>

        <div className="mt-10 rounded-3xl bg-emerald-50 p-6 ring-1 ring-emerald-100 sm:p-8">
          <h2 className="text-2xl font-bold text-slate-950">
            Use the tools together
          </h2>

          <p className="mt-3 leading-7 text-slate-700">
            Start with the savings calculator to estimate annual saving and
            payback. Then use the quote comparison worksheet to compare real
            installer quotes side by side.
          </p>
        </div>
      </section>

      <SiteFooter />
    </main>
  );
}
