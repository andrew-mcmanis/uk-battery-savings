"use client";

import { batteryPresets } from "@/data/batteryPresets";
import { popularBatteryOptions } from "@/data/popularBatteryOptions";
import { routePaths, sectionPaths } from "@/data/siteRoutes";
import {
  calculateBatterySavings,
  type BatteryCalculatorInputs,
} from "@/lib/batteryCalculator";
import { sanitizeBatteryInputs } from "@/lib/batteryInputLimits";
import {
  encodeBatteryInputs,
  parseBatteryInputsFromSearchParams,
} from "@/lib/batteryShareUrl";
import { getBatteryVerdict } from "@/lib/batteryVerdict";
import { getBatteryWarnings } from "@/lib/batteryWarnings";
import {
  formatCurrency,
  formatCurrencyPrecise,
  formatYears,
} from "@/lib/formatters";
import { useEffect, useMemo, useState } from "react";

type NumberInputProps = {
  label: string;
  value: number;
  min?: number;
  max?: number;
  step?: number;
  prefix?: string;
  suffix?: string;
  helpText?: string;
  onChange: (value: number) => void;
};

function NumberInput({
  label,
  value,
  min,
  max,
  step = 1,
  prefix,
  suffix,
  helpText,
  onChange,
}: NumberInputProps) {
  return (
    <label className="block">
      <span className="text-sm font-medium text-slate-800">{label}</span>

      <div className="mt-2 flex rounded-xl border border-slate-300 bg-white shadow-sm focus-within:border-emerald-600 focus-within:ring-2 focus-within:ring-emerald-100">
        {prefix ? (
          <span className="flex shrink-0 items-center px-4 text-sm text-slate-500">
            {prefix}
          </span>
        ) : null}

        <input
          type="number"
          value={value}
          min={min}
          max={max}
          step={step}
          onChange={(event) => onChange(Number(event.target.value))}
          className="w-full rounded-xl border-0 bg-transparent px-4 py-3 text-slate-900 outline-none"
        />

        {suffix ? (
          <span className="flex shrink-0 items-center px-4 text-sm text-slate-500">
            {suffix}
          </span>
        ) : null}
      </div>

      {helpText ? (
        <p className="mt-1 text-xs text-slate-500">{helpText}</p>
      ) : null}
    </label>
  );
}

type ResultCardProps = {
  title: string;
  value: string;
  description: string;
};

function ResultCard({ title, value, description }: ResultCardProps) {
  return (
    <div className="rounded-2xl bg-white p-4 shadow-sm ring-1 ring-slate-200 sm:p-5">
      <p className="text-sm font-medium text-slate-500">{title}</p>
      <p className="mt-2 text-2xl font-bold text-slate-950 sm:text-3xl">
        {value}
      </p>
      <p className="mt-2 text-sm leading-6 text-slate-600">{description}</p>
    </div>
  );
}

function getVerdictClasses(tone: string) {
  switch (tone) {
    case "strong":
      return {
        container: "bg-emerald-50 ring-emerald-200",
        badge: "bg-emerald-700 text-white",
        text: "text-emerald-950",
      };
    case "moderate":
      return {
        container: "bg-blue-50 ring-blue-200",
        badge: "bg-blue-700 text-white",
        text: "text-blue-950",
      };
    case "negative":
      return {
        container: "bg-red-50 ring-red-200",
        badge: "bg-red-700 text-white",
        text: "text-red-950",
      };
    default:
      return {
        container: "bg-amber-50 ring-amber-200",
        badge: "bg-amber-700 text-white",
        text: "text-amber-950",
      };
  }
}

function getWarningClasses(tone: string) {
  switch (tone) {
    case "negative":
      return {
        container: "bg-red-50 ring-red-200",
        badge: "bg-red-700 text-white",
        text: "text-red-950",
      };
    case "warning":
      return {
        container: "bg-amber-50 ring-amber-200",
        badge: "bg-amber-700 text-white",
        text: "text-amber-950",
      };
    default:
      return {
        container: "bg-blue-50 ring-blue-200",
        badge: "bg-blue-700 text-white",
        text: "text-blue-950",
      };
  }
}

const defaultBatteryInputs: BatteryCalculatorInputs = sanitizeBatteryInputs({
  batteryCapacityKwh: 10,
  peakUsageCoveredKwh: 8,
  installedCost: 5000,
  peakRatePence: 28,
  offPeakRatePence: 7,
  efficiencyPercent: 90,
  cyclesPerYear: 300,
  warrantyYears: 10,
});

export default function BatterySavingsCalculator() {
  const [inputs, setInputs] =
    useState<BatteryCalculatorInputs>(defaultBatteryInputs);

  const [selectedPresetId, setSelectedPresetId] = useState<string>("typical");
  const [selectedBatteryOptionId, setSelectedBatteryOptionId] =
    useState<string>("custom");

  const [copyStatus, setCopyStatus] = useState<"idle" | "copied" | "failed">(
    "idle"
  );

  const [shareLinkStatus, setShareLinkStatus] = useState<
    "idle" | "copied" | "failed"
  >("idle");

  useEffect(() => {
    const parsedInputs = parseBatteryInputsFromSearchParams(
      new URLSearchParams(window.location.search),
      defaultBatteryInputs
    );

    if (!parsedInputs) {
      return;
    }

    const timeoutId = window.setTimeout(() => {
      setInputs(parsedInputs);
      setSelectedPresetId("custom");
      setSelectedBatteryOptionId("custom");
    }, 0);

    return () => {
      window.clearTimeout(timeoutId);
    };
  }, []);

  const results = useMemo(() => {
    return calculateBatterySavings(inputs);
  }, [inputs]);

  const verdict = useMemo(() => {
    return getBatteryVerdict({ inputs, results });
  }, [inputs, results]);

  const verdictClasses = getVerdictClasses(verdict.tone);

  const warnings = useMemo(() => {
    return getBatteryWarnings({ inputs, results });
  }, [inputs, results]);

  const hasPositiveSaving = results.annualSaving > 0;

  function applyPreset(presetId: string, presetInputs: BatteryCalculatorInputs) {
    setInputs(sanitizeBatteryInputs(presetInputs));
    setSelectedPresetId(presetId);
    setSelectedBatteryOptionId("custom");
  }

  function applyBatteryOption(optionId: string, usableCapacityKwh: number) {
    setInputs((currentInputs) =>
      sanitizeBatteryInputs({
        ...currentInputs,
        batteryCapacityKwh: usableCapacityKwh,
        peakUsageCoveredKwh: Math.min(
          currentInputs.peakUsageCoveredKwh,
          usableCapacityKwh
        ),
      })
    );

    setSelectedPresetId("custom");
    setSelectedBatteryOptionId(optionId);
  }

  function updateInput<Key extends keyof BatteryCalculatorInputs>(
    key: Key,
    value: BatteryCalculatorInputs[Key]
  ) {
    setInputs((currentInputs) =>
      sanitizeBatteryInputs({
        ...currentInputs,
        [key]: value,
      })
    );

    setSelectedPresetId("custom");

    if (key === "batteryCapacityKwh") {
      setSelectedBatteryOptionId("custom");
    }
  }

  async function copyResultSummary() {
    const summary = [
      "Home battery savings estimate",
      `Annual saving: ${formatCurrency(results.annualSaving)}`,
      `Monthly saving: ${formatCurrency(results.monthlySaving)}`,
      `Payback period: ${formatYears(results.paybackYears)}`,
      `Battery capacity: ${inputs.batteryCapacityKwh} kWh`,
      `Useful peak-period usage: ${inputs.peakUsageCoveredKwh} kWh`,
      `Peak rate: ${inputs.peakRatePence}p/kWh`,
      `Off-peak rate: ${inputs.offPeakRatePence}p/kWh`,
      `Battery efficiency: ${inputs.efficiencyPercent}%`,
      `Cycles per year: ${inputs.cyclesPerYear}`,
      `Verdict: ${verdict.label}`,
    ].join("\n");

    try {
      await navigator.clipboard.writeText(summary);
      setCopyStatus("copied");

      window.setTimeout(() => {
        setCopyStatus("idle");
      }, 2500);
    } catch {
      setCopyStatus("failed");

      window.setTimeout(() => {
        setCopyStatus("idle");
      }, 2500);
    }
  }

  async function copyShareLink() {
    const queryString = encodeBatteryInputs(inputs);
    const shareUrl = `${window.location.origin}${routePaths.home}?${queryString}${sectionPaths.calculatorResult.replace(routePaths.home, "")}`;

    try {
      await navigator.clipboard.writeText(shareUrl);
      setShareLinkStatus("copied");

      window.setTimeout(() => {
        setShareLinkStatus("idle");
      }, 2500);
    } catch {
      setShareLinkStatus("failed");

      window.setTimeout(() => {
        setShareLinkStatus("idle");
      }, 2500);
    }
  }

  function printEstimate() {
    const generatedDate = new Intl.DateTimeFormat("en-GB", {
      day: "2-digit",
      month: "long",
      year: "numeric",
    }).format(new Date());

    const printWindow = window.open("", "_blank");

    if (!printWindow) {
      window.print();
      return;
    }

    const estimateHtml = `
<!doctype html>
<html lang="en-GB">
<head>
  <meta charset="utf-8" />
  <title>UK Home Battery Savings Estimate</title>
  <style>
    @page {
      size: A4;
      margin: 12mm;
    }

    * {
      box-sizing: border-box;
    }

    body {
      margin: 0;
      font-family: Arial, Helvetica, sans-serif;
      color: #0f172a;
      background: #ffffff;
      font-size: 10.5pt;
      line-height: 1.4;
    }

    .page {
      width: 100%;
    }

    .header {
      display: flex;
      justify-content: space-between;
      gap: 24px;
      align-items: flex-start;
      border-bottom: 2px solid #0f172a;
      padding-bottom: 12px;
      margin-bottom: 16px;
    }

    .brand {
      font-size: 10pt;
      font-weight: 700;
      color: #047857;
      text-transform: uppercase;
      letter-spacing: 0.04em;
    }

    h1 {
      margin: 5px 0 0;
      font-size: 22pt;
      line-height: 1.1;
    }

    .meta {
      text-align: right;
      font-size: 9pt;
      color: #475569;
      min-width: 180px;
    }

    .notice {
      margin: 0 0 14px;
      padding: 10px 12px;
      border: 1px solid #f59e0b;
      background: #fffbeb;
      border-radius: 10px;
      color: #78350f;
      font-size: 9.5pt;
    }

    .section {
      margin-top: 14px;
      break-inside: avoid;
    }

    .section-title {
      margin: 0 0 8px;
      font-size: 13pt;
      font-weight: 700;
      color: #0f172a;
    }

    .result-grid,
    .assumption-grid {
      display: grid;
      grid-template-columns: repeat(4, 1fr);
      gap: 8px;
    }

    .detail-grid {
      display: grid;
      grid-template-columns: repeat(2, 1fr);
      gap: 6px 16px;
    }

    .card {
      border: 1px solid #cbd5e1;
      border-radius: 10px;
      padding: 9px 10px;
      background: #ffffff;
      min-height: 58px;
    }

    .label {
      display: block;
      font-size: 8.5pt;
      color: #64748b;
      margin-bottom: 4px;
    }

    .value {
      display: block;
      font-size: 13pt;
      font-weight: 700;
      color: #0f172a;
    }

    .value-small {
      display: block;
      font-size: 10.5pt;
      font-weight: 700;
      color: #0f172a;
    }

    .verdict-box {
      border: 1px solid #a7f3d0;
      background: #ecfdf5;
      border-radius: 10px;
      padding: 10px 12px;
    }

    .verdict-label {
      display: inline-block;
      border-radius: 999px;
      background: #047857;
      color: #ffffff;
      padding: 4px 8px;
      font-size: 8.5pt;
      font-weight: 700;
      margin-bottom: 6px;
    }

    .compact-list {
      margin: 6px 0 0;
      padding-left: 18px;
    }

    .compact-list li {
      margin: 2px 0;
    }

    .footer {
      margin-top: 16px;
      border-top: 1px solid #cbd5e1;
      padding-top: 8px;
      font-size: 8.5pt;
      color: #64748b;
      display: flex;
      justify-content: space-between;
      gap: 16px;
    }

    @media print {
      body {
        print-color-adjust: exact;
        -webkit-print-color-adjust: exact;
      }
    }
  </style>
</head>
<body>
  <main class="page">
    <header class="header">
      <div>
        <div class="brand">homebatterysavings.co.uk</div>
        <h1>UK Home Battery Savings Estimate</h1>
      </div>

      <div class="meta">
        <div>Generated: ${generatedDate}</div>
        <div>Estimate only</div>
      </div>
    </header>

    <p class="notice">
      This estimate is a simplified guide only. Check real tariff rates, quote details, battery specification and warranty terms before buying.
    </p>

    <section class="section">
      <h2 class="section-title">Estimated result</h2>

      <div class="result-grid">
        <div class="card">
          <span class="label">Annual saving</span>
          <span class="value">${formatCurrency(results.annualSaving)}</span>
        </div>

        <div class="card">
          <span class="label">Monthly saving</span>
          <span class="value">${formatCurrency(results.monthlySaving)}</span>
        </div>

        <div class="card">
          <span class="label">Payback period</span>
          <span class="value">${formatYears(results.paybackYears)}</span>
        </div>

        <div class="card">
          <span class="label">Verdict</span>
          <span class="value-small">${verdict.label}</span>
        </div>
      </div>
    </section>

    <section class="section">
      <h2 class="section-title">Input assumptions</h2>

      <div class="assumption-grid">
        <div class="card">
          <span class="label">Battery capacity</span>
          <span class="value-small">${inputs.batteryCapacityKwh} kWh</span>
        </div>

        <div class="card">
          <span class="label">Useful peak usage</span>
          <span class="value-small">${inputs.peakUsageCoveredKwh} kWh</span>
        </div>

        <div class="card">
          <span class="label">Installed cost</span>
          <span class="value-small">${formatCurrency(inputs.installedCost)}</span>
        </div>

        <div class="card">
          <span class="label">Warranty period</span>
          <span class="value-small">${inputs.warrantyYears} years</span>
        </div>

        <div class="card">
          <span class="label">Peak rate</span>
          <span class="value-small">${inputs.peakRatePence}p/kWh</span>
        </div>

        <div class="card">
          <span class="label">Off-peak rate</span>
          <span class="value-small">${inputs.offPeakRatePence}p/kWh</span>
        </div>

        <div class="card">
          <span class="label">Efficiency</span>
          <span class="value-small">${inputs.efficiencyPercent}%</span>
        </div>

        <div class="card">
          <span class="label">Cycles per year</span>
          <span class="value-small">${inputs.cyclesPerYear}</span>
        </div>
      </div>
    </section>

    <section class="section">
      <h2 class="section-title">Calculation detail</h2>

      <div class="detail-grid">
        <div>Useful battery energy per cycle: <strong>${results.usableBatteryEnergyPerCycle.toFixed(1)} kWh</strong></div>
        <div>Off-peak energy needed per cycle: <strong>${results.offPeakEnergyNeededPerCycle.toFixed(1)} kWh</strong></div>
        <div>Peak cost avoided per cycle: <strong>${formatCurrencyPrecise(results.peakCostAvoidedPerCycle)}</strong></div>
        <div>Off-peak charging cost per cycle: <strong>${formatCurrencyPrecise(results.offPeakChargingCostPerCycle)}</strong></div>
        <div>Saving per cycle: <strong>${formatCurrencyPrecise(results.savingPerCycle)}</strong></div>
        <div>Break-even battery cost: <strong>${formatCurrency(results.breakEvenBatteryCost)}</strong></div>
      </div>
    </section>

    <section class="section verdict-box">
      <span class="verdict-label">${verdict.label}</span>
      <div>${verdict.summary}</div>
    </section>

    <section class="section">
      <h2 class="section-title">Before accepting a quote, ask</h2>

      <ul class="compact-list">
        <li>What is the total installed cost including VAT?</li>
        <li>What is the usable battery capacity, not just nominal capacity?</li>
        <li>What warranty period and cycle limit apply?</li>
        <li>What tariff assumptions are used in the savings estimate?</li>
        <li>Does the system include backup power, or is that extra?</li>
      </ul>
    </section>

    <footer class="footer">
      <span>Generated from homebatterysavings.co.uk</span>
      <span>Use as an estimate only</span>
    </footer>
  </main>

  <script>
    window.onload = function () {
      window.focus();
      window.print();
    };
  </script>
</body>
</html>
`;

    printWindow.document.open();
    printWindow.document.write(estimateHtml);
    printWindow.document.close();
  }

  return (
    <section
      id="calculator"
      className="mx-auto max-w-6xl px-6 py-16 sm:py-20"
    >
      <div className="mx-auto max-w-3xl text-center">
        <p className="text-sm font-semibold uppercase tracking-wide text-emerald-700">
          Free UK calculator
        </p>

        <h2 className="mt-3 text-3xl font-bold tracking-tight text-slate-950 sm:text-4xl">
          Estimate your home battery savings
        </h2>

        <p className="mt-4 text-lg text-slate-600">
          Enter your battery size, tariff rates and expected battery use. The
          calculator estimates how much money could be saved by charging
          overnight and using the battery during peak-rate hours.
        </p>

        <div className="no-print mt-6 flex flex-col justify-center gap-3 sm:flex-row">
          <a
            href="#calculator-inputs"
            className="rounded-xl bg-emerald-700 px-5 py-3 text-sm font-semibold text-white hover:bg-emerald-800"
          >
            Edit assumptions
          </a>

          <a
            href="#calculator-result"
            className="rounded-xl bg-white px-5 py-3 text-sm font-semibold text-slate-900 shadow-sm ring-1 ring-slate-200 hover:bg-slate-100"
          >
            View result
          </a>
        </div>
      </div>

      <div className="mt-10 grid items-stretch gap-8 lg:grid-cols-[0.95fr_1.05fr]">
        <div
          id="calculator-inputs"
          className="no-print h-fit self-start scroll-mt-24 rounded-3xl bg-white p-6 shadow-sm ring-1 ring-slate-200"
        >
          <h3 className="text-xl font-bold text-slate-950">
            Your assumptions
          </h3>

          <p className="mt-2 text-sm text-slate-600">
            The default values are only a starting example. Change them to match
            the tariff and battery setup you are considering.
          </p>

          <div className="mt-6 rounded-2xl bg-emerald-50 p-5 ring-1 ring-emerald-100">
            <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
              <div>
                <h4 className="font-semibold text-slate-950">
                  Quick scenarios
                </h4>
                <p className="mt-1 text-sm text-slate-600">
                  Start with a preset, then adjust the numbers to match your own
                  quote or tariff.
                </p>
              </div>

              {selectedPresetId === "custom" ? (
                <span className="rounded-full bg-white px-3 py-1 text-xs font-semibold text-slate-600 ring-1 ring-slate-200">
                  Custom values
                </span>
              ) : null}
            </div>

            <div className="mt-4 grid gap-3">
              {batteryPresets.map((preset) => {
                const isSelected = selectedPresetId === preset.id;

                return (
                  <button
                    key={preset.id}
                    type="button"
                    aria-pressed={isSelected}
                    onClick={() => applyPreset(preset.id, preset.inputs)}
                    className={`rounded-xl border p-4 text-left transition ${
                      isSelected
                        ? "border-emerald-600 bg-white shadow-sm"
                        : "border-emerald-100 bg-white/70 hover:border-emerald-300 hover:bg-white"
                    }`}
                  >
                    <span className="block text-sm font-semibold text-slate-950">
                      {preset.label}
                    </span>

                    <span className="mt-1 block text-sm leading-6 text-slate-600">
                      {preset.description}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          <div className="mt-6 rounded-2xl bg-slate-50 p-5 ring-1 ring-slate-200">
            <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
              <div>
                <h4 className="font-semibold text-slate-950">
                  Popular battery sizes
                </h4>
                <p className="mt-1 text-sm leading-6 text-slate-600">
                  Choose a common usable capacity as a starting point, then add
                  the installed cost from your own quote.
                </p>
              </div>

              {selectedBatteryOptionId !== "custom" ? (
                <span className="rounded-full bg-white px-3 py-1 text-xs font-semibold text-slate-600 ring-1 ring-slate-200">
                  Battery size applied
                </span>
              ) : null}
            </div>

            <div className="mt-4 grid gap-3 sm:grid-cols-2">
              {popularBatteryOptions.map((option) => {
                const isSelected = selectedBatteryOptionId === option.id;

                return (
                  <button
                    key={option.id}
                    type="button"
                    aria-pressed={isSelected}
                    onClick={() =>
                      applyBatteryOption(option.id, option.usableCapacityKwh)
                    }
                    className={`rounded-xl border p-4 text-left transition ${
                      isSelected
                        ? "border-slate-900 bg-white shadow-sm"
                        : "border-slate-200 bg-white/70 hover:border-emerald-300 hover:bg-white"
                    }`}
                  >
                    <span className="block text-sm font-semibold text-slate-950">
                      {option.label}
                    </span>

                    <span className="mt-1 block text-sm leading-6 text-slate-600">
                      {option.description}
                    </span>
                  </button>
                );
              })}
            </div>

            <p className="mt-4 text-xs leading-5 text-slate-500">
              These are generic size shortcuts, not product recommendations.
              Always check the usable capacity and warranty on the actual quote.
            </p>
          </div>

          <div className="mt-6 grid gap-5">
            <NumberInput
              label="Usable battery capacity"
              value={inputs.batteryCapacityKwh}
              min={1}
              step={0.5}
              suffix="kWh"
              helpText="The amount of energy the battery can usefully deliver."
              onChange={(value) => updateInput("batteryCapacityKwh", value)}
            />

            <NumberInput
              label="Peak-period usage covered"
              value={inputs.peakUsageCoveredKwh}
              min={0}
              step={0.5}
              suffix="kWh"
              helpText="How much expensive peak-rate electricity the battery can realistically replace each cycle."
              onChange={(value) => updateInput("peakUsageCoveredKwh", value)}
            />

            <NumberInput
              label="Installed battery cost"
              value={inputs.installedCost}
              min={0}
              step={100}
              prefix="£"
              helpText="Use the total installed cost, not just the battery unit price."
              onChange={(value) => updateInput("installedCost", value)}
            />

            <div className="grid gap-5 sm:grid-cols-2">
              <NumberInput
                label="Peak electricity rate"
                value={inputs.peakRatePence}
                min={0}
                step={0.1}
                suffix="p/kWh"
                helpText="The higher daytime or standard unit rate."
                onChange={(value) => updateInput("peakRatePence", value)}
              />

              <NumberInput
                label="Off-peak electricity rate"
                value={inputs.offPeakRatePence}
                min={0}
                step={0.1}
                suffix="p/kWh"
                helpText="The cheap overnight unit rate."
                onChange={(value) => updateInput("offPeakRatePence", value)}
              />
            </div>

            <div className="grid gap-5 sm:grid-cols-2">
              <NumberInput
                label="Battery efficiency"
                value={inputs.efficiencyPercent}
                min={1}
                max={100}
                step={1}
                suffix="%"
                helpText="Round-trip efficiency. 90% is a reasonable starting assumption."
                onChange={(value) => updateInput("efficiencyPercent", value)}
              />

              <NumberInput
                label="Battery cycles per year"
                value={inputs.cyclesPerYear}
                min={0}
                max={365}
                step={1}
                suffix="cycles"
                helpText="How many days per year you expect to charge and discharge the battery."
                onChange={(value) => updateInput("cyclesPerYear", value)}
              />
            </div>

            <NumberInput
              label="Battery warranty period"
              value={inputs.warrantyYears}
              min={1}
              max={30}
              step={1}
              suffix="years"
              helpText="Used to estimate the break-even battery cost over the warranty period."
              onChange={(value) => updateInput("warrantyYears", value)}
            />
          </div>
        </div>

        <div
          id="calculator-result"
          className="no-print flex h-full scroll-mt-24 flex-col gap-5"
        >
          <div className="rounded-3xl bg-slate-950 p-6 text-white shadow-sm">
            <p className="text-sm font-medium uppercase tracking-wide text-emerald-300">
              Estimated result
            </p>

            <h3 className="mt-3 text-3xl font-bold" aria-live="polite">
              {hasPositiveSaving
                ? `${formatCurrency(results.annualSaving)} per year`
                : "No estimated saving"}
            </h3>

            <p className="mt-3 text-sm leading-6 text-slate-300">
              This estimate compares the peak-rate energy avoided against the
              off-peak energy needed to charge the battery, including battery
              efficiency loss.
            </p>

            <p className="mt-3 text-xs leading-5 text-slate-400">
              Estimate only. Check real tariff rates, quote details and warranty
              terms before buying.
            </p>

            <a
              href={routePaths.methodology}
              className="mt-3 inline-flex text-xs font-semibold text-emerald-300 hover:text-emerald-200"
            >
              See how this is calculated →
            </a>
          </div>

          <div
            className={`rounded-3xl p-6 shadow-sm ring-1 ${verdictClasses.container}`}
          >
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <p className="text-sm font-semibold uppercase tracking-wide text-slate-600">
                Result verdict
              </p>

              <span
                className={`inline-flex w-fit rounded-full px-3 py-1 text-xs font-semibold ${verdictClasses.badge}`}
              >
                {verdict.label}
              </span>
            </div>

            <p
              className={`mt-4 text-base font-medium leading-7 ${verdictClasses.text}`}
            >
              {verdict.summary}
            </p>

            <ul className="mt-4 space-y-2">
              {verdict.points.map((point) => (
                <li
                  key={point}
                  className="flex gap-3 text-sm leading-6 text-slate-700"
                >
                  <span className="mt-2 h-1.5 w-1.5 rounded-full bg-slate-500" />
                  <span>{point}</span>
                </li>
              ))}
            </ul>
          </div>

          {warnings.length > 0 ? (
            <div className="rounded-3xl bg-white p-6 shadow-sm ring-1 ring-slate-200">
              <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <p className="text-sm font-semibold uppercase tracking-wide text-amber-700">
                    Assumption checks
                  </p>

                  <h3 className="mt-2 text-xl font-bold text-slate-950">
                    Review these before trusting the result
                  </h3>
                </div>

                <span className="inline-flex w-fit rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-700">
                  {warnings.length} check{warnings.length === 1 ? "" : "s"}
                </span>
              </div>

              <div className="mt-5 space-y-3">
                {warnings.map((warning) => {
                  const warningClasses = getWarningClasses(warning.tone);

                  return (
                    <div
                      key={warning.id}
                      className={`rounded-2xl p-4 ring-1 ${warningClasses.container}`}
                    >
                      <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                        <div>
                          <h4
                            className={`font-semibold ${warningClasses.text}`}
                          >
                            {warning.title}
                          </h4>

                          <p className="mt-2 text-sm leading-6 text-slate-700">
                            {warning.message}
                          </p>
                        </div>

                        <span
                          className={`inline-flex w-fit rounded-full px-3 py-1 text-xs font-semibold ${warningClasses.badge}`}
                        >
                          {warning.tone === "negative"
                            ? "Important"
                            : warning.tone === "warning"
                              ? "Check"
                              : "Note"}
                        </span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          ) : null}

          <div className="flex flex-1 flex-col rounded-3xl bg-white p-6 shadow-sm ring-1 ring-slate-200">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
              <div>
                <p className="text-sm font-semibold uppercase tracking-wide text-emerald-700">
                  Next step
                </p>

                <h3 className="mt-2 text-xl font-bold text-slate-950">
                  Check any quote against these assumptions
                </h3>

                <p className="mt-3 text-sm leading-6 text-slate-600">
                  If you request a home battery quote, compare the
                  installer&apos;s numbers against the assumptions used here:
                  installed cost, usable capacity, warranty, tariff rates,
                  battery efficiency and expected yearly cycles.
                </p>
              </div>

              <div className="flex flex-col gap-2 sm:items-end">
                <button
                  type="button"
                  onClick={copyResultSummary}
                  aria-label="Copy battery savings result summary"
                  className="inline-flex w-fit rounded-xl bg-slate-950 px-4 py-2 text-sm font-semibold text-white hover:bg-slate-800"
                >
                  {copyStatus === "copied"
                    ? "Copied"
                    : copyStatus === "failed"
                      ? "Copy failed"
                      : "Copy result"}
                </button>

                <button
                  type="button"
                  onClick={copyShareLink}
                  aria-label="Copy shareable battery calculator link"
                  className="inline-flex w-fit rounded-xl bg-white px-4 py-2 text-sm font-semibold text-slate-950 ring-1 ring-slate-200 hover:bg-slate-50"
                >
                  {shareLinkStatus === "copied"
                    ? "Link copied"
                    : shareLinkStatus === "failed"
                      ? "Copy failed"
                      : "Copy link"}
                </button>

                <button
                  type="button"
                  onClick={printEstimate}
                  aria-label="Print or save this battery estimate"
                  className="inline-flex w-fit rounded-xl bg-emerald-700 px-4 py-2 text-sm font-semibold text-white hover:bg-emerald-800"
                >
                  Print estimate
                </button>
              </div>
            </div>

            <span className="sr-only" aria-live="polite">
              {copyStatus === "copied"
                ? "Result copied to clipboard"
                : copyStatus === "failed"
                  ? "Result copy failed"
                  : shareLinkStatus === "copied"
                    ? "Share link copied to clipboard"
                    : shareLinkStatus === "failed"
                      ? "Share link copy failed"
                      : ""}
            </span>

            <div className="mt-5 rounded-2xl bg-slate-50 p-5 ring-1 ring-slate-200">
              <p className="font-semibold text-slate-950">
                Before accepting a quote, ask:
              </p>

              <ul className="mt-3 space-y-2 text-sm leading-6 text-slate-700">
                <li>What is the total installed cost including VAT?</li>
                <li>
                  What is the usable battery capacity, not just nominal
                  capacity?
                </li>
                <li>What warranty period and cycle limit apply?</li>
                <li>What tariff assumptions are used in the savings estimate?</li>
                <li>Does the system include backup power, or is that extra?</li>
              </ul>
            </div>

            <a
              href={routePaths.batteryQuoteChecklist}
              className="mt-5 inline-flex text-sm font-semibold text-emerald-700 hover:text-emerald-800"
            >
              Read the full quote checklist →
            </a>
          </div>
        </div>
      </div>

      <div className="no-print mt-8 rounded-3xl bg-white p-6 shadow-sm ring-1 ring-slate-200 sm:p-8">
        <div className="max-w-3xl">
          <p className="text-sm font-semibold uppercase tracking-wide text-emerald-700">
            Result details
          </p>

          <h3 className="mt-3 text-2xl font-bold text-slate-950">
            How the estimate breaks down
          </h3>

          <p className="mt-3 text-sm leading-6 text-slate-600">
            These figures explain the estimated saving, payback period, useful
            battery energy and break-even battery cost.
          </p>
        </div>

        <div className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          <ResultCard
            title="Monthly saving"
            value={formatCurrency(results.monthlySaving)}
            description="Estimated average saving per month."
          />

          <ResultCard
            title="Payback period"
            value={formatYears(results.paybackYears)}
            description="Estimated time to recover the installed battery cost."
          />

          <ResultCard
            title="Saving per cycle"
            value={formatCurrencyPrecise(results.savingPerCycle)}
            description="Estimated saving each time the useful battery energy is charged and discharged."
          />

          <ResultCard
            title="Battery energy used"
            value={`${results.usableBatteryEnergyPerCycle.toFixed(1)} kWh`}
            description="Battery energy assumed to be useful during expensive peak-rate hours."
          />

          <ResultCard
            title="Unused capacity"
            value={`${results.unusedBatteryCapacityPerCycle.toFixed(1)} kWh`}
            description="Capacity not counted because your peak-period usage does not need it."
          />

          <ResultCard
            title="Break-even battery cost"
            value={formatCurrency(results.breakEvenBatteryCost)}
            description={`Maximum cost to break even over ${inputs.warrantyYears} years.`}
          />
        </div>

        <div className="mt-6 space-y-4">
          <details className="group rounded-2xl bg-amber-50 p-5 text-sm leading-6 text-amber-950 ring-1 ring-amber-200">
            <summary className="flex cursor-pointer list-none items-center justify-between gap-4 font-semibold">
              <span>Important assumption</span>
              <span className="text-xs text-amber-800 group-open:hidden">
                Show
              </span>
              <span className="hidden text-xs text-amber-800 group-open:inline">
                Hide
              </span>
            </summary>

            <p className="mt-3">
              This is a simplified estimate. It assumes the battery only saves
              money when it replaces electricity you would otherwise have bought
              at the peak rate. It does not include installation differences,
              battery degradation, export payments, solar generation, standing
              charges, VAT, finance costs or tariff exit fees.
            </p>
          </details>

          <details className="group rounded-2xl bg-white p-5 text-sm leading-6 text-slate-700 shadow-sm ring-1 ring-slate-200">
            <summary className="flex cursor-pointer list-none items-center justify-between gap-4 font-semibold text-slate-950">
              <span>Calculation detail</span>
              <span className="text-xs text-slate-500 group-open:hidden">
                Show
              </span>
              <span className="hidden text-xs text-slate-500 group-open:inline">
                Hide
              </span>
            </summary>

            <div className="mt-3 space-y-2">
              <p>
                Useful battery energy per cycle:{" "}
                <span className="font-semibold">
                  {results.usableBatteryEnergyPerCycle.toFixed(1)} kWh
                </span>
              </p>

              <p>
                Off-peak energy needed per cycle:{" "}
                <span className="font-semibold">
                  {results.offPeakEnergyNeededPerCycle.toFixed(1)} kWh
                </span>
              </p>

              <p>
                Peak cost avoided per cycle:{" "}
                <span className="font-semibold">
                  {formatCurrencyPrecise(results.peakCostAvoidedPerCycle)}
                </span>
              </p>

              <p>
                Off-peak charging cost per cycle:{" "}
                <span className="font-semibold">
                  {formatCurrencyPrecise(results.offPeakChargingCostPerCycle)}
                </span>
              </p>

              <p>
                Estimated annual saving:{" "}
                <span className="font-semibold">
                  {formatCurrencyPrecise(results.annualSaving)}
                </span>
              </p>
            </div>
          </details>
        </div>
      </div>
    </section>
  );
}
