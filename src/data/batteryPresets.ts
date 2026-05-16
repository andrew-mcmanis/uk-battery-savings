import type { BatteryCalculatorInputs } from "@/lib/batteryCalculator";

export type BatteryPreset = {
  id: string;
  label: string;
  description: string;
  inputs: BatteryCalculatorInputs;
};

export const batteryPresets: BatteryPreset[] = [
  {
    id: "small-low-usage",
    label: "Small battery / low usage",
    description:
      "A cautious example with a smaller battery, lower peak-period use and fewer yearly cycles.",
    inputs: {
      batteryCapacityKwh: 5,
      peakUsageCoveredKwh: 4,
      installedCost: 4500,
      peakRatePence: 27,
      offPeakRatePence: 10,
      efficiencyPercent: 90,
      cyclesPerYear: 250,
      warrantyYears: 10,
    },
  },
  {
    id: "typical",
    label: "Typical off-peak charging",
    description:
      "A middle-ground example using a 10 kWh battery, cheap overnight charging and regular cycling.",
    inputs: {
      batteryCapacityKwh: 10,
      peakUsageCoveredKwh: 8,
      installedCost: 5000,
      peakRatePence: 28,
      offPeakRatePence: 7,
      efficiencyPercent: 90,
      cyclesPerYear: 300,
      warrantyYears: 10,
    },
  },
  {
    id: "high-usage",
    label: "High peak usage",
    description:
      "A stronger-use example with a larger battery, higher peak usage and more yearly cycles.",
    inputs: {
      batteryCapacityKwh: 13.5,
      peakUsageCoveredKwh: 12,
      installedCost: 6500,
      peakRatePence: 30,
      offPeakRatePence: 7.5,
      efficiencyPercent: 90,
      cyclesPerYear: 330,
      warrantyYears: 10,
    },
  },
];
