import InfoPageLayout from "@/components/InfoPageLayout";
import { siteConfig } from "@/data/siteConfig";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: `Disclaimer | ${siteConfig.name}`,
  description:
    "Disclaimer for the UK Home Battery Savings Calculator and its estimated savings results.",
};

export default function DisclaimerPage() {
  return (
    <InfoPageLayout
      eyebrow="Disclaimer"
      title="Calculator disclaimer"
      description="The calculator provides a simplified estimate and should not be treated as a guaranteed result."
    >
      <div>
        <h2 className="text-2xl font-bold text-slate-950">Estimate only</h2>
        <p className="mt-3">
          The calculator result is an estimate based on the values you enter. It
          does not guarantee any particular saving, payback period or financial
          outcome.
        </p>
      </div>

      <div>
        <h2 className="text-2xl font-bold text-slate-950">
          Real-world results can vary
        </h2>
        <p className="mt-3">
          Actual savings can depend on your electricity usage pattern, tariff,
          standing charges, installation cost, battery model, battery settings,
          battery degradation, export rates, solar generation, VAT, finance
          costs and future energy prices.
        </p>
      </div>

      <div>
        <h2 className="text-2xl font-bold text-slate-950">
          Not financial advice
        </h2>
        <p className="mt-3">
          This website does not provide financial advice, regulated advice,
          installer advice or a recommendation to buy a specific product or
          service.
        </p>
      </div>

      <div>
        <h2 className="text-2xl font-bold text-slate-950">
          Check before buying
        </h2>
        <p className="mt-3">
          Before buying a home battery, speak to qualified installers, review
          the battery specification, check warranty terms, compare tariffs and
          make sure the system suits your property and usage.
        </p>
      </div>
    </InfoPageLayout>
  );
}
