import Link from "next/link";

type GuideCardProps = {
  title: string;
  description: string;
  href: string;
};

export default function GuideCard({ title, description, href }: GuideCardProps) {
  return (
    <Link
      href={href}
      className="flex h-full min-h-57.5 flex-col rounded-2xl bg-white p-6 shadow-sm ring-1 ring-slate-200 transition hover:-translate-y-1 hover:shadow-md"
    >
      <h3 className="text-lg font-bold leading-7 text-slate-950">{title}</h3>

      <p className="mt-3 flex-1 text-sm leading-6 text-slate-600">
        {description}
      </p>

      <p className="mt-6 text-sm font-semibold text-emerald-700">
        Read guide →
      </p>
    </Link>
  );
}
