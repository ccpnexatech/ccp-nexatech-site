import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "CCP NEXATECH",
    short_name: "NEXATECH",
    description: "Software house nordestina — constrói com a região.",
    start_url: "/pt-BR",
    display: "standalone",
    background_color: "#05080F",
    theme_color: "#3D6EF5",
    orientation: "portrait",
    categories: ["business", "technology"],
    icons: [
      {
        src: "/logo.png",
        sizes: "192x192",
        type: "image/png",
        purpose: "maskable",
      },
      {
        src: "/logo.png",
        sizes: "512x512",
        type: "image/png",
        purpose: "any",
      },
    ],
  };
}
