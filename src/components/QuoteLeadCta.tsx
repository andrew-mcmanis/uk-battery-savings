import Link from "next/link";
import { routePaths, sectionPaths } from "@/data/siteRoutes";

type QuoteLeadCtaProps = {
  eyebrow?: string;
  title?: string;
  description?: string;
  compact?: boolean;
};

export default function QuoteLeadCta({
  eyebrow = "Quote-ready next step",
  title = "Turn your estimate into a better installer conversation",
  description = "Use the calculator result and quote worksheet to ask sharper questions, compare offers and avoid judging a battery quote on headline price alone.",
  compact = false,
}: QuoteLeadCtaProps) {
  const content = (
    <div className="grid gap-6 rounded-3xl bg-slate-950 p-6 text-white shadow-sm sm:p-8 lg:grid-cols-[1fr_auto] lg:items-center">
      <div>
        <p className="text-sm font-semibold uppercase tracking-wide text-emerald-300">
          {eyebrow}
        </p>

        <h2 className="mt-3 max-w-3xl text-2xl font-bold tracking-tight sm:text-3xl">
          {title}
        </h2>

        <p className="mt-3 max-w-3xl leading-7 text-slate-300">
          {description}
        </p>
      </div>

      <div className="flex flex-col gap-3 sm:flex-row lg:flex-col">
        <Link
          href={routePaths.batteryInstallerQuotes}
          className="inline-flex justify-center rounded-xl bg-emerald-500 px-5 py-3 text-sm font-semibold text-slate-950 hover:bg-emerald-400"
        >
          Compare installer quotes
        </Link>

        <Link
          href={sectionPaths.calculator}
          className="inline-flex justify-center rounded-xl bg-white/10 px-5 py-3 text-sm font-semibold text-white ring-1 ring-white/20 hover:bg-white/15"
        >
          Check savings first
        </Link>
      </div>
    </div>
  );

  if (compact) {
    return content;
  }

  return (
    <section className="bg-white px-6 py-12 sm:py-16">
      <div className="mx-auto max-w-6xl">{content}</div>
    </section>
  );
}
