import countriesData from "@/data/countries.json";
import type { Country } from "@/lib/types";
import { HomeClient } from "@/components/HomeClient";
import { PRSection } from "@/components/PRSection";
import { HowItWorks } from "@/components/HowItWorks";

export default function Home() {
  const countries: Country[] = Array.isArray(countriesData) ? countriesData : [];

  return (
    <>
      <HomeClient countries={countries} />
      <HowItWorks />
      <PRSection />
    </>
  );
}