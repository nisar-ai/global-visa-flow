import type { Metadata } from "next";
import "./globals.css";
import { Providers } from "./providers";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";

export const metadata: Metadata = {
  title: "GlobalVisa Flow — Visa Requirements, Checklists & Official Links",
  description:
    "Pick where you want to go and get the exact visa type, timeline, total cost, required documents, an interactive checklist, and official government links — for tourist, study, work, and PR/citizenship visas.",
  keywords: [
    "visa requirements",
    "visa checklist",
    "visa application",
    "work visa",
    "study visa",
    "tourist visa",
    "permanent residency",
    "citizenship",
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning className="h-full antialiased">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@500;600;700&family=Inter:wght@400;500;600&family=IBM+Plex+Mono:wght@400;500&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="min-h-full flex flex-col bg-[var(--background)] text-[var(--foreground)]">
        <Providers>
          <div className="bg-glow" />
          <Header />
          <main className="relative z-10 flex-1">{children}</main>
          <Footer />
        </Providers>
      </body>
    </html>
  );
}
