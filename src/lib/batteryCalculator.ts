export type BatteryCalculatorInputs = {
  batteryCapacityKwh: number;
  peakUsageCoveredKwh: number;
  installedCost: number;
  peakRatePence: number;
  offPeakRatePence: number;
  efficiencyPercent: number;
  cyclesPerYear: number;
  warrantyYears: number;
};

export type BatteryCalculatorResults = {
  usableBatteryEnergyPerCycle: number;
  unusedBatteryCapacityPerCycle: number;
  offPeakEnergyNeededPerCycle: number;
  peakCostAvoidedPerCycle: number;
  offPeakChargingCostPerCycle: number;
  savingPerCycle: number;
  annualSaving: number;
  monthlySaving: number;
  paybackYears: number | null;
  breakEvenBatteryCost: number;
};

export function calculateBatterySavings(
  inputs: BatteryCalculatorInputs
): BatteryCalculatorResults {
  const efficiencyDecimal = inputs.efficiencyPercent / 100;
  const safeEfficiency = efficiencyDecimal > 0 ? efficiencyDecimal : 0.01;

  const peakRatePounds = inputs.peakRatePence / 100;
  const offPeakRatePounds = inputs.offPeakRatePence / 100;

  const usableBatteryEnergyPerCycle = Math.min(
    inputs.batteryCapacityKwh,
    inputs.peakUsageCoveredKwh
  );

  const unusedBatteryCapacityPerCycle = Math.max(
    inputs.batteryCapacityKwh - usableBatteryEnergyPerCycle,
    0
  );

  const offPeakEnergyNeededPerCycle =
    usableBatteryEnergyPerCycle / safeEfficiency;

  const peakCostAvoidedPerCycle =
    usableBatteryEnergyPerCycle * peakRatePounds;

  const offPeakChargingCostPerCycle =
    offPeakEnergyNeededPerCycle * offPeakRatePounds;

  const savingPerCycle =
    peakCostAvoidedPerCycle - offPeakChargingCostPerCycle;

  const annualSaving = savingPerCycle * inputs.cyclesPerYear;

  const monthlySaving = annualSaving / 12;

  const paybackYears =
    annualSaving > 0 ? inputs.installedCost / annualSaving : null;

  const breakEvenBatteryCost = annualSaving * inputs.warrantyYears;

  return {
    usableBatteryEnergyPerCycle,
    unusedBatteryCapacityPerCycle,
    offPeakEnergyNeededPerCycle,
    peakCostAvoidedPerCycle,
    offPeakChargingCostPerCycle,
    savingPerCycle,
    annualSaving,
    monthlySaving,
    paybackYears,
    breakEvenBatteryCost,
  };
}
