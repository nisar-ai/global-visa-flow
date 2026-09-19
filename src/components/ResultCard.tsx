"use client";

import { useState, useMemo } from "react";
import { useLanguage } from "@/lib/LanguageContext";
import type { Country, VisaCategory } from "@/lib/types";

type ResultCardProps = {
  country: Country;
  originCountryName?: string;
  applyingFromCountryName?: string;
  destinationCountryName: string;
  allCountries: Country[]; // new prop
};

export function ResultCard({
  country,
  originCountryName,
  applyingFromCountryName,
  destinationCountryName,
  allCountries,
}: ResultCardProps) {
  const { t } = useLanguage();

  const applyingFromLabel = t.applying_from_label ?? "Applying from";
  const passportRankLabel = t.passport_rank_label ?? "Passport rank";
  const destinationRankLabel = t.destination_rank_label ?? "Destination rank";

  // Destination rank (from destination country data)
  const destRank = typeof country.passport_rank === "number" ? country.passport_rank : null;

  // Origin (passport) rank: look up origin country in allCountries
  const originCountry = useMemo(
    () => allCountries.find((c) => c.country_name === originCountryName),
    [allCountries, originCountryName]
  );
  const originRank =
    originCountry && typeof originCountry.passport_rank === "number"
      ? originCountry.passport_rank
      : null;

  const categories = country.visa_categories || [];

  const [selectedCategoryId, setSelectedCategoryId] = useState<string>(
    categories[0]?.id || ""
  );

  const selectedCategory: VisaCategory | undefined = useMemo(
    () => categories.find((c) => c.id === selectedCategoryId),
    [categories, selectedCategoryId]
  );

  // Simple cost calculator (USD)
  const estimatedTotal =
    selectedCategory && selectedCategory.base_fee_usd
      ? (selectedCategory.base_fee_usd || 0) +
        (selectedCategory.service_fee_usd || 0) +
        (selectedCategory.biometrics_fee_usd || 0)
      : null;

  return (
    <div className="rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-5 text-left shadow-[var(--shadow-soft)]">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div className="min-w-0">
          <h3 className="text-xl font-bold">
            {t.result_title_for_country?.(destinationCountryName) ??
              `Visa guide for ${destinationCountryName}`}
          </h3>
          <p className="mt-1 text-sm text-[var(--text-muted)]">
            {t.result_subtitle_for_country?.(destinationCountryName) ??
              `Requirements when traveling from ${originCountryName || "your country"}`}
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3 text-xs">
          {destRank !== null && (
            <div className="rounded-md border border-[var(--border-strong)] bg-[var(--surface-2)] px-3 py-1.5 text-center">
              <div className="font-semibold uppercase tracking-wide text-[var(--text-faint)]">
                {destinationRankLabel}
              </div>
              <div className="text-base font-bold">#{destRank}</div>
            </div>
          )}
          {originRank !== null && originCountryName && (
            <div className="rounded-md border border-[var(--border-strong)] bg-[var(--surface-2)] px-3 py-1.5 text-center">
              <div className="font-semibold uppercase tracking-wide text-[var(--text-faint)]">
                {passportRankLabel}
              </div>
              <div className="text-base font-bold">#{originRank} · {originCountryName}</div>
            </div>
          )}
        </div>
      </div>

      {/* Summary stats */}
      <div className="mt-5 grid grid-cols-2 gap-3 sm:grid-cols-4">
        <Stat label={t.visa_free ?? "Visa-free"} value={country.visa_free} />
        <Stat label={t.visa_on_arrival ?? "Visa on arrival"} value={country.visa_on_arrival} />
        <Stat label={t.eta ?? "eTA / ETA"} value={country.eta} />
        <Stat label={t.visa_required ?? "Visa required"} value={country.visa_required} />
      </div>

      {/* Visa category selector */}
      {categories.length > 0 && (
        <div className="mt-6">
          <label
            htmlFor="visa-category"
            className="block text-sm font-semibold uppercase tracking-wide text-[var(--text-muted)]"
          >
            Visa type
          </label>
          <select
            id="visa-category"
            value={selectedCategoryId}
            onChange={(e) => setSelectedCategoryId(e.target.value)}
            className="mt-2 w-full rounded-md border border-[var(--border-strong)] bg-[var(--surface-2)] px-3.5 py-3 text-sm outline-none focus:border-[var(--accent)]"
          >
            {categories.map((cat) => (
              <option key={cat.id} value={cat.id}>
                {cat.label}
              </option>
            ))}
          </select>
        </div>
      )}

      {/* Selected category details */}
      {selectedCategory ? (
        <div className="mt-6 space-y-4">
          <Section title={selectedCategory.label}>
            {selectedCategory.overview && (
              <p className="text-sm leading-relaxed text-[var(--text-muted)]">
                {selectedCategory.overview}
              </p>
            )}

            <div className="mt-4 grid gap-3 sm:grid-cols-3">
              <InfoPill label="Visa type" value={formatVisaType(selectedCategory.type)} />
              <InfoPill
                label="Timeline"
                value={selectedCategory.processing_time || "Not specified"}
              />
              <InfoPill
                label="Total cost"
                value={
                  estimatedTotal !== null
                    ? `~ USD ${estimatedTotal}`
                    : selectedCategory.fees || "Not specified"
                }
              />
            </div>

            {selectedCategory.steps && selectedCategory.steps.length > 0 && (
              <>
                <h4 className="mt-4 text-sm font-semibold uppercase tracking-wide text-[var(--text-muted)]">
                  Steps
                </h4>
                <ol className="mt-2 list-decimal space-y-2 pl-5 text-sm text-[var(--text-faint)]">
                  {selectedCategory.steps.map((step, i) => (
                    <li key={i}>{step}</li>
                  ))}
                </ol>
              </>
            )}

            {selectedCategory.checklist && selectedCategory.checklist.length > 0 && (
              <>
                <h4 className="mt-4 text-sm font-semibold uppercase tracking-wide text-[var(--text-muted)]">
                  Checklist of documents
                </h4>
                <ul className="mt-2 list-disc space-y-2 pl-5 text-sm text-[var(--text-faint)]">
                  {selectedCategory.checklist.map((item, i) => (
                    <li key={i}>{item}</li>
                  ))}
                </ul>
              </>
            )}

            {selectedCategory.official_link_url && (
              <div className="mt-4">
                <a
                  href={selectedCategory.official_link_url}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 text-sm font-semibold text-[var(--accent)] hover:underline"
                >
                  {selectedCategory.official_link_label || "Apply on official site"}
                  <span aria-hidden="true">↗</span>
                </a>
              </div>
            )}
          </Section>
        </div>
      ) : categories.length > 0 ? (
        <div className="mt-6 rounded-xl border border-[var(--border)] bg-[var(--surface-2)] p-4 text-sm text-[var(--text-muted)]">
          Select a visa type to see timeline, cost, and checklist.
        </div>
      ) : (
        <div className="mt-6 rounded-xl border border-[var(--border)] bg-[var(--surface-2)] p-4 text-sm text-[var(--text-muted)]">
          No detailed visa category data available for this destination yet.
        </div>
      )}

      {/* PR info */}
      {country.pr_info && (
        <div className="mt-6">
          <Section title="Permanent Residence (PR) Pathways">
            <p className="text-sm leading-relaxed text-[var(--text-muted)]">
              {country.pr_info.overview}
            </p>

            <h4 className="mt-4 text-sm font-semibold uppercase tracking-wide text-[var(--text-muted)]">
              Main pathways
            </h4>
            <ul className="mt-2 list-disc space-y-2 pl-5 text-sm text-[var(--text-faint)]">
              {country.pr_info.main_pathways.map((p, i) => (
                <li key={i}>{p}</li>
              ))}
            </ul>

            <h4 className="mt-4 text-sm font-semibold uppercase tracking-wide text-[var(--text-muted)]">
              Typical requirements
            </h4>
            <ul className="mt-2 list-disc space-y-2 pl-5 text-sm text-[var(--text-faint)]">
              {country.pr_info.typical_requirements.map((r, i) => (
                <li key={i}>{r}</li>
              ))}
            </ul>

            {country.pr_info.processing_time && (
              <div className="mt-4">
                <InfoPill label="Processing time" value={country.pr_info.processing_time} />
              </div>
            )}

            {country.pr_info.official_link_url && (
              <div className="mt-4">
                <a
                  href={country.pr_info.official_link_url}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 text-sm font-semibold text-[var(--accent)] hover:underline"
                >
                  {country.pr_info.official_link_label || "Official PR information"}
                  <span aria-hidden="true">↗</span>
                </a>
              </div>
            )}
          </Section>
        </div>
      )}

      {/* Applying from section */}
      <div className="mt-6 rounded-xl border border-[var(--border)] bg-[var(--surface-2)] p-4">
        <h4 className="text-sm font-semibold uppercase tracking-wide text-[var(--text-muted)]">
          {applyingFromLabel}
        </h4>
        <p className="mt-2 text-sm leading-relaxed text-[var(--text-faint)]">
          {applyingFromCountryName
            ? t.applying_from_with_country?.(applyingFromCountryName) ??
              `You are applying from ${applyingFromCountryName}.`
            : t.applying_from_default?.(originCountryName || "your country") ??
              `You are applying from ${originCountryName || "your country"}.`}
        </p>
      </div>

      <div className="mt-5 text-xs text-[var(--text-faint)]">
        {t.result_disclaimer ??
          "Always confirm details with official government sources before applying."}
      </div>
    </div>
  );
}

function Stat({ label, value }: { label: string; value?: number }) {
  return (
    <div className="rounded-lg border border-[var(--border)] bg-[var(--bg-raise)] p-3 text-center shadow-sm">
      <div className="text-xs text-[var(--text-muted)]">{label}</div>
      <div className="mt-1 text-lg font-bold">{value ?? "—"}</div>
    </div>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="rounded-xl border border-[var(--border)] bg-[var(--surface-2)] p-4">
      <h4 className="text-sm font-bold">{title}</h4>
      <div className="mt-2">{children}</div>
    </section>
  );
}

function InfoPill({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-lg border border-[var(--border)] bg-[var(--surface)] p-3">
      <div className="text-xs font-semibold uppercase tracking-wide text-[var(--text-muted)]">
        {label}
      </div>
      <div className="mt-1 text-sm text-[var(--text-faint)]">{value}</div>
    </div>
  );
}

function formatVisaType(type: string) {
  switch (type) {
    case "visa_free":
      return "Visa-free";
    case "visa_on_arrival":
      return "Visa on arrival";
    case "eta":
      return "eTA / e‑Visa";
    case "visa_required":
      return "Visa required";
    default:
      return type;
  }
}