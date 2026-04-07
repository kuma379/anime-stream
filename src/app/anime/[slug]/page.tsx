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

      <style jsx>{`
        .detail-hero {
          position: relative;
          padding: 3rem 0;
          margin-bottom: 2rem;
          overflow: hidden;
          background: var(--bg-secondary);
        }
        .detail-hero-bg {
          position: absolute;
          inset: 0;
        }
        .hero-bg-img {
          object-fit: cover;
          filter: blur(20px) brightness(0.2);
        }
        .hero-bg-overlay {
          position: absolute;
          inset: 0;
          background: linear-gradient(to bottom, rgba(10,10,15,0.5), rgba(10,10,15,0.9));
        }
        .detail-hero-content {
          position: relative;
          z-index: 1;
          display: flex;
          gap: 2.5rem;
          align-items: flex-start;
        }
        .detail-poster {
          flex-shrink: 0;
        }
        .poster-img {
          border-radius: 12px;
          box-shadow: 0 8px 32px rgba(0,0,0,0.5);
          object-fit: cover;
        }
        .detail-info {
          flex: 1;
          display: flex;
          flex-direction: column;
          gap: 1rem;
        }
        .detail-title {
          font-size: 2rem;
          font-weight: 800;
          color: white;
          line-height: 1.2;
        }
        .detail-meta {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          flex-wrap: wrap;
        }
        .detail-score {
          color: var(--warning);
          font-weight: 600;
          font-size: 0.95rem;
        }
        .detail-genres {
          display: flex;
          gap: 0.5rem;
          flex-wrap: wrap;
        }
        .genre-tag {
          padding: 0.3rem 0.8rem;
          background: rgba(108, 99, 255, 0.15);
          border: 1px solid rgba(108, 99, 255, 0.3);
          border-radius: 20px;
          color: var(--accent);
          font-size: 0.8rem;
          font-weight: 500;
          transition: all 0.2s;
        }
        .genre-tag:hover {
          background: var(--accent);
          color: white;
        }
        .detail-synopsis h3 {
          font-size: 1rem;
          font-weight: 600;
          color: var(--text-secondary);
          margin-bottom: 0.5rem;
        }
        .detail-synopsis p {
          color: var(--text-secondary);
          font-size: 0.9rem;
          line-height: 1.7;
        }
        .episodes-grid {
          display: flex;
          flex-direction: column;
          gap: 0.5rem;
          max-height: 500px;
          overflow-y: auto;
        }
        .episode-item {
          display: grid;
          grid-template-columns: 80px 1fr auto;
          align-items: center;
          gap: 1rem;
          padding: 0.75rem 1rem;
          background: var(--bg-card);
          border: 1px solid var(--border);
          border-radius: 8px;
          transition: all 0.2s;
        }
        .episode-item:hover {
          background: var(--bg-hover);
          border-color: var(--accent);
        }
        .ep-num {
          font-weight: 700;
          color: var(--accent);
          font-size: 0.85rem;
        }
        .ep-title {
          font-size: 0.9rem;
          color: var(--text-primary);
        }
        .ep-date {
          font-size: 0.75rem;
          color: var(--text-muted);
        }
        @media (max-width: 700px) {
          .detail-hero-content { flex-direction: column; }
          .detail-poster { margin: 0 auto; }
          .detail-title { font-size: 1.4rem; }
          .episode-item { grid-template-columns: 70px 1fr; }
          .ep-date { display: none; }
        }
      `}</style>
    </div>
  );
}
