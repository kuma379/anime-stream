import { getGenres } from "@/lib/api";
import Link from "next/link";
import type { Genre } from "@/types";

function extractGenres(data: Record<string, unknown>): Genre[] {
  for (const key of ["genres", "data", "list"]) {
    const v = data[key];
    if (Array.isArray(v)) return v as Genre[];
  }
  if (Array.isArray(data)) return data as Genre[];
  return [];
}

export default async function GenresPage() {
  let genres: Genre[] = [];
  let error = "";

  try {
    const res = await getGenres();
    const data = (res.data || {}) as Record<string, unknown>;
    genres = extractGenres(data);
  } catch {
    error = "Gagal memuat genre.";
  }

  return (
    <div>
      <div className="page-header">
        <div className="container">
          <h1>Semua Genre</h1>
        </div>
      </div>
      <div className="container" style={{ paddingBottom: "3rem" }}>
        {error && <div className="error-box">{error}</div>}
        <div className="genres-grid">
          {genres.map((genre, i) => (
            <Link
              key={`${genre.slug}-${i}`}
              href={`/genre/${genre.slug}`}
              className="genre-chip"
            >
              {genre.name}
            </Link>
          ))}
        </div>
        {genres.length === 0 && !error && (
          <div className="loading-spinner"><p>Memuat genre...</p></div>
        )}
      </div>
    </div>
  );
}
