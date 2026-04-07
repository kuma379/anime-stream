"use client";

import Link from "next/link";

export default function Footer() {
  return (
    <footer className="footer">
      <div className="container footer-inner">
        <div className="footer-brand">
          <span className="logo-icon">▶</span>
          <span className="logo-text">AnimeStream</span>
          <p>Nonton anime, film, dan donghua subtitle Indonesia secara gratis.</p>
        </div>
        <div className="footer-links">
          <div>
            <h4>Browse</h4>
            <Link href="/animedonghua">Anime & Donghua</Link>
            <Link href="/film">Film</Link>
            <Link href="/series">Series</Link>
            <Link href="/tvshow">TV Show</Link>
          </div>
          <div>
            <h4>Status</h4>
            <Link href="/ongoing">Ongoing</Link>
            <Link href="/completed">Completed</Link>
            <Link href="/populer">Populer</Link>
            <Link href="/latest">Terbaru</Link>
          </div>
          <div>
            <h4>Lainnya</h4>
            <Link href="/genres">Genre</Link>
            <Link href="/catalog">Katalog</Link>
            <Link href="/schedule?day=senin">Jadwal</Link>
          </div>
        </div>
      </div>
      <div className="footer-bottom">
        <p>© 2025 AnimeStream. All rights reserved.</p>
      </div>
      <style jsx>{`
        .footer {
          background: var(--bg-secondary);
          border-top: 1px solid var(--border);
          margin-top: 4rem;
          padding: 3rem 0 0;
        }
        .footer-inner {
          display: grid;
          grid-template-columns: 1fr auto;
          gap: 3rem;
          padding-bottom: 2rem;
        }
        .footer-brand {
          display: flex;
          flex-direction: column;
          gap: 0.5rem;
        }
        .footer-brand > :first-child {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          font-weight: 800;
          font-size: 1.2rem;
          margin-bottom: 0.25rem;
        }
        .logo-icon { color: var(--accent); }
        .logo-text {
          background: linear-gradient(135deg, var(--text-primary), var(--accent));
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }
        .footer-brand p {
          color: var(--text-muted);
          font-size: 0.875rem;
          max-width: 280px;
        }
        .footer-links {
          display: flex;
          gap: 3rem;
        }
        .footer-links div {
          display: flex;
          flex-direction: column;
          gap: 0.5rem;
        }
        .footer-links h4 {
          color: var(--text-primary);
          font-size: 0.875rem;
          font-weight: 600;
          margin-bottom: 0.25rem;
        }
        .footer-links a {
          color: var(--text-muted);
          font-size: 0.85rem;
          transition: color 0.2s;
        }
        .footer-links a:hover {
          color: var(--accent);
        }
        .footer-bottom {
          border-top: 1px solid var(--border);
          padding: 1rem 0;
          text-align: center;
        }
        .footer-bottom p {
          color: var(--text-muted);
          font-size: 0.8rem;
        }
        @media (max-width: 700px) {
          .footer-inner {
            grid-template-columns: 1fr;
            gap: 2rem;
          }
          .footer-links {
            flex-wrap: wrap;
            gap: 2rem;
          }
        }
      `}</style>
    </footer>
  );
}
