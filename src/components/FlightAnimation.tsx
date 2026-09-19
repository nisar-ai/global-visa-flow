export function FlightAnimation({ destinationLabel }: { destinationLabel?: string }) {
  return (
    <div className="relative mx-auto h-[76px] w-full max-w-[320px]" aria-hidden="true">
      <svg viewBox="0 0 300 76" width="100%" height="76" className="absolute inset-0">
        <path
          d="M10,60 C 90,10 210,10 290,60"
          fill="none"
          stroke="var(--border-strong)"
          strokeWidth="2"
          strokeDasharray="1 8"
          strokeLinecap="round"
        />
        {/* origin marker */}
        <circle cx="10" cy="60" r="5" fill="var(--accent)" />
        <circle cx="10" cy="60" r="9" fill="none" stroke="var(--accent)" strokeOpacity="0.4" strokeWidth="1.5" />
        {/* destination marker */}
        <path
          d="M290 50 c 6 0 10 4 10 9 c 0 6 -10 15 -10 15 s -10 -9 -10 -15 c 0 -5 4 -9 10 -9 z"
          fill="var(--accent-2)"
        />
        <circle cx="290" cy="59" r="3" fill="var(--surface)" />
      </svg>

      <div
        className="flight-path-plane absolute left-0 top-0 flex h-6 w-6 items-center justify-center text-[var(--accent)]"
        style={{ marginLeft: -12, marginTop: -12 }}
      >
        <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor">
          <path d="M10.5 3.5l2 2 5.8-1.6c.9-.2 1.7.6 1.5 1.5L18.2 11l2 2-1 2.6-3.3-1.9-2.4 3.8.9 2.7-1.8 1-1.6-2.9-3 .5-1-1 2-2.4-3-2.6 1-1.8 2.7.9 3.8-2.4-1.9-3.3L4 9.7c-.9-.2-1.7-1-1.5-1.9l5.8 1.6 2-2z" />
        </svg>
      </div>

      {destinationLabel && (
        <span className="absolute -bottom-1 right-0 translate-x-1/2 whitespace-nowrap text-xs font-medium text-[var(--text-muted)]">
          {destinationLabel}
        </span>
      )}
    </div>
  );
}
