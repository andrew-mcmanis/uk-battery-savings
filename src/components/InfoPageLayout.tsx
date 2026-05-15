import SiteFooter from "@/components/SiteFooter";
import SiteHeader from "@/components/SiteHeader";
import type { ReactNode } from "react";

type InfoPageLayoutProps = {
  eyebrow: string;
  title: string;
  description: string;
  children: ReactNode;
};

export default function InfoPageLayout({
  eyebrow,
  title,
  description,
  children,
}: InfoPageLayoutProps) {
  return (
    <main className="min-h-screen bg-slate-50 text-slate-900">
      <SiteHeader />

      <section className="bg-slate-950 px-6 py-16 text-white sm:py-20">
        <div className="mx-auto max-w-4xl">
          <p className="text-sm font-semibold uppercase tracking-wide text-emerald-300">
            {eyebrow}
          </p>

          <h1 className="mt-4 text-4xl font-bold tracking-tight sm:text-5xl">
            {title}
          </h1>

          <p className="mt-5 max-w-3xl text-lg leading-8 text-slate-300">
            {description}
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-4xl px-6 py-12 sm:py-16">
        <div className="space-y-8 rounded-3xl bg-white p-6 leading-7 text-slate-700 shadow-sm ring-1 ring-slate-200 sm:p-8">
          {children}
        </div>
      </section>

      <SiteFooter />
    </main>
  );
}
