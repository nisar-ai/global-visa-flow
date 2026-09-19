"use client";

import { useState } from "react";
import { useLanguage } from "@/lib/LanguageContext";
import type { Country } from "@/lib/types";
import { ResultCard } from "@/components/ResultCard";
import { FlightAnimation } from "@/components/FlightAnimation";

const ALL_COUNTRIES = [
  "Argentina", "Australia", "Austria", "Bangladesh", "Belgium", "Brazil",
  "Canada", "Chile", "China", "Colombia", "Denmark", "Egypt", "Finland",
  "France", "Germany", "Ghana", "Greece", "India", "Indonesia", "Ireland",
  "Israel", "Italy", "Japan", "Kenya", "Malaysia", "Mexico", "Morocco",
  "Netherlands", "New Zealand", "Nigeria", "Norway", "Pakistan", "Peru",
  "Philippines", "Poland", "Portugal", "Qatar", "Saudi Arabia", "Singapore",
  "South Africa", "South Korea", "Spain", "Sri Lanka", "Sweden",
  "Switzerland", "Thailand", "Turkey", "Ukraine", "United Arab Emirates",
  "United Kingdom", "United States", "Vietnam",
];

export function HomeClient({ countries }: { countries: Country[] }) {
  const { t } = useLanguage();
  const [selectedName, setSelectedName] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const countryMap = new Map(countries.map((c) => [c.country_name, c]));
  const matchedCountry = countryMap.get(selectedName);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (selectedName) setSubmitted(true);
  }

  return (
    <>
      <section className="relative z-10 px-4 pb-10 pt-16 sm:px-6 sm:pt-20" id="top">
        <div className="mx-auto max-w-2xl text-center">
          <p className="font-mono text-xs tracking-[0.14em] text-[var(--accent)]">{t.hero_eyebrow}</p>
          <h1 className="mt-4 text-4xl font-bold leading-tight tracking-tight sm:text-5xl">{t.hero_title}</h1>
          <p className="mx-auto mt-5 max-w-[52ch] text-base leading-relaxed text-[var(--text-muted)] sm:text-lg">
            {t.hero_subtitle}
          </p>

          <div className="mt-8">
            <FlightAnimation destinationLabel={matchedCountry ? matchedCountry.country_name : undefined} />
          </div>

          <form
            onSubmit={handleSubmit}
            className="mt-6 flex flex-wrap gap-3 rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-4 text-left shadow-[var(--shadow-soft)]"
          >
            <div className="flex-1 basis-64">
              <label className="mb-2 block text-xs font-semibold uppercase tracking-wide text-[var(--text-muted)]">
                {t.hero_select_label}
              </label>
              <select
                required
                value={selectedName}
                onChange={(e) => {
                  setSelectedName(e.target.value);
                  setSubmitted(true);
                }}
                className="w-full rounded-md border border-[var(--border-strong)] bg-[var(--surface-2)] px-3.5 py-3 text-sm outline-none focus:border-[var(--accent)]"
              >
                <option value="" disabled>
                  {t.hero_select_placeholder}
                </option>
                {ALL_COUNTRIES.map((name) => (
                  <option key={name} value={name}>
                    {name}
                  </option>
                ))}
              </select>
            </div>
            <button
              type="submit"
              className="h-[46px] self-end rounded-md bg-[var(--accent)] px-6 text-sm font-semibold text-[var(--accent-text)] hover:bg-[var(--accent-dim)] sm:mt-[26px]"
            >
              {t.hero_submit}
            </button>
          </form>

          <p className="mt-4 text-xs text-[var(--text-faint)]">{t.hero_disclaimer}</p>
        </div>
      </section>

      {submitted && selectedName && (
        <section className="relative z-10 px-4 pb-16 sm:px-6">
          <div className="mx-auto max-w-3xl">
            {matchedCountry ? (
              <ResultCard country={matchedCountry} />
            ) : (
              <div className="rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-8 text-left shadow-[var(--shadow-soft)]">
                <h2 className="text-xl font-semibold">
                  We&apos;re still adding official data for {selectedName}
                </h2>
                <p className="mt-3 text-sm leading-relaxed text-[var(--text-muted)]">
                  Detailed checklists for this destination aren&apos;t ready yet. In the meantime, start with your
                  destination&apos;s foreign ministry or embassy website directly, and check the VisaFlow guide for
                  general steps that apply almost everywhere.
                </p>
              </div>
            )}
          </div>
        </section>
      )}
    </>
  );
}
