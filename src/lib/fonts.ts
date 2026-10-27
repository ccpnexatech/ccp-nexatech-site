import { Inter, JetBrains_Mono, Newsreader } from "next/font/google";

// Fontes de mercado: Inter (interface), Newsreader (títulos editoriais), JetBrains Mono (código).
export const fontSans = Inter({ subsets: ["latin"], variable: "--font-sans", display: "swap" });
export const fontSerif = Newsreader({ subsets: ["latin"], variable: "--font-serif", display: "swap", style: ["normal", "italic"], weight: ["400", "500", "600"] });
export const fontMono = JetBrains_Mono({ subsets: ["latin"], variable: "--font-mono", display: "swap", weight: ["400", "500"] });
