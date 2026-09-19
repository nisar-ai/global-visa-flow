import countriesData from "@/data/countries.json";
import type { CountriesFile } from "@/lib/types";
import { HomeClient } from "@/components/HomeClient";
import { PRSection } from "@/components/PRSection";
import { HowItWorks } from "@/components/HowItWorks";

const data = countriesData as unknown as CountriesFile;

export default function Home() {
  return (
    <>
      <HomeClient countries={data.countries} />
      <PRSection />
      <HowItWorks />
    </>
  );
}
