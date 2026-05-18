import type { Metadata } from "next";
import Link from "next/link";
import GuidePageLayout from "@/components/GuidePageLayout";
import QuoteComparisonWorksheet from "@/components/QuoteComparisonWorksheet";
import { sectionPaths } from "@/data/siteRoutes";
import StructuredData from "@/components/StructuredData";
import { buildQuoteComparisonWebApplicationSchema } from "@/lib/structuredData";

export const metadata: Metadata = {
  title: "Home Battery Quote Comparison UK",
  description:
    "Compare up to three UK home battery quotes by installed cost, usable capacity, warranty, cost per kWh, estimated annual saving and payback period.",
  alternates: {
    canonical: "/home-battery-quote-comparison-uk",
  },
};

export default function HomeBatteryQuoteComparisonPage() {
  const quoteComparisonSchema = buildQuoteComparisonWebApplicationSchema();

  return (
    <GuidePageLayout
      eyebrow="Home battery tool"
      title="Home battery quote comparison UK"
      description="Use this worksheet to compare home battery quotes side by side before deciding which installer or battery option deserves a closer look."
      currentPath="/home-battery-quote-comparison-uk"
    >
      <StructuredData data={quoteComparisonSchema} />

      <div className="guide-content space-y-8">
        <p className="text-sm font-medium text-slate-500">
          Last updated: May 2026
        </p>

        <section>
          <h2>Why compare quotes this way?</h2>
          <p>
            A lower headline price does not always mean better value. A quote
            with a larger usable battery capacity, stronger warranty, backup
            power or better installation scope may be worth more than a cheaper
            but limited option.
          </p>

          <p>
            This worksheet helps you compare the core numbers in a consistent
            format.
          </p>
        </section>

        <section>
          <h2>When to use this worksheet</h2>

          <p>
            Use this worksheet after you have one or more home battery quotes and want
            to compare them using the same core assumptions. It is especially useful
            when quotes have different battery sizes, warranty periods, backup power
            options or estimated savings.
          </p>

          <p>
            If you do not yet have an annual saving estimate, start with the{" "}
            <Link
              href={sectionPaths.calculator}
              className="font-semibold text-emerald-700 hover:text-emerald-800"
            >
              home battery savings calculator
            </Link>{" "}
            first, then bring the annual saving into this worksheet.
          </p>
        </section>

        <QuoteComparisonWorksheet />

        <section>
          <h2>How to use the results</h2>
          <p>
            Use cost per usable kWh to compare the installed price against the
            actual useful battery capacity. Use payback period to compare the
            quote cost against your estimated annual saving.
          </p>

          <p>
            If you do not yet have an annual saving estimate, use the{" "}
            <Link
              href={sectionPaths.calculator}
              className="font-semibold text-emerald-700 hover:text-emerald-800"
            >
              home battery savings calculator
            </Link>{" "}
            first, then enter that annual saving into the worksheet.
          </p>
        </section>
      </div>
    </GuidePageLayout>
  );
}
