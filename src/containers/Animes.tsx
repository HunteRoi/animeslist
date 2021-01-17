import React, { useEffect, useReducer, FunctionComponent, useContext } from "react";

import { AnimeModel } from '../models';
import firebase from '../firebase/firebase';
import { Loading } from '../components/Loading';
import { AnimeListProps } from '../components/AnimeList';
import UserContext from '../hooks/UserContext';

type State = {
  ready: boolean;
  animes: Array<AnimeModel>;
};

type Action = {
  payload: AnimeModel;
  type: string;
};

const reducer = (state: State, action: Action) => {
  switch(action.type) {
    case "added": return { ...state, ready: true, animes: [...state.animes, action.payload] };
    case "modified": return { ...state, ready: true, animes: state.animes.map(a => a.id !== action.payload.id ? a : action.payload) };
    case "removed": return { ...state, ready: true, animes: state.animes.filter(a => a.id !== action.payload.id) };
    default: return state;
  }
}

const INITIAL_STTE: State= {
  ready: false,
  animes: new Array<AnimeModel>()
}; 

type Props = {
  component: FunctionComponent<AnimeListProps>;
};

export const Animes: React.FC<Props> = ({ component }) => {
  const [state, dispatch] = useReducer(reducer, INITIAL_STTE);
  const { user } = useContext(UserContext);

  useEffect(() => {
    const unsubscribe = firebase
      .firestore()
      .collection('animes')
      .where('uid', '==', user.uid)      
      .onSnapshot((snapshot) => {
        for (const { doc, type } of snapshot.docChanges()) {
          const payload = { id: doc.id, ...doc.data() } as AnimeModel;
          dispatch({ type, payload });
        }
      });

    return unsubscribe;
  }, [user]);

  if (!state.ready) return <Loading />;

  return React.createElement(component, { animes: state.animes });
};
