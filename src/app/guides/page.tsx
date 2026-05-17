import SiteFooter from "@/components/SiteFooter";
import SiteHeader from "@/components/SiteHeader";
import Breadcrumbs from "@/components/Breadcrumbs";
import { guides } from "@/data/guides";
import StructuredData from "@/components/StructuredData";
import {
  buildBreadcrumbSchema,
  buildCollectionPageSchema,
} from "@/lib/structuredData";
import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Home Battery Guides",
  description:
    "Read practical UK home battery guides covering savings, payback period, off-peak charging, batteries without solar and quote checks.",
  alternates: {
    canonical: "/guides",
  },
};

export default function GuidesPage() {
  const breadcrumbSchema = buildBreadcrumbSchema([
    { name: "Home", path: "/" },
    { name: "Guides", path: "/guides" },
  ]);

  const collectionPageSchema = buildCollectionPageSchema({
    name: "UK home battery guides",
    description:
      "Practical UK home battery guides covering savings, payback period, off-peak charging, batteries without solar and quote checks.",
    path: "/guides",
  });

  return (
     <main className="min-h-screen bg-slate-50 text-slate-900">
      <StructuredData data={[breadcrumbSchema, collectionPageSchema]} />
      <SiteHeader />

      <section className="bg-slate-950 px-6 py-16 text-white sm:py-20">
        <div className="mx-auto max-w-4xl">
          <Breadcrumbs
            items={[
              { label: "Home", href: "/" },
              { label: "Guides" },
            ]}
          />
         <p className="mt-8 text-sm font-semibold uppercase tracking-wide text-emerald-300">
            Guides
          </p>

          <h1 className="mt-4 text-4xl font-bold tracking-tight sm:text-5xl">
            UK home battery guides
          </h1>

          <p className="mt-5 max-w-3xl text-lg leading-8 text-slate-300">
            Practical guides to help you understand home battery savings,
            payback period, off-peak charging and the questions to ask before
            accepting a quote.
          </p>

          <Link
            href="/#calculator"
            className="mt-8 inline-flex rounded-xl bg-emerald-500 px-6 py-3 text-sm font-semibold text-slate-950 hover:bg-emerald-400"
          >
            Try the calculator
          </Link>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-6 py-12 sm:py-16">
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {guides.map((guide) => (
            <Link
              key={guide.href}
              href={guide.href}
              className="rounded-2xl bg-white p-6 shadow-sm ring-1 ring-slate-200 transition hover:-translate-y-1 hover:shadow-md"
            >
              <h2 className="text-lg font-bold text-slate-950">
                {guide.title}
              </h2>

              <p className="mt-3 text-sm leading-6 text-slate-600">
                {guide.description}
              </p>

              <p className="mt-5 text-sm font-semibold text-emerald-700">
                Read guide →
              </p>
            </Link>
          ))}
        </div>
      </section>

      <section className="bg-white px-6 py-12 sm:py-16">
        <div className="mx-auto max-w-4xl rounded-3xl bg-emerald-50 p-6 ring-1 ring-emerald-100 sm:p-8">
          <h2 className="text-2xl font-bold text-slate-950">
            Start with your own numbers
          </h2>

          <p className="mt-3 leading-7 text-slate-700">
            The guides explain the concepts, but the best next step is to test
            your own battery size, tariff rates, installed cost and expected
            usage.
          </p>

          <Link
            href="/#calculator"
            className="mt-5 inline-flex rounded-xl bg-emerald-700 px-6 py-3 text-sm font-semibold text-white hover:bg-emerald-800"
          >
            Use the home battery savings calculator
          </Link>
        </div>
      </section>

      <SiteFooter />
    </main>
  );
}
