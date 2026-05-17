import type {
  BatteryCalculatorInputs,
  BatteryCalculatorResults,
} from "@/lib/batteryCalculator";

export type BatteryWarningTone = "warning" | "negative" | "info";

export type BatteryWarning = {
  id: string;
  tone: BatteryWarningTone;
  title: string;
  message: string;
};

type BatteryWarningArgs = {
  inputs: BatteryCalculatorInputs;
  results: BatteryCalculatorResults;
};

export function getBatteryWarnings({
  inputs,
  results,
}: BatteryWarningArgs): BatteryWarning[] {
  const warnings: BatteryWarning[] = [];

  if (inputs.offPeakRatePence >= inputs.peakRatePence) {
    warnings.push({
      id: "off-peak-not-cheaper",
      tone: "negative",
      title: "Off-peak rate is not cheaper",
      message:
        "The off-peak rate should normally be lower than the peak rate. If it is the same or higher, charging a battery from the grid is unlikely to save money.",
    });
  }

  if (inputs.peakUsageCoveredKwh > inputs.batteryCapacityKwh) {
    warnings.push({
      id: "peak-usage-exceeds-battery",
      tone: "warning",
      title: "Peak usage is higher than battery capacity",
      message:
        "The calculator caps useful battery energy at the usable battery capacity. A battery cannot cover more peak-period usage than it can store.",
    });
  }

  if (
    inputs.batteryCapacityKwh > 0 &&
    inputs.peakUsageCoveredKwh < inputs.batteryCapacityKwh * 0.5
  ) {
    warnings.push({
      id: "battery-possibly-oversized",
      tone: "info",
      title: "Battery may be oversized for useful peak usage",
      message:
        "Your useful peak-period usage is less than half the battery capacity. A smaller or cheaper battery may produce a better payback estimate.",
    });
  }

  if (inputs.cyclesPerYear < 150) {
    warnings.push({
      id: "low-cycles",
      tone: "warning",
      title: "Low yearly battery use",
      message:
        "A low number of yearly cycles reduces annual savings. Battery payback usually improves when the battery is used regularly.",
    });
  }

  if (results.paybackYears !== null && results.paybackYears > inputs.warrantyYears) {
    warnings.push({
      id: "payback-longer-than-warranty",
      tone: "warning",
      title: "Payback is longer than the warranty period",
      message:
        "The estimated payback period is longer than the warranty period you entered. That does not automatically make the battery unsuitable, but the financial case is weaker.",
    });
  }

  if (results.annualSaving <= 0) {
    warnings.push({
      id: "no-positive-saving",
      tone: "negative",
      title: "No positive saving from these assumptions",
      message:
        "The current values do not produce a positive annual saving. Try a lower off-peak rate, higher peak rate, lower installed cost, or more useful peak-period usage.",
    });
  }

  return warnings;
}
