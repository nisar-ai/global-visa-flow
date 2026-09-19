"use client";

import { useLanguage } from "@/lib/LanguageContext";
import { estimateToDays, type ProcessingEstimate } from "@/lib/types";

// Reference scale: 0 to ~2 years (730 days) covers everything from an
// instant e-visa to a multi-year PR/citizenship pathway.
const SCALE_MAX_DAYS = 730;

function clamp(n: number, min: number, max: number) {
  return Math.min(max, Math.max(min, n));
}

export function VisaTimeline({
  processingTimeLabel,
  estimate,
}: {
  processingTimeLabel: string;
  estimate?: ProcessingEstimate;
}) {
  const { t } = useLanguage();
  const { min, max } = estimateToDays(estimate);

  // Compute percentages along the 0–SCALE_MAX_DAYS scale.
  const startPctRaw = (min / SCALE_MAX_DAYS) * 100;
  const endPctRaw = (max / SCALE_MAX_DAYS) * 100;

  const startPct = clamp(startPctRaw, 0, 100);
  // Ensure the bar is at least a tiny width if min == max.
  const endPct = clamp(Math.max(endPctRaw, startPctRaw + 1.5), 0, 100);

  const barLeft = startPct;
  const barWidth = Math.max(0, endPct - startPct);

  const timelineId = "visa-timeline-bar";

  return (
    <div className="mt-6">
      <div className="flex flex-wrap items-baseline justify-between gap-2">
        <h3 id={`${timelineId}-title`} className="text-base font-semibold">
          {t.timeline_title}
        </h3>
        <span className="font-mono text-xs text-[var(--accent)]">
          {processingTimeLabel}
        </span>
      </div>

      <div
        className="relative mt-4 h-2 rounded-full border border-[var(--border)] bg-[var(--surface-2)]"
        role="progressbar"
        aria-labelledby={`${timelineId}-title`}
        aria-valuemin={0}
        aria-valuemax={SCALE_MAX_DAYS}
        aria-valuenow={Math.round((min + max) / 2)}
        aria-label={t.timeline_title}
      >
        <div
          id={timelineId}
          className="absolute top-0 h-full rounded-full bg-gradient-to-r from-[var(--accent-dim)] to-[var(--accent)]"
          style={{ left: `${barLeft}%`, width: `${barWidth}%` }}
        />
      </div>

      <div
        className="mt-1.5 flex justify-between font-mono text-[0.68rem] text-[var(--text-faint)]"
        aria-hidden="true"
      >
        <span>Instant</span>
        <span>1 month</span>
        <span>6 months</span>
        <span>1 year</span>
        <span>2+ years</span>
      </div>

      <p className="mt-3 text-xs text-[var(--text-faint)]">
        {t.timeline_note}
      </p>
    </div>
  );
}