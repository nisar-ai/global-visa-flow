export function Header() {
  return (
    <>
      {/* Data availability banner */}
      <div className="border-b border-[var(--border)] bg-[var(--surface-2)]">
        <div className="mx-auto max-w-6xl px-4 py-2 text-xs text-[var(--text-muted)] sm:px-6">
          Detailed visa & PR data is available for 21 countries:
          <span className="ml-1 font-medium text-[var(--foreground)]">
            USA, UK, Canada, Australia, Germany, Switzerland, France, Ireland, Finland, Norway, Pakistan, India, Bangladesh, Saudi Arabia, UAE, Turkey, Qatar, Italy, China, Japan, Russia.
          </span>
          {" "}For other countries, only basic info is shown.
        </div>
      </div>

      {/* Main header */}
      <header className="sticky top-0 z-50 border-b border-[var(--border)] bg-[var(--background)]/80 backdrop-blur">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3 sm:px-6">
          <a
            href="#top"
            style={{
              fontSize: "1rem",
              fontWeight: 900,
              letterSpacing: "0.025em",
              color: "#6366f1", // indigo-500, change if you want another blue
              textDecoration: "none",
            }}
          >
            GlobalVisa Flow
          </a>

          <nav className="hidden items-center gap-6 text-sm sm:flex">
            <a href="#top" className="hover:text-[var(--accent)]">
              Home
            </a>
            <a href="#how-it-works" className="hover:text-[var(--accent)]">
              How it works
            </a>
            <a href="#pr" className="hover:text-[var(--accent)]">
              PR Guide
            </a>
          </nav>

          <div className="flex items-center gap-3">
            <a
              href="#top"
              className="rounded-md border border-[var(--border-strong)] bg-[var(--surface)] px-3 py-1.5 text-xs font-semibold hover:border-[var(--accent)]"
            >
              Get started
            </a>
          </div>
        </div>
      </header>
    </>
  );
}