import React, { FunctionComponent, useMemo } from 'react';
import { doc, updateDoc, deleteDoc } from 'firebase/firestore';

import { db } from '../firebase';
import { AnimeModel, Score, Status } from '../models';

type ComponentProps = {
  editable: boolean;
  onChange: (value: string | undefined | boolean | null | Status | Score | string[], propname: string) => void;
  onDelete: () => void;
} & AnimeModel;

type Props = {
  editable: boolean;
  component: FunctionComponent<ComponentProps>;
} & AnimeModel;

export const Anime: React.FC<Props> = ({ component, id, editable, ...rest }) => {
  const docRef = useMemo(() => 
    doc(db, 'animes', id),
    [id]
  );
  const onChange = (
    value: string | undefined | boolean | null | Status | Score | string[],
    propname: string
  ) => {
    if (editable)
      updateDoc(docRef, { [propname]: value });
  };
  const onDelete = () => {
    if (editable)
      deleteDoc(docRef);
  };

  return React.createElement(component, { id, editable, onChange, onDelete, ...rest });
};
