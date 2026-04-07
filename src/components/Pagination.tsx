"use client";

import { useRouter } from "next/navigation";

interface Props {
  currentPage: number;
  totalPages: number;
  baseUrl: string;
  params?: Record<string, string>;
}

export default function Pagination({ currentPage, totalPages, baseUrl, params }: Props) {
  const router = useRouter();

  const getUrl = (page: number) => {
    const p = new URLSearchParams({ ...(params || {}), page: String(page) });
    return `${baseUrl}?${p.toString()}`;
  };

  const pages = [];
  const start = Math.max(1, currentPage - 2);
  const end = Math.min(totalPages, currentPage + 2);

  for (let i = start; i <= end; i++) {
    pages.push(i);
  }

  if (totalPages <= 1) return null;

  return (
    <div className="pagination">
      <button
        onClick={() => router.push(getUrl(1))}
        disabled={currentPage === 1}
      >
        «
      </button>
      <button
        onClick={() => router.push(getUrl(currentPage - 1))}
        disabled={currentPage === 1}
      >
        ‹
      </button>
      {start > 1 && <span style={{ color: "var(--text-muted)" }}>...</span>}
      {pages.map((p) => (
        <button
          key={p}
          onClick={() => router.push(getUrl(p))}
          className={p === currentPage ? "active" : ""}
        >
          {p}
        </button>
      ))}
      {end < totalPages && <span style={{ color: "var(--text-muted)" }}>...</span>}
      <button
        onClick={() => router.push(getUrl(currentPage + 1))}
        disabled={currentPage === totalPages}
      >
        ›
      </button>
      <button
        onClick={() => router.push(getUrl(totalPages))}
        disabled={currentPage === totalPages}
      >
        »
      </button>
    </div>
  );
}
