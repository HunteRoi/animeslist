import React, { useState, FormEvent } from 'react';
import { Button, Form } from 'react-bootstrap';
import { Anime, Score } from '../models';

type Props = {
  onSubmit: (a: Anime) => void;
};

export const NewAnimeForm: React.FC<Props> = ( { onSubmit }) => {
  const [error, setError] = useState(null);
  const [name_english, setNameEnglish] = useState('');
  const [image, setImage] = useState('');
  const [link, setLink] = useState('');
  const [score, setScore] = useState(Score.Average);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!image.endsWith('jpg') && !image.endsWith('png')) {
      setError('The image link does not point to a JPG or PNG file.');
      return;
    }

    onSubmit({ name_english, image, score, link });
    setNameEnglish('');
    setImage('');
    setLink('');
    setScore(Score.Average);
  };

  return (
    <Form inline autoComplete='off' onSubmit={handleSubmit}>
      <Form.Label srOnly htmlFor='name_english'>New Anime</Form.Label>
      <Form.Control
        className='flex-grow-1 mb-2 mr-sm-2'
        id='name_english'
        type='text'
        required
        value={name_english}
        onChange={(e) => setNameEnglish(e.currentTarget.value)}
        placeholder='Type the English title of your anime'
      />

      <Form.Control
        className='flex-grow-1 mb-2 mr-sm-2'
        id='image'
        type='url'
        onChange={(e) => setImage(e.currentTarget.value)}
        value={image}
        placeholder='https://image.com/image.jpg'
        required
      />

      <Form.Control
        className='flex-grow-1 mb-2 mr-sm-2'
        id='link'
        type='url'
        onChange={(e) => setLink(e.currentTarget.value)}
        value={link}
        placeholder='https://anime.com/anime.html'
        required
      />

      <Form.Control
        className='flex-grow-1 mb-2 mr-sm-2'
        id='score'
        as='select'
        custom
        defaultValue={score}
        onChange={(e) => setScore(e.target.value as Score)}
      >
        {Object.keys(Score).reverse().map((sc: keyof typeof Score) => (
          <option key={sc} value={sc}>
            {Score[sc]}
          </option>
        ))}
      </Form.Control>

      <Button type='submit' className='mb-2'>
        Add anime
      </Button>

      <p className='text-danger'>{error}</p>
    </Form>
  );
};
