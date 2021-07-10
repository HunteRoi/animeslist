import React, { FormEvent } from 'react';
import { Button, Form, Accordion } from 'react-bootstrap';

import { AnimeModel } from '../models';
import useStorage from '../hooks/useStorage';
import './NewAnimeForm.css';
import { ExternalAnime } from './ExternalAnime';

type Props = {
  onSubmit: (a: AnimeModel) => void,
  setSearch: (newSearch: string) => void,
  externalAnime: AnimeModel
};

export const NewAnimeForm: React.FC<Props> = ( { onSubmit, setSearch, externalAnime }) => {
  const [shown, setShown] = useStorage('showForm', true);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();

    externalAnime && onSubmit(externalAnime);
  };

  return (
  <Accordion activeKey={shown ? '0' : undefined} className='accordion'>
    <Accordion.Toggle as='span' eventKey='0' onClick={() => setShown(!shown)} className='accordion-toggle'>
      {shown ? '🞃' : '🞂'} Add New Anime
    </Accordion.Toggle>
    <Accordion.Collapse eventKey='0' className='accordion-collapse'>
      <Form inline autoComplete='off' onSubmit={handleSubmit}>
        <Form.Label srOnly htmlFor='name_english'>Add New Anime</Form.Label>
        <ExternalAnime setSearch={setSearch} externalAnime={externalAnime} className='flex-grow-1 mb-2 mr-sm-2' />
        <Button type='submit' className='mb-2 mr-sm-2'>ADD ANIME</Button>
      </Form>
    </Accordion.Collapse>
  </Accordion>
  );
};
