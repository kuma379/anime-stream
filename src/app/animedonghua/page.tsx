import { getAnimeDonghua } from "@/lib/api";
import ListPage from "@/components/ListPage";
import { extractItems, extractPages } from "@/lib/extractData";

interface Props { searchParams: { page?: string } }

export default async function AnimeDonghuaPage({ searchParams }: Props) {
  const page = parseInt(searchParams.page || "1") || 1;
  let items = [];
  let currentPage = page, totalPages = 1;
  let error = "";

  try {
    const res = await getAnimeDonghua(page);
    const data = (res.data || {}) as Record<string, unknown>;
    items = extractItems(data);
    ({ currentPage, totalPages } = extractPages(data));
  } catch {
    error = "Gagal memuat data anime & donghua.";
  }

  return (
    <ListPage
      title="Anime & Donghua"
      items={items}
      currentPage={currentPage}
      totalPages={totalPages}
      baseUrl="/animedonghua"
      error={error}
    />
  );
}
