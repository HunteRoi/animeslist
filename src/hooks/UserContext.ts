import { User } from 'firebase/auth';
import React from 'react';

type Props = {
  user: User | null
};

export const UserContext = React.createContext<Props>({
  user: null,
});
