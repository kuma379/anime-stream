import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "AnimeStream - Nonton Anime, Film & Donghua",
  description:
    "Nonton anime, film, dan donghua subtitle Indonesia secara gratis. Update terbaru setiap hari.",
  keywords: "anime, film, donghua, subtitle indonesia, nonton gratis",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="id">
      <body>
        <Navbar />
        <main style={{ minHeight: "calc(100vh - 140px)" }}>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
