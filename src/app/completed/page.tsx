import type { AnimeCard } from "@/types";
import { getCompleted } from "@/lib/api";
import ListPage from "@/components/ListPage";
import { extractItems, extractPages } from "@/lib/extractData";

interface Props { searchParams: { page?: string } }

export default async function CompletedPage({ searchParams }: Props) {
  const page = parseInt(searchParams.page || "1") || 1;
  let items: AnimeCard[] = [];
  let currentPage = page, totalPages = 1;
  let error = "";

  try {
    const res = await getCompleted(page);
    const data = (res.data || {}) as Record<string, unknown>;
    items = extractItems(data);
    ({ currentPage, totalPages } = extractPages(data));
  } catch {
    error = "Gagal memuat data completed.";
  }

  return (
    <ListPage
      title="Selesai (Completed)"
      items={items}
      currentPage={currentPage}
      totalPages={totalPages}
      baseUrl="/completed"
      error={error}
    />
  );
}
