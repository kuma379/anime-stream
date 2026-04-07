"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

const DAYS = ["senin", "selasa", "rabu", "kamis", "jumat", "sabtu", "minggu"];

export default function Navbar() {
  const [query, setQuery] = useState("");
  const [menuOpen, setMenuOpen] = useState(false);
  const router = useRouter();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      router.push(`/search?q=${encodeURIComponent(query.trim())}`);
      setQuery("");
      setMenuOpen(false);
    }
  };

  return (
    <nav className="navbar">
      <div className="container nav-inner">
        <Link href="/" className="nav-logo">
          <span className="logo-icon">▶</span>
          <span className="logo-text">AnimeStream</span>
        </Link>

        <div className={`nav-links ${menuOpen ? "open" : ""}`}>
          <Link href="/" onClick={() => setMenuOpen(false)}>Home</Link>
          <div className="dropdown">
            <span className="dropdown-trigger">Browse ▾</span>
            <div className="dropdown-menu">
              <Link href="/animedonghua" onClick={() => setMenuOpen(false)}>Anime & Donghua</Link>
              <Link href="/film" onClick={() => setMenuOpen(false)}>Film</Link>
              <Link href="/series" onClick={() => setMenuOpen(false)}>Series</Link>
              <Link href="/tvshow" onClick={() => setMenuOpen(false)}>TV Show</Link>
              <Link href="/others" onClick={() => setMenuOpen(false)}>Lainnya</Link>
            </div>
          </div>
          <div className="dropdown">
            <span className="dropdown-trigger">Status ▾</span>
            <div className="dropdown-menu">
              <Link href="/ongoing" onClick={() => setMenuOpen(false)}>Ongoing</Link>
              <Link href="/completed" onClick={() => setMenuOpen(false)}>Completed</Link>
              <Link href="/latest" onClick={() => setMenuOpen(false)}>Terbaru</Link>
              <Link href="/populer" onClick={() => setMenuOpen(false)}>Populer</Link>
              <Link href="/update" onClick={() => setMenuOpen(false)}>Update</Link>
            </div>
          </div>
          <div className="dropdown">
            <span className="dropdown-trigger">Jadwal ▾</span>
            <div className="dropdown-menu">
              {DAYS.map((day) => (
                <Link
                  key={day}
                  href={`/schedule?day=${day}`}
                  onClick={() => setMenuOpen(false)}
                  style={{ textTransform: "capitalize" }}
                >
                  {day}
                </Link>
              ))}
            </div>
          </div>
          <Link href="/genres" onClick={() => setMenuOpen(false)}>Genre</Link>
          <Link href="/catalog" onClick={() => setMenuOpen(false)}>Katalog</Link>
        </div>

        <form className="nav-search" onSubmit={handleSearch}>
          <input
            type="text"
            placeholder="Cari anime, film..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
          <button type="submit">🔍</button>
        </form>

        <button
          className="hamburger"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Menu"
        >
          <span />
          <span />
          <span />
        </button>
      </div>

      <style jsx>{`
        .navbar {
          background: rgba(10, 10, 15, 0.95);
          backdrop-filter: blur(12px);
          border-bottom: 1px solid var(--border);
          position: sticky;
          top: 0;
          z-index: 1000;
        }
        .nav-inner {
          display: flex;
          align-items: center;
          gap: 1.5rem;
          height: 64px;
        }
        .nav-logo {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          font-weight: 800;
          font-size: 1.3rem;
          flex-shrink: 0;
        }
        .logo-icon {
          color: var(--accent);
          font-size: 1.2rem;
        }
        .logo-text {
          background: linear-gradient(135deg, var(--text-primary), var(--accent));
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }
        .nav-links {
          display: flex;
          align-items: center;
          gap: 0.25rem;
          flex: 1;
        }
        .nav-links a, .dropdown-trigger {
          padding: 0.4rem 0.75rem;
          border-radius: 6px;
          color: var(--text-secondary);
          font-size: 0.9rem;
          font-weight: 500;
          transition: all 0.2s;
          cursor: pointer;
          white-space: nowrap;
        }
        .nav-links a:hover, .dropdown-trigger:hover {
          color: var(--text-primary);
          background: var(--bg-hover);
        }
        .dropdown {
          position: relative;
        }
        .dropdown:hover .dropdown-menu {
          opacity: 1;
          visibility: visible;
          transform: translateY(0);
        }
        .dropdown-menu {
          position: absolute;
          top: calc(100% + 8px);
          left: 0;
          background: var(--bg-card);
          border: 1px solid var(--border);
          border-radius: 10px;
          min-width: 160px;
          padding: 0.5rem;
          opacity: 0;
          visibility: hidden;
          transform: translateY(-8px);
          transition: all 0.2s;
          box-shadow: 0 8px 32px rgba(0,0,0,0.4);
          z-index: 100;
        }
        .dropdown-menu a {
          display: block;
          padding: 0.5rem 0.75rem;
          border-radius: 6px;
          color: var(--text-secondary);
          font-size: 0.85rem;
          transition: all 0.15s;
        }
        .dropdown-menu a:hover {
          background: var(--bg-hover);
          color: var(--text-primary);
        }
        .nav-search {
          display: flex;
          align-items: center;
          gap: 0;
          background: var(--bg-card);
          border: 1px solid var(--border);
          border-radius: 8px;
          overflow: hidden;
          transition: border-color 0.2s;
          flex-shrink: 0;
        }
        .nav-search:focus-within {
          border-color: var(--accent);
        }
        .nav-search input {
          background: transparent;
          border: none;
          outline: none;
          padding: 0.5rem 0.75rem;
          color: var(--text-primary);
          font-size: 0.875rem;
          width: 200px;
        }
        .nav-search input::placeholder {
          color: var(--text-muted);
        }
        .nav-search button {
          background: var(--accent);
          border: none;
          padding: 0.5rem 0.75rem;
          cursor: pointer;
          font-size: 0.85rem;
          transition: background 0.2s;
        }
        .nav-search button:hover {
          background: var(--accent-hover);
        }
        .hamburger {
          display: none;
          flex-direction: column;
          gap: 5px;
          background: none;
          border: none;
          cursor: pointer;
          padding: 4px;
        }
        .hamburger span {
          display: block;
          width: 22px;
          height: 2px;
          background: var(--text-primary);
          border-radius: 2px;
          transition: all 0.3s;
        }
        @media (max-width: 900px) {
          .hamburger { display: flex; }
          .nav-links {
            display: none;
            position: fixed;
            top: 64px;
            left: 0;
            right: 0;
            bottom: 0;
            background: var(--bg-primary);
            flex-direction: column;
            align-items: flex-start;
            padding: 1.5rem;
            gap: 0.25rem;
            overflow-y: auto;
          }
          .nav-links.open { display: flex; }
          .dropdown-menu {
            position: static;
            opacity: 1;
            visibility: visible;
            transform: none;
            box-shadow: none;
            background: var(--bg-secondary);
            margin-top: 0.25rem;
            margin-left: 1rem;
          }
          .nav-search input { width: 150px; }
        }
        @media (max-width: 500px) {
          .nav-search input { width: 110px; }
        }
      `}</style>
    </nav>
  );
}
