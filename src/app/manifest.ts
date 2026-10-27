import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Caio César Ponte — Portfólio",
    short_name: "Caio Ponte",
    description: "Desenvolvedor Front-End & Mobile em Fortaleza.",
    start_url: "/pt-BR",
    display: "standalone",
    background_color: "#05080F",
    theme_color: "#3D6EF5",
    icons: [{ src: "/icon.svg", sizes: "any", type: "image/svg+xml", purpose: "any" }],
  };
}
