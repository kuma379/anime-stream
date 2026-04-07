import type { AnimeCard } from "@/types";
import { getSeries } from "@/lib/api";
import ListPage from "@/components/ListPage";
import { extractItems, extractPages } from "@/lib/extractData";

interface Props { searchParams: { page?: string } }

export default async function SeriesPage({ searchParams }: Props) {
  const page = parseInt(searchParams.page || "1") || 1;
  let items: AnimeCard[] = [];
  let currentPage = page, totalPages = 1;
  let error = "";

  try {
    const res = await getSeries(page);
    const data = (res.data || {}) as Record<string, unknown>;
    items = extractItems(data);
    ({ currentPage, totalPages } = extractPages(data));
  } catch {
    error = "Gagal memuat data series.";
  }

  return (
    <ListPage
      title="Series"
      items={items}
      currentPage={currentPage}
      totalPages={totalPages}
      baseUrl="/series"
      error={error}
      getHref={(a) => `/series/${a.slug}`}
    />
  );
}
