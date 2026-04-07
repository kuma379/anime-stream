import { getSeriesDetail } from "@/lib/api";
import Image from "next/image";
import Link from "next/link";
import type { AnimeDetail, EpisodeItem } from "@/types";

interface Props { params: { slug: string } }

function extractDetail(data: Record<string, unknown>): AnimeDetail {
  const nested = data.data as AnimeDetail | undefined;
  if (nested && nested.title) return nested;
  return data as AnimeDetail;
}

export default async function SeriesDetailPage({ params }: Props) {
  const { slug } = params;
  let detail: AnimeDetail | null = null;
  let error = "";

  try {
    const res = await getSeriesDetail(slug);
    const data = (res.data || {}) as Record<string, unknown>;
    detail = extractDetail(data);
  } catch {
    error = "Gagal memuat detail series.";
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
      <div className="detail-hero" style={{ background: "var(--bg-secondary)", padding: "3rem 0", marginBottom: "2rem", position: "relative", overflow: "hidden" }}>
        {detail.poster && (
          <>
            <div style={{ position: "absolute", inset: 0 }}>
              <Image src={detail.poster} alt={detail.title} fill style={{ objectFit: "cover", filter: "blur(20px) brightness(0.2)" }} unoptimized />
              <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to bottom, rgba(10,10,15,0.5), rgba(10,10,15,0.9))" }} />
            </div>
          </>
        )}
        <div className="container" style={{ position: "relative", zIndex: 1, display: "flex", gap: "2.5rem", alignItems: "flex-start" }}>
          {detail.poster && (
            <Image src={detail.poster} alt={detail.title} width={200} height={290} style={{ borderRadius: "12px", objectFit: "cover", flexShrink: 0 }} unoptimized />
          )}
          <div style={{ flex: 1 }}>
            <h1 style={{ fontSize: "1.8rem", fontWeight: 800, color: "white", marginBottom: "0.75rem" }}>{detail.title}</h1>
            <div style={{ display: "flex", gap: "0.5rem", flexWrap: "wrap", marginBottom: "0.75rem" }}>
              {detail.type && <span className="badge badge-type">{detail.type}</span>}
              {detail.status && <span className={`badge badge-${detail.status.toLowerCase().includes("airing") ? "ongoing" : "completed"}`}>{detail.status}</span>}
              {detail.score && <span style={{ color: "var(--warning)", fontWeight: 600 }}>⭐ {detail.score}</span>}
            </div>
            {detail.synopsis && <p style={{ color: "var(--text-secondary)", fontSize: "0.9rem", lineHeight: 1.7 }}>{String(detail.synopsis)}</p>}
          </div>
        </div>
      </div>
      <div className="container" style={{ paddingBottom: "3rem" }}>
        {episodes.length > 0 && (
          <section>
            <h2 className="section-title">Episode</h2>
            <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem", maxHeight: "500px", overflowY: "auto" }}>
              {episodes.map((ep, i) => (
                <Link key={ep.slug || i} href={`/episode/${ep.slug}`} style={{
                  display: "grid", gridTemplateColumns: "80px 1fr auto", alignItems: "center", gap: "1rem",
                  padding: "0.75rem 1rem", background: "var(--bg-card)", border: "1px solid var(--border)",
                  borderRadius: "8px", transition: "all 0.2s"
                }}>
                  <span style={{ fontWeight: 700, color: "var(--accent)", fontSize: "0.85rem" }}>Eps {ep.episode || i + 1}</span>
                  <span style={{ fontSize: "0.9rem", color: "var(--text-primary)" }}>{ep.title}</span>
                  {ep.date && <span style={{ fontSize: "0.75rem", color: "var(--text-muted)" }}>{ep.date}</span>}
                </Link>
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  );
}
