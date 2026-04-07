"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import type { AnimeCard } from "@/types";

export default function HeroBanner({ items }: { items: AnimeCard[] }) {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    if (items.length <= 1) return;
    const t = setInterval(() => setCurrent((c) => (c + 1) % items.length), 5000);
    return () => clearInterval(t);
  }, [items.length]);

  if (!items.length) return null;
  const item = items[current];

  return (
    <div className="hero">
      <div className="hero-bg">
        <Image
          src={item.poster || "/placeholder.png"}
          alt={item.title}
          fill
          className="hero-img"
          unoptimized
          priority
        />
        <div className="hero-gradient" />
      </div>
      <div className="container hero-content">
        <div className="hero-meta">
          {item.type && <span className={`badge badge-type`}>{item.type}</span>}
          {item.status && (
            <span className={`badge badge-${item.status.toLowerCase().includes("ongoing") ? "ongoing" : "completed"}`}>
              {item.status}
            </span>
          )}
        </div>
        <h1 className="hero-title">{item.title}</h1>
        <div className="hero-actions">
          <Link href={`/anime/${item.slug}`} className="btn-primary">
            ▶ Tonton Sekarang
          </Link>
          <Link href={`/anime/${item.slug}`} className="btn-outline">
            Detail
          </Link>
        </div>
        <div className="hero-dots">
          {items.map((_, i) => (
            <button
              key={i}
              className={`dot ${i === current ? "active" : ""}`}
              onClick={() => setCurrent(i)}
            />
          ))}
        </div>
      </div>
      <style jsx>{`
        .hero {
          position: relative;
          height: 420px;
          overflow: hidden;
        }
        .hero-bg {
          position: absolute;
          inset: 0;
        }
        .hero-img {
          object-fit: cover;
          object-position: center top;
          filter: blur(0px) brightness(0.45);
        }
        .hero-gradient {
          position: absolute;
          inset: 0;
          background: linear-gradient(
            to right,
            rgba(10,10,15,0.95) 0%,
            rgba(10,10,15,0.7) 50%,
            rgba(10,10,15,0.2) 100%
          ),
          linear-gradient(
            to top,
            rgba(10,10,15,1) 0%,
            transparent 50%
          );
        }
        .hero-content {
          position: relative;
          z-index: 1;
          display: flex;
          flex-direction: column;
          justify-content: flex-end;
          height: 100%;
          padding-bottom: 2.5rem;
          max-width: 600px;
        }
        .hero-meta {
          display: flex;
          gap: 0.5rem;
          margin-bottom: 0.75rem;
          flex-wrap: wrap;
        }
        .hero-title {
          font-size: 2rem;
          font-weight: 800;
          color: white;
          line-height: 1.2;
          margin-bottom: 1rem;
          text-shadow: 0 2px 8px rgba(0,0,0,0.5);
        }
        .hero-actions {
          display: flex;
          gap: 0.75rem;
          margin-bottom: 1.25rem;
          flex-wrap: wrap;
        }
        .btn-primary {
          background: var(--accent);
          color: white;
          padding: 0.65rem 1.5rem;
          border-radius: 8px;
          font-weight: 600;
          font-size: 0.95rem;
          transition: all 0.2s;
          box-shadow: 0 4px 15px var(--accent-glow);
        }
        .btn-primary:hover {
          background: var(--accent-hover);
          transform: translateY(-1px);
        }
        .btn-outline {
          border: 1px solid rgba(255,255,255,0.3);
          color: white;
          padding: 0.65rem 1.5rem;
          border-radius: 8px;
          font-weight: 600;
          font-size: 0.95rem;
          backdrop-filter: blur(4px);
          background: rgba(255,255,255,0.08);
          transition: all 0.2s;
        }
        .btn-outline:hover {
          background: rgba(255,255,255,0.15);
        }
        .hero-dots {
          display: flex;
          gap: 0.4rem;
        }
        .dot {
          width: 8px;
          height: 8px;
          border-radius: 50%;
          background: rgba(255,255,255,0.3);
          border: none;
          cursor: pointer;
          transition: all 0.2s;
        }
        .dot.active {
          background: var(--accent);
          width: 24px;
          border-radius: 4px;
        }
        @media (max-width: 640px) {
          .hero { height: 320px; }
          .hero-title { font-size: 1.4rem; }
        }
      `}</style>
    </div>
  );
}
