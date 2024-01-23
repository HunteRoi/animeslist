import React from 'react';

import { AnimeModel } from '../models';
import { AnimeListItem } from './AnimeListItem/AnimeListItem';
import { SearchField } from './SearchField';

export type AnimeListProps = {
  setSearch: (newSearch: string) => void,
  externalAnime: AnimeModel | null;
  className: string;
};

export const ExternalAnime: React.FC<AnimeListProps> = ({ setSearch, externalAnime, className }) => {
  return (
    <div className={className}>
      <SearchField setValue={setSearch} />
      {externalAnime && <AnimeListItem editable={true} key={externalAnime.id} {...externalAnime} onChange={() => console.debug('Attempted & ignored change')} onDelete={() => console.debug('Attempted & ignored deletion')}/> }
    </div>
  );
};