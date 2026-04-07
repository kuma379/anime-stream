import type { AnimeCard } from "@/types";

export function extractItems(data: Record<string, unknown>): AnimeCard[] {
  const listKeys = ["animeList", "episodes", "results", "data", "list", "items", "anime"];
  for (const key of listKeys) {
    const v = (data as Record<string, unknown>)[key];
    if (Array.isArray(v) && v.length > 0) return v as AnimeCard[];
  }
  if (Array.isArray(data)) return data as AnimeCard[];
  return [];
}

export function extractPages(data: Record<string, unknown>): { currentPage: number; totalPages: number } {
  const pageKeys = ["currentPage", "page", "current_page"];
  const totalKeys = ["totalPages", "total_pages", "lastPage", "last_page", "totalPage"];

  let currentPage = 1;
  let totalPages = 1;

  for (const key of pageKeys) {
    if (typeof data[key] === "number") { currentPage = data[key] as number; break; }
    if (typeof data[key] === "string") { currentPage = parseInt(data[key] as string) || 1; break; }
  }
  for (const key of totalKeys) {
    if (typeof data[key] === "number") { totalPages = data[key] as number; break; }
    if (typeof data[key] === "string") { totalPages = parseInt(data[key] as string) || 1; break; }
  }

  const nested = data.data as Record<string, unknown> | undefined;
  if (nested && typeof nested === "object") {
    for (const key of pageKeys) {
      if (typeof nested[key] === "number") { currentPage = nested[key] as number; break; }
    }
    for (const key of totalKeys) {
      if (typeof nested[key] === "number") { totalPages = nested[key] as number; break; }
    }
  }

  return { currentPage, totalPages };
}
