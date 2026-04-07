import { getGenreAnime } from '@/lib/api';
import AnimeCard from '@/components/AnimeCard';
import { notFound } from 'next/navigation';
import type { Metadata } from 'next';

interface Props { params: Promise<{ genreId: string }> }

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { genreId } = await params;
  const title = genreId.replace(/-/g, ' ').replace(/\b\w/g, c => c.toUpperCase());
  return { title: `Anime Genre ${title}` };
}
export const revalidate = 3600;

export default async function GenrePage({ params }: Props) {
  const { genreId } = await params;
  const data = await getGenreAnime(genreId).catch(() => notFound());
  const list = data.animeList ?? [];
  const title = genreId.replace(/-/g, ' ').replace(/\b\w/g, c => c.toUpperCase());
  return (
    <div className="max-w-7xl mx-auto px-4 py-10">
      <div className="mb-8"><h1 className="text-2xl font-black text-white mb-1">Genre: {title}</h1><p className="text-gray-500 text-sm">{list.length} judul</p></div>
      {list.length > 0 ? (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
          {list.map(a => <AnimeCard key={a.animeId} anime={a} />)}
        </div>
      ) : <div className="text-center py-20 text-gray-500">Tidak ada anime untuk genre ini.</div>}
    </div>
  );
}