export function Footer() {
  return (
    <footer className="mt-16 border-t border-[var(--border)] bg-[var(--surface)]">
      <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6">
        <div className="flex flex-col items-center justify-between gap-4 sm:flex-row">
          <div className="text-sm text-[var(--text-muted)]">
            © {new Date().getFullYear()} GlobalVisa Flow. Informational only.
          </div>

          <div className="flex items-center gap-4 text-sm">
            <a href="#top" className="hover:text-[var(--accent)]">
              Home
            </a>
            <a href="#how-it-works" className="hover:text-[var(--accent)]">
              How it works
            </a>
            <a href="#pr" className="hover:text-[var(--accent)]">
              PR Guide
            </a>
          </div>
        </div>

        <div className="mx-auto mt-6 max-w-2xl text-center text-xs text-[var(--text-faint)]">
          This site provides general information only. Always confirm requirements
          and fees on the official government website before applying.
        </div>

        <div className="mx-auto mt-8 max-w-2xl text-center">
          <p className="text-lg font-extrabold tracking-tight text-[var(--foreground)]">
            Built by{" "}
            <span className="text-xl font-black text-[var(--accent)]">
              Nisar Ahmad
            </span>
          </p>
          <p className="mt-1 text-base font-bold text-[var(--text-muted)]">
            CUI Sahiwal Campus
          </p>
        </div>
      </div>
    </footer>
  );
}