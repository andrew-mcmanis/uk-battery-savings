import { sanitizeBatteryInputs } from "@/lib/batteryInputLimits";
import { describe, expect, it } from "vitest";

describe("sanitizeBatteryInputs", () => {
  it("keeps normal values unchanged", () => {
    const inputs = sanitizeBatteryInputs({
      batteryCapacityKwh: 10,
      peakUsageCoveredKwh: 8,
      installedCost: 5000,
      peakRatePence: 28,
      offPeakRatePence: 7,
      efficiencyPercent: 90,
      cyclesPerYear: 300,
      warrantyYears: 10,
    });

    expect(inputs).toEqual({
      batteryCapacityKwh: 10,
      peakUsageCoveredKwh: 8,
      installedCost: 5000,
      peakRatePence: 28,
      offPeakRatePence: 7,
      efficiencyPercent: 90,
      cyclesPerYear: 300,
      warrantyYears: 10,
    });
  });

  it("clamps unsafe values to sensible ranges", () => {
    const inputs = sanitizeBatteryInputs({
      batteryCapacityKwh: -10,
      peakUsageCoveredKwh: -5,
      installedCost: -1000,
      peakRatePence: -20,
      offPeakRatePence: 500,
      efficiencyPercent: 0,
      cyclesPerYear: 999,
      warrantyYears: 100,
    });

    expect(inputs).toEqual({
      batteryCapacityKwh: 1,
      peakUsageCoveredKwh: 0,
      installedCost: 0,
      peakRatePence: 0,
      offPeakRatePence: 200,
      efficiencyPercent: 1,
      cyclesPerYear: 365,
      warrantyYears: 30,
    });
  });
});
