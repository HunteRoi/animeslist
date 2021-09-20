import React, { useMemo, useState } from 'react';
import { ListGroup, Form } from 'react-bootstrap';
import InfiniteScroll from 'react-infinite-scroll-component';

import { AnimeModel } from '../models';
import { Anime } from '../containers';
import { AnimeListItem } from './AnimeListItem';
import { Loading } from './Loading';
import { sortBy } from '../helpers';
import { SearchField } from './SearchField';
import FilterForm from './FilterForm';

export type AnimeListProps = {
  animes: Array<AnimeModel>;
};

export const AnimeList: React.FC<AnimeListProps> = ({ animes }) => {
  const [filter, setFilter] = useState('');
  const [statusFilter, setStatusFilter] = useState('')
  const [pageNumber, setPageNumber] = useState(1);
  const [pageSize] = useState(5);
  const [maxPageNumber, setMaxPageNumber] = useState(0);
  const [copyFullList, setCopyFullList] = useState(false);

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
    if (statusFilter) {
      array = array.filter(anime => anime.status && anime.status.toLowerCase().includes(statusFilter.toLowerCase()));
    }

    setMaxPageNumber(Math.ceil(array.length / pageSize));

    const totalArray = array.slice(0, pageNumber * pageSize);
    return totalArray;
  }, [animes, filter, pageNumber, pageSize, statusFilter]);

  const fetchMore = () => {
    setPageNumber(pageNumber + 1);
  };

  const copyListToClipboard = async () => {
    const text = (copyFullList ? animes : sorted).map((a) => `• ${a.name_english} (${a.link})`).join('\n');
    await navigator.clipboard.writeText(text);
  };

  return (
    <>
      <FilterForm setCopyFullList={setCopyFullList} copyListToClipboard={copyListToClipboard} setStatusFilter={setStatusFilter} />
      <SearchField setValue={setFilter} />

      <ListGroup
        variant='flush'
        as={InfiniteScroll}
        next={fetchMore}
        hasMore={pageNumber < maxPageNumber}
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