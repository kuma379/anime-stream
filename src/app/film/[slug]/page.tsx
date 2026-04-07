"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import axios from "axios";
import Image from "next/image";
import type { Server } from "@/types";

const BASE_URL =
  process.env.NEXT_PUBLIC_API_BASE ||
  "https://www.sankavollerei.com/anime/winbu";

interface FilmData {
  title?: string;
  poster?: string;
  synopsis?: string;
  status?: string;
  type?: string;
  score?: string;
  genres?: string[];
  servers?: Server[];
  [key: string]: unknown;
}

function extractServers(data: Record<string, unknown>): Server[] {
  for (const key of ["servers", "server", "mirrors", "links"]) {
    const v = data[key];
    if (Array.isArray(v)) return v as Server[];
  }
  return [];
}

export default function FilmDetailPage() {
  const params = useParams();
  const slug = params.slug as string;
  const [film, setFilm] = useState<FilmData | null>(null);
  const [selectedServer, setSelectedServer] = useState<Server | null>(null);
  const [streamUrl, setStreamUrl] = useState("");
  const [loading, setLoading] = useState(true);
  const [serverLoading, setServerLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!slug) return;
    setLoading(true);
    axios
      .get(`${BASE_URL}/film/${slug}`)
      .then((res) => {
        const data = (res.data || {}) as Record<string, unknown>;
        const nested = data.data as Record<string, unknown> | undefined;
        const d = (nested && (nested as FilmData).title ? nested : data) as FilmData;
        d.servers = extractServers(data) || extractServers(nested || {});
        setFilm(d);
        if (d.servers && d.servers.length > 0) {
          setSelectedServer(d.servers[0]);
        }
      })
      .catch(() => setError("Gagal memuat film."))
      .finally(() => setLoading(false));
  }, [slug]);

  useEffect(() => {
    if (!selectedServer) return;
    setServerLoading(true);
    setStreamUrl("");
    axios
      .get(`${BASE_URL}/server?post=${selectedServer.post}&nume=${selectedServer.nume}&type=${selectedServer.type}`)
      .then((res) => {
        const data = res.data as Record<string, unknown>;
        setStreamUrl((data.url || data.embed || data.iframe || data.src || "") as string);
      })
      .catch(() => {})
      .finally(() => setServerLoading(false));
  }, [selectedServer]);

  if (loading) {
    return (
      <div className="loading-spinner" style={{ minHeight: "60vh" }}>
        <div className="spinner" />
        <p>Memuat film...</p>
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
    <div>
      {(selectedServer || streamUrl) && (
        <div style={{ background: "#000" }}>
          <div style={{ maxWidth: "1100px", margin: "0 auto", aspectRatio: "16/9", position: "relative" }}>
            {serverLoading ? (
              <div className="loading-spinner"><div className="spinner" /><p>Memuat...</p></div>
            ) : streamUrl ? (
              <iframe
                src={streamUrl}
                allowFullScreen
                allow="autoplay; encrypted-media; picture-in-picture"
                style={{ width: "100%", height: "100%", border: "none" }}
                title={film?.title}
              />
            ) : (
              <div className="loading-spinner"><p>Pilih server untuk memulai</p></div>
            )}
          </div>
        </div>
      )}

      <div className="container" style={{ paddingTop: "2rem", paddingBottom: "3rem" }}>
        <div style={{ display: "flex", gap: "2rem", flexWrap: "wrap", marginBottom: "2rem" }}>
          {film?.poster && (
            <Image
              src={film.poster}
              alt={film.title || slug}
              width={180}
              height={260}
              style={{ borderRadius: "12px", objectFit: "cover", flexShrink: 0 }}
              unoptimized
            />
          )}
          <div style={{ flex: 1 }}>
            <h1 style={{ fontSize: "1.8rem", fontWeight: 800, marginBottom: "0.75rem" }}>{film?.title || slug}</h1>
            <div style={{ display: "flex", gap: "0.5rem", flexWrap: "wrap", marginBottom: "0.75rem" }}>
              {film?.type && <span className="badge badge-movie">{film.type}</span>}
              {film?.status && <span className={`badge badge-${film.status.toLowerCase().includes("airing") ? "ongoing" : "completed"}`}>{film.status}</span>}
              {film?.score && <span style={{ color: "var(--warning)", fontWeight: 600 }}>⭐ {film.score}</span>}
            </div>
            {film?.synopsis && (
              <p style={{ color: "var(--text-secondary)", fontSize: "0.9rem", lineHeight: 1.7 }}>{film.synopsis}</p>
            )}
          </div>
        </div>

        {film?.servers && film.servers.length > 0 && (
          <div>
            <h3 style={{ fontSize: "1rem", fontWeight: 600, marginBottom: "0.75rem", color: "var(--text-secondary)" }}>
              Pilih Server
            </h3>
            <div style={{ display: "flex", gap: "0.5rem", flexWrap: "wrap" }}>
              {film.servers.map((srv, i) => (
                <button
                  key={i}
                  onClick={() => setSelectedServer(srv)}
                  style={{
                    padding: "0.5rem 1.25rem",
                    borderRadius: "8px",
                    border: `1px solid ${selectedServer === srv ? "var(--accent)" : "var(--border)"}`,
                    background: selectedServer === srv ? "var(--accent)" : "var(--bg-card)",
                    color: selectedServer === srv ? "white" : "var(--text-secondary)",
                    fontWeight: 500,
                    cursor: "pointer",
                    transition: "all 0.2s",
                  }}
                >
                  {srv.title || `Server ${i + 1}`}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
