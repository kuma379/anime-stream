import { getSchedule } from '@/lib/api';
import Link from 'next/link';
import Image from 'next/image';
import type { Metadata } from 'next';
import { Calendar } from 'lucide-react';
export const metadata: Metadata = { title: 'Jadwal Tayang Anime' };
export const revalidate = 3600;

export default async function SchedulePage() {
  const { days } = await getSchedule();
  return (
    <div className="max-w-7xl mx-auto px-4 py-10">
      <div className="mb-8">
        <h1 className="text-3xl font-black text-white mb-2 flex items-center gap-3"><Calendar className="w-7 h-7 text-purple-400" />Jadwal Tayang</h1>
        <p className="text-gray-400">Jadwal anime update mingguan</p>
      </div>
      <div className="space-y-10">
        {days.map(day => (
          <div key={day.day}>
            <h2 className="text-xl font-bold text-white mb-4 pb-2 border-b border-white/10 flex items-center gap-2">
              <span className="w-2 h-6 bg-indigo-500 rounded-full" />{day.day}
              <span className="text-sm font-normal text-gray-500">({day.animeList.length} anime)</span>
            </h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
              {day.animeList.map(a => (
                <Link key={a.animeId} href={`/anime/${a.animeId}`}
                  className="group block bg-[#111118] rounded-xl overflow-hidden border border-white/5 hover:border-indigo-500/50 transition-all hover:-translate-y-0.5">
                  <div className="relative aspect-[3/4] overflow-hidden bg-[#1a1a2e]">
                    {a.poster && <Image src={a.poster} alt={a.title} fill sizes="20vw" className="object-cover group-hover:scale-105 transition-transform" />}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                    {a.estimation && <div className="absolute bottom-2 left-2 bg-purple-900/80 text-purple-200 text-[10px] font-semibold px-2 py-0.5 rounded-md">{a.estimation}</div>}
                  </div>
                  <div className="p-2.5">
                    <h3 className="text-xs font-semibold text-gray-200 line-clamp-2 group-hover:text-indigo-300 transition-colors">{a.title}</h3>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}