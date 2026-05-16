export const trustPoints = [
  {
    title: "No sign-up",
    description:
      "Use the calculator immediately without creating an account or entering personal details.",
  },
  {
    title: "No data stored",
    description:
      "The calculator runs in your browser. Your inputs are not saved to a database.",
  },
  {
    title: "Transparent maths",
    description:
      "The result is based on simple assumptions you can change yourself.",
  },
];

export const useCases = [
  {
    title: "Checking a battery quote",
    description:
      "Use the calculator to sanity-check whether a quoted battery cost looks realistic against the likely annual saving.",
  },
  {
    title: "Comparing peak and off-peak rates",
    description:
      "See how much difference a cheaper overnight rate could make when paired with a home battery.",
  },
  {
    title: "Estimating payback period",
    description:
      "Get a rough payback estimate before spending time speaking to installers or tariff providers.",
  },
];

export const goodFitItems = [
  "You are considering a home battery.",
  "You have or are considering a cheap overnight electricity tariff.",
  "You want a quick estimate before requesting quotes.",
  "You want to compare battery cost against possible savings.",
];

export const notGoodFitItems = [
  "You need a guaranteed financial forecast.",
  "You want a full solar generation model.",
  "You need battery degradation modelled precisely.",
  "You need personalised regulated financial advice.",
];

export const faqs = [
  {
    question: "Is this calculator only for the UK?",
    answer:
      "Yes. The wording, assumptions and examples are aimed at UK households using pence per kWh and pounds sterling.",
  },
  {
    question: "Does this include solar panels?",
    answer:
      "Not yet. This first version focuses on charging a battery from cheap off-peak electricity and using it during peak-rate hours. Solar modelling can be added later.",
  },
  {
    question: "Does the calculator store my data?",
    answer:
      "No. The calculator runs in your browser and does not store your inputs in a database.",
  },
  {
    question: "Why does battery efficiency matter?",
    answer:
      "A battery loses some energy when charging and discharging. The calculator accounts for this by increasing the amount of off-peak electricity needed to deliver the usable battery capacity.",
  },
  {
    question: "What does cycles per year mean?",
    answer:
      "A cycle means charging and discharging the battery. If you expect to use the battery most days, a value around 300 cycles per year is a reasonable starting assumption.",
  },
  {
  question: "Why does peak-period usage covered matter?",
  answer:
    "A battery only saves money when its stored energy replaces electricity you would otherwise buy at the higher peak rate. If your battery is larger than your useful peak-period usage, the extra capacity may not improve savings.",
  },
  {
    question: "Is the payback period guaranteed?",
    answer:
      "No. The payback period is an estimate only. Real savings depend on your actual household usage, tariff, installation cost, battery settings, battery degradation and future electricity prices.",
  },
];

export const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faqs.map((faq) => ({
    "@type": "Question",
    name: faq.question,
    acceptedAnswer: {
      "@type": "Answer",
      text: faq.answer,
    },
  })),
};
