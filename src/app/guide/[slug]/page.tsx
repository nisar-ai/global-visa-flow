import { notFound } from "next/navigation";
import countriesData from "@/data/countries.json";
import type { CountriesFile, Country } from "@/lib/types";
import { GuideDetailClient } from "@/components/GuideDetailClient";

const data = countriesData as unknown as CountriesFile;
const countries = data as Country[];

function makeSlug(name: string) {
  return name.toLowerCase().replace(/\s+/g, "-");
}

export function generateStaticParams() {
  return countries.map((c) => ({ slug: makeSlug(c.country_name) }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const country = countries.find((c) => makeSlug(c.country_name) === slug);

  return {
    title: country
      ? `${country.country_name} Visa Guide — VisaFlow`
      : "VisaFlow Guide",
    description: country
      ? `Step-by-step guidance for tourist, study, work, and PR/citizenship visas for ${country.country_name}.`
      : "Step-by-step visa application guidance.",
  };
}

export default async function GuideDetailPage({
  params,
  searchParams,
}: {
  params: Promise<{ slug: string }>;
  searchParams: Promise<{ category?: string }>;
}) {
  const { slug } = await params;
  const { category } = await searchParams;

  const country = countries.find((c) => makeSlug(c.country_name) === slug);
  if (!country) {
    notFound();
  }

  return <GuideDetailClient country={country} initialCategoryId={category} />;
}
