import { siteConfig } from "@/data/siteConfig";
import Link from "next/link";

const navLinks = [
  {
    label: "Calculator",
    href: "/#calculator",
  },
  {
    label: "How it works",
    href: "/#how-it-works",
  },
  {
    label: "Guides",
    href: "/#guides",
  },
  {
    label: "About",
    href: "/about",
  },
];

export default function SiteHeader() {
  return (
    <header className="sticky top-0 z-50 border-b border-white/10 bg-slate-950/95 text-white backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-6 px-6 py-4">
        <Link href="/" className="font-bold tracking-tight">
          {siteConfig.name}
        </Link>

        <nav className="hidden items-center gap-6 text-sm text-slate-300 md:flex">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="hover:text-white"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <Link
          href="/#calculator"
          className="rounded-xl bg-emerald-500 px-4 py-2 text-sm font-semibold text-slate-950 hover:bg-emerald-400"
        >
          Start
        </Link>
      </div>
    </header>
  );
}
