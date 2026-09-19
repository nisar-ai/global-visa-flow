"use client";

import { useLanguage } from "@/lib/LanguageContext";

export function HowItWorks() {
  const { t } = useLanguage();

  const steps = [
    { title: t.how_step1_title, body: t.how_step1_body },
    { title: t.how_step2_title, body: t.how_step2_body },
    { title: t.how_step3_title, body: t.how_step3_body },
    { title: t.how_step4_title, body: t.how_step4_body },
  ];

  return (
    <section id="how-it-works" className="relative z-10 px-4 py-16 sm:px-6">
      <div className="mx-auto max-w-6xl">
        <h2 className="text-center text-2xl font-semibold">{t.how_title}</h2>
        <div className="mt-8 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {steps.map((step, i) => (
            <div key={step.title} className="rounded-xl border border-[var(--border)] bg-[var(--surface)] p-6">
              <span className="mb-3.5 inline-flex h-8 w-8 items-center justify-center rounded-full border border-[var(--border)] bg-[var(--surface-2)] font-mono text-sm text-[var(--accent)]">
                {i + 1}
              </span>
              <h3 className="text-sm font-semibold">{step.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-[var(--text-muted)]">{step.body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
