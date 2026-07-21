import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "AnimalPharm",
    short_name: "AnimalPharm",
    description: "Inventory app for animal pharmacists",
    start_url: "/",
    display: "standalone",
    background_color: "#ffffff",
    theme_color: "#000000",
    icons: [
      {
        src: "/web-app-manifest-512x512.png",
        sizes: "192x192",
        type: "image/png",
        "purpose": "maskable"
      },
      {
        src: "/web-app-manifest-512x512.png",
        sizes: "512x512",
        type: "image/png",
        "purpose": "maskable"
      },
    ],
  };
}
