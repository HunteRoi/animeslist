import { fullAnimeAPI, animeFullAnimeAPIUri, searchFullAnimeAPIUri, streamingUrlAnimeAPI } from './config';
import { AnimeModel, Score } from '../models';
import { APISearchResponse, LinkAPIResult, APIAnimeResult } from './anime.models';

function selectUrlInContent(result: LinkAPIResult): string | null {
  if (!result || !result.content) return null;

  const matches = result && result.content && /href=""?([a-zA-Z\\\-/]+)"?"/.exec(result.content);
  if (matches && matches.length >= 2) {
    const uri = matches[1].replace(/\\/g, '');
    return `https://anitaku.to/${uri}`;
  }
  return null;
}

async function getAnimeProfileLink(url: string): Promise<LinkAPIResult | null> {
  try {
    const result = await fetch(url);
    return result.json();
  } catch (err) {
    console.error(err);
    return null;
  }
}

// eslint-disable-next-line
async function getData(url: string): Promise<any> {
  try {
    const result = await fetch(url);
    return result.json();
  } catch (err) {
    console.error(err);
  }
}

async function getAnimeData(url: string): Promise<APIAnimeResult> {
  const response = await getData(url);
  return response.data;
}

async function getSearchData(url: string): Promise<APISearchResponse> {
  return getData(url);
}

export async function searchAsync(query: string): Promise<AnimeModel | null> {
  if (!query) return null;

  let animeData: APIAnimeResult | null = null;
  let animeProfileLink: string | null = null;

  const animeSearchData = await getSearchData(`${fullAnimeAPI}${searchFullAnimeAPIUri}${encodeURIComponent(query)}`);
  if (animeSearchData && animeSearchData.data && animeSearchData.data[0]) {
    animeData = await getAnimeData(`${fullAnimeAPI}${animeFullAnimeAPIUri}/${animeSearchData.data[0].mal_id}`);
    const animeProfileResult = await getAnimeProfileLink(`${streamingUrlAnimeAPI}${encodeURIComponent(animeData.title)}`);
    animeProfileLink = animeProfileResult && selectUrlInContent(animeProfileResult);
  }

  if (!animeData || !animeProfileLink) return null;

  return {
    name_english: animeData.title_english,
    image: animeData.images?.jpg?.image_url ?? animeData.images?.webp?.image_url ?? '',
    score: Score.Average,
    link: animeProfileLink,

    name_japanese: animeData.title,
    types: animeData && animeData.genres ? animeData.genres.map(g => g.name) : []
  } as AnimeModel;
}
