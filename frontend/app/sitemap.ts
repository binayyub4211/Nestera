import { MetadataRoute } from "next";

const BASE_URL = "https://nestera.app";

export default function sitemap(): MetadataRoute.Sitemap {
  const routes: { path: string; priority: number; changeFrequency: MetadataRoute.Sitemap[number]["changeFrequency"] }[] = [
    { path: "",           priority: 1.0, changeFrequency: "weekly" },
    { path: "/features",  priority: 0.9, changeFrequency: "monthly" },
    { path: "/savings",   priority: 0.9, changeFrequency: "weekly" },
    { path: "/goals",     priority: 0.8, changeFrequency: "weekly" },
    { path: "/community", priority: 0.8, changeFrequency: "weekly" },
    { path: "/docs",      priority: 0.8, changeFrequency: "monthly" },
    { path: "/proposals/preview", priority: 0.7, changeFrequency: "weekly" },
    { path: "/support",   priority: 0.7, changeFrequency: "monthly" },
    { path: "/privacy",   priority: 0.5, changeFrequency: "yearly" },
    { path: "/terms",     priority: 0.5, changeFrequency: "yearly" },
  ];

  return routes.map(({ path, priority, changeFrequency }) => ({
    url: `${BASE_URL}${path}`,
    lastModified: new Date(),
    changeFrequency,
    priority,
  }));
}
