import React, { useMemo } from 'react';
import { AnimeModel } from '../models';
import { sortBy } from '../helpers';
import Anime from '../containers/Anime';
import AnimeListItem from '../components/AnimeListItem';
import { ListGroup } from 'react-bootstrap';

type Props = {
  animes: Array<AnimeModel>;
};

const AnimeList: React.FC<Props> = ({ animes }) => {
  const sorted = useMemo(() => sortBy(animes, anime => anime.id), [animes]);

  return (
    <ListGroup variant='flush'>
      {sorted.map(anime => (
        <Anime component={AnimeListItem} key={anime.id} {...anime} />
      ))}
    </ListGroup>
  );
};

export default AnimeList;