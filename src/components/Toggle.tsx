import React from 'react';
import { Form, OverlayTrigger, Tooltip } from 'react-bootstrap';

type Props = {
  theme: string;
  toggleTheme: () => void;
};

export const Toggle: React.FC<Props> = ({ theme, toggleTheme }) => {
  const isLight = theme === 'light';

  return (
    <OverlayTrigger
      key='theme-overlay'
      placement='bottom'
      overlay={(<Tooltip id='theme-tooltip'>Switch to {isLight ? 'dark' : 'light'}</Tooltip>)}
    >
      <Form.Check
        type='switch'
        id='theme-switch'
        onClick={toggleTheme}
        className='float-right'
        label={isLight ? '☀' : '🌙'}
        defaultChecked={isLight}
      />
    </OverlayTrigger>
  );
};
