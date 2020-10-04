import React from "react";
import firebase from "../firebase";
import NewAnimeForm from "../components/NewAnimeForm";
import { Anime } from '../models';

const NewAnime: React.FC = () => {
  const handleSubmit = (anime: Anime) => {
    firebase
      .firestore()
      .collection("animes")
      .add({
        status: "PlanToWatch",
        types: [],
        ...anime
      });
  };

  return <NewAnimeForm onSubmit={handleSubmit} />;
};

export default NewAnime;