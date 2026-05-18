"use client";

import { useMemo, useState } from "react";
import {
  calculateQuoteComparison,
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
  onChange: (value: number) => void;
};

function NumberField({
  label,
  value,
  min = 0,
  step = 1,
  suffix,
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
    </label>
  );
}

type ResultMetricProps = {
  label: string;
  value: string;
};

function ResultMetric({ label, value }: ResultMetricProps) {
  return (
    <div className="rounded-xl bg-white p-4 ring-1 ring-slate-200">
      <p className="text-sm text-slate-500">{label}</p>
      <p className="mt-1 text-2xl font-bold text-slate-950">{value}</p>
    </div>
  );
}

export default function QuoteComparisonWorksheet() {
  const [quotes, setQuotes] = useState<QuoteComparisonInput[]>(defaultQuotes);

  const results = useMemo(() => {
    return quotes.map((quote) => calculateQuoteComparison(quote));
  }, [quotes]);

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
              Compare up to 3 home battery quotes
            </h2>

            <p className="mt-4 max-w-3xl leading-7 text-slate-600">
              Enter the main numbers from each quote. The worksheet compares
              cost per usable kWh and estimated payback period so you can spot
              whether a cheaper-looking quote is actually better value.
            </p>
          </div>

          <button
            type="button"
            onClick={resetQuotes}
            className="inline-flex w-fit rounded-xl bg-slate-950 px-4 py-2 text-sm font-semibold text-white hover:bg-slate-800"
          >
            Reset examples
          </button>
        </div>
      </div>

      <div className="grid gap-5 lg:grid-cols-3">
        {quotes.map((quote) => (
          <div
            key={quote.id}
            className="rounded-3xl bg-white p-6 shadow-sm ring-1 ring-slate-200"
          >
            <label className="block">
              <span className="text-sm font-medium text-slate-800">
                Quote name
              </span>

              <input
                type="text"
                value={quote.quoteName}
                onChange={(event) =>
                  updateQuote(quote.id, "quoteName", event.target.value)
                }
                className="mt-2 w-full rounded-xl border border-slate-300 px-4 py-3 text-slate-900 shadow-sm outline-none focus:border-emerald-600 focus:ring-2 focus:ring-emerald-100"
              />
            </label>

            <div className="mt-5 grid gap-5">
              <NumberField
                label="Installed cost"
                value={quote.installedCost}
                min={0}
                step={100}
                suffix="£"
                onChange={(value) =>
                  updateQuote(quote.id, "installedCost", value)
                }
              />

              <NumberField
                label="Usable battery capacity"
                value={quote.usableCapacityKwh}
                min={0}
                step={0.5}
                suffix="kWh"
                onChange={(value) =>
                  updateQuote(quote.id, "usableCapacityKwh", value)
                }
              />

              <NumberField
                label="Warranty period"
                value={quote.warrantyYears}
                min={1}
                step={1}
                suffix="years"
                onChange={(value) =>
                  updateQuote(quote.id, "warrantyYears", value)
                }
              />

              <NumberField
                label="Estimated annual saving"
                value={quote.estimatedAnnualSaving}
                min={0}
                step={10}
                suffix="£"
                onChange={(value) =>
                  updateQuote(quote.id, "estimatedAnnualSaving", value)
                }
              />

              <label className="flex items-center gap-3 rounded-2xl bg-slate-50 p-4 ring-1 ring-slate-200">
                <input
                  type="checkbox"
                  checked={quote.backupPowerIncluded}
                  onChange={(event) =>
                    updateQuote(
                      quote.id,
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
                <span className="text-sm font-medium text-slate-800">
                  Notes
                </span>

                <textarea
                  value={quote.notes}
                  onChange={(event) =>
                    updateQuote(quote.id, "notes", event.target.value)
                  }
                  rows={3}
                  className="mt-2 w-full rounded-xl border border-slate-300 px-4 py-3 text-slate-900 shadow-sm outline-none focus:border-emerald-600 focus:ring-2 focus:ring-emerald-100"
                  placeholder="Installer name, battery model, exclusions, backup details..."
                />
              </label>
            </div>
          </div>
        ))}
      </div>

      <div className="rounded-3xl bg-white p-6 shadow-sm ring-1 ring-slate-200 sm:p-8">
        <p className="text-sm font-semibold uppercase tracking-wide text-emerald-700">
          Comparison results
        </p>

        <h2 className="mt-3 text-2xl font-bold text-slate-950">
          Side-by-side quote summary
        </h2>

        <p className="mt-3 max-w-3xl text-sm leading-6 text-slate-600">
          Compare each quote by installed cost, usable capacity, cost per usable
          kWh, estimated annual saving and payback period.
        </p>

        <div className="mt-6 grid items-stretch gap-5 lg:grid-cols-3">
          {results.map((result) => (
            <div
              key={result.id}
              className="flex h-full flex-col rounded-3xl bg-slate-50 p-5 ring-1 ring-slate-200"
            >
              <div className="flex min-h-29 flex-col gap-3">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">
                    Quote
                  </p>

                  <h3 className="mt-1 text-2xl font-bold leading-tight text-slate-950">
                    {result.quoteName || "Unnamed quote"}
                  </h3>
                </div>

                <span
                  className={`inline-flex w-fit rounded-full px-3 py-1 text-xs font-semibold ${
                    result.backupPowerIncluded
                      ? "bg-emerald-100 text-emerald-800"
                      : "bg-amber-100 text-amber-800"
                  }`}
                >
                  {result.backupPowerIncluded
                    ? "Backup included"
                    : "Check backup"}
                </span>
              </div>

              <div className="mt-4 grid gap-3">
                <ResultMetric
                  label="Installed cost"
                  value={formatCurrency(result.installedCost)}
                />

                <ResultMetric
                  label="Usable capacity"
                  value={`${result.usableCapacityKwh} kWh`}
                />

                <ResultMetric
                  label="Cost per usable kWh"
                  value={
                    result.costPerUsableKwh === null
                      ? "N/A"
                      : formatCurrency(result.costPerUsableKwh)
                  }
                />

                <ResultMetric
                  label="Estimated annual saving"
                  value={formatCurrency(result.estimatedAnnualSaving)}
                />

                <ResultMetric
                  label="Estimated payback"
                  value={formatYears(result.paybackYears)}
                />

                <ResultMetric
                  label="Warranty period"
                  value={`${result.warrantyYears} years`}
                />
              </div>

              {result.notes ? (
                <div className="mt-5 rounded-xl bg-white p-4 ring-1 ring-slate-200">
                  <p className="text-sm font-semibold text-slate-950">Notes</p>
                  <p className="mt-2 text-sm leading-6 text-slate-600">
                    {result.notes}
                  </p>
                </div>
              ) : null}
            </div>
          ))}
        </div>

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
