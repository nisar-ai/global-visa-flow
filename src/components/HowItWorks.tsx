export function HowItWorks() {
  return (
    <section
      id="how-it-works"
      className="mx-auto max-w-6xl px-4 py-16 sm:px-6"
    >
      <h2 className="text-2xl font-bold">How GlobalVisa Flow works</h2>

      <div className="mt-2 max-w-3xl text-sm leading-relaxed text-[var(--text-muted)]">
        Detailed step‑by‑step visa and PR guidance is currently available for 21 countries:
        <span className="ml-1 font-medium text-[var(--foreground)]">
          USA, UK, Canada, Australia, Germany, Switzerland, France, Ireland, Finland, Norway, Pakistan, India, Bangladesh, Saudi Arabia, UAE, Turkey, Qatar, Italy, China, Japan, Russia.
        </span>
        {" "}For other destinations, you’ll see basic visa stats only.
      </div>

      <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        <Step
          number={1}
          title="Pick your destination"
          text="Choose the country you're planning to visit, work, study in, or settle in."
        />
        <Step
          number={2}
          title="See what's required"
          text="Get the visa type, timeline, total cost, and a document checklist."
        />
        <Step
          number={3}
          title="Track your checklist"
          text="Check off documents as you gather them — saved on this device."
        />
        <Step
          number={4}
          title="Apply on the official site"
          text="Follow the official ministry and visa portal links to apply safely."
        />
      </div>
    </section>
  );
}

function Step({
  number,
  title,
  text,
}: {
  number: number;
  title: string;
  text: string;
}) {
  return (
    <div className="rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-5 shadow-[var(--shadow-soft)]">
      <div className="mb-3 inline-flex h-8 w-8 items-center justify-center rounded-full bg-[var(--accent)] text-xs font-bold text-[var(--accent-text)]">
        {number}
      </div>
      <h3 className="text-base font-semibold">{title}</h3>
      <p className="mt-2 text-sm leading-relaxed text-[var(--text-muted)]">{text}</p>
    </div>
  );
}