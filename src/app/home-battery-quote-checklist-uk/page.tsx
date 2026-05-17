import GuidePageLayout from "@/components/GuidePageLayout";
import type { Metadata } from "next";
import Link from "next/link";
import { sectionPaths } from "@/data/siteRoutes";

export const metadata: Metadata = {
  title: "Home Battery Quote Checklist UK",
  description:
    "A practical checklist of questions to ask before accepting a UK home battery quote, including installed cost, usable capacity, warranty, inverter and tariff assumptions.",
  alternates: {
    canonical: "/home-battery-quote-checklist-uk",
  },
};

export default function HomeBatteryQuoteChecklistPage() {
  return (
    <GuidePageLayout
      eyebrow="Home battery guide"
      title="Home battery quote checklist UK"
      description="Use this checklist before accepting a home battery quote so you understand the true installed cost, usable capacity, warranty and likely savings."
      currentPath="/home-battery-quote-checklist-uk"
    >
      <div className="guide-content space-y-8">
        <p className="text-sm font-medium text-slate-500">Last updated: May 2026</p>
        <section>
          <h2>Before you compare quotes</h2>
          <p>
            A home battery quote is not just about the battery price. You need
            to understand the full installed cost, the usable capacity, the
            warranty terms, the inverter setup and whether your tariff and usage
            pattern support the claimed savings.
          </p>
        </section>

        <section>
          <h2>Cost questions</h2>
          <ul>
            <li>What is the total installed cost including VAT?</li>
            <li>Does the quote include labour, electrical work and commissioning?</li>
            <li>Are there any extra costs for monitoring equipment or configuration?</li>
            <li>Is the quote for battery only, or solar plus battery?</li>
            <li>Are finance costs included or shown separately?</li>
          </ul>
        </section>

        <section>
          <h2>Battery specification questions</h2>
          <ul>
            <li>What is the nominal battery capacity?</li>
            <li>What is the usable battery capacity?</li>
            <li>What is the round-trip efficiency?</li>
            <li>What is the maximum charge and discharge rate?</li>
            <li>Can the battery fully cover your expected peak-period usage?</li>
          </ul>
        </section>

        <section>
          <h2>Warranty questions</h2>
          <ul>
            <li>How many years is the battery warranty?</li>
            <li>Does the warranty include a cycle limit?</li>
            <li>What capacity is guaranteed at the end of the warranty?</li>
            <li>Who handles warranty claims?</li>
            <li>Is the installer likely to be around if support is needed later?</li>
          </ul>
        </section>

        <section>
          <h2>Tariff and savings questions</h2>
          <ul>
            <li>Which peak and off-peak rates are being used in the savings estimate?</li>
            <li>How many battery cycles per year are assumed?</li>
            <li>Does the estimate include battery efficiency losses?</li>
            <li>Does the estimate include standing charges or only unit rates?</li>
            <li>What happens if the tariff changes?</li>
          </ul>
        </section>

        <section>
          <h2>Installation questions</h2>
          <ul>
            <li>Where will the battery be installed?</li>
            <li>Is the location suitable for the battery model?</li>
            <li>Will any consumer unit or electrical upgrades be needed?</li>
            <li>Will the battery provide backup power during a power cut?</li>
            <li>Is backup power included in the quote or an optional extra?</li>
          </ul>
        </section>

        <section>
          <h2>Best next step</h2>
          <p>
            Before speaking to installers, use the{" "}
            <Link
              href={sectionPaths.calculator}
              className="font-semibold text-emerald-700 hover:text-emerald-800"
            >
              home battery savings calculator
            </Link>{" "}
            to create a rough savings estimate. Then compare each quote against
            that estimate.
          </p>
        </section>
      </div>
    </GuidePageLayout>
  );
}
