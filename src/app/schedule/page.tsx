import { getSchedule } from "@/lib/api";
import Link from "next/link";
import AnimeCard from "@/components/AnimeCard";
import type { AnimeCard as AnimeCardType } from "@/types";

const DAYS = [
  { id: "senin", label: "Senin" },
  { id: "selasa", label: "Selasa" },
  { id: "rabu", label: "Rabu" },
  { id: "kamis", label: "Kamis" },
  { id: "jumat", label: "Jumat" },
  { id: "sabtu", label: "Sabtu" },
  { id: "minggu", label: "Minggu" },
];

interface Props {
  searchParams: { day?: string };
}

function extractItems(data: Record<string, unknown>): AnimeCardType[] {
  for (const key of ["schedule", "data", "animeList", "list", "results"]) {
    const v = data[key];
    if (Array.isArray(v)) return v as AnimeCardType[];
  }
  if (Array.isArray(data)) return data as AnimeCardType[];
  return [];
}

export default async function SchedulePage({ searchParams }: Props) {
  const day = searchParams.day || "senin";
  let items: AnimeCardType[] = [];
  let error = "";

  try {
    const res = await getSchedule(day);
    const data = (res.data || {}) as Record<string, unknown>;
    items = extractItems(data);
  } catch {
    error = "Gagal memuat jadwal.";
  }

  const currentDay = DAYS.find((d) => d.id === day);

  return (
    <div>
      <div className="page-header">
        <div className="container">
          <h1>Jadwal Tayang</h1>
        </div>
      </div>
      <div className="container" style={{ paddingBottom: "3rem" }}>
        <div className="day-tabs">
          {DAYS.map((d) => (
            <Link
              key={d.id}
              href={`/schedule?day=${d.id}`}
              className={`day-tab ${d.id === day ? "active" : ""}`}
            >
              {d.label}
            </Link>
          ))}
        </div>
        <h2 className="section-title" style={{ marginTop: "1.5rem" }}>
          {currentDay?.label || day}
        </h2>
        {error && <div className="error-box">{error}</div>}
        {items.length === 0 && !error && (
          <div className="loading-spinner"><p>Tidak ada jadwal untuk hari ini.</p></div>
        )}
        {items.length > 0 && (
          <div className="grid-anime">
            {items.map((anime, i) => (
              <AnimeCard key={`${anime.slug}-${i}`} anime={anime} />
            ))}
          </div>
        )}
      </div>
      <style jsx>{`
        .day-tabs {
          display: flex;
          gap: 0.5rem;
          flex-wrap: wrap;
          margin-bottom: 0.5rem;
        }
        .day-tab {
          padding: 0.5rem 1.1rem;
          border-radius: 8px;
          border: 1px solid var(--border);
          background: var(--bg-card);
          color: var(--text-secondary);
          font-size: 0.875rem;
          font-weight: 500;
          transition: all 0.2s;
        }
        .day-tab:hover, .day-tab.active {
          background: var(--accent);
          border-color: var(--accent);
          color: white;
        }
      `}</style>
    </div>
  );
}
