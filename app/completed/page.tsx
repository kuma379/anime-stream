import { getCompleted } from '@/lib/api';
import AnimeCard from '@/components/AnimeCard';
import type { Metadata } from 'next';
export const metadata: Metadata = { title: 'Anime Completed' };
export const revalidate = 600;
export default async function CompletedPage() {
  const { animeList } = await getCompleted();
  return (
    <div className="max-w-7xl mx-auto px-4 py-10">
      <div className="mb-8"><h1 className="text-2xl font-black text-white mb-1">Anime Completed</h1><p className="text-gray-500 text-sm">Anime yang sudah tamat ({animeList.length} judul)</p></div>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
        {animeList.map(a => <AnimeCard key={a.animeId} anime={a} />)}
      </div>
    </div>
  );
}