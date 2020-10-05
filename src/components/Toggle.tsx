import React from 'react';
import { Button } from 'react-bootstrap';

type Props = {
  theme: string;
  toggleTheme: () => void;
};

const Toggle: React.FC<Props> = ({ theme, toggleTheme }) => {
  const isLight = theme === 'light';

  return (
    <Button onClick={toggleTheme} className='float-right' variant={isLight ? 'outline-dark' : 'outline-light'}>
      {'Switch to ' + (isLight ? 'dark' : 'light')}
    </Button>
  );
};

export default Toggle;
