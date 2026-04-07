import AnimeCard from "./AnimeCard";
import Pagination from "./Pagination";
import type { AnimeCard as AnimeCardType } from "@/types";

interface Props {
  title: string;
  items: AnimeCardType[];
  currentPage: number;
  totalPages: number;
  baseUrl: string;
  params?: Record<string, string>;
  error?: string;
  getHref?: (item: AnimeCardType) => string;
}

export default function ListPage({
  title,
  items,
  currentPage,
  totalPages,
  baseUrl,
  params,
  error,
  getHref,
}: Props) {
  return (
    <div>
      <div className="page-header">
        <div className="container">
          <h1>{title}</h1>
        </div>
      </div>
      <div className="container" style={{ paddingBottom: "3rem" }}>
        {error && <div className="error-box">{error}</div>}
        {items.length === 0 && !error && (
          <div className="loading-spinner">
            <div className="spinner" />
            <p>Memuat data...</p>
          </div>
        )}
        {items.length > 0 && (
          <>
            <div className="grid-anime">
              {items.map((anime, i) => (
                <AnimeCard
                  key={`${anime.slug || anime.title}-${i}`}
                  anime={anime}
                  href={getHref ? getHref(anime) : undefined}
                />
              ))}
            </div>
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              baseUrl={baseUrl}
              params={params}
            />
          </>
        )}
      </div>
    </div>
  );
}
