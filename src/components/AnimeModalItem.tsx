import React from 'react';
import { Modal, Button } from 'react-bootstrap';
import { BsTrash } from 'react-icons/bs';

import { AnimeModel, Status, Score } from '../models';
import { AnimeModalForm } from './AnimeModalForm/AnimeModalForm';

type Props = {
  editable: boolean;
  onChange: (
    value: string | undefined | boolean | null | Status | Score | string[],
    propname: string
  ) => void;
  onDelete: () => void;
  handleClose: () => void;
  show: boolean;
} & AnimeModel;

export const AnimeModalItem: React.FC<Props> = ({
  editable,
  name_english,
  onDelete,
  handleClose,
  id,
  show = false,
  ...rest
}) => {
  return (
    <Modal
      show={show}
      onHide={handleClose}
      keyboard={false}
      centered
      size='lg'
      scrollable={true}
    >
      <Modal.Header closeButton>
        <Modal.Title>{name_english}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <AnimeModalForm editable={editable} name_english={name_english} id={id} {...rest} />
      </Modal.Body>
      {editable && <Modal.Footer>
        <Button variant='danger' onClick={onDelete} title='Delete this anime' disabled={!editable}>
          <BsTrash />
          {' '}
          Delete
        </Button>
      </Modal.Footer>}
    </Modal>
  );
};
