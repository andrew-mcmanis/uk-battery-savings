import type { BatteryCalculatorInputs } from "@/lib/batteryCalculator";

function clampNumber(value: number, min: number, max: number) {
  if (!Number.isFinite(value)) {
    return min;
  }

  return Math.min(Math.max(value, min), max);
}

export function sanitizeBatteryInputs(
  inputs: BatteryCalculatorInputs
): BatteryCalculatorInputs {
  return {
    batteryCapacityKwh: clampNumber(inputs.batteryCapacityKwh, 1, 100),
    peakUsageCoveredKwh: clampNumber(inputs.peakUsageCoveredKwh, 0, 100),
    installedCost: clampNumber(inputs.installedCost, 0, 100000),
    peakRatePence: clampNumber(inputs.peakRatePence, 0, 200),
    offPeakRatePence: clampNumber(inputs.offPeakRatePence, 0, 200),
    efficiencyPercent: clampNumber(inputs.efficiencyPercent, 1, 100),
    cyclesPerYear: clampNumber(inputs.cyclesPerYear, 0, 365),
    warrantyYears: clampNumber(inputs.warrantyYears, 1, 30),
  };
}
