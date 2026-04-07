import { getCatalog } from "@/lib/api";
import AnimeCard from "@/components/AnimeCard";
import Pagination from "@/components/Pagination";
import Link from "next/link";
import { extractItems, extractPages } from "@/lib/extractData";

interface Props {
  searchParams: {
    title?: string;
    page?: string;
    order?: string;
    type?: string;
    status?: string;
  };
}

const TYPES = ["", "TV", "Movie", "OVA", "ONA", "Special", "Music"];
const STATUSES = ["", "Currently Airing", "Finished Airing", "Not yet aired"];
const ORDERS = ["", "update", "latest", "popular", "title"];

export default async function CatalogPage({ searchParams }: Props) {
  const page = searchParams.page || "1";
  const params: Record<string, string> = {};
  if (searchParams.title) params.title = searchParams.title;
  if (searchParams.order) params.order = searchParams.order;
  if (searchParams.type) params.type = searchParams.type;
  if (searchParams.status) params.status = searchParams.status;
  params.page = page;

  let items: AnimeCard[] = [];
  let currentPage = parseInt(page), totalPages = 1;
  let error = "";

  try {
    const res = await getCatalog(params);
    const data = (res.data || {}) as Record<string, unknown>;
    items = extractItems(data);
    ({ currentPage, totalPages } = extractPages(data));
  } catch {
    error = "Gagal memuat katalog.";
  }

  return (
    <div>
      <div className="page-header">
        <div className="container">
          <h1>Katalog Anime</h1>
        </div>
      </div>
      <div className="container" style={{ paddingBottom: "3rem" }}>
        <form className="catalog-filters" method="GET">
          <div className="filter-group">
            <input
              type="text"
              name="title"
              placeholder="Cari judul..."
              defaultValue={searchParams.title || ""}
              className="filter-input"
            />
          </div>
          <div className="filter-group">
            <select name="type" defaultValue={searchParams.type || ""} className="filter-select">
              {TYPES.map((t) => (
                <option key={t} value={t}>{t || "Semua Tipe"}</option>
              ))}
            </select>
          </div>
          <div className="filter-group">
            <select name="status" defaultValue={searchParams.status || ""} className="filter-select">
              {STATUSES.map((s) => (
                <option key={s} value={s}>{s || "Semua Status"}</option>
              ))}
            </select>
          </div>
          <div className="filter-group">
            <select name="order" defaultValue={searchParams.order || ""} className="filter-select">
              {ORDERS.map((o) => (
                <option key={o} value={o}>{o || "Urutan Default"}</option>
              ))}
            </select>
          </div>
          <button type="submit" className="filter-btn">Filter</button>
        </form>

        {error && <div className="error-box">{error}</div>}
        {items.length === 0 && !error && (
          <div className="loading-spinner"><p>Tidak ada hasil.</p></div>
        )}
        {items.length > 0 && (
          <>
            <div className="grid-anime">
              {items.map((anime, i) => (
                <AnimeCard key={`${anime.slug}-${i}`} anime={anime} />
              ))}
            </div>
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              baseUrl="/catalog"
              params={Object.fromEntries(
                Object.entries(params).filter(([k]) => k !== "page")
              )}
            />
          </>
        )}
      </div>
    </div>
  );
}
