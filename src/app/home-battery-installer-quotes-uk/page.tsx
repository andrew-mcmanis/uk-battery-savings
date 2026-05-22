import type { Metadata } from "next";
import Link from "next/link";
import Breadcrumbs from "@/components/Breadcrumbs";
import SiteFooter from "@/components/SiteFooter";
import SiteHeader from "@/components/SiteHeader";
import StructuredData from "@/components/StructuredData";
import { siteConfig } from "@/data/siteConfig";
import { routePaths, sectionPaths } from "@/data/siteRoutes";
import {
  buildArticleSchema,
  buildBreadcrumbSchema,
} from "@/lib/structuredData";

export const metadata: Metadata = {
  title: "Compare Home Battery Installer Quotes UK",
  description:
    "Prepare for UK home battery installer quotes, compare total installed cost, usable capacity, warranty, backup power and estimated payback before choosing.",
  alternates: {
    canonical: "/home-battery-installer-quotes-uk",
  },
};

const quoteSubject = encodeURIComponent(
  "Home battery quote comparison request"
);

const quoteBody = encodeURIComponent(
  [
    "I would like help comparing home battery quotes.",
    "",
    "Postcode area:",
    "Do you already have solar panels?",
    "Battery size or quote details:",
    "Total installed cost quoted:",
    "Current peak and off-peak tariff rates:",
    "Anything else important:",
  ].join("\n")
);

const comparisonSteps = [
  {
    title: "1. Start with your savings estimate",
    description:
      "Use your own tariff rates, usable battery capacity, installed cost and expected peak-period usage before speaking to installers.",
  },
  {
    title: "2. Ask each installer for the same figures",
    description:
      "Request total installed cost, usable capacity, warranty, cycle limit, backup power details and the tariff assumptions behind any savings claim.",
  },
  {
    title: "3. Compare quotes side by side",
    description:
      "Judge each offer by payback, cost per usable kWh, warranty length and whether optional extras are included in the headline price.",
  },
];

const quoteChecks = [
  "Total installed cost including VAT, labour and commissioning",
  "Usable battery capacity, not only nominal capacity",
  "Battery warranty length, cycle limit and end-of-warranty capacity",
  "Backup power capability and whether it costs extra",
  "Inverter compatibility, monitoring and any electrical upgrade costs",
  "Savings estimate assumptions for tariff rates, cycles and efficiency",
];

export default function HomeBatteryInstallerQuotesPage() {
  const breadcrumbSchema = buildBreadcrumbSchema([
    { name: "Home", path: routePaths.home },
    { name: "Guides", path: routePaths.guides },
    { name: "Installer quotes", path: routePaths.batteryInstallerQuotes },
  ]);

  const articleSchema = buildArticleSchema({
    headline: "Compare home battery installer quotes UK",
    description:
      "Prepare for UK home battery installer quotes and compare offers by cost, usable capacity, warranty, backup power and payback.",
    path: routePaths.batteryInstallerQuotes,
    dateModified: "2026-05-22",
  });

  return (
    <main id="main-content" className="min-h-screen bg-slate-50 text-slate-900">
      <StructuredData data={[breadcrumbSchema, articleSchema]} />
      <SiteHeader />

      <section className="bg-slate-950 px-6 py-16 text-white sm:py-20">
        <div className="mx-auto max-w-5xl">
          <Breadcrumbs
            items={[
              { label: "Home", href: routePaths.home },
              { label: "Guides", href: routePaths.guides },
              { label: "Installer quotes" },
            ]}
          />

          <p className="mt-8 text-sm font-semibold uppercase tracking-wide text-emerald-300">
            Home battery quotes
          </p>

          <h1 className="mt-4 max-w-4xl text-4xl font-bold tracking-tight sm:text-5xl">
            Compare UK home battery installer quotes before you commit
          </h1>

          <p className="mt-5 max-w-3xl text-lg leading-8 text-slate-300">
            A good battery quote should make the total installed cost, usable
            capacity, warranty and savings assumptions easy to compare. Use this
            page to get quote-ready and avoid choosing on headline price alone.
          </p>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <a
              href={`mailto:${siteConfig.contactEmail}?subject=${quoteSubject}&body=${quoteBody}`}
              className="inline-flex justify-center rounded-xl bg-emerald-500 px-6 py-3 text-sm font-semibold text-slate-950 hover:bg-emerald-400"
            >
              Send quote details
            </a>

            <Link
              href={sectionPaths.calculator}
              className="inline-flex justify-center rounded-xl bg-white/10 px-6 py-3 text-sm font-semibold text-white ring-1 ring-white/20 hover:bg-white/15"
            >
              Estimate savings first
            </Link>
          </div>

          <p className="mt-4 max-w-3xl text-xs leading-5 text-slate-400">
            Commercial note: this site may earn referral or advertising income
            in the future. Any paid placement should be clearly labelled and
            should not change the calculator maths.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-6 py-12 sm:py-16">
        <div className="grid gap-5 lg:grid-cols-3">
          {comparisonSteps.map((step) => (
            <div
              key={step.title}
              className="rounded-3xl bg-white p-6 shadow-sm ring-1 ring-slate-200"
            >
              <h2 className="text-xl font-bold text-slate-950">
                {step.title}
              </h2>
              <p className="mt-3 leading-7 text-slate-600">
                {step.description}
              </p>
            </div>
          ))}
        </div>

        <div className="mt-10 grid gap-8 lg:grid-cols-[0.9fr_1.1fr]">
          <div className="rounded-3xl bg-white p-6 shadow-sm ring-1 ring-slate-200 sm:p-8">
            <p className="text-sm font-semibold uppercase tracking-wide text-emerald-700">
              Quote checklist
            </p>
            <h2 className="mt-3 text-2xl font-bold text-slate-950">
              What every quote should include
            </h2>

            <ul className="mt-5 space-y-3">
              {quoteChecks.map((check) => (
                <li key={check} className="flex gap-3 leading-7 text-slate-700">
                  <span className="mt-3 h-1.5 w-1.5 shrink-0 rounded-full bg-emerald-600" />
                  <span>{check}</span>
                </li>
              ))}
            </ul>

            <Link
              href={routePaths.batteryQuoteChecklist}
              className="mt-6 inline-flex text-sm font-semibold text-emerald-700 hover:text-emerald-800"
            >
              Open the full quote checklist
            </Link>
          </div>

          <div className="rounded-3xl bg-emerald-50 p-6 ring-1 ring-emerald-100 sm:p-8">
            <p className="text-sm font-semibold uppercase tracking-wide text-emerald-800">
              Lead-ready workflow
            </p>
            <h2 className="mt-3 text-2xl font-bold text-slate-950">
              Send a quote-ready enquiry
            </h2>

            <p className="mt-3 leading-7 text-slate-700">
              If you already have a quote, send the headline figures and use the
              worksheet to compare it against other offers. The best commercial
              path for this site is to turn high-intent visitors into quote
              enquiries that can later be matched with vetted installers or
              sponsors.
            </p>

            <div className="mt-6 flex flex-col gap-3 sm:flex-row">
              <a
                href={`mailto:${siteConfig.contactEmail}?subject=${quoteSubject}&body=${quoteBody}`}
                className="inline-flex justify-center rounded-xl bg-emerald-700 px-5 py-3 text-sm font-semibold text-white hover:bg-emerald-800"
              >
                Email quote details
              </a>

              <Link
                href={routePaths.batteryQuoteComparison}
                className="inline-flex justify-center rounded-xl bg-white px-5 py-3 text-sm font-semibold text-slate-950 shadow-sm ring-1 ring-slate-200 hover:bg-slate-50"
              >
                Compare quotes
              </Link>
            </div>
          </div>
        </div>

        <div className="mt-10 rounded-3xl bg-white p-6 shadow-sm ring-1 ring-slate-200 sm:p-8">
          <h2 className="text-2xl font-bold text-slate-950">
            Where monetisation can fit without hurting trust
          </h2>

          <div className="mt-5 grid gap-5 md:grid-cols-3">
            <div>
              <h3 className="font-bold text-slate-950">Installer referrals</h3>
              <p className="mt-2 text-sm leading-6 text-slate-600">
                High-intent quote pages can generate enquiries for vetted
                installers once a referral process exists.
              </p>
            </div>

            <div>
              <h3 className="font-bold text-slate-950">Affiliate products</h3>
              <p className="mt-2 text-sm leading-6 text-slate-600">
                Tariff, monitoring and battery-related partners can be linked
                where they genuinely help the buyer make progress.
              </p>
            </div>

            <div>
              <h3 className="font-bold text-slate-950">Sponsored placements</h3>
              <p className="mt-2 text-sm leading-6 text-slate-600">
                Sponsors should be labelled clearly and kept separate from the
                calculator result so the numbers stay credible.
              </p>
            </div>
          </div>
        </div>
      </section>

      <SiteFooter />
    </main>
  );
}
