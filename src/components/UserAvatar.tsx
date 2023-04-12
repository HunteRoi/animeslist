import React, { useEffect, useRef, useState } from 'react';
import { Overlay, Tooltip } from 'react-bootstrap';

type Props = {
  user: firebase.User;
};

export const UserAvatar: React.FC<Props> = ({ user }) => {
  const [show, setShow] = useState(false);
  const target = useRef(null);

  useEffect(() => {
    if (show) {
      setTimeout(() => setShow(false), 2000);
    }
  }, [show]);

  return (
    <>
      <div ref={target} onMouseOver={() => setShow(!show)}>
        <img src={user.photoURL} className='profile-image' alt='avatar' />
        <span className='profile-text'>{user.displayName}</span>
      </div>
        
      <Overlay target={target.current} show={show} placement='bottom'>
        {(props) => (
          <Tooltip id='profile-email' {...props}>{user.email}</Tooltip>
        )}
      </Overlay>
    </>
  );
};