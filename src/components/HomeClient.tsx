"use client";

import { useState, useMemo } from "react";
import { useLanguage } from "@/lib/LanguageContext";
import type { Country } from "@/lib/types";
import { ResultCard } from "@/components/ResultCard";
import { FlightAnimation } from "@/components/FlightAnimation";

export function HomeClient({ countries }: { countries: Country[] }) {
  const { t } = useLanguage();

  const [originName, setOriginName] = useState("");
  const [applyingFromName, setApplyingFromName] = useState("");
  const [destName, setDestName] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const countryMap = useMemo(
    () => new Map(countries.map((c) => [c.country_name, c])),
    [countries]
  );

  const originCountry = countryMap.get(originName);
  const applyingFromCountry = countryMap.get(applyingFromName);
  const destCountry = countryMap.get(destName);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (originName && destName) setSubmitted(true);
  }

  // Use all countries from JSON, sorted
  const ALL_COUNTRIES = countries.map((c) => c.country_name).sort();

  const originPlaceholder = t.hero_origin_placeholder ?? "Select your passport country";
  const applyingFromPlaceholder = t.hero_applying_from_placeholder ?? "Where are you applying from? (optional)";
  const destPlaceholder = t.hero_destination_placeholder ?? "Select destination";

  const originLabel = t.hero_origin_label ?? "Passport country";
  const applyingFromLabel = t.hero_applying_from_label ?? "Applying from";
  const destLabel = t.hero_destination_label ?? "Destination country";

  const submitText = t.hero_submit ?? "Get visa requirements";
  const disclaimerText =
    t.hero_disclaimer ??
    "This is an informational resource, not a government or legal service.";

  return (
    <>
      <section
        className="relative z-10 px-4 pb-10 pt-16 sm:px-6 sm:pt-20"
        id="top"
        aria-labelledby="hero-heading"
      >
        <div className="mx-auto max-w-3xl text-center">
          <p className="font-mono text-xs tracking-[0.14em] text-[var(--accent)]">
            {t.hero_eyebrow}
          </p>
          <h1
            id="hero-heading"
            className="mt-4 text-4xl font-bold leading-tight tracking-tight sm:text-5xl"
          >
            {t.hero_title}
          </h1>
          <p className="mx-auto mt-5 max-w-[60ch] text-base leading-relaxed text-[var(--text-muted)] sm:text-lg">
            {t.hero_subtitle}
          </p>

          <form
            onSubmit={handleSubmit}
            className="mt-6 flex flex-col gap-3 rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-4 text-left shadow-[var(--shadow-soft)] sm:flex-row"
            aria-label={t.hero_form_label ?? "Visa guide search form"}
          >
            {/* Passport (origin) country */}
            <div className="w-full sm:flex-1">
              <label
                htmlFor="origin-country"
                className="mb-2 block text-xs font-semibold uppercase tracking-wide text-[var(--text-muted)]"
              >
                {originLabel}
              </label>
              <select
                id="origin-country"
                required
                value={originName}
                onChange={(e) => setOriginName(e.target.value)}
                className="w-full rounded-md border border-[var(--border-strong)] bg-[var(--surface-2)] px-3.5 py-3 text-sm outline-none focus:border-[var(--accent)]"
              >
                <option value="" disabled>
                  {originPlaceholder}
                </option>
                {ALL_COUNTRIES.map((name) => (
                  <option key={name} value={name}>
                    {name}
                  </option>
                ))}
              </select>
            </div>

            {/* Applying from country (optional) */}
            <div className="w-full sm:flex-1">
              <label
                htmlFor="applying-from-country"
                className="mb-2 block text-xs font-semibold uppercase tracking-wide text-[var(--text-muted)]"
              >
                {applyingFromLabel}
              </label>
              <select
                id="applying-from-country"
                value={applyingFromName}
                onChange={(e) => setApplyingFromName(e.target.value)}
                className="w-full rounded-md border border-[var(--border-strong)] bg-[var(--surface-2)] px-3.5 py-3 text-sm outline-none focus:border-[var(--accent)]"
              >
                <option value="" disabled>
                  {applyingFromPlaceholder}
                </option>
                {ALL_COUNTRIES.map((name) => (
                  <option key={name} value={name}>
                    {name}
                  </option>
                ))}
              </select>
            </div>

            {/* Destination country */}
            <div className="w-full sm:flex-1">
              <label
                htmlFor="dest-country"
                className="mb-2 block text-xs font-semibold uppercase tracking-wide text-[var(--text-muted)]"
              >
                {destLabel}
              </label>
              <select
                id="dest-country"
                required
                value={destName}
                onChange={(e) => setDestName(e.target.value)}
                className="w-full rounded-md border border-[var(--border-strong)] bg-[var(--surface-2)] px-3.5 py-3 text-sm outline-none focus:border-[var(--accent)]"
              >
                <option value="" disabled>
                  {destPlaceholder}
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
              className="h-[46px] w-full rounded-md bg-[var(--accent)] px-6 text-sm font-semibold text-[var(--accent-text)] hover:bg-[var(--accent-dim)] sm:mt-[26px] sm:w-auto"
            >
              {submitText}
            </button>
          </form>

          <p className="mt-4 text-xs text-[var(--text-faint)]">
            {disclaimerText}
          </p>
        </div>
      </section>

      {submitted && originName && destName && (
        <section
          className="relative z-10 px-4 pb-16 sm:px-6"
          aria-labelledby="result-heading"
        >
          <div className="mx-auto max-w-3xl">
            <FlightAnimation
              originLabel={originCountry ? originCountry.country_name : undefined}
              applyingFromLabel={
                applyingFromCountry ? applyingFromCountry.country_name : undefined
              }
              destinationLabel={destCountry ? destCountry.country_name : undefined}
            />

            {destCountry ? (
              <>
                <h2
                  id="result-heading"
                  className="sr-only"
                >
                  {t.results_heading ?? "Visa guide results"}
                </h2>

                <ResultCard
                  country={destCountry}
                  originCountryName={originCountry?.country_name}
                  applyingFromCountryName={applyingFromCountry?.country_name}
                  destinationCountryName={destCountry.country_name}
                  allCountries={countries}
                />
              </>
            ) : (
              <div className="rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-8 text-left shadow-[var(--shadow-soft)]">
                <h2 className="text-xl font-semibold">
                  {typeof t.data_pending_title === "function"
                    ? t.data_pending_title(destName)
                    : `We're still adding official data for ${destName}`}
                </h2>
                <p className="mt-3 text-sm leading-relaxed text-[var(--text-muted)]">
                  {t.data_pending_body ??
                    "Detailed checklists for this destination aren't ready yet. In the meantime, start with your destination's foreign ministry or embassy website directly, and check the VisaFlow guide for general steps that apply almost everywhere."}
                </p>
              </div>
            )}
          </div>
        </section>
      )}
    </>
  );
}