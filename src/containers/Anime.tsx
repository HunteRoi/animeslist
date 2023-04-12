import React, { FunctionComponent, useMemo } from 'react';
import { AnimeModel, Score, Status } from '../models';
import firebase from '../firebase/firebase';

type ComponentProps = {
  editable: boolean;
  onChange: (value: string | undefined | null | Status | Score, propname: string) => void;
  onDelete: () => void;
} & AnimeModel;

type Props = {
  editable: boolean;
  component: FunctionComponent<ComponentProps>;
} & AnimeModel;

export const Anime: React.FC<Props> = ({ component, id, editable, ...rest }) => {
  const docRef = useMemo(() => 
    firebase
      .firestore()
      .collection('animes')
      .doc(id),
    [id]
  );
  const onChange = (
    value: string | undefined | null | Status | Score | string[],
    propname: string
  ) => {
    if (editable)
      docRef.update({ [propname]: value });
  };
  const onDelete = () => {
    if (editable)
      docRef.delete();
  };

  return React.createElement(component, { id, editable, onChange, onDelete, ...rest });
};
