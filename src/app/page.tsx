import { getHome } from "@/lib/api";
import SectionRow from "@/components/SectionRow";
import HeroBanner from "@/components/HeroBanner";
import type { AnimeCard } from "@/types";

function extractList(data: Record<string, unknown>, key: string): AnimeCard[] {
  const val = data[key];
  if (Array.isArray(val)) return val as AnimeCard[];
  const nested = data.data as Record<string, unknown> | undefined;
  if (nested && Array.isArray(nested[key])) return nested[key] as AnimeCard[];
  return [];
}

export default async function HomePage() {
  let homeData: Record<string, unknown> = {};
  let error = "";

  try {
    const res = await getHome();
    homeData = (res.data || {}) as Record<string, unknown>;
  } catch {
    error = "Gagal memuat data. Silakan coba lagi nanti.";
  }

  const latestEpisodes = extractList(homeData, "latestEpisodes")
    .concat(extractList(homeData, "episodes"))
    .slice(0, 18);
  const ongoingAnime = extractList(homeData, "ongoingAnime")
    .concat(extractList(homeData, "ongoing"))
    .slice(0, 12);
  const popularAnime = extractList(homeData, "popularAnime")
    .concat(extractList(homeData, "popular"))
    .concat(extractList(homeData, "populer"))
    .slice(0, 12);
  const completedAnime = extractList(homeData, "completedAnime")
    .concat(extractList(homeData, "completed"))
    .slice(0, 12);

  const allItems = [...latestEpisodes, ...ongoingAnime, ...popularAnime];

  return (
    <div>
      {allItems.length > 0 && <HeroBanner items={allItems.slice(0, 5)} />}
      <div className="container" style={{ paddingTop: "2rem", paddingBottom: "2rem" }}>
        {error && <div className="error-box">{error}</div>}

        {latestEpisodes.length > 0 && (
          <SectionRow
            title="Episode Terbaru"
            items={latestEpisodes}
            seeMoreHref="/latest"
            getHref={(a) => `/episode/${a.slug}`}
          />
        )}
        {ongoingAnime.length > 0 && (
          <SectionRow
            title="Sedang Tayang"
            items={ongoingAnime}
            seeMoreHref="/ongoing"
          />
        )}
        {popularAnime.length > 0 && (
          <SectionRow
            title="Populer"
            items={popularAnime}
            seeMoreHref="/populer"
          />
        )}
        {completedAnime.length > 0 && (
          <SectionRow
            title="Selesai"
            items={completedAnime}
            seeMoreHref="/completed"
          />
        )}

        {allItems.length === 0 && !error && (
          <div className="empty-state">
            <div className="empty-icon">🎬</div>
            <h2>Selamat datang di AnimeStream</h2>
            <p>Gunakan menu di atas untuk menjelajahi anime, film, dan donghua favorit kamu.</p>
          </div>
        )}
      </div>
      <style jsx>{`
        .empty-state {
          text-align: center;
          padding: 5rem 1rem;
          color: var(--text-secondary);
        }
        .empty-icon {
          font-size: 4rem;
          margin-bottom: 1rem;
        }
        .empty-state h2 {
          font-size: 1.5rem;
          margin-bottom: 0.5rem;
          color: var(--text-primary);
        }
      `}</style>
    </div>
  );
}
