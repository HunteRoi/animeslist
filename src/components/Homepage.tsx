import React from 'react';

import { Animes, NewAnime } from '../containers';
import { AnimeList } from './AnimeList';

export const Homepage: React.FC = () => {
  return (
    <>
      <header>
        <h1 className='mt-3'>New Anime</h1>
        <NewAnime />
      </header>

      <Animes component={AnimeList} />
    </>
  );
};
