"use client";

import { useLanguage } from "@/lib/LanguageContext";

export function PRSection() {
  const { t } = useLanguage();

  const eyebrow = t.pr_eyebrow ?? "PR & CITIZENSHIP";
  const title = t.pr_title ?? "Planning long-term migration?";
  const body =
    t.pr_body ??
    "Explore permanent residence and citizenship pathways, points systems, and official immigration resources for your target country.";
  const cta = t.pr_cta ?? "Back to top";

  return (
    <section
      id="pr-section"
      className="relative z-10 px-4 py-6 sm:px-6"
      aria-labelledby="pr-heading"
    >
      <div className="mx-auto max-w-2xl rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-8 text-center shadow-[var(--shadow-soft)] sm:p-10">
        <p className="font-mono text-xs tracking-[0.14em] text-[var(--accent)]">
          {eyebrow}
        </p>
        <h2
          id="pr-heading"
          className="mt-2 text-2xl font-semibold"
        >
          {title}
        </h2>
        <p className="mx-auto mt-4 max-w-[60ch] text-sm leading-relaxed text-[var(--text-muted)]">
          {body}
        </p>

        <div className="mt-6 rounded-xl border border-[var(--border)] bg-[var(--surface-2)] p-4 text-left">
          <h3 className="text-sm font-semibold">Dual nationality</h3>
          <p className="mt-2 text-sm leading-relaxed text-[var(--text-muted)]">
            Some countries allow you to keep your original citizenship when you naturalize; others require you to renounce it.
            In this app, each country guide will show whether dual nationality is allowed and any key conditions.
          </p>
        </div>

        <a
          href="#top"
          className="mt-6 inline-flex rounded-md border border-[var(--border)] px-4 py-2.5 text-sm font-semibold text-[var(--text-muted)] hover:border-[var(--border-strong)] hover:text-[var(--foreground)]"
        >
          {cta} ↑
        </a>
      </div>
    </section>
  );
}