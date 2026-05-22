export type PopularBatteryOption = {
  id: string;
  label: string;
  usableCapacityKwh: number;
  description: string;
};

export const popularBatteryOptions: PopularBatteryOption[] = [
  {
    id: "compact-5",
    label: "Compact 5 kWh",
    usableCapacityKwh: 5,
    description:
      "A common smaller-battery size for lower evening usage or tighter budgets.",
  },
  {
    id: "mid-9-5",
    label: "Mid-size 9.5 kWh",
    usableCapacityKwh: 9.5,
    description:
      "A popular middle-ground size for households shifting overnight electricity into peak periods.",
  },
  {
    id: "large-13-5",
    label: "Large 13.5 kWh",
    usableCapacityKwh: 13.5,
    description:
      "A common larger all-in-one or modular setup size for higher peak-period usage.",
  },
  {
    id: "stacked-16",
    label: "Stacked 16 kWh",
    usableCapacityKwh: 16,
    description:
      "A larger stacked setup for homes comparing higher-capacity quotes.",
  },
];
