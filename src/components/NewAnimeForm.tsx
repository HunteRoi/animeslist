import React, { useState, FormEvent } from "react";
import { Anime, Score } from '../models';

type Props = {
  onSubmit: (a: Anime) => void;
};

const NewAnimeForm: React.FC<Props> = ( { onSubmit }) => {
  const [name_japanese, setNameJapanese] = useState('');
  const [image, setImage] = useState("");
  const [score, setScore] = useState(Score.Average);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();

    if (!image.endsWith("jpg") && !image.endsWith("png")) return;

    onSubmit({ name_japanese, image, score });
    setNameJapanese('');
    setImage("");
    setScore(Score.Average);
  };

  return (
    <form autoComplete='off' className='form-inline' onSubmit={handleSubmit}>
      <label className='sr-only' htmlFor='name_japanese'>
        New Anime
      </label>

      <input
        className='form-control mr-sm-2 flex-grow-1'
        id='name_japanese'
        onChange={(e) => setNameJapanese(e.target.value)}
        placeholder='Type in the title of your new anime'
        required
        type='text'
        value={name_japanese}
      />

      <input
        className='form-control mr-sm-2 flex-grow-1'
        id='image'
        onChange={(e) => setImage(e.target.value)}
        placeholder='https://image.com/image.jpg'
        required
        type='url'
        value={image}
      />

      <select
        className='custom-select mr-sm-2'
        defaultValue={score}
        id='score'
        onChange={(e) => setScore(e.target.value as Score)}
      >
        {Object.keys(Score).map((sc: keyof typeof Score) => (
          <option key={sc} value={sc}>
            {Score[sc]}
          </option>
        ))}
      </select>

      <button className='btn btn-primary ml-2' title='Add anime' type='submit'>
        Add anime
      </button>
    </form>
  );
};

export default NewAnimeForm;
