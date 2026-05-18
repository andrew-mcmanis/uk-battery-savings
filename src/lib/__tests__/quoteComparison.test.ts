import { describe, expect, it } from "vitest";
import { calculateQuoteComparison } from "@/lib/quoteComparison";

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
});
