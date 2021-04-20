import React, { useRef } from 'react';
import { Modal, Button, Overlay, Tooltip } from 'react-bootstrap';
import { HiShare } from 'react-icons/hi';
import { FaRegShareSquare } from 'react-icons/fa';
import { isMobile } from 'react-device-detect';

import { AnimeModel, Status, Score } from '../models';
import { AnimeModalForm } from './AnimeModalForm';

type Props = {
  onChange: (
    value: string | undefined | null | Status | Score,
    propname: string
  ) => void;
  onDelete: () => void;
  handleClose: () => void;
  show: boolean;
} & AnimeModel;

export const AnimeModalItem: React.FC<Props> = ({
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
        <AnimeModalForm name_english={name_english} id={id} {...rest} />
      </Modal.Body>
      <Modal.Footer>
        <Button variant='danger' onClick={onDelete} title='Delete this anime'>
          Delete
        </Button>
      </Modal.Footer>
    </Modal>
  );
};
