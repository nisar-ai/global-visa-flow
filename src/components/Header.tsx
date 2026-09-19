"use client";

import Link from "next/link";
import { useLanguage } from "@/lib/LanguageContext";
import { ThemeToggle } from "@/components/ThemeToggle";
import { LanguageSwitcher } from "@/components/LanguageSwitcher";

export function Header() {
  const { t } = useLanguage();

  return (
    <header className="sticky top-0 z-50 border-b border-[var(--border)] bg-[var(--background)]/85 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center gap-4 px-4 py-3 sm:px-6">
        <Link href="/" className="mr-auto flex items-center gap-2 font-semibold tracking-tight">
          <span className="flex h-7 w-7 items-center justify-center text-[var(--accent)]">
            <svg viewBox="0 0 32 32" width="24" height="24">
              <path
                d="M16 2 L28 7 V16 C28 23 22.5 28.5 16 30 C9.5 28.5 4 23 4 16 V7 Z"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              />
              <path
                d="M10.5 16.5 L14 20 L21.5 12"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </span>
          GlobalVisa<span className="text-[var(--accent)]">Flow</span>
        </Link>

        <nav
          aria-label="Primary"
          className="flex items-center gap-4 overflow-x-auto whitespace-nowrap text-sm text-[var(--text-muted)] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden sm:gap-6"
        >
          <Link href="/" className="shrink-0 hover:text-[var(--foreground)]">
            {t.nav_home}
          </Link>
          <Link href="/#pr-section" className="shrink-0 hover:text-[var(--foreground)]">
            {t.nav_pr}
          </Link>
          <Link href="/#how-it-works" className="shrink-0 hover:text-[var(--foreground)]">
            {t.nav_how}
          </Link>
          <Link href="/guide" className="shrink-0 hover:text-[var(--foreground)]">
            {t.nav_guide}
          </Link>
        </nav>

        <div className="flex shrink-0 items-center gap-2">
          <LanguageSwitcher />
          <ThemeToggle />
        </div>
      </div>
    </header>
  );
}
