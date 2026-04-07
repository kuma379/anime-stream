"use client";

import Link from "next/link";
import Image from "next/image";
import type { AnimeCard as AnimeCardType } from "@/types";

interface Props {
  anime: AnimeCardType;
  href?: string;
}

function getBadgeClass(type?: string) {
  const t = (type || "").toLowerCase();
  if (t.includes("movie") || t.includes("film")) return "badge-movie";
  if (t.includes("ongoing") || t.includes("berlangsung")) return "badge-ongoing";
  if (t.includes("completed") || t.includes("selesai")) return "badge-completed";
  return "badge-type";
}

export default function AnimeCard({ anime, href }: Props) {
  const link = href || (anime.slug ? `/anime/${anime.slug}` : "#");

  return (
    <Link href={link} className="anime-card">
      <div className="card-poster">
        <Image
          src={anime.poster || "/placeholder.png"}
          alt={anime.title}
          fill
          sizes="(max-width: 640px) 140px, 170px"
          className="card-img"
          unoptimized
        />
        <div className="card-overlay">
          <span className="play-btn">▶</span>
        </div>
        {anime.episode && (
          <div className="card-episode">Eps {anime.episode}</div>
        )}
        {(anime.type || anime.status) && (
          <div className={`badge card-badge ${getBadgeClass(anime.type || anime.status)}`}>
            {anime.type || anime.status}
          </div>
        )}
      </div>
      <div className="card-info">
        <h3 className="card-title">{anime.title}</h3>
        {anime.score && (
          <span className="card-score">⭐ {anime.score}</span>
        )}
      </div>

      <style jsx>{`
        .anime-card {
          display: block;
          cursor: pointer;
          transition: transform 0.2s;
        }
        .anime-card:hover {
          transform: translateY(-4px);
        }
        .card-poster {
          position: relative;
          aspect-ratio: 2/3;
          border-radius: 10px;
          overflow: hidden;
          background: var(--bg-card);
          border: 1px solid var(--border);
        }
        .card-img {
          object-fit: cover;
          transition: transform 0.3s;
        }
        .anime-card:hover .card-img {
          transform: scale(1.05);
        }
        .card-overlay {
          position: absolute;
          inset: 0;
          background: rgba(0,0,0,0.6);
          display: flex;
          align-items: center;
          justify-content: center;
          opacity: 0;
          transition: opacity 0.2s;
        }
        .anime-card:hover .card-overlay {
          opacity: 1;
        }
        .play-btn {
          width: 48px;
          height: 48px;
          background: var(--accent);
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 1.2rem;
          color: white;
          box-shadow: 0 0 20px var(--accent-glow);
        }
        .card-episode {
          position: absolute;
          bottom: 0.5rem;
          right: 0.5rem;
          background: rgba(0,0,0,0.85);
          color: var(--text-primary);
          font-size: 0.7rem;
          font-weight: 600;
          padding: 0.15rem 0.4rem;
          border-radius: 4px;
        }
        .card-badge {
          position: absolute;
          top: 0.5rem;
          left: 0.5rem;
          font-size: 0.65rem;
        }
        .card-info {
          padding: 0.5rem 0.25rem;
        }
        .card-title {
          font-size: 0.85rem;
          font-weight: 600;
          color: var(--text-primary);
          line-height: 1.4;
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
        .card-score {
          font-size: 0.75rem;
          color: var(--warning);
          margin-top: 0.2rem;
          display: block;
        }
      `}</style>
    </Link>
  );
}
