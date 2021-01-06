import React from 'react';
import FigureImage from 'react-bootstrap/FigureImage';
import './Image.css';

type Props = React.ComponentProps<typeof FigureImage>;

const Image: React.FC<Props> = ({ children, ...rest }) => {
  return (
    <div className='image-container'>
      <FigureImage {...rest} />
      <div className='image-text'>{children}</div>
    </div>
  );
};

export default Image;