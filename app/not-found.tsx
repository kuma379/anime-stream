import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4 text-center">
      <div className="text-8xl font-black text-indigo-600 mb-4">404</div>
      <h1 className="text-2xl font-bold text-white mb-2">Halaman Tidak Ditemukan</h1>
      <p className="text-gray-400 mb-8">Anime atau halaman yang kamu cari tidak ada.</p>
      <Link href="/" className="px-6 py-3 bg-indigo-600 hover:bg-indigo-500 text-white font-bold rounded-xl transition-colors">
        Kembali ke Beranda
      </Link>
    </div>
  );
}