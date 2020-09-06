import React, { useEffect, useReducer, FunctionComponent } from "react";
import { AnimeModel } from '../models';
import firebase from '../firebase';
import Loading from '../components/Loading';

type State = {
  ready: boolean,
  animes: Array<AnimeModel>;
};

type Action = {
  payload: AnimeModel;
  type: string;
};

const reducer = (state: State, action: Action) => {
  switch(action.type) {
    case "added": return { ...state, ready: true, animes: [...state.animes, action.payload] };
    case "modified": return { ...state, ready: true, animes: state.animes.filter(a => a.id === action.payload.id) };
    case "removed": return { ...state, ready: true, animes: state.animes.filter(a => a.id !== action.payload.id) };
    default: return state;
  }
}

const INITIAL_STTE: State= {
  ready: false,
  animes: new Array<AnimeModel>()
}; 

type Props = {
  component: FunctionComponent<{animes: Array<AnimeModel> }>;
};

const Animes: React.FC<Props> = ({ component }) => {
  const [state, dispatch] = useReducer(reducer, INITIAL_STTE);

  useEffect(() => {
    firebase
      .firestore()
      .collection("animes")
      .onSnapshot(snapshot => {
        for (const { doc, type } of snapshot.docChanges()) {
          const payload = { id: doc.id, ...doc.data() } as AnimeModel;
          dispatch({ type, payload });
        }
      })
  }, []);

  if (!state.ready) return <Loading />;

  return React.createElement(component, { animes: state.animes });
};

export default Animes;
