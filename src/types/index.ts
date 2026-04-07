export interface AnimeCard {
  title: string;
  slug: string;
  poster: string;
  type?: string;
  status?: string;
  episode?: string;
  score?: string;
  genres?: string[];
}

export interface EpisodeItem {
  title: string;
  slug: string;
  date?: string;
  episode?: string;
}

export interface Genre {
  name: string;
  slug: string;
}

export interface Server {
  title: string;
  post: string;
  nume: string;
  type: string;
}

export interface AnimeDetail {
  title: string;
  poster: string;
  synopsis?: string;
  genres?: string[];
  status?: string;
  type?: string;
  score?: string;
  episodes?: EpisodeItem[];
  [key: string]: unknown;
}

export interface EpisodeDetail {
  title: string;
  servers?: Server[];
  streamUrl?: string;
  [key: string]: unknown;
}

export interface HomeData {
  ongoingAnime?: AnimeCard[];
  latestEpisodes?: AnimeCard[];
  popularAnime?: AnimeCard[];
  completedAnime?: AnimeCard[];
  [key: string]: unknown;
}

export interface PaginatedData {
  animeList?: AnimeCard[];
  currentPage?: number;
  totalPages?: number;
  [key: string]: unknown;
}

export interface ScheduleData {
  [day: string]: AnimeCard[];
}
