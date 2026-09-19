"use client";

import { useLanguage } from "@/lib/LanguageContext";

export function PRSection() {
  const { t } = useLanguage();

  return (
    <section id="pr-section" className="relative z-10 px-4 py-6 sm:px-6">
      <div className="mx-auto max-w-2xl rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-8 text-center shadow-[var(--shadow-soft)] sm:p-10">
        <p className="font-mono text-xs tracking-[0.14em] text-[var(--accent)]">{t.pr_eyebrow}</p>
        <h2 className="mt-2 text-2xl font-semibold">{t.pr_title}</h2>
        <p className="mx-auto mt-4 max-w-[60ch] text-sm leading-relaxed text-[var(--text-muted)]">{t.pr_body}</p>
        <a
          href="#top"
          className="mt-6 inline-flex rounded-md border border-[var(--border)] px-4 py-2.5 text-sm font-semibold text-[var(--text-muted)] hover:border-[var(--border-strong)] hover:text-[var(--foreground)]"
        >
          {t.pr_cta} ↑
        </a>
      </div>
    </section>
  );
}
