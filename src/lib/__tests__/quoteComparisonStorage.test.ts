import { describe, expect, it } from "vitest";
import {
  parseQuoteComparisonState,
  serializeQuoteComparisonState,
} from "@/lib/quoteComparisonStorage";

describe("quoteComparisonStorage", () => {
  it("serializes and parses saved quote comparison state", () => {
    const savedState = {
      quotes: [
        {
          id: "quote-1",
          quoteName: "Quote 1",
          installedCost: 5000,
          usableCapacityKwh: 10,
          warrantyYears: 10,
          estimatedAnnualSaving: 485,
          backupPowerIncluded: false,
          notes: "Example note",
        },
      ],
      selectedQuoteId: "quote-1",
      savedAt: "2026-05-18T10:00:00.000Z",
    };

    const serialized = serializeQuoteComparisonState(savedState);
    const parsed = parseQuoteComparisonState(serialized);

    expect(parsed).toEqual(savedState);
  });

  it("returns null for invalid JSON", () => {
    expect(parseQuoteComparisonState("not-json")).toBeNull();
  });

  it("falls back to the first quote if the selected quote id is invalid", () => {
    const serialized = serializeQuoteComparisonState({
      quotes: [
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
      ],
      selectedQuoteId: "missing-quote",
      savedAt: "2026-05-18T10:00:00.000Z",
    });

    const parsed = parseQuoteComparisonState(serialized);

    expect(parsed?.selectedQuoteId).toBe("quote-1");
  });

  it("clamps unsafe numeric values", () => {
    const parsed = parseQuoteComparisonState(
      JSON.stringify({
        quotes: [
          {
            id: "quote-1",
            quoteName: "Quote 1",
            installedCost: -1000,
            usableCapacityKwh: 999,
            warrantyYears: 100,
            estimatedAnnualSaving: -50,
            backupPowerIncluded: true,
            notes: "",
          },
        ],
        selectedQuoteId: "quote-1",
        savedAt: "2026-05-18T10:00:00.000Z",
      })
    );

    expect(parsed?.quotes[0]).toMatchObject({
      installedCost: 0,
      usableCapacityKwh: 100,
      warrantyYears: 30,
      estimatedAnnualSaving: 0,
    });
  });
});
