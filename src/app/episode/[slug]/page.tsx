"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import axios from "axios";
import Link from "next/link";
import type { Server } from "@/types";

const BASE_URL =
  process.env.NEXT_PUBLIC_API_BASE ||
  "https://www.sankavollerei.com/anime/winbu";

interface EpisodeData {
  title?: string;
  servers?: Server[];
  prev?: string;
  next?: string;
  animeSlug?: string;
  [key: string]: unknown;
}

function extractServers(data: Record<string, unknown>): Server[] {
  for (const key of ["servers", "server", "mirrors", "links"]) {
    const v = data[key];
    if (Array.isArray(v)) return v as Server[];
  }
  return [];
}

export default function EpisodePage() {
  const params = useParams();
  const slug = params.slug as string;
  const [episode, setEpisode] = useState<EpisodeData | null>(null);
  const [selectedServer, setSelectedServer] = useState<Server | null>(null);
  const [streamUrl, setStreamUrl] = useState("");
  const [loading, setLoading] = useState(true);
  const [serverLoading, setServerLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!slug) return;
    setLoading(true);
    axios
      .get(`${BASE_URL}/episode/${slug}`)
      .then((res) => {
        const data = (res.data || {}) as Record<string, unknown>;
        const nested = data.data as Record<string, unknown> | undefined;
        const d = (nested && nested.title ? nested : data) as EpisodeData;
        d.servers = extractServers(data) || extractServers(nested || {});
        setEpisode(d);
        if (d.servers && d.servers.length > 0) {
          setSelectedServer(d.servers[0]);
        }
      })
      .catch(() => setError("Gagal memuat episode."))
      .finally(() => setLoading(false));
  }, [slug]);

  useEffect(() => {
    if (!selectedServer) return;
    setServerLoading(true);
    setStreamUrl("");
    axios
      .get(
        `${BASE_URL}/server?post=${selectedServer.post}&nume=${selectedServer.nume}&type=${selectedServer.type}`
      )
      .then((res) => {
        const data = res.data as Record<string, unknown>;
        const url =
          (data.url as string) ||
          (data.embed as string) ||
          (data.iframe as string) ||
          (data.src as string) ||
          "";
        setStreamUrl(url);
      })
      .catch(() => {})
      .finally(() => setServerLoading(false));
  }, [selectedServer]);

  if (loading) {
    return (
      <div className="loading-spinner" style={{ minHeight: "60vh" }}>
        <div className="spinner" />
        <p>Memuat episode...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container" style={{ paddingTop: "3rem" }}>
        <div className="error-box">{error}</div>
      </div>
    );
  }

  return (
    <div className="episode-page">
      <div className="player-section">
        <div className="player-wrapper">
          {serverLoading ? (
            <div className="player-loading">
              <div className="spinner" />
              <p>Memuat server...</p>
            </div>
          ) : streamUrl ? (
            <iframe
              src={streamUrl}
              allowFullScreen
              allow="autoplay; encrypted-media; picture-in-picture"
              className="video-player"
              title={episode?.title || "Episode"}
            />
          ) : (
            <div className="player-placeholder">
              <p>▶</p>
              <p>Pilih server untuk memulai streaming</p>
            </div>
          )}
        </div>
      </div>

      <div className="container episode-controls">
        <div className="episode-header">
          <h1 className="episode-title">{episode?.title || slug}</h1>
          <div className="episode-nav">
            {episode?.prev && (
              <Link href={`/episode/${episode.prev}`} className="nav-btn">
                ← Sebelumnya
              </Link>
            )}
            {episode?.animeSlug && (
              <Link href={`/anime/${episode.animeSlug}`} className="nav-btn">
                Daftar Episode
              </Link>
            )}
            {episode?.next && (
              <Link href={`/episode/${episode.next}`} className="nav-btn primary">
                Berikutnya →
              </Link>
            )}
          </div>
        </div>

        {episode?.servers && episode.servers.length > 0 && (
          <div className="server-section">
            <h3>Pilih Server</h3>
            <div className="server-list">
              {episode.servers.map((srv, i) => (
                <button
                  key={i}
                  className={`server-btn ${selectedServer === srv ? "active" : ""}`}
                  onClick={() => setSelectedServer(srv)}
                >
                  {srv.title || `Server ${i + 1}`}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>

      <style jsx>{`
        .episode-page {
          background: var(--bg-primary);
          min-height: 100vh;
        }
        .player-section {
          background: #000;
          width: 100%;
        }
        .player-wrapper {
          max-width: 1100px;
          margin: 0 auto;
          aspect-ratio: 16/9;
          position: relative;
        }
        .video-player {
          width: 100%;
          height: 100%;
          border: none;
        }
        .player-loading, .player-placeholder {
          position: absolute;
          inset: 0;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          gap: 1rem;
          background: #0a0a0f;
          color: var(--text-secondary);
        }
        .player-placeholder p:first-child {
          font-size: 4rem;
          color: var(--text-muted);
        }
        .episode-controls {
          padding-top: 1.5rem;
          padding-bottom: 3rem;
        }
        .episode-header {
          display: flex;
          flex-wrap: wrap;
          align-items: flex-start;
          justify-content: space-between;
          gap: 1rem;
          margin-bottom: 2rem;
        }
        .episode-title {
          font-size: 1.4rem;
          font-weight: 700;
          color: var(--text-primary);
          flex: 1;
        }
        .episode-nav {
          display: flex;
          gap: 0.5rem;
          flex-wrap: wrap;
        }
        .nav-btn {
          padding: 0.5rem 1rem;
          border-radius: 8px;
          border: 1px solid var(--border);
          background: var(--bg-card);
          color: var(--text-secondary);
          font-size: 0.875rem;
          font-weight: 500;
          transition: all 0.2s;
        }
        .nav-btn:hover {
          background: var(--bg-hover);
          color: var(--text-primary);
        }
        .nav-btn.primary {
          background: var(--accent);
          border-color: var(--accent);
          color: white;
        }
        .nav-btn.primary:hover {
          background: var(--accent-hover);
        }
        .server-section h3 {
          font-size: 1rem;
          font-weight: 600;
          margin-bottom: 0.75rem;
          color: var(--text-secondary);
        }
        .server-list {
          display: flex;
          gap: 0.5rem;
          flex-wrap: wrap;
        }
        .server-btn {
          padding: 0.5rem 1.25rem;
          border-radius: 8px;
          border: 1px solid var(--border);
          background: var(--bg-card);
          color: var(--text-secondary);
          font-size: 0.875rem;
          font-weight: 500;
          cursor: pointer;
          transition: all 0.2s;
        }
        .server-btn:hover {
          background: var(--bg-hover);
          color: var(--text-primary);
        }
        .server-btn.active {
          background: var(--accent);
          border-color: var(--accent);
          color: white;
        }
      `}</style>
    </div>
  );
}
