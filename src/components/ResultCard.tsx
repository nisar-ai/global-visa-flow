"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { useLanguage } from "@/lib/LanguageContext";
import type { Country } from "@/lib/types";
import { CountryVisual } from "@/components/CountryVisual";
import { VisaTimeline } from "@/components/VisaTimeline";
import { CostCalculator } from "@/components/CostCalculator";
import { Checklist } from "@/components/Checklist";
import { OfficialLinksRow } from "@/components/OfficialLinksRow";

export function ResultCard({ country }: { country: Country }) {
  const { t } = useLanguage();
  const [categoryId, setCategoryId] = useState(country.visa_categories[0]?.category_id ?? "");

  const category = useMemo(
    () => country.visa_categories.find((c) => c.category_id === categoryId) ?? country.visa_categories[0],
    [country, categoryId]
  );

  if (!category) return null;

  const links = category.official_links ?? country.official_links;
  const checklistKey = `${country.country_code}:${category.category_id}`;

  return (
    <div className="animate-[reveal_0.2s_ease] rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-6 shadow-[var(--shadow-soft)] sm:p-8">
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div className="flex items-center gap-3.5">
          <CountryVisual flagEmoji={country.flag_emoji} accentColor={country.accent_color} />
          <div>
            <p className="font-mono text-xs uppercase tracking-wide text-[var(--text-faint)]">{country.region}</p>
            <h2 className="text-xl font-semibold sm:text-2xl">{country.country_name}</h2>
          </div>
        </div>
        <span className="rounded-full border border-[var(--border)] bg-[var(--surface-2)] px-3 py-1.5 font-mono text-xs text-[var(--accent)]">
          {category.visa_type}
        </span>
      </div>

      {country.visa_categories.length > 1 && (
        <div className="mt-5">
          <label className="mb-2 block text-xs font-semibold uppercase tracking-wide text-[var(--text-muted)]">
            {t.purpose_label}
          </label>
          <select
            value={category.category_id}
            onChange={(e) => setCategoryId(e.target.value)}
            className="w-full rounded-md border border-[var(--border-strong)] bg-[var(--surface-2)] px-3.5 py-3 text-sm outline-none focus:border-[var(--accent)]"
          >
            {country.visa_categories.map((cat) => (
              <option key={cat.category_id} value={cat.category_id}>
                {cat.label}
              </option>
            ))}
          </select>
        </div>
      )}

      <VisaTimeline processingTimeLabel={category.processing_time} estimate={category.processing_estimate} />

      <CostCalculator feeAmount={category.fee_amount.amount} currency={category.fee_amount.currency} />

      <OfficialLinksRow
        links={links ?? {}}
        labels={{
          visaPortal: t.official_visa_portal,
          ministry: t.official_ministry,
          embassy: t.official_embassy,
        }}
      />

      <Checklist checklistKey={checklistKey} documents={category.required_documents} />

      <Link
        href={`/guide/${country.guide_slug}?category=${category.category_id}`}
        className="mt-6 inline-flex items-center gap-1.5 text-sm font-semibold text-[var(--accent)] hover:text-[var(--accent-dim)]"
      >
        {t.guide_link}
        <svg width="15" height="15" viewBox="0 0 24 24" fill="none" aria-hidden="true">
          <path d="M5 12h14m0 0l-5-5m5 5l-5 5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </Link>
    </div>
  );
}
