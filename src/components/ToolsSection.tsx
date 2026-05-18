import Link from "next/link";
import ToolCard from "@/components/ToolCard";
import { routePaths } from "@/data/siteRoutes";
import { tools } from "@/data/tools";

export default function ToolsSection() {
  return (
    <section className="mx-auto max-w-6xl px-6 py-16 sm:py-20">
      <div className="max-w-3xl">
        <p className="text-sm font-semibold uppercase tracking-wide text-emerald-700">
          Tools
        </p>

        <h2 className="mt-3 text-3xl font-bold tracking-tight text-slate-950 sm:text-4xl">
          Practical home battery tools
        </h2>

        <p className="mt-4 text-lg leading-8 text-slate-600">
          Start by estimating your battery savings, then compare real installer
          quotes side by side before deciding which option deserves a closer
          look.
        </p>
      </div>

      <div className="mt-10 grid items-stretch gap-5 md:grid-cols-2">
        {tools.map((tool) => (
          <ToolCard
            key={tool.href}
            title={tool.title}
            description={tool.description}
            href={tool.href}
            label={tool.label}
          />
        ))}
      </div>

      <div className="mt-8">
        <Link
          href={routePaths.tools}
          className="inline-flex rounded-xl bg-slate-950 px-5 py-3 text-sm font-semibold text-white hover:bg-slate-800"
        >
          View all tools
        </Link>
      </div>
    </section>
  );
}
