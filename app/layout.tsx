import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";

const instrumentSans = localFont({ src: "./fonts/instrument-sans.woff2", weight: "400 700", display: "swap", variable: "--font-instrument" });

export const metadata: Metadata = {
  title: "Prinstine Academy — Unofficial redesign concept",
  description: "An unofficial homepage redesign concept. Not affiliated with Prinstine Academy.",
  robots: { index: false, follow: false },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en"><body className={instrumentSans.variable}>{children}</body></html>;
}
