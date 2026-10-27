import { loadFont as loadInter } from "@remotion/google-fonts/Inter";
import { loadFont as loadNewsreader } from "@remotion/google-fonts/Newsreader";
import { loadFont as loadMono } from "@remotion/google-fonts/JetBrainsMono";

// Mesmas fontes do site, carregadas também no render em MP4.
const inter = loadInter("normal", { weights: ["400", "600", "700", "800"], subsets: ["latin"] });
const news = loadNewsreader("normal", { weights: ["400", "500"], subsets: ["latin"] });
loadNewsreader("italic", { weights: ["400"], subsets: ["latin"] });
const mono = loadMono("normal", { weights: ["400", "500"], subsets: ["latin"] });

// Tokens do vídeo — espelham os do site (globals.css). Ver design-kit/tokens.json.
export const K = {
  paper: "#F7F3EC",
  surface: "#FFFFFF",
  ink: "#17140F",
  muted: "#5C564C",
  line: "#E3DCCF",
  accent: "#A8410A",
  signal: "#1D4ED8",
  stage: "#12100D",
  stageInk: "#F3EEE6",
  stageMuted: "#B5AC9E",
};
export const SERIF = `${news.fontFamily}, Georgia, serif`;
export const SANS = `${inter.fontFamily}, "Helvetica Neue", Arial, sans-serif`;
export const MONO = `${mono.fontFamily}, ui-monospace, Menlo, monospace`;
export const FPS = 30;
