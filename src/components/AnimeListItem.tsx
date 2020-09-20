import React, { useState } from 'react';
import { AnimeModel, Status, Score } from '../models';
import AnimeModalItem from './AnimeModalItem';
import { Image, Button, ListGroupItem } from 'react-bootstrap';

type Props = {
  onChange: (value: string | undefined | null | Status | Score, propname: string) => void;
  onDelete: () => void;
} & AnimeModel;

const AnimeListItem: React.FC<Props> = ({ 
  onChange,
  onDelete,
  id,
  image,
  name_english,
  comments,
  ...rest}) => {
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    return (
      <ListGroupItem key={id}>
        <div className='container-fluid'>
          <div className='row'>
            <div className='col-md-auto'>
              {image && <Image src={image} alt={id + '-image'} rounded />}
            </div>

            <div className='col'>
              <h5 className='text-uppercase mb-3'>{name_english}</h5>

              <label htmlFor={id + '-comments'} className='float-left'>
                My Comments:
              </label>
              <textarea
                value={comments}
                id={id + '-comments'}
                className='form-control h-50 mb-3'
                onChange={(e) => onChange(e.target.value, 'comments')}
              />

              <Button variant='primary' onClick={handleShow} title='View more information about this item'>View more</Button>
              {' '}
              <Button variant='danger' onClick={onDelete} title='Delete this anime'>Delete</Button>
            </div>
          </div>
        </div>

        <AnimeModalItem
          show={show}
          handleClose={handleClose}
          onDelete={onDelete}
          onChange={onChange}
          id={id}
          image={image}
          name_english={name_english}
          comments={comments}
          {...rest}
        />
      </ListGroupItem>
    );
};

export default AnimeListItem;
