import React, { FunctionComponent, useMemo } from "react";
import { AnimeModel, Score, Status } from "../models";
import firebase from "../firebase/firebase";

type ComponentProps = {
  onChange: (value: string | undefined | null | Status | Score, propname: string) => void;
  onDelete: () => void;
} & AnimeModel;

type Props = {
  component: FunctionComponent<ComponentProps>;
} & AnimeModel;

export const Anime: React.FC<Props> = ({ component, id, ...rest }) => {
  const docRef = useMemo(() => 
    firebase
      .firestore()
      .collection("animes")
      .doc(id),
    [id]
  );
  const onChange = (
    value: string | undefined | null | Status | Score | string[],
    propname: string
  ) => {
    docRef.update({ [propname]: value });
  };
  const onDelete = () => {
    docRef.delete();
  };

  return React.createElement(component, { id, onChange, onDelete, ...rest });
};
