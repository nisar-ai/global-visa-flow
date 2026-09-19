import Link from "next/link";
import countriesData from "@/data/countries.json";
import type { CountriesFile, Country } from "@/lib/types";
import { CountryVisual } from "@/components/CountryVisual";

const data = countriesData as unknown as CountriesFile;

export const metadata = {
  title: "VisaFlow Guide — Step-by-Step Visa Application Guides",
  description:
    "Plain-language, step-by-step guides for applying for a tourist, study, work, or PR/citizenship visa.",
};

export default function GuideIndexPage() {
  // data is already Country[]
  const countries = data as Country[];

  return (
    <section className="px-4 py-16 sm:px-6">
      <div className="mx-auto max-w-4xl text-center">
        <p className="font-mono text-xs tracking-[0.14em] text-[var(--accent)]">
          VISAFLOW GUIDE
        </p>
        <h1 className="mt-3 text-3xl font-bold sm:text-4xl">
          Pick a country to see its full guide
        </h1>
        <p className="mx-auto mt-4 max-w-[56ch] text-[var(--text-muted)]">
          Each guide covers tourist, study, work, and PR/citizenship steps, with official government links.
        </p>
      </div>

      <div className="mx-auto mt-10 grid max-w-4xl grid-cols-1 gap-4 sm:grid-cols-2">
        {countries.map((country) => (
          <Link
            key={country.country_name}
            href={`/guide/${country.country_name.toLowerCase().replace(/\s+/g, "-")}`}
            className="flex items-center gap-4 rounded-xl border border-[var(--border)] bg-[var(--surface)] p-5 transition-colors hover:border-[var(--border-strong)]"
          >
            <CountryVisual
              flagEmoji={(country as any).flag_emoji || "🌍"}
              accentColor={(country as any).accent_color || "#3b82f6"}
            />
            <div>
              <h2 className="font-semibold">{country.country_name}</h2>
              <p className="text-sm text-[var(--text-muted)]">
                {(country.visa_categories || [])
                  .map((c) => c.label)
                  .join(" · ")}
              </p>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}