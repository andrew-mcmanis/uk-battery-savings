"use client";

import { useMemo, useState } from "react";
import {
  calculateQuoteComparison,
  getQuoteComparisonSummary,
  type QuoteComparisonInput,
} from "@/lib/quoteComparison";
import { formatCurrency, formatYears } from "@/lib/formatters";

const defaultQuotes: QuoteComparisonInput[] = [
  {
    id: "quote-1",
    quoteName: "Quote 1",
    installedCost: 5000,
    usableCapacityKwh: 10,
    warrantyYears: 10,
    estimatedAnnualSaving: 485,
    backupPowerIncluded: false,
    notes: "",
  },
  {
    id: "quote-2",
    quoteName: "Quote 2",
    installedCost: 6500,
    usableCapacityKwh: 13.5,
    warrantyYears: 10,
    estimatedAnnualSaving: 858,
    backupPowerIncluded: true,
    notes: "",
  },
  {
    id: "quote-3",
    quoteName: "Quote 3",
    installedCost: 4500,
    usableCapacityKwh: 5,
    warrantyYears: 10,
    estimatedAnnualSaving: 159,
    backupPowerIncluded: false,
    notes: "",
  },
];

type NumberFieldProps = {
  label: string;
  value: number;
  min?: number;
  step?: number;
  suffix?: string;
  helpText?: string;
  onChange: (value: number) => void;
};

function NumberField({
  label,
  value,
  min = 0,
  step = 1,
  suffix,
  helpText,
  onChange,
}: NumberFieldProps) {
  return (
    <label className="block">
      <span className="text-sm font-medium text-slate-800">{label}</span>

      <div className="mt-2 flex rounded-xl border border-slate-300 bg-white shadow-sm focus-within:border-emerald-600 focus-within:ring-2 focus-within:ring-emerald-100">
        <input
          type="number"
          value={value}
          min={min}
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
        <p className="mt-1 text-xs leading-5 text-slate-500">{helpText}</p>
      ) : null}
    </label>
  );
}

type ResultRowProps = {
  label: string;
  value: string;
};

function ResultRow({ label, value }: ResultRowProps) {
  return (
    <div className="flex items-center justify-between gap-4 border-b border-slate-200 py-3 last:border-b-0">
      <dt className="text-sm text-slate-500">{label}</dt>
      <dd className="text-right text-sm font-semibold text-slate-950">
        {value}
      </dd>
    </div>
  );
}

function formatNullableCurrency(value: number | null) {
  return value === null ? "N/A" : formatCurrency(value);
}

export default function QuoteComparisonWorksheet() {
  const [quotes, setQuotes] = useState<QuoteComparisonInput[]>(defaultQuotes);
  const [selectedQuoteId, setSelectedQuoteId] = useState(defaultQuotes[0].id);
  const [copyStatus, setCopyStatus] = useState<"idle" | "copied" | "failed">(
  "idle"
  );

  const results = useMemo(() => {
    return quotes.map((quote) => calculateQuoteComparison(quote));
  }, [quotes]);

  const summary = useMemo(() => {
    return getQuoteComparisonSummary(results);
  }, [results]);

  const selectedQuote =
    quotes.find((quote) => quote.id === selectedQuoteId) ?? quotes[0];

  const selectedResult =
    results.find((result) => result.id === selectedQuote.id) ?? results[0];

  function updateQuote<Key extends keyof QuoteComparisonInput>(
    quoteId: string,
    key: Key,
    value: QuoteComparisonInput[Key]
  ) {
    setQuotes((currentQuotes) =>
      currentQuotes.map((quote) =>
        quote.id === quoteId
          ? {
              ...quote,
              [key]: value,
            }
          : quote
      )
    );
  }

  function resetQuotes() {
    setQuotes(defaultQuotes);
    setSelectedQuoteId(defaultQuotes[0].id);
  }

  async function copyComparisonSummary() {
  const quoteLines = results.flatMap((result) => [
    `${result.quoteName || "Unnamed quote"}`,
    `Installed cost: ${formatCurrency(result.installedCost)}`,
    `Usable capacity: ${result.usableCapacityKwh} kWh`,
    `Cost per usable kWh: ${formatNullableCurrency(result.costPerUsableKwh)}`,
    `Estimated annual saving: ${formatCurrency(
      result.estimatedAnnualSaving
    )}`,
    `Estimated payback: ${formatYears(result.paybackYears)}`,
    `Warranty period: ${result.warrantyYears} years`,
    `Backup power: ${
      result.backupPowerIncluded ? "Included" : "Check quote"
    }`,
    result.notes ? `Notes: ${result.notes}` : null,
    "",
  ]);

  const warningLines =
    summary.warnings.length > 0
      ? summary.warnings.flatMap((warning) => [
          `${warning.quoteName}: ${warning.title}`,
          warning.message,
          "",
        ])
      : ["No comparison warnings."];

  const comparisonSummary = [
    "Home battery quote comparison",
    "",
    "Highlights",
    `Lowest installed cost: ${
      summary.cheapestInstalledCost?.quoteName ?? "N/A"
    }`,
    `Lowest cost per usable kWh: ${
      summary.lowestCostPerUsableKwh?.quoteName ?? "N/A"
    }`,
    `Shortest estimated payback: ${summary.shortestPayback?.quoteName ?? "N/A"}`,
    `Backup included: ${summary.backupIncludedCount} of ${results.length}`,
    "",
    "Quotes",
    ...quoteLines.filter((line): line is string => line !== null),
    "Checks",
    ...warningLines,
    "Generated from homebatterysavings.co.uk",
  ].join("\n");

  try {
    await navigator.clipboard.writeText(comparisonSummary);
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

  return (
    <section className="space-y-8">
      <div className="rounded-3xl bg-white p-6 shadow-sm ring-1 ring-slate-200 sm:p-8">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
          <div>
            <p className="text-sm font-semibold uppercase tracking-wide text-emerald-700">
              Quote worksheet
            </p>

            <h2 className="mt-3 text-3xl font-bold tracking-tight text-slate-950">
              Compare home battery quotes
            </h2>

            <p className="mt-4 max-w-3xl leading-7 text-slate-600">
              Choose a quote, enter the main numbers, then use the comparison
              summary to spot differences in installed cost, usable capacity,
              payback and backup power.
            </p>
          </div>

          <div className="flex flex-col gap-2 sm:items-end">
            <button
              type="button"
              onClick={copyComparisonSummary}
              aria-label="Copy quote comparison summary"
              className="inline-flex w-fit rounded-xl bg-emerald-700 px-4 py-2 text-sm font-semibold text-white hover:bg-emerald-800"
            >
              {copyStatus === "copied"
                ? "Copied"
                : copyStatus === "failed"
                  ? "Copy failed"
                  : "Copy comparison"}
            </button>

            <button
              type="button"
              onClick={resetQuotes}
              className="inline-flex w-fit rounded-xl bg-slate-950 px-4 py-2 text-sm font-semibold text-white hover:bg-slate-800"
            >
              Reset examples
            </button>

            <span className="sr-only" aria-live="polite">
              {copyStatus === "copied"
                ? "Quote comparison copied to clipboard"
                : copyStatus === "failed"
                  ? "Quote comparison copy failed"
                  : ""}
            </span>
          </div>
        </div>
      </div>

      <div className="rounded-3xl bg-white p-4 shadow-sm ring-1 ring-slate-200 sm:p-5">
        <p className="px-1 text-sm font-semibold text-slate-950">
          Select a quote to edit
        </p>

        <div className="mt-3 grid gap-3 md:grid-cols-3">
          {results.map((result) => {
            const isSelected = result.id === selectedQuoteId;

            return (
              <button
                key={result.id}
                type="button"
                aria-pressed={isSelected}
                onClick={() => setSelectedQuoteId(result.id)}
                className={`rounded-2xl border p-4 text-left transition ${
                  isSelected
                    ? "border-emerald-600 bg-emerald-50"
                    : "border-slate-200 bg-white hover:border-emerald-300"
                }`}
              >
                <span className="block text-sm font-bold text-slate-950">
                  {result.quoteName || "Unnamed quote"}
                </span>

                <span className="mt-2 block text-sm text-slate-600">
                  {formatCurrency(result.installedCost)} ·{" "}
                  {formatYears(result.paybackYears)}
                </span>

                <span
                  className={`mt-3 inline-flex rounded-full px-3 py-1 text-xs font-semibold ${
                    result.backupPowerIncluded
                      ? "bg-emerald-100 text-emerald-800"
                      : "bg-amber-100 text-amber-800"
                  }`}
                >
                  {result.backupPowerIncluded
                    ? "Backup included"
                    : "Check backup"}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      <div className="grid gap-8 lg:grid-cols-[1.15fr_0.85fr] lg:items-start">
        <div className="rounded-3xl bg-white p-6 shadow-sm ring-1 ring-slate-200 sm:p-8">
          <p className="text-sm font-semibold uppercase tracking-wide text-emerald-700">
            Editing
          </p>

          <h3 className="mt-3 text-2xl font-bold text-slate-950">
            {selectedQuote.quoteName || "Unnamed quote"}
          </h3>

          <div className="mt-6 grid gap-5">
            <label className="block">
              <span className="text-sm font-medium text-slate-800">
                Quote name
              </span>

              <input
                type="text"
                value={selectedQuote.quoteName}
                onChange={(event) =>
                  updateQuote(
                    selectedQuote.id,
                    "quoteName",
                    event.target.value
                  )
                }
                className="mt-2 w-full rounded-xl border border-slate-300 px-4 py-3 text-slate-900 shadow-sm outline-none focus:border-emerald-600 focus:ring-2 focus:ring-emerald-100"
              />
            </label>

            <div className="grid gap-5 sm:grid-cols-2">
              <NumberField
                label="Installed cost"
                value={selectedQuote.installedCost}
                min={0}
                step={100}
                suffix="£"
                onChange={(value) =>
                  updateQuote(selectedQuote.id, "installedCost", value)
                }
              />

              <NumberField
                label="Usable battery capacity"
                value={selectedQuote.usableCapacityKwh}
                min={0}
                step={0.5}
                suffix="kWh"
                onChange={(value) =>
                  updateQuote(selectedQuote.id, "usableCapacityKwh", value)
                }
              />
            </div>

            <div className="grid gap-5 sm:grid-cols-2">
              <NumberField
                label="Warranty period"
                value={selectedQuote.warrantyYears}
                min={1}
                step={1}
                suffix="years"
                onChange={(value) =>
                  updateQuote(selectedQuote.id, "warrantyYears", value)
                }
              />

              <NumberField
                label="Estimated annual saving"
                value={selectedQuote.estimatedAnnualSaving}
                min={0}
                step={10}
                suffix="£"
                helpText="Use the annual saving from the calculator or the installer estimate."
                onChange={(value) =>
                  updateQuote(selectedQuote.id, "estimatedAnnualSaving", value)
                }
              />
            </div>

            <label className="flex items-center gap-3 rounded-2xl bg-slate-50 p-4 ring-1 ring-slate-200">
              <input
                type="checkbox"
                checked={selectedQuote.backupPowerIncluded}
                onChange={(event) =>
                  updateQuote(
                    selectedQuote.id,
                    "backupPowerIncluded",
                    event.target.checked
                  )
                }
                className="h-4 w-4 rounded border-slate-300 text-emerald-700"
              />

              <span className="text-sm font-medium text-slate-800">
                Backup power included
              </span>
            </label>

            <label className="block">
              <span className="text-sm font-medium text-slate-800">Notes</span>

              <textarea
                value={selectedQuote.notes}
                onChange={(event) =>
                  updateQuote(selectedQuote.id, "notes", event.target.value)
                }
                rows={4}
                className="mt-2 w-full rounded-xl border border-slate-300 px-4 py-3 text-slate-900 shadow-sm outline-none focus:border-emerald-600 focus:ring-2 focus:ring-emerald-100"
                placeholder="Installer name, battery model, exclusions, backup details..."
              />
            </label>
          </div>
        </div>

        <aside className="rounded-3xl bg-white p-6 shadow-sm ring-1 ring-slate-200 sm:p-8">
          <p className="text-sm font-semibold uppercase tracking-wide text-emerald-700">
            Live result
          </p>

          <h3 className="mt-3 text-3xl font-bold text-slate-950">
            {formatCurrency(selectedResult.installedCost)}
          </h3>

          <p className="mt-3 text-sm leading-6 text-slate-600">
            {selectedResult.usableCapacityKwh} kWh usable capacity ·{" "}
            {formatYears(selectedResult.paybackYears)} estimated payback
          </p>

          <div className="mt-5 rounded-2xl bg-emerald-50 p-4 ring-1 ring-emerald-100">
            <p className="text-sm font-semibold text-emerald-950">
              {selectedResult.backupPowerIncluded
                ? "Backup power included"
                : "Backup power needs checking"}
            </p>

            <p className="mt-2 text-sm leading-6 text-emerald-900">
              Check whether backup power is included in the quote price or listed as an
              optional extra.
            </p>
          </div>

          <dl className="mt-6 rounded-2xl bg-slate-50 p-4 ring-1 ring-slate-200">
            <ResultRow
              label="Cost per usable kWh"
              value={
                selectedResult.costPerUsableKwh === null
                  ? "N/A"
                  : formatCurrency(selectedResult.costPerUsableKwh)
              }
            />

            <ResultRow
              label="Annual saving"
              value={formatCurrency(selectedResult.estimatedAnnualSaving)}
            />

            <ResultRow
              label="Warranty"
              value={`${selectedResult.warrantyYears} years`}
            />

            <ResultRow
              label="Backup power"
              value={
                selectedResult.backupPowerIncluded ? "Included" : "Check quote"
              }
            />
          </dl>
        </aside>
      </div>

      <div className="rounded-3xl bg-white p-6 shadow-sm ring-1 ring-slate-200 sm:p-8">
        <p className="text-sm font-semibold uppercase tracking-wide text-emerald-700">
          Comparison summary
        </p>

        <h2 className="mt-3 text-2xl font-bold text-slate-950">
          Which quote stands out?
        </h2>

        <div className="mt-6 grid gap-4 md:grid-cols-2">
          <div className="rounded-2xl bg-slate-50 p-5 ring-1 ring-slate-200">
            <p className="text-sm text-slate-500">Lowest installed cost</p>
            <p className="mt-2 text-xl font-bold text-slate-950">
              {summary.cheapestInstalledCost?.quoteName ?? "N/A"}
            </p>
            <p className="mt-2 text-sm text-slate-600">
              {summary.cheapestInstalledCost
                ? `${formatCurrency(
                    summary.cheapestInstalledCost.installedCost
                  )} installed cost.`
                : "No installed cost available."}
            </p>
          </div>

          <div className="rounded-2xl bg-slate-50 p-5 ring-1 ring-slate-200">
            <p className="text-sm text-slate-500">Lowest cost per usable kWh</p>
            <p className="mt-2 text-xl font-bold text-slate-950">
              {summary.lowestCostPerUsableKwh?.quoteName ?? "N/A"}
            </p>
            <p className="mt-2 text-sm text-slate-600">
              {summary.lowestCostPerUsableKwh?.costPerUsableKwh !== null &&
              summary.lowestCostPerUsableKwh?.costPerUsableKwh !== undefined
                ? `${formatCurrency(
                    summary.lowestCostPerUsableKwh.costPerUsableKwh
                  )} per usable kWh.`
                : "No usable capacity available."}
            </p>
          </div>

          <div className="rounded-2xl bg-slate-50 p-5 ring-1 ring-slate-200">
            <p className="text-sm text-slate-500">Shortest estimated payback</p>
            <p className="mt-2 text-xl font-bold text-slate-950">
              {summary.shortestPayback?.quoteName ?? "N/A"}
            </p>
            <p className="mt-2 text-sm text-slate-600">
              {summary.shortestPayback
                ? `${formatYears(
                    summary.shortestPayback.paybackYears
                  )} estimated payback.`
                : "No positive annual saving available."}
            </p>
          </div>

          <div className="rounded-2xl bg-slate-50 p-5 ring-1 ring-slate-200">
            <p className="text-sm text-slate-500">Backup included</p>
            <p className="mt-2 text-xl font-bold text-slate-950">
              {summary.backupIncludedCount} of {results.length}
            </p>
            <p className="mt-2 text-sm text-slate-600">
              Quotes marked as including backup power.
            </p>
          </div>
        </div>

        {summary.warnings.length > 0 ? (
          <details className="mt-6 rounded-2xl bg-amber-50 p-5 ring-1 ring-amber-200">
            <summary className="cursor-pointer font-semibold text-amber-950">
              Checks before comparing quotes
            </summary>

            <div className="mt-3 space-y-3">
              {summary.warnings.map((warning) => (
                <div
                  key={`${warning.quoteId}-${warning.title}`}
                  className="rounded-xl bg-white p-4 ring-1 ring-amber-100"
                >
                  <p className="text-sm font-semibold text-slate-950">
                    {warning.quoteName}: {warning.title}
                  </p>

                  <p className="mt-1 text-sm leading-6 text-slate-700">
                    {warning.message}
                  </p>
                </div>
              ))}
            </div>
          </details>
        ) : null}

        <div className="mt-6 rounded-2xl bg-emerald-50 p-5 ring-1 ring-emerald-100">
          <p className="font-semibold text-slate-950">
            How to read this comparison
          </p>

          <p className="mt-2 text-sm leading-6 text-slate-700">
            Lower cost per usable kWh can indicate better battery value, but it
            should not be the only factor. Also compare warranty terms, backup
            power, installer reputation, battery model, installation scope and
            whether the savings assumptions are realistic.
          </p>
        </div>
      </div>
    </section>
  );
}
