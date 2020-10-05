import React, { useState, FormEvent } from "react";
import { Button, Form } from 'react-bootstrap';
import { Anime, Score } from '../models';

type Props = {
  onSubmit: (a: Anime) => void;
};

const NewAnimeForm: React.FC<Props> = ( { onSubmit }) => {
  const [name_english, setNameEnglish] = useState('');
  const [image, setImage] = useState("");
  const [score, setScore] = useState(Score.Average);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();

    if (!image.endsWith("jpg") && !image.endsWith("png")) return;

    onSubmit({ name_english, image, score });
    setNameEnglish('');
    setImage('');
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
        id='score'
        as='select'
        custom
        defaultValue={score}
        onChange={(e) => setScore(e.target.value as Score)}
      >
        {Object.keys(Score).map((sc: keyof typeof Score) => (
          <option key={sc} value={sc}>
            {Score[sc]}
          </option>
        ))}
      </Form.Control>

      <Button type='submit' className='mb-2'>
        Add anime
      </Button>
    </Form>
  );
};

export default NewAnimeForm;
