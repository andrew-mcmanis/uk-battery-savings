import type { Metadata } from "next";
import Link from "next/link";
import InfoPageLayout from "@/components/InfoPageLayout";
import { routePaths, sectionPaths } from "@/data/siteRoutes";

export const metadata: Metadata = {
  title: "Calculator Methodology",
  description:
    "Learn how the UK Home Battery Savings Calculator estimates annual savings, monthly savings, payback period and break-even battery cost.",
  alternates: {
    canonical: "/methodology",
  },
};

export default function MethodologyPage() {
  return (
    <InfoPageLayout
      eyebrow="Methodology"
      title="How the calculator works"
      description="This page explains the assumptions and formulas used by the UK Home Battery Savings Calculator."
    >
      <div>
        <h2 className="text-2xl font-bold text-slate-950">
          What the calculator estimates
        </h2>

        <p className="mt-3">
          The calculator estimates whether charging a home battery using cheaper
          off-peak electricity and using that stored energy during more
          expensive peak-rate periods could reduce electricity costs.
        </p>

        <p className="mt-3">
          It is designed as a first-pass estimate, not a guaranteed financial
          forecast.
        </p>
      </div>

      <div>
        <h2 className="text-2xl font-bold text-slate-950">
          Main calculation
        </h2>

        <p className="mt-3">
          The calculator first works out how much battery energy is useful during
          peak-rate periods.
        </p>

        <div className="mt-4 rounded-2xl bg-slate-50 p-5 font-mono text-sm text-slate-800 ring-1 ring-slate-200">
          useful battery energy = minimum of battery capacity and useful
          peak-period usage
        </div>

        <p className="mt-3">
          This matters because a battery only saves money when it replaces
          electricity that would otherwise be bought at the higher peak rate.
        </p>
      </div>

      <div>
        <h2 className="text-2xl font-bold text-slate-950">
          Off-peak charging cost
        </h2>

        <p className="mt-3">
          Batteries are not perfectly efficient. If the battery has 90%
          round-trip efficiency, more energy must be bought from the grid than
          the battery later delivers.
        </p>

        <div className="mt-4 rounded-2xl bg-slate-50 p-5 font-mono text-sm text-slate-800 ring-1 ring-slate-200">
          off-peak energy needed = useful battery energy ÷ battery efficiency
        </div>

        <div className="mt-4 rounded-2xl bg-slate-50 p-5 font-mono text-sm text-slate-800 ring-1 ring-slate-200">
          off-peak charging cost = off-peak energy needed × off-peak rate
        </div>
      </div>

      <div>
        <h2 className="text-2xl font-bold text-slate-950">
          Peak-rate cost avoided
        </h2>

        <p className="mt-3">
          The calculator estimates the cost of the peak-rate electricity that
          the battery could replace.
        </p>

        <div className="mt-4 rounded-2xl bg-slate-50 p-5 font-mono text-sm text-slate-800 ring-1 ring-slate-200">
          peak cost avoided = useful battery energy × peak rate
        </div>
      </div>

      <div>
        <h2 className="text-2xl font-bold text-slate-950">
          Saving per cycle
        </h2>

        <p className="mt-3">
          The saving per cycle is the difference between the peak-rate
          electricity avoided and the cost of charging the battery off-peak.
        </p>

        <div className="mt-4 rounded-2xl bg-slate-50 p-5 font-mono text-sm text-slate-800 ring-1 ring-slate-200">
          saving per cycle = peak cost avoided - off-peak charging cost
        </div>
      </div>

      <div>
        <h2 className="text-2xl font-bold text-slate-950">
          Annual saving
        </h2>

        <p className="mt-3">
          Annual saving is estimated by multiplying the saving per cycle by the
          number of battery cycles per year.
        </p>

        <div className="mt-4 rounded-2xl bg-slate-50 p-5 font-mono text-sm text-slate-800 ring-1 ring-slate-200">
          annual saving = saving per cycle × cycles per year
        </div>
      </div>

      <div>
        <h2 className="text-2xl font-bold text-slate-950">
          Payback period
        </h2>

        <p className="mt-3">
          Payback period is the estimated number of years it would take for the
          annual saving to recover the installed battery cost.
        </p>

        <div className="mt-4 rounded-2xl bg-slate-50 p-5 font-mono text-sm text-slate-800 ring-1 ring-slate-200">
          payback period = installed battery cost ÷ annual saving
        </div>

        <p className="mt-3">
          If the annual saving is zero or negative, the calculator shows the
          payback as not profitable.
        </p>
      </div>

      <div>
        <h2 className="text-2xl font-bold text-slate-950">
          Break-even battery cost
        </h2>

        <p className="mt-3">
          The break-even battery cost estimates the maximum installed cost that
          would break even over the warranty period, using the current annual
          saving estimate.
        </p>

        <div className="mt-4 rounded-2xl bg-slate-50 p-5 font-mono text-sm text-slate-800 ring-1 ring-slate-200">
          break-even battery cost = annual saving × warranty years
        </div>
      </div>

      <div>
        <h2 className="text-2xl font-bold text-slate-950">
          What is included
        </h2>

        <ul className="mt-3 list-disc space-y-2 pl-6">
          <li>Battery usable capacity</li>
          <li>Useful peak-period usage</li>
          <li>Peak electricity rate</li>
          <li>Off-peak electricity rate</li>
          <li>Battery round-trip efficiency</li>
          <li>Battery cycles per year</li>
          <li>Installed battery cost</li>
          <li>Warranty period</li>
        </ul>
      </div>

      <div>
        <h2 className="text-2xl font-bold text-slate-950">
          What is not included
        </h2>

        <ul className="mt-3 list-disc space-y-2 pl-6">
          <li>Solar generation modelling</li>
          <li>Export payments</li>
          <li>Standing charges</li>
          <li>Battery degradation over time</li>
          <li>Finance costs</li>
          <li>Tariff exit fees</li>
          <li>VAT differences</li>
          <li>Backup power value</li>
          <li>Future electricity price changes</li>
        </ul>
      </div>

      <div className="rounded-2xl bg-amber-50 p-5 ring-1 ring-amber-200">
        <h2 className="text-xl font-bold text-amber-950">
          Important limitation
        </h2>

        <p className="mt-3 text-amber-950">
          The calculator is deliberately simple. It is designed to help you
          compare rough assumptions before speaking to installers, not to replace
          a detailed home energy assessment or professional advice.
        </p>
      </div>

      <div>
        <h2 className="text-2xl font-bold text-slate-950">
          Best next step
        </h2>

        <p className="mt-3">
          Use the{" "}
          <Link
            href={sectionPaths.calculator}
            className="font-semibold text-emerald-700 hover:text-emerald-800"
          >
            home battery savings calculator
          </Link>{" "}
          with your own quote, tariff rates and usage assumptions.
        </p>
        <p className="mt-3">
          If you already have installer quotes, use the{" "}
          <Link
            href={routePaths.batteryQuoteComparison}
            className="font-semibold text-emerald-700 hover:text-emerald-800"
          >
            home battery quote comparison worksheet
          </Link>{" "}
          to compare installed cost, usable capacity, warranty and estimated payback.
        </p>
      </div>
    </InfoPageLayout>
  );
}
