import React, { useEffect, FunctionComponent } from 'react';
import { collection, query, where, onSnapshot } from 'firebase/firestore';

import { db } from '../firebase';
import { AnimeModel } from '../models';
import { AnimeListProps } from '../components/AnimeList';
import useAnimesReducer from '../animeReducer';

type Props = {
  component: FunctionComponent<AnimeListProps>;
  userid?: string;
};

export const PublicAnimes: React.FC<Props> = ({ component, userid }) => {
  const [state, dispatch] = useAnimesReducer();

  useEffect(() => {
    const unsubscribe = onSnapshot(
      query(
        collection(db, 'animes'), 
        where('uid', '==', userid), 
        where('isPublic', '==', true)
      ), (snapshot) => {
        snapshot.docChanges().forEach((change) => {
          const payload = { id: change.doc.id, ...change.doc.data() } as AnimeModel;
          dispatch({ type: change.type, payload });
        });
    });     

    return unsubscribe;
  }, [userid]);

  return React.createElement(component, { animes: state.animes, editable: false });
};
