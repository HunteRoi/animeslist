import ReactTagInput from '@pathofdev/react-tag-input';
import React from 'react';
import { AnimeModel, Score, Status } from '../models';
import './AnimeModalForm.css';

type Props = {
  onChange: (
    value: string | undefined | null | Status | Score | string[],
    propname: string
  ) => void;
} & AnimeModel;

const AnimeModalForm: React.FC<Props> = ({
  onChange,
  id,
  image,
  name_english,
  name_japanese,
  types,
  score,
  status,
  comments,
}) => {
  return (
    <form>
      {image && (
        <img
          src={image}
          alt={id}
          className='img-thumbnail rounded mx-auto d-block mb-2'
        />
      )}

      <div className='form-group row'>
        <label
          htmlFor={id + '-name_english'}
          className='col-sm-2 col-form-label'
        >
          English Name
        </label>
        <div className='col-sm-10'>
          <input
            value={name_english}
            className='form-control'
            id={id + '-name_english'}
            onChange={(e) => onChange(e.target.value, 'name_english')}
            type='text'
          />
        </div>
      </div>

      <div className='form-group row'>
        <label
          htmlFor={id + '-name_japanese'}
          className='col-sm-2 col-form-label'
        >
          Japanese Name
        </label>
        <div className='col-sm-10'>
          <input
            value={name_japanese}
            className='form-control'
            id={id + '-name_japanese'}
            onChange={(e) => onChange(e.target.value, 'name_japanese')}
            type='text'
          />
        </div>
      </div>

      <div className='form-group row'>
        <label htmlFor={id + '-status'} className='col-sm-2 col-form-label'>
          Status
        </label>
        <div className='col-sm-10'>
          <select
            className='custom-select'
            defaultValue={status}
            id={id + '-status'}
            onChange={(e) => onChange(e.target.value, 'status')}
          >
            {Object.keys(Status).map((stat: keyof typeof Status) => (
              <option key={stat} value={stat}>
                {Status[stat]}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className='form-group row'>
        <label htmlFor={id + '-score'} className='col-sm-2 col-form-label'>
          Score
        </label>
        <div className='col-sm-10'>
          <select
            className='custom-select'
            defaultValue={score}
            id={id + '-score'}
            onChange={(e) => onChange(e.target.value, 'score')}
          >
            {Object.keys(Score).map((sc: keyof typeof Score) => (
              <option key={sc} value={sc}>
                {Score[sc]}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className='form-group row'>
        <label htmlFor={id + '-type'} className='col-sm-2 col-form-label'>
          Type
        </label>
        <div className='col-sm-10'>
          <ReactTagInput
            tags={types}
            placeholder={' '}
            onChange={newTypes => onChange(newTypes, 'types')}
            removeOnBackspace={true}
          />
        </div>
      </div>

      <div className='form-group row'>
        <label htmlFor={id + '-comments'} className='col-sm-2 col-form-label'>
          Comments
        </label>
        <div className='col-sm-10'>
          <textarea
            value={comments}
            id={id + '-comments'}
            className='form-control'
            onChange={(e) => onChange(e.target.value, 'comments')}
          />
        </div>
      </div>
    </form>
  );
};

export default AnimeModalForm;