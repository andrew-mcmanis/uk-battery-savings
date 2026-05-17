import { calculateBatterySavings } from "@/lib/batteryCalculator";
import { getBatteryWarnings } from "@/lib/batteryWarnings";
import { describe, expect, it } from "vitest";

describe("getBatteryWarnings", () => {
  it("warns when off-peak rate is not cheaper than peak rate", () => {
    const inputs = {
      batteryCapacityKwh: 10,
      peakUsageCoveredKwh: 8,
      installedCost: 5000,
      peakRatePence: 25,
      offPeakRatePence: 25,
      efficiencyPercent: 90,
      cyclesPerYear: 300,
      warrantyYears: 10,
    };

    const results = calculateBatterySavings(inputs);
    const warnings = getBatteryWarnings({ inputs, results });

    expect(warnings.some((warning) => warning.id === "off-peak-not-cheaper")).toBe(
      true
    );
  });

  it("warns when peak usage exceeds battery capacity", () => {
    const inputs = {
      batteryCapacityKwh: 5,
      peakUsageCoveredKwh: 10,
      installedCost: 4000,
      peakRatePence: 30,
      offPeakRatePence: 10,
      efficiencyPercent: 90,
      cyclesPerYear: 300,
      warrantyYears: 10,
    };

    const results = calculateBatterySavings(inputs);
    const warnings = getBatteryWarnings({ inputs, results });

    expect(
      warnings.some((warning) => warning.id === "peak-usage-exceeds-battery")
    ).toBe(true);
  });

  it("warns when the battery may be oversized", () => {
    const inputs = {
      batteryCapacityKwh: 10,
      peakUsageCoveredKwh: 4,
      installedCost: 5000,
      peakRatePence: 28,
      offPeakRatePence: 7,
      efficiencyPercent: 90,
      cyclesPerYear: 300,
      warrantyYears: 10,
    };

    const results = calculateBatterySavings(inputs);
    const warnings = getBatteryWarnings({ inputs, results });

    expect(
      warnings.some((warning) => warning.id === "battery-possibly-oversized")
    ).toBe(true);
  });

  it("warns when yearly cycles are low", () => {
    const inputs = {
      batteryCapacityKwh: 10,
      peakUsageCoveredKwh: 8,
      installedCost: 5000,
      peakRatePence: 28,
      offPeakRatePence: 7,
      efficiencyPercent: 90,
      cyclesPerYear: 100,
      warrantyYears: 10,
    };

    const results = calculateBatterySavings(inputs);
    const warnings = getBatteryWarnings({ inputs, results });

    expect(warnings.some((warning) => warning.id === "low-cycles")).toBe(true);
  });

  it("warns when payback is longer than warranty", () => {
    const inputs = {
      batteryCapacityKwh: 10,
      peakUsageCoveredKwh: 8,
      installedCost: 5000,
      peakRatePence: 28,
      offPeakRatePence: 7,
      efficiencyPercent: 90,
      cyclesPerYear: 300,
      warrantyYears: 10,
    };

    const results = calculateBatterySavings(inputs);
    const warnings = getBatteryWarnings({ inputs, results });

    expect(
      warnings.some((warning) => warning.id === "payback-longer-than-warranty")
    ).toBe(true);
  });
});
