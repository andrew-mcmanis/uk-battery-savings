import type { QuoteComparisonInput } from "@/lib/quoteComparison";

export type SavedQuoteComparisonState = {
  quotes: QuoteComparisonInput[];
  selectedQuoteId: string;
  savedAt: string;
};

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null;
}

function clampNumber(value: number, min: number, max: number) {
  if (!Number.isFinite(value)) {
    return min;
  }

  return Math.min(Math.max(value, min), max);
}

function parseNumber(value: unknown, min: number, max: number) {
  return clampNumber(typeof value === "number" ? value : Number(value), min, max);
}

function parseQuote(value: unknown): QuoteComparisonInput | null {
  if (!isRecord(value)) {
    return null;
  }

  if (typeof value.id !== "string" || value.id.trim().length === 0) {
    return null;
  }

  return {
    id: value.id,
    quoteName:
      typeof value.quoteName === "string"
        ? value.quoteName.slice(0, 80)
        : "Unnamed quote",
    installedCost: parseNumber(value.installedCost, 0, 100000),
    usableCapacityKwh: parseNumber(value.usableCapacityKwh, 0, 100),
    warrantyYears: parseNumber(value.warrantyYears, 1, 30),
    estimatedAnnualSaving: parseNumber(value.estimatedAnnualSaving, 0, 100000),
    backupPowerIncluded:
      typeof value.backupPowerIncluded === "boolean"
        ? value.backupPowerIncluded
        : false,
    notes: typeof value.notes === "string" ? value.notes.slice(0, 2000) : "",
  };
}

export function serializeQuoteComparisonState(
  state: SavedQuoteComparisonState
) {
  return JSON.stringify(state);
}

export function parseQuoteComparisonState(
  rawValue: string
): SavedQuoteComparisonState | null {
  try {
    const parsedValue: unknown = JSON.parse(rawValue);

    if (!isRecord(parsedValue) || !Array.isArray(parsedValue.quotes)) {
      return null;
    }

    const quotes = parsedValue.quotes
      .map((quote) => parseQuote(quote))
      .filter((quote): quote is QuoteComparisonInput => quote !== null);

    if (quotes.length === 0) {
      return null;
    }

    const selectedQuoteId =
      typeof parsedValue.selectedQuoteId === "string" &&
      quotes.some((quote) => quote.id === parsedValue.selectedQuoteId)
        ? parsedValue.selectedQuoteId
        : quotes[0].id;

    return {
      quotes,
      selectedQuoteId,
      savedAt:
        typeof parsedValue.savedAt === "string"
          ? parsedValue.savedAt
          : new Date(0).toISOString(),
    };
  } catch {
    return null;
  }
}
