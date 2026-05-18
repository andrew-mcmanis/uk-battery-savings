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
