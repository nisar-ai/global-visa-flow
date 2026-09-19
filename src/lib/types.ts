export interface FeeAmount {
  amount: number;
  currency: string;
}

export interface ProcessingEstimate {
  min: number;
  max: number;
  unit: "days" | "weeks" | "months";
}

export interface OfficialLinks {
  ministry?: string;
  visa_portal?: string;
  embassy_locator?: string;
}

export interface VisaCategory {
  category_id: string;
  label: string;
  visa_type: string;
  fee_amount: FeeAmount;
  processing_time: string;
  processing_estimate?: ProcessingEstimate;
  required_documents: string[];
  step_by_step_guideline: string[];
  official_links?: OfficialLinks;
}

export interface Country {
  country_code: string;
  country_name: string;
  region: string;
  guide_slug: string;
  flag_emoji: string;
  accent_color: string;
  currency: string;
  language_code: string;
  language_name: string;
  official_links: OfficialLinks;
  visa_categories: VisaCategory[];
}

export interface CountriesFile {
  _meta: { note: string; last_reviewed: string };
  countries: Country[];
}

// Normalizes a processing estimate into a day count for timeline scaling.
export function estimateToDays(estimate?: ProcessingEstimate): { min: number; max: number } {
  if (!estimate) return { min: 0, max: 0 };
  const multiplier = estimate.unit === "days" ? 1 : estimate.unit === "weeks" ? 7 : 30;
  return { min: estimate.min * multiplier, max: estimate.max * multiplier };
}
