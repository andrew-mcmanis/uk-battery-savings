import type { BatteryCalculatorInputs } from "@/lib/batteryCalculator";
import { sanitizeBatteryInputs } from "@/lib/batteryInputLimits";

const batteryInputQueryKeys = {
  batteryCapacityKwh: "cap",
  peakUsageCoveredKwh: "peakUse",
  installedCost: "cost",
  peakRatePence: "peak",
  offPeakRatePence: "offPeak",
  efficiencyPercent: "eff",
  cyclesPerYear: "cycles",
  warrantyYears: "warranty",
} as const;

export function encodeBatteryInputs(inputs: BatteryCalculatorInputs) {
  const sanitizedInputs = sanitizeBatteryInputs(inputs);
  const params = new URLSearchParams();

  params.set("cap", String(sanitizedInputs.batteryCapacityKwh));
  params.set("peakUse", String(sanitizedInputs.peakUsageCoveredKwh));
  params.set("cost", String(sanitizedInputs.installedCost));
  params.set("peak", String(sanitizedInputs.peakRatePence));
  params.set("offPeak", String(sanitizedInputs.offPeakRatePence));
  params.set("eff", String(sanitizedInputs.efficiencyPercent));
  params.set("cycles", String(sanitizedInputs.cyclesPerYear));
  params.set("warranty", String(sanitizedInputs.warrantyYears));

  return params.toString();
}

function getNumberParam(params: URLSearchParams, key: string) {
  const rawValue = params.get(key);

  if (rawValue === null) {
    return null;
  }

  const parsedValue = Number(rawValue);

  if (!Number.isFinite(parsedValue)) {
    return null;
  }

  return parsedValue;
}

export function parseBatteryInputsFromSearchParams(
  params: URLSearchParams,
  defaultInputs: BatteryCalculatorInputs
): BatteryCalculatorInputs | null {
  const foundAnyBatteryParam = Object.values(batteryInputQueryKeys).some(
    (queryKey) => params.has(queryKey)
  );

  if (!foundAnyBatteryParam) {
    return null;
  }

  const parsedInputs: BatteryCalculatorInputs = {
    batteryCapacityKwh:
      getNumberParam(params, "cap") ?? defaultInputs.batteryCapacityKwh,
    peakUsageCoveredKwh:
      getNumberParam(params, "peakUse") ?? defaultInputs.peakUsageCoveredKwh,
    installedCost:
      getNumberParam(params, "cost") ?? defaultInputs.installedCost,
    peakRatePence:
      getNumberParam(params, "peak") ?? defaultInputs.peakRatePence,
    offPeakRatePence:
      getNumberParam(params, "offPeak") ?? defaultInputs.offPeakRatePence,
    efficiencyPercent:
      getNumberParam(params, "eff") ?? defaultInputs.efficiencyPercent,
    cyclesPerYear:
      getNumberParam(params, "cycles") ?? defaultInputs.cyclesPerYear,
    warrantyYears:
      getNumberParam(params, "warranty") ?? defaultInputs.warrantyYears,
  };

  return sanitizeBatteryInputs(parsedInputs);
}
