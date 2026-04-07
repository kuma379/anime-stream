import { getAllAnime, getAllAnimeReverse } from "@/lib/api";
import ListPage from "@/components/ListPage";
import { extractItems, extractPages } from "@/lib/extractData";
import Link from "next/link";

interface Props { searchParams: { page?: string; reverse?: string } }

export default async function AllAnimePage({ searchParams }: Props) {
  const page = parseInt(searchParams.page || "1") || 1;
  const reverse = searchParams.reverse === "1";
  let items = [];
  let currentPage = page, totalPages = 1;
  let error = "";

  try {
    const res = reverse ? await getAllAnimeReverse(page) : await getAllAnime(page);
    const data = (res.data || {}) as Record<string, unknown>;
    items = extractItems(data);
    ({ currentPage, totalPages } = extractPages(data));
  } catch {
    error = "Gagal memuat semua anime.";
  }

  return (
    <div>
      <div className="page-header">
        <div className="container" style={{ display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: "1rem" }}>
          <h1>Semua Anime</h1>
          <div style={{ display: "flex", gap: "0.5rem" }}>
            <Link
              href="/all-anime?page=1"
              className={`sort-btn ${!reverse ? "active" : ""}`}
            >
              A-Z
            </Link>
            <Link
              href="/all-anime?page=1&reverse=1"
              className={`sort-btn ${reverse ? "active" : ""}`}
            >
              Z-A
            </Link>
          </div>
        </div>
      </div>
      <ListPage
        title=""
        items={items}
        currentPage={currentPage}
        totalPages={totalPages}
        baseUrl="/all-anime"
        params={reverse ? { reverse: "1" } : {}}
        error={error}
      />
    </div>
  );
}
