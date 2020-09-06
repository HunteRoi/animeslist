import React, { useMemo } from "react";
import { AnimeModel } from '../models';
import { sortBy } from '../helpers';
import Anime from '../containers/Anime';
import AnimeListItem from '../components/AnimeListItem';

type Props = {
  animes: Array<AnimeModel>;
};

const AnimeList: React.FC<Props> = ({ animes }) => {
  const sorted = useMemo(() => sortBy(animes, anime => anime.score), [animes]);

  return (
    <ul className="list-group list-group-flush">
      {sorted.map(anime => (
        <Anime component={AnimeListItem} key={anime.id} {...anime} />
      ))}
    </ul>
  );
};

export default AnimeList;