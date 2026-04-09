import Link from "next/link";

const NAV_LINKS = [
  { href: "#concept", label: "Concept" },
  { href: "#how-it-works", label: "How It Works" },
  { href: "#formulas", label: "Formulas" },
  { href: "#demo", label: "3D Demo" },
  { href: "#research", label: "Research" },
  { href: "#calculator", label: "Calculator" },
];
export default function Header() {
  return (
    <header className="sticky top-0 z-50 bg-paper border-b-2 border-ink h-13 flex items-center justify-between px-4 md:px-16">
      <Link href="/">
        <span className="font-mono text-[11px] tracking-[.12em] uppercase text-ink-3">
          The Visual Math Series
        </span>
      </Link>
      <nav className="hidden md:flex gap-5">
        {NAV_LINKS.map((l) => (
          <a
            key={l.href}
            href={l.href}
            className="font-mono text-[11px] tracking-widest uppercase text-ink-3 hover:text-accent transition-colors"
          >
            {l.label}
          </a>
        ))}
      </nav>
    </header>
  );
}
