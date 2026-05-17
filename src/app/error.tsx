"use client";

import Link from "next/link";
import SiteFooter from "@/components/SiteFooter";
import SiteHeader from "@/components/SiteHeader";

type ErrorPageProps = {
  error: Error & { digest?: string };
  reset: () => void;
};

export default function ErrorPage({ reset }: ErrorPageProps) {
  return (
    <main id="main-content" className="min-h-screen bg-slate-50 text-slate-900">
      <SiteHeader />

      <section className="bg-slate-950 px-6 py-20 text-white sm:py-28">
        <div className="mx-auto max-w-4xl">
          <p className="text-sm font-semibold uppercase tracking-wide text-emerald-300">
            Something went wrong
          </p>

          <h1 className="mt-4 text-4xl font-bold tracking-tight sm:text-5xl">
            The page could not load properly
          </h1>

          <p className="mt-5 max-w-2xl text-lg leading-8 text-slate-300">
            This may be a temporary issue. You can try again or return to the
            calculator.
          </p>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <button
              type="button"
              onClick={reset}
              className="rounded-xl bg-emerald-500 px-6 py-3 text-sm font-semibold text-slate-950 hover:bg-emerald-400"
            >
              Try again
            </button>

            <Link
              href="/#calculator"
              className="rounded-xl bg-white/10 px-6 py-3 text-sm font-semibold text-white ring-1 ring-white/20 hover:bg-white/15"
            >
              Use the calculator
            </Link>
          </div>
        </div>
      </section>

      <SiteFooter />
    </main>
  );
}
