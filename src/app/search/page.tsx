import { getSearch } from "@/lib/api";
import AnimeCard from "@/components/AnimeCard";
import type { AnimeCard as AnimeCardType } from "@/types";

interface Props {
  searchParams: { q?: string };
}

function extractItems(data: Record<string, unknown>): AnimeCardType[] {
  for (const key of ["results", "data", "animeList", "list"]) {
    const v = data[key];
    if (Array.isArray(v)) return v as AnimeCardType[];
  }
  if (Array.isArray(data)) return data as AnimeCardType[];
  return [];
}

export default async function SearchPage({ searchParams }: Props) {
  const q = searchParams.q || "";
  let items: AnimeCardType[] = [];
  let error = "";

  if (q) {
    try {
      const res = await getSearch(q);
      const data = (res.data || {}) as Record<string, unknown>;
      items = extractItems(data);
    } catch {
      error = "Pencarian gagal. Coba lagi nanti.";
    }
  }

  return (
    <div>
      <div className="page-header">
        <div className="container">
          <h1>Hasil Pencarian</h1>
          {q && <p style={{ color: "var(--text-secondary)", marginTop: "0.5rem" }}>
            {items.length > 0 ? `${items.length} hasil untuk` : "Tidak ada hasil untuk"}{" "}
            <strong style={{ color: "var(--accent)" }}>"{q}"</strong>
          </p>}
        </div>
      </div>
      <div className="container">
        {error && <div className="error-box">{error}</div>}
        {!q && (
          <div className="loading-spinner">
            <p>Masukkan kata kunci di kolom pencarian di atas.</p>
          </div>
        )}
        {q && items.length === 0 && !error && (
          <div className="loading-spinner">
            <p>Tidak ada hasil untuk "{q}"</p>
          </div>
        )}
        {items.length > 0 && (
          <div className="grid-anime" style={{ marginBottom: "3rem" }}>
            {items.map((anime, i) => (
              <AnimeCard key={`${anime.slug}-${i}`} anime={anime} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
