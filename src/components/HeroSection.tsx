import Link from "next/link";
import { routePaths } from "@/data/siteRoutes";

export default function HeroSection() {
  return (
    <section className="relative overflow-hidden bg-slate-950 text-white">
      <div className="absolute left-0 top-0 h-96 w-96 rounded-full bg-emerald-500/20 blur-3xl" />
      <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/10 via-transparent to-transparent" />

      <div className="relative mx-auto grid min-h-screen max-w-6xl items-center gap-12 px-6 py-20 lg:grid-cols-[1.1fr_0.9fr]">
        <div>
          <p className="mb-5 inline-flex rounded-full bg-emerald-400/10 px-4 py-2 text-sm font-semibold text-emerald-300 ring-1 ring-emerald-400/20">
            UK energy savings calculator
          </p>

          <h1 className="max-w-4xl text-4xl font-bold tracking-tight sm:text-6xl">
            UK Home Battery Savings Calculator
          </h1>

          <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-300">
            Estimate whether charging a home battery on cheap overnight
            electricity and using it during peak-rate hours could reduce your
            annual electricity bill.
          </p>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <a
              href="#calculator"
              className="rounded-xl bg-emerald-500 px-6 py-3 text-sm font-semibold text-slate-950 shadow-sm hover:bg-emerald-400"
            >
              Start calculator
            </a>

            <Link
              href={routePaths.tools}
              className="rounded-xl bg-white px-6 py-3 text-sm font-semibold text-slate-950 ring-1 ring-white/20 hover:bg-slate-100"
            >
              Compare tools
            </Link>

            <a
              href="#how-it-works"
              className="rounded-xl bg-white/10 px-6 py-3 text-sm font-semibold text-white ring-1 ring-white/20 hover:bg-white/15"
            >
              How it works
            </a>
          </div>

          <div className="mt-8 grid gap-3 text-sm text-slate-300 sm:grid-cols-3">
            <div className="rounded-2xl bg-white/5 p-4 ring-1 ring-white/10">
              No sign-up
            </div>
            <div className="rounded-2xl bg-white/5 p-4 ring-1 ring-white/10">
              No sales call
            </div>
            <div className="rounded-2xl bg-white/5 p-4 ring-1 ring-white/10">
              No data stored
            </div>
          </div>
        </div>

        <div className="rounded-3xl bg-white p-6 text-slate-950 shadow-2xl">
          <p className="text-sm font-semibold uppercase tracking-wide text-emerald-700">
            Example result
          </p>

          <div className="mt-5 space-y-4">
            <div className="rounded-2xl bg-slate-50 p-5 ring-1 ring-slate-200">
              <p className="text-sm text-slate-500">Estimated annual saving</p>
              <p className="mt-2 text-4xl font-bold">£485</p>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <div className="rounded-2xl bg-slate-50 p-5 ring-1 ring-slate-200">
                <p className="text-sm text-slate-500">Monthly saving</p>
                <p className="mt-2 text-2xl font-bold">£40</p>
              </div>

              <div className="rounded-2xl bg-slate-50 p-5 ring-1 ring-slate-200">
                <p className="text-sm text-slate-500">Payback</p>
                <p className="mt-2 text-2xl font-bold">10.3 years</p>
              </div>
            </div>

            <p className="text-sm leading-6 text-slate-600">
              Example only, based on a 10 kWh battery, 8 kWh of useful peak-period
              usage, 28p peak rate, 7p off-peak rate, 90% efficiency and 300 cycles
              per year.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
