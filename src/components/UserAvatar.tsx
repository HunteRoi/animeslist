import React from 'react';
import { Image } from 'react-bootstrap';
import { User } from 'firebase/auth';

type Props = {
    user?: User;
  };
  
export const UserAvatar: React.FC<Props> = ({ user }) => {
    return (
        <Image src={user?.photoURL ?? '/not-signedin.png'} roundedCircle alt='avatar' fluid style={{ width: '2.5rem', height: '2.5rem' }} />
    );
};
