import type { MetadataRoute } from 'next';
export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: 'https://anime-stream.vercel.app', lastModified: new Date(), changeFrequency: 'daily', priority: 1 },
    { url: 'https://anime-stream.vercel.app/ongoing', lastModified: new Date(), changeFrequency: 'daily', priority: 0.9 },
    { url: 'https://anime-stream.vercel.app/completed', lastModified: new Date(), changeFrequency: 'weekly', priority: 0.8 },
    { url: 'https://anime-stream.vercel.app/popular', lastModified: new Date(), changeFrequency: 'daily', priority: 0.8 },
    { url: 'https://anime-stream.vercel.app/movies', lastModified: new Date(), changeFrequency: 'weekly', priority: 0.8 },
    { url: 'https://anime-stream.vercel.app/genres', lastModified: new Date(), changeFrequency: 'monthly', priority: 0.7 },
    { url: 'https://anime-stream.vercel.app/schedule', lastModified: new Date(), changeFrequency: 'daily', priority: 0.7 },
    { url: 'https://anime-stream.vercel.app/browse', lastModified: new Date(), changeFrequency: 'daily', priority: 0.6 },
  ];
}