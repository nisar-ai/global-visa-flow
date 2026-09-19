export function CountrySkyline({ color, size = 44 }: { color: string; size?: number }) {
  const height = Math.round((size * 34) / 44);
  return (
    <svg width={size} height={height} viewBox="0 0 44 34" fill="none" aria-hidden="true">
      <rect x="1" y="14" width="7" height="19" rx="1" fill={color} fillOpacity="0.85" />
      <rect x="10" y="6" width="8" height="27" rx="1" fill={color} />
      <path d="M20 33V11l4-5 4 5v22z" fill={color} fillOpacity="0.9" />
      <rect x="30" y="18" width="6" height="15" rx="1" fill={color} fillOpacity="0.7" />
      <rect x="37" y="10" width="6" height="23" rx="1" fill={color} fillOpacity="0.95" />
    </svg>
  );
}

export function CountryVisual({
  flagEmoji,
  accentColor,
  size = 44,
}: {
  flagEmoji: string;
  accentColor: string;
  size?: number;
}) {
  return (
    <div className="flex items-center gap-3">
      <span className="text-3xl leading-none">{flagEmoji}</span>
      <CountrySkyline color={accentColor} size={size} />
    </div>
  );
}
