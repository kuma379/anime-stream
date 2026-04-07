import axios from "axios";

const BASE_URL =
  process.env.NEXT_PUBLIC_API_BASE ||
  "https://www.sankavollerei.com/anime/winbu";

export const api = axios.create({
  baseURL: BASE_URL,
  timeout: 15000,
  headers: {
    "Content-Type": "application/json",
  },
});

export const getHome = () => api.get("/home");
export const getSearch = (q: string) => api.get(`/search?q=${encodeURIComponent(q)}`);
export const getAnimeDonghua = (page = 1) => api.get(`/animedonghua?page=${page}`);
export const getFilms = (page = 1) => api.get(`/film?page=${page}`);
export const getSeries = (page = 1) => api.get(`/series?page=${page}`);
export const getTvShow = (page = 1) => api.get(`/tvshow?page=${page}`);
export const getOthers = (page = 1) => api.get(`/others?page=${page}`);
export const getGenres = () => api.get("/genres");
export const getGenre = (genre: string, page = 1) => api.get(`/genre/${genre}?page=${page}`);
export const getSchedule = (day: string) => api.get(`/schedule?day=${day}`);
export const getUpdate = (page = 1) => api.get(`/update?page=${page}`);
export const getLatest = (page = 1) => api.get(`/latest?page=${page}`);
export const getOngoing = (page = 1) => api.get(`/ongoing?page=${page}`);
export const getCompleted = (page = 1) => api.get(`/completed?page=${page}`);
export const getPopuler = (page = 1) => api.get(`/populer?page=${page}`);
export const getAllAnime = (page = 1) => api.get(`/all-anime?page=${page}`);
export const getAllAnimeReverse = (page = 1) => api.get(`/all-anime-reverse?page=${page}`);
export const getCatalog = (params: Record<string, string>) => {
  const qs = new URLSearchParams(params).toString();
  return api.get(`/catalog?${qs}`);
};
export const getList = (params: Record<string, string>) => {
  const qs = new URLSearchParams(params).toString();
  return api.get(`/list?${qs}`);
};
export const getAnimeDetail = (slug: string) => api.get(`/anime/${slug}`);
export const getEpisode = (slug: string) => api.get(`/episode/${slug}`);
export const getSeriesDetail = (slug: string) => api.get(`/series/${slug}`);
export const getFilmDetail = (slug: string) => api.get(`/film/${slug}`);
export const getServer = (post: string, nume: string, type: string) =>
  api.get(`/server?post=${post}&nume=${nume}&type=${type}`);
