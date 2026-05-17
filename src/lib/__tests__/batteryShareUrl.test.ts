import type { BatteryCalculatorInputs } from "@/lib/batteryCalculator";
import {
  encodeBatteryInputs,
  parseBatteryInputsFromSearchParams,
} from "@/lib/batteryShareUrl";
import { describe, expect, it } from "vitest";

const defaultInputs: BatteryCalculatorInputs = {
  batteryCapacityKwh: 10,
  peakUsageCoveredKwh: 8,
  installedCost: 5000,
  peakRatePence: 28,
  offPeakRatePence: 7,
  efficiencyPercent: 90,
  cyclesPerYear: 300,
  warrantyYears: 10,
};

describe("batteryShareUrl", () => {
  it("encodes battery inputs into query parameters", () => {
    const queryString = encodeBatteryInputs(defaultInputs);
    const params = new URLSearchParams(queryString);

    expect(params.get("cap")).toBe("10");
    expect(params.get("peakUse")).toBe("8");
    expect(params.get("cost")).toBe("5000");
    expect(params.get("peak")).toBe("28");
    expect(params.get("offPeak")).toBe("7");
    expect(params.get("eff")).toBe("90");
    expect(params.get("cycles")).toBe("300");
    expect(params.get("warranty")).toBe("10");
  });

  it("parses battery inputs from query parameters", () => {
    const params = new URLSearchParams(
      "cap=5&peakUse=4&cost=4500&peak=27&offPeak=10&eff=90&cycles=250&warranty=10"
    );

    const parsedInputs = parseBatteryInputsFromSearchParams(
      params,
      defaultInputs
    );

    expect(parsedInputs).toEqual({
      batteryCapacityKwh: 5,
      peakUsageCoveredKwh: 4,
      installedCost: 4500,
      peakRatePence: 27,
      offPeakRatePence: 10,
      efficiencyPercent: 90,
      cyclesPerYear: 250,
      warrantyYears: 10,
    });
  });

  it("returns null when no battery query parameters exist", () => {
    const params = new URLSearchParams("utm_source=test");

    const parsedInputs = parseBatteryInputsFromSearchParams(
      params,
      defaultInputs
    );

    expect(parsedInputs).toBeNull();
  });

    it("merges partial query parameters with default inputs", () => {
    const params = new URLSearchParams("cap=5&cost=4500");

    const parsedInputs = parseBatteryInputsFromSearchParams(
      params,
      defaultInputs
    );

    expect(parsedInputs).toEqual({
      batteryCapacityKwh: 5,
      peakUsageCoveredKwh: 8,
      installedCost: 4500,
      peakRatePence: 28,
      offPeakRatePence: 7,
      efficiencyPercent: 90,
      cyclesPerYear: 300,
      warrantyYears: 10,
    });
  });

  it("ignores invalid values and sanitises unsafe values", () => {
    const params = new URLSearchParams(
      "cap=bad&peakUse=-50&cost=-5000&peak=-20&offPeak=500&eff=999&cycles=999&warranty=100"
    );

    const parsedInputs = parseBatteryInputsFromSearchParams(
      params,
      defaultInputs
    );

    expect(parsedInputs).toEqual({
      batteryCapacityKwh: 10,
      peakUsageCoveredKwh: 0,
      installedCost: 0,
      peakRatePence: 0,
      offPeakRatePence: 200,
      efficiencyPercent: 100,
      cyclesPerYear: 365,
      warrantyYears: 30,
    });
  });
});
