import type { OfficialLinks as OfficialLinksType } from "@/lib/types";

export function OfficialLinksRow({
  links,
  labels,
}: {
  links: OfficialLinksType;
  labels: { visaPortal: string; ministry: string; embassy: string };
}) {
  type LinkItem = {
    key: string;
    url: string | undefined;
    label: string;
    primary: boolean;
  };

  const items: LinkItem[] = [
    {
      key: "visa-portal",
      url: links.visa_portal,
      label: labels.visaPortal,
      primary: true,
    },
    {
      key: "ministry",
      url: links.ministry,
      label: labels.ministry,
      primary: false,
    },
    {
      key: "embassy",
      url: links.embassy_locator,
      label: labels.embassy,
      primary: false,
    },
  ].filter((item): item is LinkItem & { url: string } =>
    Boolean(item.url && item.label)
  );

  if (items.length === 0) {
    return null;
  }

  return (
    <div className="mt-6 flex flex-wrap gap-2.5" role="group" aria-label="Official links">
      {items.map((item) => {
        const isPrimary = item.primary;

        return (
          <a
            key={item.key}
            href={item.url}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`${item.label} (opens in a new tab)`}
            className={
              isPrimary
                ? "inline-flex items-center gap-1.5 rounded-md border border-[var(--accent)] bg-[var(--accent)] px-4 py-2.5 text-sm font-semibold text-[var(--accent-text)] hover:bg-[var(--accent-dim)]"
                : "inline-flex items-center gap-1.5 rounded-md border border-[var(--border-strong)] bg-[var(--surface-2)] px-4 py-2.5 text-sm font-semibold hover:border-[var(--accent)] hover:text-[var(--accent)]"
            }
          >
            {item.label}
            <span aria-hidden="true">↗</span>
          </a>
        );
      })}
    </div>
  );
}