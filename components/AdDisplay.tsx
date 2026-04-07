'use client';
import { useEffect, useState } from 'react';

interface Ad { id: string; type: 'banner' | 'script'; position: 'top' | 'bottom' | 'sidebar'; title: string; imageUrl?: string; linkUrl?: string; scriptCode?: string; active: boolean; }
interface Props { position: 'top' | 'bottom' | 'sidebar'; }

export default function AdDisplay({ position }: Props) {
  const [ads, setAds] = useState<Ad[]>([]);
  useEffect(() => {
    fetch('/api/ads').then(r => r.json()).then((all: Ad[]) => setAds(all.filter(a => a.active && a.position === position))).catch(() => {});
  }, [position]);
  if (!ads.length) return null;
  return <div className="w-full" />;
}