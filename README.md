# AnimeStream

Website nonton anime, film, dan donghua subtitle Indonesia dengan data dari API Winbu.

## Fitur

- Browse anime, film, series, TV show, donghua
- Pencarian anime
- Filter berdasarkan genre, status (ongoing/completed), tipe
- Jadwal tayang harian
- Player streaming dengan multiple server
- Katalog lengkap dengan filter
- Halaman detail anime dengan daftar episode
- Halaman detail film langsung streaming
- Populer, terbaru, update, dan banyak lagi

## Tech Stack

- **Next.js 14** (App Router)
- **Axios** untuk fetching data dari API
- **TypeScript**
- **CSS-in-JS** (styled-jsx)

## Deploy ke Vercel

1. Push ke GitHub
2. Connect repo ke Vercel
3. Set environment variable: `NEXT_PUBLIC_API_BASE=https://www.sankavollerei.com/anime/winbu`
4. Deploy otomatis setiap push

## Pengembangan Lokal

```bash
npm install
npm run dev
```

Buka [http://localhost:3000](http://localhost:3000)

## Environment Variables

```
NEXT_PUBLIC_API_BASE=https://www.sankavollerei.com/anime/winbu
```
