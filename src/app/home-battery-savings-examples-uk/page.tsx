import GuidePageLayout from "@/components/GuidePageLayout";
import { batteryPresets } from "@/data/batteryPresets";
import { calculateBatterySavings } from "@/lib/batteryCalculator";
import { getBatteryVerdict } from "@/lib/batteryVerdict";
import { formatCurrency, formatCurrencyPrecise, formatYears } from "@/lib/formatters";
import type { Metadata } from "next";
import Link from "next/link";
import { sectionPaths } from "@/data/siteRoutes";

export const metadata: Metadata = {
  title: "Home Battery Savings Examples UK",
  description:
    "Compare example UK home battery savings scenarios, including small battery, typical off-peak charging and high peak usage assumptions.",
  alternates: {
    canonical: "/home-battery-savings-examples-uk",
  },
};

export default function HomeBatterySavingsExamplesPage() {
  const examples = batteryPresets.map((preset) => {
    const results = calculateBatterySavings(preset.inputs);
    const verdict = getBatteryVerdict({
      inputs: preset.inputs,
      results,
    });

    return {
      ...preset,
      results,
      verdict,
    };
  });

  return (
    <GuidePageLayout
      eyebrow="Home battery examples"
      title="Home battery savings examples UK"
      description="Compare example home battery scenarios to understand how battery size, useful peak usage, tariff rates and installed cost affect payback."
      currentPath="/home-battery-savings-examples-uk"
    >
      <div className="guide-content space-y-8">
        <p className="text-sm font-medium text-slate-500">
          Last updated: May 2026
        </p>

        <section>
          <h2>Why examples help</h2>
          <p>
            A home battery can look very different depending on the assumptions
            used. A small battery with low peak usage may have a weak payback,
            while a regularly cycled battery on a strong off-peak tariff may look
            more attractive.
          </p>
          <p>
            These examples use the same calculation logic as the calculator, so
            they are useful starting points rather than separate hand-written
            figures.
          </p>
        </section>

        <section>
          <h2>Example scenarios</h2>

          <div className="not-prose mt-6 grid gap-5">
            {examples.map((example) => (
              <div
                key={example.id}
                className="rounded-3xl bg-white p-6 shadow-sm ring-1 ring-slate-200"
              >
                <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
                  <div>
                    <p className="text-sm font-semibold uppercase tracking-wide text-emerald-700">
                      Scenario
                    </p>

                    <h3 className="mt-2 text-2xl font-bold text-slate-950">
                      {example.label}
                    </h3>

                    <p className="mt-3 max-w-2xl text-sm leading-6 text-slate-600">
                      {example.description}
                    </p>
                  </div>

                  <span className="inline-flex w-fit rounded-full bg-slate-950 px-3 py-1 text-xs font-semibold text-white">
                    {example.verdict.label}
                  </span>
                </div>

                <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                  <div className="rounded-2xl bg-slate-50 p-4 ring-1 ring-slate-200">
                    <p className="text-sm text-slate-500">Annual saving</p>
                    <p className="mt-2 text-2xl font-bold text-slate-950">
                      {formatCurrency(example.results.annualSaving)}
                    </p>
                  </div>

                  <div className="rounded-2xl bg-slate-50 p-4 ring-1 ring-slate-200">
                    <p className="text-sm text-slate-500">Monthly saving</p>
                    <p className="mt-2 text-2xl font-bold text-slate-950">
                      {formatCurrency(example.results.monthlySaving)}
                    </p>
                  </div>

                  <div className="rounded-2xl bg-slate-50 p-4 ring-1 ring-slate-200">
                    <p className="text-sm text-slate-500">Payback period</p>
                    <p className="mt-2 text-2xl font-bold text-slate-950">
                      {formatYears(example.results.paybackYears)}
                    </p>
                  </div>

                  <div className="rounded-2xl bg-slate-50 p-4 ring-1 ring-slate-200">
                    <p className="text-sm text-slate-500">Saving per cycle</p>
                    <p className="mt-2 text-2xl font-bold text-slate-950">
                      {formatCurrencyPrecise(example.results.savingPerCycle)}
                    </p>
                  </div>
                </div>

                <div className="mt-6 grid gap-4 text-sm leading-6 text-slate-700 sm:grid-cols-2">
                  <div className="rounded-2xl bg-emerald-50 p-4 ring-1 ring-emerald-100">
                    <p className="font-semibold text-slate-950">
                      Input assumptions
                    </p>

                    <ul className="mt-3 space-y-1">
                      <li>
                        Battery capacity: {example.inputs.batteryCapacityKwh} kWh
                      </li>
                      <li>
                        Useful peak usage: {example.inputs.peakUsageCoveredKwh} kWh
                      </li>
                      <li>
                        Installed cost:{" "}
                        {formatCurrency(example.inputs.installedCost)}
                      </li>
                      <li>
                        Warranty: {example.inputs.warrantyYears} years
                      </li>
                    </ul>
                  </div>

                  <div className="rounded-2xl bg-slate-50 p-4 ring-1 ring-slate-200">
                    <p className="font-semibold text-slate-950">
                      Tariff assumptions
                    </p>

                    <ul className="mt-3 space-y-1">
                      <li>Peak rate: {example.inputs.peakRatePence}p/kWh</li>
                      <li>
                        Off-peak rate: {example.inputs.offPeakRatePence}p/kWh
                      </li>
                      <li>
                        Efficiency: {example.inputs.efficiencyPercent}%
                      </li>
                      <li>
                        Cycles per year: {example.inputs.cyclesPerYear}
                      </li>
                    </ul>
                  </div>
                </div>

                <p className="mt-5 text-sm leading-6 text-slate-600">
                  {example.verdict.summary}
                </p>
              </div>
            ))}
          </div>
        </section>

        <section>
          <h2>What these examples show</h2>
          <p>
            The same battery can produce very different results depending on how
            much useful peak-rate electricity it replaces and how strong the gap
            is between peak and off-peak prices.
          </p>
          <p>
            Installed cost also matters heavily. A cheaper battery with slightly
            lower capacity can sometimes have a better payback than a larger,
            more expensive system.
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
              home battery savings calculator
            </Link>{" "}
            to test your own quote, tariff rates and expected peak-period usage.
          </p>
        </section>
      </div>
    </GuidePageLayout>
  );
}
