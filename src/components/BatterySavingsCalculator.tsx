"use client";

import {
  calculateBatterySavings,
  type BatteryCalculatorInputs,
} from "@/lib/batteryCalculator";
import { useMemo, useState } from "react";

function formatCurrency(value: number) {
  return new Intl.NumberFormat("en-GB", {
    style: "currency",
    currency: "GBP",
    maximumFractionDigits: 0,
  }).format(value);
}

function formatCurrencyPrecise(value: number) {
  return new Intl.NumberFormat("en-GB", {
    style: "currency",
    currency: "GBP",
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(value);
}

function formatYears(value: number | null) {
  if (value === null || !Number.isFinite(value)) {
    return "Not profitable";
  }

  return `${value.toFixed(1)} years`;
}

type NumberInputProps = {
  label: string;
  value: number;
  min?: number;
  max?: number;
  step?: number;
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
  suffix,
  helpText,
  onChange,
}: NumberInputProps) {
  return (
    <label className="block">
      <span className="text-sm font-medium text-slate-800">{label}</span>

      <div className="mt-2 flex rounded-xl border border-slate-300 bg-white shadow-sm focus-within:border-emerald-600 focus-within:ring-2 focus-within:ring-emerald-100">
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
          <span className="flex items-center px-4 text-sm text-slate-500">
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
    <div className="rounded-2xl bg-white p-5 shadow-sm ring-1 ring-slate-200">
      <p className="text-sm font-medium text-slate-500">{title}</p>
      <p className="mt-2 text-3xl font-bold text-slate-950">{value}</p>
      <p className="mt-2 text-sm text-slate-600">{description}</p>
    </div>
  );
}

export default function BatterySavingsCalculator() {
  const [inputs, setInputs] = useState<BatteryCalculatorInputs>({
    batteryCapacityKwh: 10,
    peakUsageCoveredKwh: 8,
    installedCost: 5000,
    peakRatePence: 28,
    offPeakRatePence: 7,
    efficiencyPercent: 90,
    cyclesPerYear: 300,
    warrantyYears: 10,
  });

  const results = useMemo(() => {
    return calculateBatterySavings(inputs);
  }, [inputs]);

  function updateInput<Key extends keyof BatteryCalculatorInputs>(
    key: Key,
    value: BatteryCalculatorInputs[Key]
  ) {
    setInputs((currentInputs) => ({
      ...currentInputs,
      [key]: value,
    }));
  }

  const hasPositiveSaving = results.annualSaving > 0;

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
      </div>

      <div className="mt-10 grid gap-8 lg:grid-cols-[1fr_1fr]">
        <div className="rounded-3xl bg-white p-6 shadow-sm ring-1 ring-slate-200">
          <h3 className="text-xl font-bold text-slate-950">
            Your assumptions
          </h3>

          <p className="mt-2 text-sm text-slate-600">
            The default values are only a starting example. Change them to match
            the tariff and battery setup you are considering.
          </p>

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
              suffix="£"
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

        <div className="space-y-5">
          <div className="rounded-3xl bg-slate-950 p-6 text-white shadow-sm">
            <p className="text-sm font-medium uppercase tracking-wide text-emerald-300">
              Estimated result
            </p>

            <h3 className="mt-3 text-3xl font-bold">
              {hasPositiveSaving
                ? `${formatCurrency(results.annualSaving)} per year`
                : "No estimated saving"}
            </h3>

            <p className="mt-3 text-sm leading-6 text-slate-300">
              This estimate compares the peak-rate energy avoided against the
              off-peak energy needed to charge the battery, including battery
              efficiency loss.
            </p>
          </div>

          <div className="grid gap-5 sm:grid-cols-2">
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

          <div className="rounded-2xl bg-amber-50 p-5 text-sm leading-6 text-amber-950 ring-1 ring-amber-200">
            <p className="font-semibold">Important assumption</p>
            <p className="mt-2">
              This is a simplified estimate. It assumes the battery only saves
              money when it replaces electricity you would otherwise have bought
              at the peak rate. It does not include installation differences,
              battery degradation, export payments, solar generation, standing
              charges, VAT, finance costs or tariff exit fees.
            </p>
          </div>

          <div className="rounded-2xl bg-white p-5 text-sm leading-6 text-slate-700 shadow-sm ring-1 ring-slate-200">
            <p className="font-semibold text-slate-950">Calculation detail</p>

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
          </div>
        </div>
      </div>
    </section>
  );
}
