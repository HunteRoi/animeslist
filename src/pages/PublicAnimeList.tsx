import React from 'react';
import { useParams } from 'react-router';

import { PublicAnimes } from '../containers';
import { AnimeList } from '../components';

export const PublicAnimesList: React.FC = () => {
  const { userid } = useParams<{ userid:string }>();
  return (
    <>
      <PublicAnimes component={AnimeList} userid={userid} />
    </>
  );
};
