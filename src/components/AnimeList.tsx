import React, { useMemo, useState } from 'react';
import { ListGroup, FormControl, InputGroup, Form } from 'react-bootstrap';
import InfiniteScroll from 'react-infinite-scroll-component';

import { AnimeModel } from '../models';
import Anime from '../containers/Anime';
import AnimeListItem from '../components/AnimeListItem';
import Loading from './Loading';

export type AnimeListProps = {
  animes: Array<AnimeModel>;
};

const AnimeList: React.FC<AnimeListProps> = ({ animes }) => {
  const [filter, setFilter] = useState(""); 
  const [pageNumber, setPageNumber] = useState(1);
  const [pageSize] = useState(5);

  const sorted = useMemo(() => {
    let array = animes;
    if (filter) {
      array = array.filter(
        anime =>
          (anime.name_english && anime.name_english.toLowerCase().includes(filter.toLowerCase()))
          || (anime.name_japanese && anime.name_japanese.toLowerCase().includes(filter.toLowerCase()))
          || (anime.types && anime.types.some(t => t.toLowerCase().includes(filter.toLowerCase())))
          || (anime.comments && anime.comments.toLowerCase().includes(filter.toLowerCase()))
      );
    }

    const totalArray = array.slice(0, pageNumber * (pageSize+1));
    return totalArray;
  }, [animes, filter, pageNumber, pageSize]);
  
  const fetchMore = () => setPageNumber(pageNumber + 1);

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

      <ListGroup
        variant='flush'
        as={InfiniteScroll}
        next={fetchMore}
        hasMore={sorted.length < animes.length && filter === ""}
        loader={<Loading />}
        endMessage={<Form.Text>No more to load.</Form.Text>}
        dataLength={sorted.length}
      >
        {sorted.map((anime) => (
          <Anime component={AnimeListItem} key={anime.id} {...anime} />
        ))}
      </ListGroup>
    </>
  );
};

export default AnimeList;