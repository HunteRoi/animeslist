import React, { useEffect, useReducer, FunctionComponent } from 'react';
import { collection, query, where, onSnapshot } from 'firebase/firestore';

import { db } from '../firebase';
import { AnimeModel } from '../models';
import { AnimeListProps } from '../components/AnimeList';

type State = {
  animes: Array<AnimeModel>;
};

type Action = {
  payload: AnimeModel;
  type: string;
};

const reducer = (state: State, action: Action) => {
  switch(action.type) {
    case 'added': return { ...state, animes: [...state.animes, action.payload] };
    case 'modified': return { ...state, animes: state.animes.map(a => a.id !== action.payload.id ? a : action.payload) };
    case 'removed': return { ...state, animes: state.animes.filter(a => a.id !== action.payload.id) };
    default: return state;
  }
};

const INITIAL_STTE: State = {
  animes: new Array<AnimeModel>()
}; 

type Props = {
  component: FunctionComponent<AnimeListProps>;
  userid?: string;
};

export const PublicAnimes: React.FC<Props> = ({ component, userid }) => {
  const [state, dispatch] = useReducer(reducer, INITIAL_STTE);

  useEffect(() => {
    const unsubscribe = onSnapshot(
      query(
        collection(db, 'animes'), 
        where('uid', '==', userid), 
        where('isPublic', '==', true)
      ), (snapshot) => {
      for (const { doc, type } of snapshot.docChanges()) {
        const payload = { id: doc.id, ...doc.data() } as AnimeModel;
        dispatch({ type, payload });
      }
    });     

    return unsubscribe;
  }, [userid]);

  return React.createElement(component, { animes: state.animes, editable: false });
};
