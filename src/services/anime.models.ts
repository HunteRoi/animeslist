export interface APISearchResponse {
  request_hash: string;
  request_cached: boolean;
  request_cache_expiry: number;
  results: APISearchedAnime[];
}

interface APISearchedAnime {
  mal_id: number;
  url: string;
  image_url: string;
  title: string;
  airing: boolean;
  synopsis: string;
  type: string;
  episodes: number;
  score: number;
  start_date: Date;
  end_date: Date;
  members: number;
  rated: string;
}

export interface LinkAPIResult {
  content: string;
}

interface From {
  day: number;
  month: number;
  year: number;
}

interface To {
  day: number;
  month: number;
  year: number;
}

interface Prop {
  from: From;
  to: To;
}

interface Aired {
  from: Date;
  to: Date;
  prop: Prop;
  string: string;
}

interface Adaptation {
  mal_id: number;
  type: string;
  name: string;
  url: string;
}

interface Sequel {
  mal_id: number;
  type: string;
  name: string;
  url: string;
}

interface SideStory {
  mal_id: number;
  type: string;
  name: string;
  url: string;
}

interface Summary {
  mal_id: number;
  type: string;
  name: string;
  url: string;
}

interface Related {
  adaptation: Adaptation[];
  sequel: Sequel[];
  sideStory: SideStory[];
  summary: Summary[];
}

interface Producer {
  mal_id: number;
  type: string;
  name: string;
  url: string;
}

interface Licensor {
  mal_id: number;
  type: string;
  name: string;
  url: string;
}

interface Studio {
  mal_id: number;
  type: string;
  name: string;
  url: string;
}

interface Genre {
  mal_id: number;
  type: string;
  name: string;
  url: string;
}

export interface APIAnimeResponse {
  request_hash: string;
  request_cached: boolean;
  request_cache_expiry: number;
  mal_id: number;
  url: string;
  image_url: string;
  trailer_url: string;
  title: string;
  title_english: string;
  title_japanese: string;
  title_synonyms: any[];
  type: string;
  source: string;
  episodes: number;
  status: string;
  airing: boolean;
  aired: Aired;
  duration: string;
  rating: string;
  score: number;
  scored_by: number;
  rank: number;
  popularity: number;
  members: number;
  favorites: number;
  synopsis: string;
  background: string;
  premiered: string;
  broadcast: string;
  related: Related;
  producers: Producer[];
  licensors: Licensor[];
  studios: Studio[];
  genres: Genre[];
  opening_themes: string[];
  ending_themes: string[];
}
