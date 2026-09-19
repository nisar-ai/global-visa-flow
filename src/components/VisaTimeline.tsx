"use client";

import { useLanguage } from "@/lib/LanguageContext";
import { estimateToDays, type ProcessingEstimate } from "@/lib/types";

// Reference scale: 0 to ~2 years (730 days) covers everything from an
// instant e-visa to a multi-year PR/citizenship pathway.
const SCALE_MAX_DAYS = 730;

export function VisaTimeline({
  processingTimeLabel,
  estimate,
}: {
  processingTimeLabel: string;
  estimate?: ProcessingEstimate;
}) {
  const { t } = useLanguage();
  const { min, max } = estimateToDays(estimate);

  const startPct = Math.min(100, (min / SCALE_MAX_DAYS) * 100);
  const endPct = Math.min(100, Math.max(startPct + 1.5, (max / SCALE_MAX_DAYS) * 100));

  return (
    <div className="mt-6">
      <div className="flex flex-wrap items-baseline justify-between gap-2">
        <h3 className="text-base font-semibold">{t.timeline_title}</h3>
        <span className="font-mono text-xs text-[var(--accent)]">{processingTimeLabel}</span>
      </div>

      <div className="relative mt-4 h-2 rounded-full border border-[var(--border)] bg-[var(--surface-2)]">
        <div
          className="absolute top-0 h-full rounded-full bg-gradient-to-r from-[var(--accent-dim)] to-[var(--accent)]"
          style={{ left: `${startPct}%`, width: `${endPct - startPct}%` }}
        />
      </div>

      <div className="mt-1.5 flex justify-between font-mono text-[0.68rem] text-[var(--text-faint)]">
        <span>Instant</span>
        <span>1 month</span>
        <span>6 months</span>
        <span>1 year</span>
        <span>2+ years</span>
      </div>

      <p className="mt-3 text-xs text-[var(--text-faint)]">{t.timeline_note}</p>
    </div>
  );
}
