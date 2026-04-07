import { getAnimeDetail } from '@/lib/api';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { Star, Clock, Tv, BookOpen, Calendar, Users, PlayCircle, ChevronRight } from 'lucide-react';
import type { Metadata } from 'next';

interface Props { params: Promise<{ animeId: string }> }

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { animeId } = await params;
  try {
    const anime = await getAnimeDetail(animeId);
    const title = anime.english || anime.japanese || animeId.replace(/-/g, ' ');
    return { title, description: anime.synopsis?.paragraphs?.[0]?.slice(0, 160) ?? `Nonton ${title} sub indo.` };
  } catch { return { title: 'Anime Detail' }; }
}
export const revalidate = 3600;

export default async function AnimeDetailPage({ params }: Props) {
  const { animeId } = await params;
  const anime = await getAnimeDetail(animeId).catch(() => notFound());
  const title = anime.english || anime.japanese || animeId.replace(/-/g, ' ');

  const infoItems = [
    { icon: Tv, label: 'Tipe', value: anime.type },
    { icon: PlayCircle, label: 'Episode', value: anime.episodes?.toString() },
    { icon: Clock, label: 'Durasi', value: anime.duration },
    { icon: Calendar, label: 'Tayang', value: anime.aired },
    { icon: BookOpen, label: 'Studio', value: anime.studios },
    { icon: Users, label: 'Pengguna', value: anime.score?.users },
  ].filter(i => i.value);

  return (
    <div>
      <div className="relative h-72 overflow-hidden">
        {anime.poster && (
          <>
            <Image src={anime.poster} alt={title} fill className="object-cover object-top blur-md scale-110 opacity-25" priority />
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#0d0d14]/60 to-[#0d0d14]" />
          </>
        )}
      </div>

      <div className="max-w-7xl mx-auto px-4 -mt-32 relative pb-16">
        <div className="flex flex-col md:flex-row gap-8">
          <div className="shrink-0 mx-auto md:mx-0">
            <div className="relative w-44 h-64 rounded-2xl overflow-hidden shadow-2xl ring-1 ring-white/10">
              {anime.poster ? <Image src={anime.poster} alt={title} fill className="object-cover" priority />
                : <div className="absolute inset-0 bg-[#1a1a2e] flex items-center justify-center text-gray-600">No Image</div>}
            </div>
          </div>

          <div className="flex-1 pt-0 md:pt-28">
            <div className="flex flex-wrap gap-2 mb-3">
              {anime.status && <span className={`text-xs font-bold px-3 py-1 rounded-full ${anime.status === 'Ongoing' ? 'bg-green-500/20 text-green-400 border border-green-500/30' : 'bg-blue-500/20 text-blue-400 border border-blue-500/30'}`}>{anime.status}</span>}
              {anime.type && <span className="text-xs font-bold px-3 py-1 rounded-full bg-indigo-500/20 text-indigo-400 border border-indigo-500/30">{anime.type}</span>}
            </div>
            <h1 className="text-3xl font-black text-white mb-2">{title}</h1>
            {anime.japanese && <p className="text-gray-400 text-sm mb-4">{anime.japanese}</p>}
            {anime.score?.value && (
              <div className="flex items-center gap-2 mb-5">
                <Star className="w-5 h-5 text-yellow-400 fill-current" />
                <span className="text-2xl font-black text-yellow-400">{anime.score.value}</span>
                <span className="text-gray-500 text-sm">/ 10</span>
              </div>
            )}
            {infoItems.length > 0 && (
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mb-5">
                {infoItems.map(({ icon: Icon, label, value }) => (
                  <div key={label} className="bg-[#111118] border border-white/5 rounded-xl p-3">
                    <div className="flex items-center gap-2 mb-1"><Icon className="w-3.5 h-3.5 text-indigo-400" /><span className="text-[10px] text-gray-500 uppercase tracking-wider">{label}</span></div>
                    <p className="text-sm font-semibold text-white">{value}</p>
                  </div>
                ))}
              </div>
            )}
            {anime.genreList?.length > 0 && (
              <div className="flex flex-wrap gap-2 mb-5">
                {anime.genreList.map(g => (
                  <Link key={g.genreId} href={`/genres/${g.genreId}`}
                    className="text-xs font-medium text-indigo-300 bg-indigo-900/40 hover:bg-indigo-800/50 border border-indigo-700/40 px-3 py-1 rounded-full transition-colors">{g.title}</Link>
                ))}
              </div>
            )}
          </div>
        </div>

        {anime.synopsis?.paragraphs?.length > 0 && (
          <div className="mt-8 bg-[#111118] border border-white/5 rounded-2xl p-6">
            <h2 className="text-base font-bold text-white mb-3">Sinopsis</h2>
            <div className="space-y-3">{anime.synopsis.paragraphs.map((p, i) => <p key={i} className="text-sm text-gray-400 leading-relaxed">{p}</p>)}</div>
          </div>
        )}

        {anime.episodeList?.length > 0 && (
          <div className="mt-8">
            <h2 className="text-base font-bold text-white mb-4">Daftar Episode <span className="text-gray-500 font-normal text-sm">({anime.episodeList.length})</span></h2>
            <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-8 gap-2">
              {anime.episodeList.map(ep => (
                <Link key={ep.episodeId} href={`/watch/${ep.episodeId}`}
                  className="group flex items-center justify-center gap-1.5 bg-[#111118] hover:bg-indigo-600 border border-white/5 hover:border-indigo-500 rounded-xl py-3 px-2 text-xs font-semibold text-gray-300 hover:text-white transition-all">
                  <PlayCircle className="w-3 h-3 opacity-60 group-hover:opacity-100" />
                  {String(ep.title).replace(/[^0-9]/g, '') || String(ep.title).slice(0, 8)}
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}