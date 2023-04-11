import React from 'react';

import { Animes, NewAnime } from '../containers';
import { AnimeList } from '../components/AnimeList';

export const Homepage: React.FC = () => {
  return (
    <>
      <header>
        <NewAnime />
      </header>

      <Animes component={AnimeList} />
    </>
  );
};
