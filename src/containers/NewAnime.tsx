import React from 'react';

import firebase from '../firebase/firebase';
import { NewAnimeForm } from '../components';
import { Anime } from '../models';
import UserContext from '../hooks/UserContext';


export const NewAnime: React.FC = () => {
  const { user } = React.useContext(UserContext);

  const handleSubmit = (anime: Anime) => {
    firebase
      .firestore()
      .collection('animes')
      .add({
        uid: user.uid,
        status: 'PlanToWatch',
        types: [],
        ...anime
      });
  };

  return <NewAnimeForm onSubmit={handleSubmit} />;
};
