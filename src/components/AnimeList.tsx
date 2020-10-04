import React, { useMemo, useState } from 'react';
import { AnimeModel } from '../models';
import { sortBy } from '../helpers';
import Anime from '../containers/Anime';
import AnimeListItem from '../components/AnimeListItem';
import {
  ListGroup,
  FormControl,
  InputGroup,
} from 'react-bootstrap';

type Props = {
  animes: Array<AnimeModel>;
};

const AnimeList: React.FC<Props> = ({ animes }) => {
  const [filter, setFilter] = useState("");
  const sorted = useMemo(() => {
    let array = sortBy(animes, anime => anime.id);
    if (filter) {
      array = array.filter(
        (anime) =>
          anime.name_english && anime.name_english.toLowerCase().includes(filter.toLowerCase())
          || (anime.name_japanese && anime.name_japanese.toLowerCase().includes(filter.toLowerCase()))
          || (anime.types && anime.types.some(t => t.toLowerCase().includes(filter.toLowerCase())))
          || (anime.comments && anime.comments.toLowerCase().includes(filter.toLowerCase()))
      );
    }
    return array;
  }, [animes, filter]);
  
  return (
    <>
      <InputGroup className='mb-3'>
        <InputGroup.Prepend>
          <InputGroup.Text>
            <span role='img' aria-labelledby='search emoji'>
              🔍
            </span>
          </InputGroup.Text>
        </InputGroup.Prepend>
        <FormControl
          type='text'
          value={filter}
          placeholder='Search'
          onChange={(e) => setFilter(e.currentTarget.value)}
        />
      </InputGroup>

      <ListGroup variant='flush'>
        {sorted.map((anime) => (
          <Anime component={AnimeListItem} key={anime.id} {...anime} />
        ))}
      </ListGroup>
    </>
  );
};

export default AnimeList;