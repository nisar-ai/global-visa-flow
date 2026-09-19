"use client";

export function FlightAnimation({
  originLabel,
  applyingFromLabel,
  destinationLabel,
}: {
  originLabel?: string;
  applyingFromLabel?: string;
  destinationLabel?: string;
}) {
  const fromText = originLabel || "Origin";
  const toText = destinationLabel || "Destination";

  return (
    <div className="mx-auto mb-6 mt-6 max-w-3xl rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-4 text-left shadow-[var(--shadow-soft)]">
      <div className="flex items-center justify-between gap-3">
        <div className="min-w-0">
          <div className="text-xs font-semibold uppercase tracking-wide text-[var(--text-muted)]">
            From
          </div>
          <div className="truncate text-sm font-bold">
            {fromText}
          </div>
          {applyingFromLabel && (
            <div className="mt-1 text-xs text-[var(--text-faint)]">
              Applying from: {applyingFromLabel}
            </div>
          )}
        </div>

        <div className="relative mx-3 flex-1">
          <div className="h-0.5 w-full bg-[var(--border-strong)]" />
          <div className="absolute left-0 top-1/2 h-3 w-3 -translate-y-1/2 rounded-full bg-[var(--accent)]" />
          <div className="absolute right-0 top-1/2 h-3 w-3 -translate-y-1/2 rounded-full bg-[var(--accent)]" />
        </div>

        <div className="min-w-0 text-right">
          <div className="text-xs font-semibold uppercase tracking-wide text-[var(--text-muted)]">
            To
          </div>
          <div className="truncate text-sm font-bold">
            {toText}
          </div>
        </div>
      </div>
    </div>
  );
}