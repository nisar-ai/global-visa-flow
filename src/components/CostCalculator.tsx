"use client";

import { useState } from "react";
import { useLanguage } from "@/lib/LanguageContext";
import exchangeRates from "@/data/exchange-rates.json";

const rates = exchangeRates as unknown as Record<string, number>;

function toUSD(amount: number, currency: string): number {
  const rate = rates[currency];
  if (typeof rate !== "number") return amount;
  return amount * rate;
}

function formatMoney(amount: number, currency: string): string {
  try {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency,
      maximumFractionDigits: 0,
    }).format(amount);
  } catch {
    return `${amount.toLocaleString()} ${currency}`;
  }
}

export function CostCalculator({ feeAmount, currency }: { feeAmount: number; currency: string }) {
  const { t } = useLanguage();
  const [serviceFee, setServiceFee] = useState<number>(0);
  const [insurance, setInsurance] = useState<number>(0);
  const [misc, setMisc] = useState<number>(0);

  const totalLocal = feeAmount + serviceFee + insurance + misc;
  const totalUSD = toUSD(totalLocal, currency);

  const fields: { label: string; value: number; setValue: (n: number) => void }[] = [
    { label: t.calculator_service_fee, value: serviceFee, setValue: setServiceFee },
    { label: t.calculator_insurance, value: insurance, setValue: setInsurance },
    { label: t.calculator_misc, value: misc, setValue: setMisc },
  ];

  return (
    <div className="mt-6 rounded-lg border border-[var(--border)] bg-[var(--bg-raise)] p-4">
      <h3 className="text-base font-semibold">{t.calculator_title}</h3>

      <div className="mt-3 flex items-center justify-between border-b border-dashed border-[var(--border)] pb-3 text-sm">
        <span className="text-[var(--text-muted)]">{t.calculator_visa_fee}</span>
        <span className="font-mono font-medium">{formatMoney(feeAmount, currency)}</span>
      </div>

      <div className="mt-3 flex flex-col gap-3">
        {fields.map((field) => (
          <label key={field.label} className="flex items-center justify-between gap-3 text-sm">
            <span className="text-[var(--text-muted)]">{field.label}</span>
            <input
              type="number"
              min={0}
              value={field.value === 0 ? "" : field.value}
              placeholder="0"
              onChange={(e) => field.setValue(Number(e.target.value) || 0)}
              className="w-24 rounded-md border border-[var(--border-strong)] bg-[var(--surface-2)] px-2 py-1.5 text-right font-mono text-sm outline-none focus:border-[var(--accent)]"
            />
          </label>
        ))}
      </div>

      <div className="mt-4 flex flex-wrap items-baseline justify-between gap-2 rounded-md border border-[var(--border-strong)] bg-[var(--surface-2)] px-3 py-3">
        <span className="text-sm font-semibold">{t.calculator_total}</span>
        <span className="text-right font-mono">
          <span className="block text-base font-semibold text-[var(--accent)]">
            {formatMoney(totalLocal, currency)}
          </span>
          <span className="block text-xs text-[var(--text-muted)]">≈ {formatMoney(totalUSD, "USD")}</span>
        </span>
      </div>

      <p className="mt-3 text-xs text-[var(--text-faint)]">{t.calculator_note}</p>
    </div>
  );
}
