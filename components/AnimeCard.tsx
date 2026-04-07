import Link from 'next/link';
import Image from 'next/image';
import { Star } from 'lucide-react';
import type { AnimeListItem } from '@/types';

interface Props { anime: AnimeListItem; showEpisode?: boolean; }

export default function AnimeCard({ anime, showEpisode }: Props) {
  return (
    <Link href={`/anime/${anime.animeId}`}
      className="group block bg-[#111118] rounded-xl overflow-hidden border border-white/5 hover:border-indigo-500/50 transition-all duration-200 hover:-translate-y-0.5">
      <div className="relative aspect-[3/4] overflow-hidden bg-[#1a1a2e]">
        {anime.poster && (
          <Image src={anime.poster} alt={anime.title} fill
            sizes="(max-width: 640px) 50vw, 20vw"
            className="object-cover transition-transform duration-300 group-hover:scale-105" />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent pointer-events-none" />
        {showEpisode && anime.episodes && (
          <div className="absolute top-2 right-2 bg-indigo-600 text-white text-[10px] font-bold px-2 py-0.5 rounded-md">Ep {anime.episodes}</div>
        )}
        {anime.score && (
          <div className="absolute top-2 left-2 flex items-center gap-0.5 bg-black/70 backdrop-blur-sm text-yellow-400 text-[10px] font-bold px-2 py-0.5 rounded-md">
            <Star className="w-2.5 h-2.5 fill-current" />{anime.score}
          </div>
        )}
        {anime.type && !showEpisode && (
          <div className="absolute bottom-2 left-2 bg-indigo-900/80 backdrop-blur-sm text-indigo-200 text-[10px] font-semibold px-2 py-0.5 rounded-md">{anime.type}</div>
        )}
        {anime.status && showEpisode && (
          <div className={`absolute bottom-2 left-2 text-[10px] font-semibold px-2 py-0.5 rounded-md backdrop-blur-sm ${anime.status === 'Ongoing' ? 'bg-emerald-500/80 text-white' : 'bg-blue-500/80 text-white'}`}>{anime.status}</div>
        )}
      </div>
      <div className="p-2.5">
        <h3 className="text-xs font-semibold text-gray-200 line-clamp-2 leading-snug group-hover:text-indigo-300 transition-colors duration-200">{anime.title}</h3>
        {anime.releasedOn && <p className="text-[10px] text-gray-600 mt-1">{anime.releasedOn}</p>}
      </div>
    </Link>
  );
}