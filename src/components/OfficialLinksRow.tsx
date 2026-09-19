import type { OfficialLinks as OfficialLinksType } from "@/lib/types";

export function OfficialLinksRow({
  links,
  labels,
}: {
  links: OfficialLinksType;
  labels: { visaPortal: string; ministry: string; embassy: string };
}) {
  const items = [
    { url: links.visa_portal, label: labels.visaPortal, primary: true },
    { url: links.ministry, label: labels.ministry, primary: false },
    { url: links.embassy_locator, label: labels.embassy, primary: false },
  ].filter((item) => Boolean(item.url));

  if (items.length === 0) return null;

  return (
    <div className="mt-6 flex flex-wrap gap-2.5">
      {items.map((item) => (
        <a
          key={item.label}
          href={item.url}
          target="_blank"
          rel="noopener noreferrer"
          className={
            item.primary
              ? "inline-flex items-center gap-1.5 rounded-md border border-[var(--accent)] bg-[var(--accent)] px-4 py-2.5 text-sm font-semibold text-[var(--accent-text)] hover:bg-[var(--accent-dim)]"
              : "inline-flex items-center gap-1.5 rounded-md border border-[var(--border-strong)] bg-[var(--surface-2)] px-4 py-2.5 text-sm font-semibold hover:border-[var(--accent)] hover:text-[var(--accent)]"
          }
        >
          {item.label} ↗
        </a>
      ))}
    </div>
  );
}
