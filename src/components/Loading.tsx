import React from 'react';
import { Spinner } from 'react-bootstrap';

export const Loading: React.FC = () => {
  return (
    <Spinner animation='border' variant='primary' role='status'>
      <span className='visually-hidden'>Loading...</span>
    </Spinner>
  );
};
