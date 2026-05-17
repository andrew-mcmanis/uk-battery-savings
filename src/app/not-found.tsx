import SiteFooter from "@/components/SiteFooter";
import SiteHeader from "@/components/SiteHeader";
import Link from "next/link";
import { routePaths, sectionPaths } from "@/data/siteRoutes";

export default function NotFound() {
  return (
    <main id="main-content" className="min-h-screen bg-slate-50 text-slate-900">
      <SiteHeader />

      <section className="bg-slate-950 px-6 py-20 text-white sm:py-28">
        <div className="mx-auto max-w-4xl">
          <p className="text-sm font-semibold uppercase tracking-wide text-emerald-300">
            Page not found
          </p>

          <h1 className="mt-4 text-4xl font-bold tracking-tight sm:text-5xl">
            This page does not exist
          </h1>

          <p className="mt-5 max-w-2xl text-lg leading-8 text-slate-300">
            The link may be broken, the page may have moved, or the address may
            have been typed incorrectly.
          </p>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Link
              href={sectionPaths.calculator}
              className="rounded-xl bg-emerald-500 px-6 py-3 text-sm font-semibold text-slate-950 hover:bg-emerald-400"
            >
              Use the calculator
            </Link>

            <Link
              href={routePaths.guides}
              className="rounded-xl bg-white/10 px-6 py-3 text-sm font-semibold text-white ring-1 ring-white/20 hover:bg-white/15"
            >
              View guides
            </Link>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-4xl px-6 py-12 sm:py-16">
        <div className="rounded-3xl bg-white p-6 shadow-sm ring-1 ring-slate-200 sm:p-8">
          <h2 className="text-2xl font-bold text-slate-950">
            Useful places to go next
          </h2>

          <div className="mt-6 grid gap-4 sm:grid-cols-2">
            <Link
              href={routePaths.home}
              className="rounded-2xl bg-slate-50 p-5 ring-1 ring-slate-200 hover:bg-white hover:shadow-sm"
            >
              <h3 className="font-bold text-slate-950">Homepage</h3>
              <p className="mt-2 text-sm leading-6 text-slate-600">
                Return to the main home battery savings calculator page.
              </p>
            </Link>

            <Link
              href={routePaths.guides}
              className="rounded-2xl bg-slate-50 p-5 ring-1 ring-slate-200 hover:bg-white hover:shadow-sm"
            >
              <h3 className="font-bold text-slate-950">Guides</h3>
              <p className="mt-2 text-sm leading-6 text-slate-600">
                Read practical UK home battery savings guides.
              </p>
            </Link>

            <Link
              href={routePaths.batterySavingsExamples}
              className="rounded-2xl bg-slate-50 p-5 ring-1 ring-slate-200 hover:bg-white hover:shadow-sm"
            >
              <h3 className="font-bold text-slate-950">Savings examples</h3>
              <p className="mt-2 text-sm leading-6 text-slate-600">
                Compare example savings and payback scenarios.
              </p>
            </Link>

            <Link
              href={routePaths.batteryQuoteChecklist}
              className="rounded-2xl bg-slate-50 p-5 ring-1 ring-slate-200 hover:bg-white hover:shadow-sm"
            >
              <h3 className="font-bold text-slate-950">Quote checklist</h3>
              <p className="mt-2 text-sm leading-6 text-slate-600">
                Know what to ask before accepting a battery quote.
              </p>
            </Link>
          </div>
        </div>
      </section>

      <SiteFooter />
    </main>
  );
}
