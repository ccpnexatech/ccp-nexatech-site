import type { Metadata } from "next";
import { baseMetadata } from "@/lib/metadata";
import "@/styles/globals.css";

export const metadata: Metadata = baseMetadata;

// O <html> é renderizado em [locale]/layout.tsx, com o idioma correto.
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return children;
}
