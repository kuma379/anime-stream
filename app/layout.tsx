import type { Metadata } from 'next';
import './globals.css';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import AdDisplay from '@/components/AdDisplay';
import NativeBanner from '@/components/NativeBanner';

const SITE_URL = 'https://anime-stream.vercel.app';

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: { default: 'AnimeStream — Nonton Anime Sub Indo', template: '%s | AnimeStream' },
  description: 'Nonton anime sub indo terbaru, terlengkap, dan tercepat update. Streaming anime gratis berkualitas tinggi.',
  keywords: ['anime', 'nonton anime', 'sub indo', 'anime sub indonesia', 'anime terbaru', 'streaming anime'],
  robots: { index: true, follow: true },
  openGraph: {
    type: 'website', locale: 'id_ID', url: SITE_URL, siteName: 'AnimeStream',
    title: 'AnimeStream — Nonton Anime Sub Indo',
    description: 'Nonton anime sub indo terbaru, terlengkap, dan tercepat update.',
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="id">
      <body>
        <Navbar />
        <AdDisplay position="top" />
        <NativeBanner />
        <main className="min-h-screen">{children}</main>
        <AdDisplay position="bottom" />
        <Footer />
      </body>
    </html>
  );
}