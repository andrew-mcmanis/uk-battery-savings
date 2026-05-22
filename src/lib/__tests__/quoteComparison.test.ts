import { describe, expect, it } from "vitest";
import {
  calculateQuoteComparison,
  getQuoteComparisonSummary,
  sanitizeQuoteComparisonInput,
} from "@/lib/quoteComparison";

describe("calculateQuoteComparison", () => {
  it("calculates cost per usable kWh and payback period", () => {
    const result = calculateQuoteComparison({
      id: "quote-1",
      quoteName: "Example quote",
      installedCost: 6000,
      usableCapacityKwh: 10,
      warrantyYears: 10,
      estimatedAnnualSaving: 600,
      backupPowerIncluded: true,
      notes: "",
    });

    expect(result.costPerUsableKwh).toBe(600);
    expect(result.paybackYears).toBe(10);
  });

  it("returns null cost per usable kWh when capacity is zero", () => {
    const result = calculateQuoteComparison({
      id: "quote-1",
      quoteName: "Example quote",
      installedCost: 6000,
      usableCapacityKwh: 0,
      warrantyYears: 10,
      estimatedAnnualSaving: 600,
      backupPowerIncluded: false,
      notes: "",
    });

    expect(result.costPerUsableKwh).toBeNull();
  });

  it("returns null payback when annual saving is zero", () => {
    const result = calculateQuoteComparison({
      id: "quote-1",
      quoteName: "Example quote",
      installedCost: 6000,
      usableCapacityKwh: 10,
      warrantyYears: 10,
      estimatedAnnualSaving: 0,
      backupPowerIncluded: false,
      notes: "",
    });

    expect(result.paybackYears).toBeNull();
  });

  it("sanitizes unsafe numeric values before calculating", () => {
    const result = calculateQuoteComparison({
      id: "quote-1",
      quoteName: "Example quote",
      installedCost: Number.POSITIVE_INFINITY,
      usableCapacityKwh: 10,
      warrantyYears: 10,
      estimatedAnnualSaving: Number.NaN,
      backupPowerIncluded: false,
      notes: "",
    });

    expect(result.installedCost).toBe(0);
    expect(result.estimatedAnnualSaving).toBe(0);
    expect(result.paybackYears).toBeNull();
  });
});

describe("sanitizeQuoteComparisonInput", () => {
  it("clamps numbers and text to worksheet limits", () => {
    const result = sanitizeQuoteComparisonInput({
      id: "quote-1",
      quoteName: "A".repeat(100),
      installedCost: -1000,
      usableCapacityKwh: 999,
      warrantyYears: 100,
      estimatedAnnualSaving: -50,
      backupPowerIncluded: true,
      notes: "B".repeat(2100),
    });

    expect(result).toMatchObject({
      quoteName: "A".repeat(80),
      installedCost: 0,
      usableCapacityKwh: 100,
      warrantyYears: 30,
      estimatedAnnualSaving: 0,
      notes: "B".repeat(2000),
    });
  });
});

describe("getQuoteComparisonSummary", () => {
  it("identifies cheapest quote, lowest cost per kWh and shortest payback", () => {
    const results = [
      calculateQuoteComparison({
        id: "quote-1",
        quoteName: "Quote 1",
        installedCost: 5000,
        usableCapacityKwh: 10,
        warrantyYears: 10,
        estimatedAnnualSaving: 500,
        backupPowerIncluded: false,
        notes: "",
      }),
      calculateQuoteComparison({
        id: "quote-2",
        quoteName: "Quote 2",
        installedCost: 6500,
        usableCapacityKwh: 13.5,
        warrantyYears: 10,
        estimatedAnnualSaving: 858,
        backupPowerIncluded: true,
        notes: "",
      }),
      calculateQuoteComparison({
        id: "quote-3",
        quoteName: "Quote 3",
        installedCost: 4500,
        usableCapacityKwh: 5,
        warrantyYears: 10,
        estimatedAnnualSaving: 159,
        backupPowerIncluded: false,
        notes: "",
      }),
    ];

    const summary = getQuoteComparisonSummary(results);

    expect(summary.cheapestInstalledCost?.id).toBe("quote-3");
    expect(summary.lowestCostPerUsableKwh?.id).toBe("quote-2");
    expect(summary.shortestPayback?.id).toBe("quote-2");
    expect(summary.backupIncludedCount).toBe(1);
  });

  it("warns when payback is longer than warranty", () => {
    const results = [
      calculateQuoteComparison({
        id: "quote-1",
        quoteName: "Quote 1",
        installedCost: 5000,
        usableCapacityKwh: 10,
        warrantyYears: 5,
        estimatedAnnualSaving: 500,
        backupPowerIncluded: false,
        notes: "",
      }),
    ];

    const summary = getQuoteComparisonSummary(results);

    expect(
      summary.warnings.some(
        (warning) => warning.title === "Payback longer than warranty"
      )
    ).toBe(true);
  });

  it("warns when no payback can be calculated", () => {
    const results = [
      calculateQuoteComparison({
        id: "quote-1",
        quoteName: "Quote 1",
        installedCost: 5000,
        usableCapacityKwh: 10,
        warrantyYears: 10,
        estimatedAnnualSaving: 0,
        backupPowerIncluded: false,
        notes: "",
      }),
    ];

    const summary = getQuoteComparisonSummary(results);

    expect(
      summary.warnings.some(
        (warning) => warning.title === "No payback calculated"
      )
    ).toBe(true);
  });
});
