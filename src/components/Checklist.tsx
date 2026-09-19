"use client";

import { useLocalStorageState } from "@/lib/useLocalStorageState";
import { useLanguage } from "@/lib/LanguageContext";

export function Checklist({ checklistKey, documents }: { checklistKey: string; documents: string[] }) {
  const { t } = useLanguage();
  const [checked, setChecked, hydrated] = useLocalStorageState<boolean[]>(
    `gvf-checklist:${checklistKey}`,
    new Array(documents.length).fill(false)
  );

  // If the document count changed (different category), don't show stale state.
  const state = checked.length === documents.length ? checked : new Array(documents.length).fill(false);
  const doneCount = state.filter(Boolean).length;
  const progressPct = documents.length === 0 ? 0 : (doneCount / documents.length) * 100;

  function toggle(index: number) {
    const next = [...state];
    next[index] = !next[index];
    setChecked(next);
  }

  function reset() {
    setChecked(new Array(documents.length).fill(false));
  }

  return (
    <div className="mt-7">
      <div className="flex flex-wrap items-baseline justify-between gap-3">
        <h3 className="text-base font-semibold">{t.checklist_title}</h3>
        <p className="font-mono text-xs text-[var(--text-muted)]">
          {hydrated ? t.checklist_progress(doneCount, documents.length) : t.checklist_progress(0, documents.length)}
        </p>
      </div>
      <p className="mt-2 text-sm text-[var(--text-muted)]">{t.checklist_offer}</p>

      <div className="mt-3 h-1.5 overflow-hidden rounded-full border border-[var(--border)] bg-[var(--surface-2)]">
        <div
          className="h-full rounded-full bg-[var(--accent)] transition-[width] duration-300"
          style={{ width: `${hydrated ? progressPct : 0}%` }}
        />
      </div>

      <ul className="mt-4 flex flex-col gap-2">
        {documents.map((doc, index) => (
          <li
            key={index}
            className={`flex items-start gap-2.5 rounded-md border border-[var(--border)] bg-[var(--bg-raise)] px-3 py-2.5 text-sm ${
              hydrated && state[index] ? "text-[var(--text-muted)]" : ""
            }`}
          >
            <input
              type="checkbox"
              id={`doc-${checklistKey.replace(/[^a-zA-Z0-9]/g, "-")}-${index}`}
              checked={hydrated ? state[index] : false}
              onChange={() => toggle(index)}
              className="mt-0.5 h-[18px] w-[18px] shrink-0 accent-[var(--accent)]"
            />
            <label
              htmlFor={`doc-${checklistKey.replace(/[^a-zA-Z0-9]/g, "-")}-${index}`}
              className={`cursor-pointer ${hydrated && state[index] ? "line-through decoration-[var(--border-strong)]" : ""}`}
            >
              {doc}
            </label>
          </li>
        ))}
      </ul>

      <button
        type="button"
        onClick={reset}
        className="mt-4 rounded-md border border-[var(--border)] px-3.5 py-2 text-xs font-semibold text-[var(--text-muted)] hover:border-[var(--border-strong)] hover:text-[var(--foreground)]"
      >
        {t.checklist_reset}
      </button>
    </div>
  );
}
