import { getAnimeDetail } from "@/lib/api";
import Image from "next/image";
import Link from "next/link";
import type { AnimeDetail, EpisodeItem } from "@/types";

interface Props { params: { slug: string } }

function extractDetail(data: Record<string, unknown>): AnimeDetail {
  const nested = data.data as AnimeDetail | undefined;
  if (nested && nested.title) return nested;
  return data as AnimeDetail;
}

export default async function AnimeDetailPage({ params }: Props) {
  const { slug } = params;
  let detail: AnimeDetail | null = null;
  let error = "";

  try {
    const res = await getAnimeDetail(slug);
    const data = (res.data || {}) as Record<string, unknown>;
    detail = extractDetail(data);
  } catch {
    error = "Gagal memuat detail anime.";
  }

  if (error) {
    return (
      <div className="container" style={{ paddingTop: "3rem" }}>
        <div className="error-box">{error}</div>
      </div>
    );
  }

  if (!detail) {
    return (
      <div className="loading-spinner" style={{ minHeight: "60vh" }}>
        <div className="spinner" />
        <p>Memuat...</p>
      </div>
    );
  }

  const episodes = (detail.episodes || []) as EpisodeItem[];

  return (
    <div>
      <div className="detail-hero">
        {detail.poster && (
          <div className="detail-hero-bg">
            <Image src={detail.poster} alt={detail.title} fill className="hero-bg-img" unoptimized />
            <div className="hero-bg-overlay" />
          </div>
        )}
        <div className="container detail-hero-content">
          <div className="detail-poster">
            {detail.poster && (
              <Image src={detail.poster} alt={detail.title} width={220} height={320} className="poster-img" unoptimized />
            )}
          </div>
          <div className="detail-info">
            <h1 className="detail-title">{detail.title}</h1>
            <div className="detail-meta">
              {detail.type && <span className="badge badge-type">{detail.type}</span>}
              {detail.status && (
                <span className={`badge badge-${detail.status.toLowerCase().includes("ongoing") || detail.status.toLowerCase().includes("airing") ? "ongoing" : "completed"}`}>
                  {detail.status}
                </span>
              )}
              {detail.score && <span className="detail-score">⭐ {detail.score}</span>}
            </div>
            {detail.genres && Array.isArray(detail.genres) && detail.genres.length > 0 && (
              <div className="detail-genres">
                {(detail.genres as string[]).map((g) => (
                  <Link key={g} href={`/genre/${g.toLowerCase().replace(/\s+/g, "-")}`} className="genre-tag">
                    {g}
                  </Link>
                ))}
              </div>
            )}
            {detail.synopsis && (
              <div className="detail-synopsis">
                <h3>Sinopsis</h3>
                <p>{String(detail.synopsis)}</p>
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="container" style={{ paddingBottom: "3rem" }}>
        {episodes.length > 0 && (
          <section>
            <h2 className="section-title">Daftar Episode</h2>
            <div className="episodes-grid">
              {episodes.map((ep, i) => (
                <Link
                  key={ep.slug || i}
                  href={`/episode/${ep.slug}`}
                  className="episode-item"
                >
                  <span className="ep-num">Eps {ep.episode || i + 1}</span>
                  <span className="ep-title">{ep.title}</span>
                  {ep.date && <span className="ep-date">{ep.date}</span>}
                </Link>
              ))}
            </div>
          </section>
        )}
      </div>

    </div>
  );
}
