import type { Metadata } from "next";
import { fontSans, fontMono } from "@/lib/fonts";
import { baseMetadata } from "@/lib/metadata";
import "@/styles/globals.css";

export const metadata: Metadata = baseMetadata;

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="pt-BR"
      className={`${fontSans.variable} ${fontMono.variable}`}
      suppressHydrationWarning
    >
      <body>{children}</body>
    </html>
  );
}
