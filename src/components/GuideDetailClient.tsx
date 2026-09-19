"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import { useLanguage } from "@/lib/LanguageContext";
import type { Country, VisaCategory } from "@/lib/types";
import { CountryVisual } from "@/components/CountryVisual";
import { OfficialLinksRow } from "@/components/OfficialLinksRow";
import { PassportPowerBadge } from "@/components/PassportPowerBadge";

export function GuideDetailClient({
  country,
  initialCategoryId,
}: {
  country: Country;
  initialCategoryId?: string;
}) {
  const { t } = useLanguage();

  const hasMultipleCategories = country.visa_categories.length > 1;

  const defaultCategoryId =
    country.visa_categories[0]?.category_id ?? "";

  const [categoryId, setCategoryId] = useState<string>(
    country.visa_categories.find((c) => c.category_id === initialCategoryId)
      ?.category_id ?? defaultCategoryId
  );

  const category: VisaCategory | undefined = useMemo(() => {
    if (!country.visa_categories.length) return undefined;
    return (
      country.visa_categories.find((c) => c.category_id === categoryId) ??
      country.visa_categories[0]
    );
  }, [country, categoryId]);

  if (!category) {
    return (
      <section className="px-4 py-16 sm:px-6">
        <div className="mx-auto max-w-2xl text-center">
          <p className="font-mono text-xs tracking-[0.14em] text-[var(--accent)]">
            VISAFLOW GUIDE
          </p>
          <h1 className="mt-4 text-2xl font-bold sm:text-3xl">
            No guide available
          </h1>
          <p className="mx-auto mt-3 max-w-[56ch] text-sm text-[var(--text-muted)]">
            This country does not have any visa categories configured yet.
          </p>
          <Link
            href="/"
            className="mt-6 inline-flex items-center gap-1.5 text-sm font-semibold text-[var(--accent)] hover:text-[var(--accent-dim)]"
          >
            <svg
              width="15"
              height="15"
              viewBox="0 0 24 24"
              fill="none"
              aria-hidden="true"
            >
              <path
                d="M19 12H5m0 0l5-5m-5 5l5 5"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            Back to the checklist tool
          </Link>
        </div>
      </section>
    );
  }

  const links = category.official_links ?? country.official_links;

  const titleId = "guide-detail-title";
  const tabsId = "guide-category-tabs";

  return (
    <section
      className="px-4 py-16 sm:px-6"
      aria-labelledby={titleId}
    >
      <div className="mx-auto max-w-2xl text-center">
        <p className="font-mono text-xs tracking-[0.14em] text-[var(--accent)]">
          VISAFLOW GUIDE
        </p>

        <div className="mt-4 flex justify-center">
          <CountryVisual
            flagEmoji={country.flag_emoji}
            accentColor={country.accent_color}
            size={52}
            label={country.country_name}
          />
        </div>

        <h1
          id={titleId}
          className="mt-4 text-2xl font-bold sm:text-3xl"
        >
          How to apply for a {category.visa_type} ({country.country_name})
        </h1>

        <p className="mx-auto mt-3 max-w-[56ch] text-sm text-[var(--text-muted)]">
          Always confirm current requirements on the official links below before
          you apply.
        </p>

        {/* Passport power & dual nationality summary */}
        <div className="mx-auto mt-6 max-w-xl">
          <div className="flex flex-wrap items-center justify-center gap-2">
            {country.passport_power && (
              <PassportPowerBadge passport={country.passport_power} />
            )}
            {country.dual_nationality && (
              <div className="inline-flex items-center gap-2 rounded-full border border-[var(--border)] bg-[var(--surface)] px-3 py-1.5 text-xs">
                <span className="font-semibold">
                  {country.dual_nationality.allows_dual
                    ? "Dual nationality allowed"
                    : "Dual nationality restricted"}
                </span>
              </div>
            )}
          </div>
          {country.dual_nationality?.notes && (
            <p className="mt-3 text-xs text-[var(--text-muted)]">
              {country.dual_nationality.notes}
            </p>
          )}
        </div>
      </div>

      <div className="mx-auto mt-8 max-w-2xl">
        {hasMultipleCategories && (
          <>
            <h2 id={tabsId} className="sr-only">
              Choose visa category
            </h2>
            <div
              role="tablist"
              aria-labelledby={tabsId}
              className="flex flex-wrap gap-2"
            >
              {country.visa_categories.map((cat) => {
                const isActive = cat.category_id === category.category_id;
                return (
                  <button
                    key={cat.category_id}
                    type="button"
                    role="tab"
                    aria-selected={isActive}
                    aria-controls={`panel-${cat.category_id}`}
                    id={`tab-${cat.category_id}`}
                    onClick={() => setCategoryId(cat.category_id)}
                    className={
                      isActive
                        ? "rounded-full border border-[var(--accent)] bg-[var(--accent)] px-4 py-2 text-sm font-semibold text-[var(--accent-text)]"
                        : "rounded-full border border-[var(--border-strong)] bg-[var(--surface)] px-4 py-2 text-sm font-semibold text-[var(--text-muted)] hover:text-[var(--foreground)] hover:border-[var(--accent)]"
                    }
                  >
                    {cat.label}
                  </button>
                );
              })}
            </div>
          </>
        )}

        <ol
          role="tabpanel"
          id={`panel-${category.category_id}`}
          aria-labelledby={`tab-${category.category_id}`}
          className="mt-6 flex flex-col gap-4"
        >
          {category.step_by_step_guideline.map((step, i) => (
            <li
              key={`${category.category_id}-step-${i}`}
              className="flex gap-4 rounded-xl border border-[var(--border)] bg-[var(--surface)] p-5"
            >
              <span
                className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-[var(--border)] bg-[var(--surface-2)] font-mono text-sm text-[var(--accent)]"
                aria-hidden="true"
              >
                {i + 1}
              </span>
              <p className="text-sm leading-relaxed">{step}</p>
            </li>
          ))}
        </ol>

        <OfficialLinksRow
          links={links ?? {}}
          labels={{
            visaPortal: t.official_visa_portal,
            ministry: t.official_ministry,
            embassy: t.official_embassy,
          }}
        />

        <Link
          href="/"
          className="mt-8 inline-flex items-center gap-1.5 text-sm font-semibold text-[var(--accent)] hover:text-[var(--accent-dim)]"
        >
          <svg
            width="15"
            height="15"
            viewBox="0 0 24 24"
            fill="none"
            aria-hidden="true"
          >
            <path
              d="M19 12H5m0 0l5-5m-5 5l5 5"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          Back to the checklist tool
        </Link>
      </div>
    </section>
  );
}