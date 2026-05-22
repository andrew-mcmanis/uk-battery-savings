import {
  sanitizeQuoteComparisonInput,
  type QuoteComparisonInput,
} from "@/lib/quoteComparison";

export type SavedQuoteComparisonState = {
  quotes: QuoteComparisonInput[];
  selectedQuoteId: string;
  savedAt: string;
};

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null;
}

function parseNumber(value: unknown) {
  return typeof value === "number" ? value : Number(value);
}

function parseQuote(value: unknown): QuoteComparisonInput | null {
  if (!isRecord(value)) {
    return null;
  }

  if (typeof value.id !== "string" || value.id.trim().length === 0) {
    return null;
  }

  return sanitizeQuoteComparisonInput({
    id: value.id,
    quoteName:
      typeof value.quoteName === "string"
        ? value.quoteName
        : "Unnamed quote",
    installedCost: parseNumber(value.installedCost),
    usableCapacityKwh: parseNumber(value.usableCapacityKwh),
    warrantyYears: parseNumber(value.warrantyYears),
    estimatedAnnualSaving: parseNumber(value.estimatedAnnualSaving),
    backupPowerIncluded:
      typeof value.backupPowerIncluded === "boolean"
        ? value.backupPowerIncluded
        : false,
    notes: typeof value.notes === "string" ? value.notes : "",
  });
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
