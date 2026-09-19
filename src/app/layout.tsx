import type { Metadata } from "next";
import "./globals.css";
import { LanguageProvider } from "@/lib/LanguageContext";
import { SiteNotice } from "@/components/SiteNotice";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";

export const metadata: Metadata = {
  title: "GlobalVisa Flow — Step-by-Step Visa Guides",
  description:
    "Plain-language, step-by-step guides for applying for tourist, study, work, or PR/citizenship visas.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="bg-[var(--background)] text-[var(--foreground)]">
        <LanguageProvider>
          <SiteNotice variant="full" />
          <Header />
          <main>{children}</main>
          <Footer />
        </LanguageProvider>
      </body>
    </html>
  );
}