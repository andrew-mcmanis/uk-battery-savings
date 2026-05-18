export type QuoteComparisonInput = {
  id: string;
  quoteName: string;
  installedCost: number;
  usableCapacityKwh: number;
  warrantyYears: number;
  estimatedAnnualSaving: number;
  backupPowerIncluded: boolean;
  notes: string;
};

export type QuoteComparisonResult = QuoteComparisonInput & {
  costPerUsableKwh: number | null;
  paybackYears: number | null;
};

export type QuoteComparisonWarning = {
  quoteId: string;
  quoteName: string;
  title: string;
  message: string;
};

export type QuoteComparisonSummary = {
  cheapestInstalledCost: QuoteComparisonResult | null;
  lowestCostPerUsableKwh: QuoteComparisonResult | null;
  shortestPayback: QuoteComparisonResult | null;
  backupIncludedCount: number;
  warnings: QuoteComparisonWarning[];
};

export function calculateQuoteComparison(
  quote: QuoteComparisonInput
): QuoteComparisonResult {
  const costPerUsableKwh =
    quote.usableCapacityKwh > 0
      ? quote.installedCost / quote.usableCapacityKwh
      : null;

  const paybackYears =
    quote.estimatedAnnualSaving > 0
      ? quote.installedCost / quote.estimatedAnnualSaving
      : null;

  return {
    ...quote,
    costPerUsableKwh,
    paybackYears,
  };
}

function findLowestResult(
  results: QuoteComparisonResult[],
  getValue: (result: QuoteComparisonResult) => number | null
) {
  const validResults = results
    .map((result) => ({
      result,
      value: getValue(result),
    }))
    .filter(
      (item): item is { result: QuoteComparisonResult; value: number } =>
        item.value !== null && Number.isFinite(item.value)
    );

  if (validResults.length === 0) {
    return null;
  }

  return validResults.reduce((best, current) =>
    current.value < best.value ? current : best
  ).result;
}

export function getQuoteComparisonSummary(
  results: QuoteComparisonResult[]
): QuoteComparisonSummary {
  const warnings: QuoteComparisonWarning[] = [];

  results.forEach((result) => {
    if (result.usableCapacityKwh <= 0) {
      warnings.push({
        quoteId: result.id,
        quoteName: result.quoteName,
        title: "Missing usable capacity",
        message:
          "Usable battery capacity is needed to compare cost per usable kWh.",
      });
    }

    if (result.paybackYears === null) {
      warnings.push({
        quoteId: result.id,
        quoteName: result.quoteName,
        title: "No payback calculated",
        message:
          "Estimated annual saving must be greater than zero to calculate payback.",
      });
    }

    if (
      result.paybackYears !== null &&
      result.paybackYears > result.warrantyYears
    ) {
      warnings.push({
        quoteId: result.id,
        quoteName: result.quoteName,
        title: "Payback longer than warranty",
        message:
          "The estimated payback period is longer than the warranty period entered for this quote.",
      });
    }
  });

  return {
    cheapestInstalledCost: findLowestResult(
      results,
      (result) => result.installedCost
    ),
    lowestCostPerUsableKwh: findLowestResult(
      results,
      (result) => result.costPerUsableKwh
    ),
    shortestPayback: findLowestResult(results, (result) => result.paybackYears),
    backupIncludedCount: results.filter((result) => result.backupPowerIncluded)
      .length,
    warnings,
  };
}
