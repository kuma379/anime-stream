import Link from 'next/link';
import Image from 'next/image';
import { getHome, getPopular } from '@/lib/api';
import AnimeCard from '@/components/AnimeCard';
import SectionHeader from '@/components/SectionHeader';
import { Clock, Zap, TrendingUp, Film, Calendar, BookOpen, ChevronRight } from 'lucide-react';

export const revalidate = 60;

const quickLinks = [
  { href: '/ongoing', label: 'Ongoing', icon: Zap, color: 'text-green-400 bg-green-900/30 border-green-800/50' },
  { href: '/popular', label: 'Populer', icon: TrendingUp, color: 'text-orange-400 bg-orange-900/30 border-orange-800/50' },
  { href: '/movies', label: 'Movies', icon: Film, color: 'text-blue-400 bg-blue-900/30 border-blue-800/50' },
  { href: '/schedule', label: 'Jadwal', icon: Calendar, color: 'text-purple-400 bg-purple-900/30 border-purple-800/50' },
  { href: '/genres', label: 'Genre', icon: BookOpen, color: 'text-pink-400 bg-pink-900/30 border-pink-800/50' },
  { href: '/completed', label: 'Completed', icon: ChevronRight, color: 'text-indigo-400 bg-indigo-900/30 border-indigo-800/50' },
];

export default async function HomePage() {
  const [home, popularData] = await Promise.all([getHome(), getPopular()]).catch(() => [null, null] as [null, null]);
  const recent = (home as any)?.recent?.animeList ?? [];
  const movies = (home as any)?.movie?.animeList ?? [];
  const popular = (popularData as any)?.animeList ?? [];

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 space-y-10">
      <div className="text-center py-8">
        <h1 className="text-4xl font-black text-white mb-3">Nonton Anime <span className="text-indigo-400">Sub Indo</span></h1>
        <p className="text-gray-400 text-lg">Terbaru, terlengkap, update tercepat — gratis!</p>
      </div>

      <div className="grid grid-cols-3 sm:grid-cols-6 gap-3">
        {quickLinks.map(({ href, label, icon: Icon, color }) => (
          <Link key={href} href={href}
            className={`flex flex-col items-center gap-2 py-4 px-2 rounded-2xl border transition-all hover:-translate-y-0.5 hover:shadow-lg ${color}`}>
            <Icon className="w-5 h-5" />
            <span className="text-xs font-semibold text-white">{label}</span>
          </Link>
        ))}
      </div>

      {recent.length > 0 && (
        <section>
          <SectionHeader title="Anime Terbaru" href="/ongoing" viewAllLabel="Lihat semua" />
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
            {recent.slice(0, 12).map((anime: any) => <AnimeCard key={anime.animeId + anime.episodes} anime={anime} showEpisode />)}
          </div>
        </section>
      )}

      {popular.length > 0 && (
        <section>
          <SectionHeader title="Populer" href="/popular" viewAllLabel="Lihat semua" />
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
            {popular.slice(0, 6).map((anime: any) => <AnimeCard key={anime.animeId} anime={anime} />)}
          </div>
        </section>
      )}

      {movies.length > 0 && (
        <section>
          <SectionHeader title="Movies" href="/movies" viewAllLabel="Lihat semua" />
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
            {movies.slice(0, 6).map((anime: any) => <AnimeCard key={anime.animeId} anime={anime} />)}
          </div>
        </section>
      )}
    </div>
  );
}