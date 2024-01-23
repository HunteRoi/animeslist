import React, { useEffect, FunctionComponent, useContext } from 'react';
import { collection, query, where, onSnapshot } from 'firebase/firestore';

import { db } from '../firebase';
import { AnimeModel } from '../models';
import { AnimeListProps } from '../components/AnimeList';
import { UserContext } from '../hooks/UserContext';
import useAnimesReducer from '../animeReducer';

type Props = {
  component: FunctionComponent<AnimeListProps>;
};

export const Animes: React.FC<Props> = ({ component }) => {
  const [state, dispatch] = useAnimesReducer();
  const { user } = useContext(UserContext);

  useEffect(() => {
    const unsubscribe = onSnapshot(
      query(
        collection(db, 'animes'), 
        where('uid', '==', user?.uid), 
      ), (snapshot) => {
        snapshot.docChanges().forEach((change) => {
          const payload = { id: change.doc.id, ...change.doc.data() } as AnimeModel;
          dispatch({ type: change.type, payload });
        });
    }); 

    return unsubscribe;
  }, [user]);

  return React.createElement(component, { animes: state.animes, editable: true });
};
