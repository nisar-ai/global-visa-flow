"use client";

import { useState, useMemo } from "react";
import { useLanguage } from "@/lib/LanguageContext";
import exchangeRates from "@/data/exchange-rates.json";

const rates = exchangeRates as unknown as Record<string, number>;

function toUSD(amount: number, currency: string): number {
  const rate = rates[currency];
  if (typeof rate !== "number" || !Number.isFinite(rate) || rate <= 0) {
    // If no valid rate, we can't convert meaningfully; return NaN to signal that.
    return NaN;
  }
  return amount * rate;
}

function formatMoney(amount: number, currency: string): string {
  if (!Number.isFinite(amount)) {
    return "—";
  }
  try {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency,
      maximumFractionDigits: 0,
    }).format(amount);
  } catch {
    // Fallback if the currency code is invalid or unsupported.
    return `${amount.toLocaleString()} ${currency}`;
  }
}

export function CostCalculator({
  feeAmount,
  currency,
}: {
  feeAmount: number;
  currency: string;
}) {
  const { t } = useLanguage();

  const [serviceFee, setServiceFee] = useState<number>(0);
  const [insurance, setInsurance] = useState<number>(0);
  const [misc, setMisc] = useState<number>(0);

  const totalLocal = feeAmount + serviceFee + insurance + misc;
  const totalUSD = toUSD(totalLocal, currency);

  const baseId = "cost-calculator";

  const fields = useMemo(
    () =>
      [
        {
          id: `${baseId}-service`,
          label: t.calculator_service_fee,
          value: serviceFee,
          setValue: setServiceFee,
        },
        {
          id: `${baseId}-insurance`,
          label: t.calculator_insurance,
          value: insurance,
          setValue: setInsurance,
        },
        {
          id: `${baseId}-misc`,
          label: t.calculator_misc,
          value: misc,
          setValue: setMisc,
        },
      ] as const,
    [t, serviceFee, insurance, misc]
  );

  return (
    <div className="mt-6 rounded-lg border border-[var(--border)] bg-[var(--bg-raise)] p-4">
      <h3 id={`${baseId}-title`} className="text-base font-semibold">
        {t.calculator_title}
      </h3>

      <div
        className="mt-3 flex items-center justify-between border-b border-dashed border-[var(--border)] pb-3 text-sm"
        aria-label={t.calculator_visa_fee}
      >
        <span className="text-[var(--text-muted)]">{t.calculator_visa_fee}</span>
        <span className="font-mono font-medium">
          {formatMoney(feeAmount, currency)}
        </span>
      </div>

      <div className="mt-3 flex flex-col gap-3">
        {fields.map((field) => (
          <div key={field.id} className="flex items-center justify-between gap-3 text-sm">
            <label
              htmlFor={field.id}
              className="text-[var(--text-muted)]"
            >
              {field.label}
            </label>
            <input
              id={field.id}
              type="number"
              min={0}
              step="1"
              inputMode="decimal"
              value={field.value === 0 ? "" : field.value}
              placeholder="0"
              onChange={(e) => {
                const val = Number(e.target.value);
                field.setValue(Number.isFinite(val) && val > 0 ? val : 0);
              }}
              className="w-24 rounded-md border border-[var(--border-strong)] bg-[var(--surface-2)] px-2 py-1.5 text-right font-mono text-sm outline-none focus:border-[var(--accent)]"
              aria-describedby={`${baseId}-total`}
            />
          </div>
        ))}
      </div>

      <div
        id={`${baseId}-total`}
        className="mt-4 flex flex-wrap items-baseline justify-between gap-2 rounded-md border border-[var(--border-strong)] bg-[var(--surface-2)] px-3 py-3"
        aria-live="polite"
      >
        <span className="text-sm font-semibold">{t.calculator_total}</span>
        <span className="text-right font-mono">
          <span className="block text-base font-semibold text-[var(--accent)]">
            {formatMoney(totalLocal, currency)}
          </span>
          <span className="block text-xs text-[var(--text-muted)]">
            {Number.isFinite(totalUSD) ? `≈ ${formatMoney(totalUSD, "USD")}` : "≈ —"}
          </span>
        </span>
      </div>

      <p className="mt-3 text-xs text-[var(--text-faint)]">
        {t.calculator_note}
      </p>
    </div>
  );
}