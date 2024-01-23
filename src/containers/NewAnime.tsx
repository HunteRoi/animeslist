import React, { useState } from 'react';
import { debounce } from 'lodash';
import { setDoc, doc } from 'firebase/firestore';

import { db } from '../firebase';
import { NewAnimeForm } from '../components';
import { AnimeModel } from '../models';
import { UserContext } from '../hooks/UserContext';
import { searchAsync } from '../services/anime.service';

export const NewAnime: React.FC = () => {
  const { user } = React.useContext(UserContext);
  const [externalAnime, setExternalAnime] = useState<AnimeModel | null>(null);

  const handleSubmit = (anime: AnimeModel) => {
    setExternalAnime(null);
      setDoc(doc(db, 'animes'), {
        uid: user?.uid,
        status: 'PlanToWatch',
        types: [],
        ...anime
      });
  };

  const handleSearch = async (search: string) => {
    const data = await searchAsync(search);
    setExternalAnime(data);
  };

  const debouncedHandleSearch = debounce(handleSearch, 300);

  return <NewAnimeForm onSubmit={handleSubmit} setSearch={debouncedHandleSearch} externalAnime={externalAnime} />;
};
