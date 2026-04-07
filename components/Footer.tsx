import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="border-t border-white/5 mt-16 py-10 text-center text-sm text-gray-500">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex flex-wrap justify-center gap-4 mb-4">
          {[['/', 'Beranda'], ['/ongoing', 'Ongoing'], ['/completed', 'Completed'], ['/movies', 'Movies'], ['/genres', 'Genre'], ['/schedule', 'Jadwal']].map(([href, label]) => (
            <Link key={href} href={href} className="hover:text-indigo-400 transition-colors">{label}</Link>
          ))}
        </div>
        <p className="text-gray-600 text-xs">© {new Date().getFullYear()} AnimeStream. Nonton anime sub indo gratis.</p>
        <p className="text-gray-700 text-xs mt-1">Semua konten merupakan hak milik masing-masing pemilik.</p>
      </div>
    </footer>
  );
}