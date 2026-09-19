import { notFound } from "next/navigation";
import countriesData from "@/data/countries.json";
import type { CountriesFile } from "@/lib/types";
import { GuideDetailClient } from "@/components/GuideDetailClient";

const data = countriesData as unknown as CountriesFile;

export function generateStaticParams() {
  return data.countries.map((c) => ({ slug: c.guide_slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const country = data.countries.find((c) => c.guide_slug === slug);
  return {
    title: country ? `${country.country_name} Visa Guide — VisaFlow` : "VisaFlow Guide",
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

  const country = data.countries.find((c) => c.guide_slug === slug);
  if (!country) notFound();

  return <GuideDetailClient country={country} initialCategoryId={category} />;
}
