"use client";

import Link from "next/link";
import { useLanguage } from "@/lib/LanguageContext";

export function Footer() {
  const { t } = useLanguage();

  return (
    <footer className="relative z-10 border-t border-[var(--border)]">
      <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6">
        <div className="flex items-center gap-4 rounded-xl border border-[var(--border)] bg-[var(--surface)] p-5">
          <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full border border-[var(--border-strong)] bg-[var(--surface-2)] font-semibold text-[var(--accent)]">
            NA
          </div>
          <div>
            <p className="font-mono text-[0.65rem] tracking-[0.1em] text-[var(--text-faint)]">BUILT BY</p>
            <h2 className="text-base font-semibold">Nisar Ahmad</h2>
            <p className="text-sm text-[var(--text-muted)]">
              COMSATS University Islamabad, Sahiwal Campus — Pakistan
            </p>
          </div>
        </div>

        <div className="mt-6 flex flex-col gap-3 text-sm text-[var(--text-faint)] sm:flex-row sm:items-center sm:justify-between">
          <span>© 2026 GlobalVisa Flow. {t.footer_rights}</span>
          <span className="flex gap-4">
            <Link href="/guide" className="hover:text-[var(--text-muted)]">
              {t.nav_guide}
            </Link>
            <Link href="/#top" className="hover:text-[var(--text-muted)]">
              {t.nav_home}
            </Link>
          </span>
        </div>
      </div>
    </footer>
  );
}
