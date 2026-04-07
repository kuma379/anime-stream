import { getLatest } from "@/lib/api";
import ListPage from "@/components/ListPage";
import { extractItems, extractPages } from "@/lib/extractData";

interface Props { searchParams: { page?: string } }

export default async function LatestPage({ searchParams }: Props) {
  const page = parseInt(searchParams.page || "1") || 1;
  let items = [];
  let currentPage = page, totalPages = 1;
  let error = "";

  try {
    const res = await getLatest(page);
    const data = (res.data || {}) as Record<string, unknown>;
    items = extractItems(data);
    ({ currentPage, totalPages } = extractPages(data));
  } catch {
    error = "Gagal memuat data terbaru.";
  }

  return (
    <ListPage
      title="Terbaru"
      items={items}
      currentPage={currentPage}
      totalPages={totalPages}
      baseUrl="/latest"
      error={error}
      getHref={(a) => `/episode/${a.slug}`}
    />
  );
}
