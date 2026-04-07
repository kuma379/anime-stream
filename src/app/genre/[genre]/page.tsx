import { getGenre } from "@/lib/api";
import ListPage from "@/components/ListPage";
import { extractItems, extractPages } from "@/lib/extractData";

interface Props {
  params: { genre: string };
  searchParams: { page?: string };
}

export default async function GenreDetailPage({ params, searchParams }: Props) {
  const page = parseInt(searchParams.page || "1") || 1;
  const genre = params.genre;
  let items = [];
  let currentPage = page, totalPages = 1;
  let error = "";

  try {
    const res = await getGenre(genre, page);
    const data = (res.data || {}) as Record<string, unknown>;
    items = extractItems(data);
    ({ currentPage, totalPages } = extractPages(data));
  } catch {
    error = `Gagal memuat genre "${genre}".`;
  }

  const title = genre.charAt(0).toUpperCase() + genre.slice(1).replace(/-/g, " ");

  return (
    <ListPage
      title={`Genre: ${title}`}
      items={items}
      currentPage={currentPage}
      totalPages={totalPages}
      baseUrl={`/genre/${genre}`}
      error={error}
    />
  );
}
