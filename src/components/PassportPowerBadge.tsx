import type { PassportPower } from "@/lib/types";

const tierLabels: Record<NonNullable<PassportPower["tier"]>, string> = {
  very_high: "Very high",
  high: "High",
  medium: "Medium",
  low: "Low",
  very_low: "Very low",
};

const tierColors: Record<NonNullable<PassportPower["tier"]>, string> = {
  very_high: "text-green-600",
  high: "text-emerald-600",
  medium: "text-amber-600",
  low: "text-orange-600",
  very_low: "text-red-600",
};

export function PassportPowerBadge({
  passport,
}: {
  passport: PassportPower;
}) {
  const tier = passport.tier ?? "medium";
  const label = tierLabels[tier];
  const color = tierColors[tier];

  return (
    <div className="inline-flex items-center gap-2 rounded-full border border-[var(--border)] bg-[var(--surface)] px-3 py-1.5 text-xs">
      <span className="font-mono font-semibold">#{passport.rank}</span>
      <span className="text-[var(--text-muted)]">Passport power</span>
      <span className={`font-semibold ${color}`}>{label}</span>
    </div>
  );
}