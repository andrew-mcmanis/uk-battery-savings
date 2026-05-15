import InfoPageLayout from "@/components/InfoPageLayout";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: `About`,
  description:
    "Learn what the UK Home Battery Savings Calculator does, who it is for, and how it estimates potential battery savings.",
  alternates: {
    canonical: "/about",
  },
};

export default function AboutPage() {
  return (
    <InfoPageLayout
      eyebrow="About"
      title="About this calculator"
      description="This site helps UK households make a quick first-pass estimate of whether a home battery could be worth investigating."
    >
      <div>
        <h2 className="text-2xl font-bold text-slate-950">What this site does</h2>
        <p className="mt-3">
          The calculator estimates the possible saving from charging a home
          battery using cheaper off-peak electricity and using that stored energy
          later when electricity is more expensive.
        </p>
      </div>

      <div>
        <h2 className="text-2xl font-bold text-slate-950">Why it exists</h2>
        <p className="mt-3">
          Home batteries can be expensive, and the numbers are not always easy
          to understand. This tool gives you a quick way to compare tariff rates,
          battery size, installation cost, efficiency and expected usage.
        </p>
      </div>

      <div>
        <h2 className="text-2xl font-bold text-slate-950">What it does not do</h2>
        <p className="mt-3">
          It does not provide a guaranteed financial forecast, regulated
          financial advice, a full solar model, or an installer quotation. It is
          designed to be a simple estimate before you spend more time researching
          options.
        </p>
      </div>
    </InfoPageLayout>
  );
}
