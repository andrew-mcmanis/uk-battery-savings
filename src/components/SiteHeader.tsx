import { siteConfig } from "@/data/siteConfig";
import Link from "next/link";

const navLinks = [
  {
    label: "Calculator",
    href: "/#calculator",
  },
  {
    label: "Guides",
    href: "/guides",
  },
  {
    label: "How it works",
    href: "/#how-it-works",
  },
  {
    label: "About",
    href: "/about",
  },
  {
    label: "Privacy",
    href: "/privacy",
  },
];

export default function SiteHeader() {
  return (
    <header className="sticky top-0 z-50 border-b border-white/10 bg-slate-950/95 text-white backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-3 sm:px-6 sm:py-4">
        <Link href="/" className="font-bold tracking-tight">
          <span className="sm:hidden">{siteConfig.shortName}</span>
          <span className="hidden sm:inline">{siteConfig.name}</span>
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
