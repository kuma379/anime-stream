import axios from 'axios';
import type { AnimeDetail, AnimeListItem, EpisodeDetail, GenreItem, HomeData, ScheduleDay } from '@/types';

const BASE = 'https://www.sankavollerei.com/anime/winbu';
const api = axios.create({ baseURL: BASE, timeout: 15000, headers: { 'Accept': 'application/json', 'User-Agent': 'Mozilla/5.0' } });

async function get<T>(p: string): Promise<T> {
  const { data } = await api.get<{ data: T }>(p);
  return data.data;
}

export const getHome = () => get<HomeData>('/home');
export const getRecent = () => get<{ animeList: AnimeListItem[] }>('/recent');
export const getPopular = () => get<{ animeList: AnimeListItem[] }>('/popular');
export const getOngoing = () => get<{ animeList: AnimeListItem[] }>('/ongoing');
export const getCompleted = () => get<{ animeList: AnimeListItem[] }>('/completed');
export const getMovies = () => get<{ animeList: AnimeListItem[] }>('/movies');
export const getBatch = () => get<{ batchList: AnimeListItem[] }>('/batch');
export const searchAnime = (q: string) => get<{ animeList: AnimeListItem[] }>(`/search?q=${encodeURIComponent(q)}`);
export const getGenres = () => get<{ genreList: GenreItem[] }>('/genres');
export const getGenreAnime = (id: string) => get<{ animeList: AnimeListItem[] }>(`/genres/${id}`);
export const getAnimeDetail = (id: string) => get<AnimeDetail>(`/anime/${id}`);
export const getEpisode = (id: string) => get<EpisodeDetail>(`/episode/${id}`);
export const getServerUrl = (id: string) => get<{ url: string }>(`/server/${id}`);
export const getSchedule = () => get<{ days: ScheduleDay[] }>('/schedule');