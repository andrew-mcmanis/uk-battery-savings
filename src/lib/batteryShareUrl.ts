import type { BatteryCalculatorInputs } from "@/lib/batteryCalculator";

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
  const params = new URLSearchParams();

  Object.entries(batteryInputQueryKeys).forEach(([inputKey, queryKey]) => {
    const value = inputs[inputKey as keyof BatteryCalculatorInputs];

    params.set(queryKey, String(value));
  });

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
  let foundAnyBatteryParam = false;
  const parsedInputs: BatteryCalculatorInputs = { ...defaultInputs };

  Object.entries(batteryInputQueryKeys).forEach(([inputKey, queryKey]) => {
    const parsedValue = getNumberParam(params, queryKey);

    if (parsedValue !== null) {
      foundAnyBatteryParam = true;
      parsedInputs[inputKey as keyof BatteryCalculatorInputs] = parsedValue;
    }
  });

  return foundAnyBatteryParam ? parsedInputs : null;
}
