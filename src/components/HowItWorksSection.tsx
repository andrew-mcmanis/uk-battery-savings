import { useCases } from "@/data/landingPageContent";

export default function HowItWorksSection() {
  return (
    <section
      id="how-it-works"
      className="mx-auto max-w-6xl px-6 py-16 sm:py-20"
    >
      <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr]">
        <div>
          <p className="text-sm font-semibold uppercase tracking-wide text-emerald-700">
            How it works
          </p>

          <h2 className="mt-3 text-3xl font-bold tracking-tight text-slate-950 sm:text-4xl">
            The calculator compares cheap charging against peak-rate usage
          </h2>
        </div>

        <div className="space-y-5 text-lg leading-8 text-slate-700">
          <p>
            A home battery can reduce electricity costs when it charges during
            cheaper off-peak hours and discharges later when electricity is more
            expensive.
          </p>

          <p>
            This calculator estimates the cost of charging the battery, the
            peak-rate electricity avoided, and the possible yearly saving.
          </p>

          <p>
            The result is not a guarantee. It is a starting estimate to help you
            understand whether a home battery is worth investigating further.
          </p>
        </div>
      </div>

      <div className="mt-12 grid gap-5 md:grid-cols-3">
        {useCases.map((useCase) => (
          <div
            key={useCase.title}
            className="rounded-2xl bg-white p-6 shadow-sm ring-1 ring-slate-200"
          >
            <h3 className="text-lg font-bold text-slate-950">
              {useCase.title}
            </h3>

            <p className="mt-2 text-sm leading-6 text-slate-600">
              {useCase.description}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
