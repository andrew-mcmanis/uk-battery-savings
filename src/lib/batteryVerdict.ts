import type { BatteryCalculatorInputs, BatteryCalculatorResults } from "@/lib/batteryCalculator";

export type BatteryVerdictTone = "strong" | "moderate" | "weak" | "negative";

export type BatteryVerdict = {
  tone: BatteryVerdictTone;
  label: string;
  summary: string;
  points: string[];
};

type BatteryVerdictArgs = {
  inputs: BatteryCalculatorInputs;
  results: BatteryCalculatorResults;
};

export function getBatteryVerdict({
  inputs,
  results,
}: BatteryVerdictArgs): BatteryVerdict {
  if (results.annualSaving <= 0 || results.paybackYears === null) {
    return {
      tone: "negative",
      label: "No estimated saving",
      summary:
        "Based on these assumptions, the battery does not appear to save money from off-peak charging.",
      points: [
        "The off-peak charging cost is too close to, or higher than, the peak-rate electricity avoided.",
        "Try changing the peak rate, off-peak rate, efficiency, or useful peak-period usage.",
        "This setup would need a better tariff gap or lower installed cost to look attractive.",
      ],
    };
  }

  if (results.paybackYears <= inputs.warrantyYears * 0.6) {
    return {
      tone: "strong",
      label: "Strong result",
      summary:
        "This looks like a strong estimate because the payback period is comfortably inside the warranty period.",
      points: [
        "The tariff gap is doing useful work.",
        "The battery is being used enough during expensive peak-rate periods.",
        "This result is worth investigating further with real quotes and tariff checks.",
      ],
    };
  }

  if (results.paybackYears <= inputs.warrantyYears) {
    return {
      tone: "moderate",
      label: "Worth investigating",
      summary:
        "This looks potentially worthwhile because the estimated payback period sits within the warranty period.",
      points: [
        "The numbers are not guaranteed, but they are not obviously poor.",
        "A lower installed cost or better off-peak rate could improve the result.",
        "Check whether your real usage pattern supports the assumed peak-period usage.",
      ],
    };
  }

  if (results.paybackYears <= inputs.warrantyYears * 1.5) {
    return {
      tone: "weak",
      label: "Marginal result",
      summary:
        "This looks marginal because the estimated payback period is longer than the warranty period.",
      points: [
        "The battery may still appeal for backup power or energy independence.",
        "Pure financial payback looks weaker on these assumptions.",
        "Try testing a cheaper battery quote, higher peak usage, or better off-peak rate.",
      ],
    };
  }

  return {
    tone: "weak",
    label: "Hard to justify",
    summary:
      "This looks hard to justify on savings alone because the payback period is much longer than the warranty period.",
    points: [
      "The installed cost may be too high compared with the estimated yearly saving.",
      "The useful peak-period usage may be too low for the battery size.",
      "A smaller battery or cheaper tariff could produce a better result.",
    ],
  };
}
