import React, { FormEvent } from 'react';
import { Button, Form } from 'react-bootstrap';
import { IoIosAddCircleOutline } from 'react-icons/io';

import { AnimeModel } from '../models';
import { ExternalAnime } from './ExternalAnime';
import { Accordionned } from './Accordionned/Accordionned';

type Props = {
  onSubmit: (a: AnimeModel) => void,
  setSearch: (newSearch: string) => void,
  externalAnime: AnimeModel | null
};

export const NewAnimeForm: React.FC<Props> = ( { onSubmit, setSearch, externalAnime }) => {
  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();

    externalAnime && onSubmit(externalAnime);
  };

  return (
    <Accordionned label='Add New Anime'>
      <Form autoComplete='off' onSubmit={handleSubmit}>
        <Form.Label visuallyHidden htmlFor='name_english'>Add New Anime</Form.Label>
        
        <ExternalAnime setSearch={setSearch} externalAnime={externalAnime} className='flex-grow-1 mb-2 ms-sm-2' />
        
        <Button type='submit' className='mb-2 ms-sm-2'>
          <IoIosAddCircleOutline />
          {' '}
          Add
        </Button>
      </Form>
    </Accordionned>
  );
};
