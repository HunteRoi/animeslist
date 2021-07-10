import { fullAnimeAPI, animeFullAnimeAPIUri, searchFullAnimeAPIUri, streamingUrlAnimeAPI } from './config';
import { AnimeModel, Score } from '../models';
import { APISearchResponse, LinkAPIResult, APIAnimeResponse } from './anime.models';

function selectUrlInContent(result: LinkAPIResult): string {
  if (!result || !result.content) return null;
  const matches = result && result.content && /href=""?([a-zA-Z\\\-/]+)"?"/.exec(result.content);
  if (matches && matches.length >= 2) {
    const uri = matches[1].replace(/\\/g, '');
    return `https://www1.gogoanime.ai/${uri}`;
  }
  return null;
}

async function getAnimeProfileLink(url: string): Promise<LinkAPIResult> {
  try {
    const result = await fetch(url);
    return result.json();
  } catch(err) {
    console.error(err);
  }
}

async function getData(url: string): Promise<any> {
  try {
    const result = await fetch(url);
    return result.json();
  } catch(err) {
    console.error(err);
  }
}

async function getAnimeData(url: string): Promise<APIAnimeResponse> {
  return getData(url);
}

async function getSearchData(url: string): Promise<APISearchResponse> {
  return getData(url);
}

export async function searchAsync(query: string): Promise<AnimeModel> {
  if (!query) return;

  let animeData: APIAnimeResponse;
  let animeProfileLink: string;

  const animeSearchData = await getSearchData(`${fullAnimeAPI}${searchFullAnimeAPIUri}${encodeURIComponent(query)}`);
  if (animeSearchData && animeSearchData.results && animeSearchData.results[0]) {
    animeData = await getAnimeData(`${fullAnimeAPI}${animeFullAnimeAPIUri}/${animeSearchData.results[0].mal_id}`);
    const animeProfileResult = await getAnimeProfileLink(`${streamingUrlAnimeAPI}${encodeURIComponent(animeData.title)}`);
    animeProfileLink = selectUrlInContent(animeProfileResult);
  }

  if (!animeData) {
    return null;
  }

  return {
    name_english: animeData.title_english,
    image: animeData.image_url,
    score: Score.Average,
    link: animeProfileLink,

    name_japanese: animeData.title,
    types: animeData && animeData.genres ? animeData.genres.map(g => g.name) : []
  } as AnimeModel;
}
