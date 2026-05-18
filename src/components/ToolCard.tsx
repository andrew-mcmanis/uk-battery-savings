import Link from "next/link";

type ToolCardProps = {
  title: string;
  description: string;
  href: string;
  label: string;
};

export default function ToolCard({
  title,
  description,
  href,
  label,
}: ToolCardProps) {
  return (
    <Link
      href={href}
      className="flex h-full flex-col rounded-3xl bg-white p-6 shadow-sm ring-1 ring-slate-200 transition hover:-translate-y-1 hover:shadow-md"
    >
      <span className="inline-flex w-fit rounded-full bg-emerald-100 px-3 py-1 text-xs font-semibold text-emerald-800">
        {label}
      </span>

      <h3 className="mt-4 text-xl font-bold text-slate-950">{title}</h3>

      <p className="mt-3 flex-1 text-sm leading-6 text-slate-600">
        {description}
      </p>

      <p className="mt-6 text-sm font-semibold text-emerald-700">
        Open tool →
      </p>
    </Link>
  );
}
