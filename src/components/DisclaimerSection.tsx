export default function DisclaimerSection() {
  return (
    <section className="bg-slate-950 text-white">
      <div className="mx-auto max-w-6xl px-6 py-16 sm:py-20">
        <div className="grid gap-10 lg:grid-cols-[1fr_0.9fr]">
          <div>
            <p className="text-sm font-semibold uppercase tracking-wide text-emerald-300">
              Important
            </p>

            <h2 className="mt-3 text-3xl font-bold tracking-tight sm:text-4xl">
              Use this as an estimate, not a promise
            </h2>

            <p className="mt-5 max-w-3xl leading-8 text-slate-300">
              This calculator is designed to help you make a rough comparison.
              It does not replace a detailed installer assessment, tariff
              comparison, battery specification review or financial advice.
            </p>
          </div>

          <div className="rounded-3xl bg-white/5 p-6 ring-1 ring-white/10">
            <h3 className="text-xl font-bold">Privacy-first by design</h3>

            <p className="mt-4 leading-7 text-slate-300">
              The calculator does not ask for your name, email address, postcode
              or phone number. The first version does not use a database, login
              system or quote form.
            </p>

            <a
              href="#calculator"
              className="mt-6 inline-flex rounded-xl bg-emerald-500 px-6 py-3 text-sm font-semibold text-slate-950 hover:bg-emerald-400"
            >
              Try the calculator
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
