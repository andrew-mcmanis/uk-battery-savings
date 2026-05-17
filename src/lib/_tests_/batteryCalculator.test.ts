import { calculateBatterySavings } from "@/lib/batteryCalculator";
import { describe, expect, it } from "vitest";

describe("calculateBatterySavings", () => {
  it("calculates the typical off-peak charging example", () => {
    const results = calculateBatterySavings({
      batteryCapacityKwh: 10,
      peakUsageCoveredKwh: 8,
      installedCost: 5000,
      peakRatePence: 28,
      offPeakRatePence: 7,
      efficiencyPercent: 90,
      cyclesPerYear: 300,
      warrantyYears: 10,
    });

    expect(results.usableBatteryEnergyPerCycle).toBe(8);
    expect(results.unusedBatteryCapacityPerCycle).toBe(2);
    expect(results.offPeakEnergyNeededPerCycle).toBeCloseTo(8.8889, 4);
    expect(results.peakCostAvoidedPerCycle).toBeCloseTo(2.24, 2);
    expect(results.offPeakChargingCostPerCycle).toBeCloseTo(0.6222, 4);
    expect(results.savingPerCycle).toBeCloseTo(1.6178, 4);
    expect(results.annualSaving).toBeCloseTo(485.3333, 4);
    expect(results.monthlySaving).toBeCloseTo(40.4444, 4);
    expect(results.paybackYears).toBeCloseTo(10.3022, 4);
    expect(results.breakEvenBatteryCost).toBeCloseTo(4853.3333, 4);
  });

  it("caps useful energy when peak-period usage exceeds battery capacity", () => {
    const results = calculateBatterySavings({
      batteryCapacityKwh: 5,
      peakUsageCoveredKwh: 10,
      installedCost: 4000,
      peakRatePence: 30,
      offPeakRatePence: 10,
      efficiencyPercent: 90,
      cyclesPerYear: 300,
      warrantyYears: 10,
    });

    expect(results.usableBatteryEnergyPerCycle).toBe(5);
    expect(results.unusedBatteryCapacityPerCycle).toBe(0);
  });

  it("shows unused capacity when the battery is larger than useful peak usage", () => {
    const results = calculateBatterySavings({
      batteryCapacityKwh: 10,
      peakUsageCoveredKwh: 4,
      installedCost: 5000,
      peakRatePence: 28,
      offPeakRatePence: 7,
      efficiencyPercent: 90,
      cyclesPerYear: 300,
      warrantyYears: 10,
    });

    expect(results.usableBatteryEnergyPerCycle).toBe(4);
    expect(results.unusedBatteryCapacityPerCycle).toBe(6);
  });

  it("returns null payback when there is no positive annual saving", () => {
    const results = calculateBatterySavings({
      batteryCapacityKwh: 10,
      peakUsageCoveredKwh: 8,
      installedCost: 5000,
      peakRatePence: 20,
      offPeakRatePence: 25,
      efficiencyPercent: 90,
      cyclesPerYear: 300,
      warrantyYears: 10,
    });

    expect(results.annualSaving).toBeLessThan(0);
    expect(results.paybackYears).toBeNull();
  });
});
