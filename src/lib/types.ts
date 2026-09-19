export type Country = {
  country_name: string;
  visa_free: number;
  visa_on_arrival: number;
  eta: number;
  visa_required: number;
  passport_rank?: number;

  visa_categories?: VisaCategory[];
  pr_info?: PRInfo;
};

export type VisaCategory = {
  id: string;
  label: string;
  type: "visa_free" | "visa_on_arrival" | "eta" | "visa_required";

  overview?: string;
  steps?: string[];
  checklist?: string[];
  processing_time?: string;
  fees?: string;

  base_fee_usd?: number;
  service_fee_usd?: number;
  biometrics_fee_usd?: number;

  official_link_label?: string;
  official_link_url?: string;
};

export type PRInfo = {
  overview: string;
  main_pathways: string[];
  typical_requirements: string[];
  processing_time?: string;
  official_link_label?: string;
  official_link_url?: string;
};

// Top-level type for countries.json (array of Country)
export type CountriesFile = Country[];