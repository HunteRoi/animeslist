import { User } from 'firebase';
import React from 'react';

type Props = {
  user: User
};

const UserContext = React.createContext<Props>({
  user: null,
});

export default UserContext;