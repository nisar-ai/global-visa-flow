"use client";

import { useLanguage } from "@/lib/LanguageContext";
import { languageOptions } from "@/data/i18n";

export function LanguageSwitcher() {
  const { language, setLanguage } = useLanguage();

  return (
    <select
      value={language}
      onChange={(e) => setLanguage(e.target.value as typeof language)}
      aria-label="Site language"
      className="h-9 shrink-0 rounded-full border border-[var(--border)] bg-[var(--surface-2)] px-3 text-xs font-medium text-[var(--text-muted)] outline-none hover:border-[var(--border-strong)]"
    >
      {languageOptions.map((opt) => (
        <option key={opt.code} value={opt.code}>
          {opt.label}
        </option>
      ))}
    </select>
  );
}
