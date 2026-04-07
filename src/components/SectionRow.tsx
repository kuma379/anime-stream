"use client";

import Link from "next/link";
import AnimeCard from "./AnimeCard";
import type { AnimeCard as AnimeCardType } from "@/types";

interface Props {
  title: string;
  items: AnimeCardType[];
  seeMoreHref?: string;
  getHref?: (item: AnimeCardType) => string;
}

export default function SectionRow({ title, items, seeMoreHref, getHref }: Props) {
  if (!items || items.length === 0) return null;

  return (
    <section className="section-row">
      <div className="section-header">
        <h2 className="section-title">{title}</h2>
        {seeMoreHref && (
          <Link href={seeMoreHref} className="see-more">
            Lihat Semua →
          </Link>
        )}
      </div>
      <div className="grid-anime">
        {items.map((anime, i) => (
          <AnimeCard
            key={`${anime.slug || anime.title}-${i}`}
            anime={anime}
            href={getHref ? getHref(anime) : undefined}
          />
        ))}
      </div>
      <style jsx>{`
        .section-row {
          margin-bottom: 3rem;
        }
        .section-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-bottom: 1.25rem;
        }
        .see-more {
          color: var(--accent);
          font-size: 0.875rem;
          font-weight: 500;
          transition: color 0.2s;
        }
        .see-more:hover {
          color: var(--accent-hover);
        }
      `}</style>
    </section>
  );
}
