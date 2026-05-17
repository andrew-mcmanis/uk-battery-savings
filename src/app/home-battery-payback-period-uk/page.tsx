import GuidePageLayout from "@/components/GuidePageLayout";
import type { Metadata } from "next";
import Link from "next/link";
import { sectionPaths } from "@/data/siteRoutes";

export const metadata: Metadata = {
  title: "Home Battery Payback Period UK",
  description:
    "Understand how to estimate the payback period for a UK home battery using installed cost, annual saving and tariff assumptions.",
  alternates: {
    canonical: "/home-battery-payback-period-uk",
  },
};

export default function HomeBatteryPaybackPeriodPage() {
  return (
    <GuidePageLayout
      eyebrow="Home battery guide"
      title="How to estimate a home battery payback period"
      description="The payback period is the rough number of years it takes for estimated savings to recover the installed battery cost."
      currentPath="/home-battery-payback-period-uk"
    >
      <div className="guide-content space-y-8">
        <p className="text-sm font-medium text-slate-500">Last updated: May 2026</p>
        <section>
          <h2>The basic payback formula</h2>
          <p>The simple formula is:</p>

          <div className="rounded-2xl bg-slate-50 p-5 font-mono text-sm text-slate-800 ring-1 ring-slate-200">
            Payback period = installed battery cost ÷ annual saving
          </div>

          <p>
            For example, if a battery costs £5,000 installed and saves £600 per
            year, the rough payback period is 8.3 years.
          </p>
        </section>

        <section>
          <h2>What counts as installed cost?</h2>
          <p>
            Installed cost should mean the total amount paid to get the battery
            working, not just the battery unit price.
          </p>
          <p>This may include:</p>
          <ul>
            <li>Battery unit cost</li>
            <li>Inverter or hybrid inverter costs</li>
            <li>Installation labour</li>
            <li>Electrical work</li>
            <li>Monitoring equipment</li>
            <li>Any additional setup costs</li>
          </ul>
        </section>

        <section>
          <h2>What affects annual saving?</h2>
          <p>Annual saving depends on:</p>
          <ul>
            <li>The difference between peak and off-peak electricity rates.</li>
            <li>Usable battery capacity.</li>
            <li>Battery efficiency.</li>
            <li>How often the battery cycles.</li>
            <li>Whether your household actually uses the stored energy.</li>
          </ul>
        </section>

        <section>
          <h2>Why payback is only a rough guide</h2>
          <p>
            A simple payback calculation does not include every real-world
            factor. It usually ignores future tariff changes, battery
            degradation, finance costs, warranty terms, maintenance issues and
            changes in household electricity usage.
          </p>
          <p>
            That does not make it useless. It just means payback should be used
            as a first filter, not the final decision.
          </p>
        </section>

        <section>
          <h2>What is a good payback period?</h2>
          <p>
            There is no single perfect answer. A shorter payback period is
            easier to justify. A longer payback period may still be acceptable if
            you value backup power, lower grid dependence, or expect electricity
            price differences to remain favourable.
          </p>
        </section>

        <section>
          <h2>Best next step</h2>
          <p>
            Use the{" "}
            <Link
              href={sectionPaths.calculator}
              className="font-semibold text-emerald-700 hover:text-emerald-800"
            >
              battery payback calculator
            </Link>{" "}
            to test different installed costs and tariff assumptions.
          </p>
        </section>
      </div>
    </GuidePageLayout>
  );
}
