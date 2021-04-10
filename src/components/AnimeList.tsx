import React, { useMemo, useState } from 'react';
import { ListGroup, FormControl, InputGroup, Form, Button } from 'react-bootstrap';
import InfiniteScroll from 'react-infinite-scroll-component';

import { AnimeModel } from '../models';
import { Anime } from '../containers';
import { AnimeListItem } from './AnimeListItem';
import { Loading } from './Loading';
import { sortBy } from '../helpers';

export type AnimeListProps = {
  animes: Array<AnimeModel>;
};

export const AnimeList: React.FC<AnimeListProps> = ({ animes }) => {
  const [filter, setFilter] = useState(''); 
  const [pageNumber, setPageNumber] = useState(1);
  const [pageSize] = useState(5);

  const sorted = useMemo(() => {
    let array = sortBy(animes, anime => anime.name_english);
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
  
  const fetchMore = () => {
    setPageNumber(pageNumber + 1);
  };

  const copyListToClipboard = async () => {
    const text = animes.map((a) => `• ${a.name_english}`).join('\n');
    await navigator.clipboard.writeText(text);
  };

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
        <InputGroup.Append>
          <Button variant='secondary' onClick={copyListToClipboard}>Copy list to clipboard</Button>
        </InputGroup.Append>
      </InputGroup>

      <ListGroup
        variant='flush'
        as={InfiniteScroll}
        next={fetchMore}
        hasMore={animes.length > 0 && sorted.length < animes.length && filter === ''}
        loader={<Loading />}
        endMessage={<Form.Text>No more to load.</Form.Text>}
        dataLength={sorted?.length ?? 0}
      >
        {sorted.map((anime) => (
          <Anime component={AnimeListItem} key={anime.id} {...anime} />
        ))}
      </ListGroup>
    </>
  );
};