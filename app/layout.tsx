import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Prinstine Academy — Unofficial redesign concept",
  description: "An unofficial homepage redesign concept. Not affiliated with Prinstine Academy.",
  robots: { index: false, follow: false },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en"><body>{children}</body></html>;
}
