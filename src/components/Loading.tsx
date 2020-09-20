import React from 'react';
import { Spinner } from 'react-bootstrap';

const Loading: React.FC = () => {
  return (
    <Spinner animation='border' variant='primary' role='status'>
      <span className='sr-only'>Loading...</span>
    </Spinner>
  );
};

export default Loading;
