import type { AnimeCard } from "@/types";
import { getTvShow } from "@/lib/api";
import ListPage from "@/components/ListPage";
import { extractItems, extractPages } from "@/lib/extractData";

interface Props { searchParams: { page?: string } }

export default async function TvShowPage({ searchParams }: Props) {
  const page = parseInt(searchParams.page || "1") || 1;
  let items: AnimeCard[] = [];
  let currentPage = page, totalPages = 1;
  let error = "";

  try {
    const res = await getTvShow(page);
    const data = (res.data || {}) as Record<string, unknown>;
    items = extractItems(data);
    ({ currentPage, totalPages } = extractPages(data));
  } catch {
    error = "Gagal memuat data TV Show.";
  }

  return (
    <ListPage
      title="TV Show"
      items={items}
      currentPage={currentPage}
      totalPages={totalPages}
      baseUrl="/tvshow"
      error={error}
    />
  );
}
