import { User } from 'firebase/auth';
import React, { useEffect, useRef, useState } from 'react';
import { Image, Overlay, Tooltip } from 'react-bootstrap';

type Props = {
  user: User;
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
      <div ref={target} onMouseOver={() => setShow(!show)} style={{ width: '2.5rem', height: '2.5rem' }}>
        <Image src={user.photoURL ?? ''} roundedCircle alt='avatar' fluid/>
      </div>
        
      <Overlay target={target.current} show={show} placement='left'>
        {(props) => (
          <Tooltip id='profile-email' {...props}>{user.displayName}</Tooltip>
        )}
      </Overlay>
    </>
  );
};