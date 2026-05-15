export type BatteryCalculatorInputs = {
  batteryCapacityKwh: number;
  installedCost: number;
  peakRatePence: number;
  offPeakRatePence: number;
  efficiencyPercent: number;
  cyclesPerYear: number;
  warrantyYears: number;
};

export type BatteryCalculatorResults = {
  savingPerCycle: number;
  annualSaving: number;
  monthlySaving: number;
  paybackYears: number | null;
  breakEvenBatteryCost: number;
  peakCostAvoidedPerCycle: number;
  offPeakChargingCostPerCycle: number;
};

export function calculateBatterySavings(
  inputs: BatteryCalculatorInputs
): BatteryCalculatorResults {
  const efficiencyDecimal = inputs.efficiencyPercent / 100;
  const peakRatePounds = inputs.peakRatePence / 100;
  const offPeakRatePounds = inputs.offPeakRatePence / 100;

  const safeEfficiency = efficiencyDecimal > 0 ? efficiencyDecimal : 0.01;

  const peakCostAvoidedPerCycle =
    inputs.batteryCapacityKwh * peakRatePounds;

  const offPeakChargingCostPerCycle =
    (inputs.batteryCapacityKwh / safeEfficiency) * offPeakRatePounds;

  const savingPerCycle =
    peakCostAvoidedPerCycle - offPeakChargingCostPerCycle;

  const annualSaving = savingPerCycle * inputs.cyclesPerYear;

  const monthlySaving = annualSaving / 12;

  const paybackYears =
    annualSaving > 0 ? inputs.installedCost / annualSaving : null;

  const breakEvenBatteryCost = annualSaving * inputs.warrantyYears;

  return {
    savingPerCycle,
    annualSaving,
    monthlySaving,
    paybackYears,
    breakEvenBatteryCost,
    peakCostAvoidedPerCycle,
    offPeakChargingCostPerCycle,
  };
}
