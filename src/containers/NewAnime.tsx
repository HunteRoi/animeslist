import React, { useState } from 'react';
import { debounce } from 'lodash';

import firebase from '../firebase/firebase';
import { NewAnimeForm } from '../components';
import { AnimeModel } from '../models';
import UserContext from '../hooks/UserContext';
import { searchAsync } from '../services/anime.service';

export const NewAnime: React.FC = () => {
  const { user } = React.useContext(UserContext);
  const [externalAnime, setExternalAnime] = useState<AnimeModel>(null);

  const handleSubmit = (anime: AnimeModel) => {
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

  const handleSearch = async (search: string) => {
    const d = await searchAsync(search);
    setExternalAnime(d);
  };

  const debouncedHandleSearch = debounce(handleSearch, 300);

  return <NewAnimeForm onSubmit={handleSubmit} setSearch={debouncedHandleSearch} externalAnime={externalAnime} />;
};
