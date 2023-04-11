import React, { useState, useRef, useEffect } from 'react';
import { Button, ListGroupItem, Container, Col, Row, Form, Badge, Figure, NavLink, Overlay, Tooltip } from 'react-bootstrap';
import { isMobile } from 'react-device-detect';
import { confirmAlert } from 'react-confirm-alert';
import { FaRegShareSquare } from 'react-icons/fa';
import { HiShare } from 'react-icons/hi';

import { AnimeModel, Status, Score } from '../models';
import { AnimeModalItem } from './AnimeModalItem';
import { Image } from './Image';
import './AnimeListItem.css';

type Props = {
  editable: boolean;
  onChange: (value: string | undefined | null | Status | Score, propname: string) => void;
  onDelete: () => void;
} & AnimeModel;

export const AnimeListItem: React.FC<Props> = ({
  editable,
  onChange,
  onDelete,
  id,
  image,
  name_english,
  name_japanese,
  comments,
  types,
  score,
  status,
  link,
  ...rest}) => {
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const target = useRef(null);
    const [isSuccess, setSuccess] = useState(false);

    const openLink = () => {
      window.open(link);
    };

    const handleDelete = () => {
      if (!editable) return;

      confirmAlert({
        title: name_english,
        message: 'Are you sure you want to delete this?',
        buttons: [
          { label: 'YES', onClick: onDelete },
          { label: 'NO', onClick: () => {}}
        ]
      });
    };

    const copyToClipboard = async () => {
      console.log('Using navigator.clipboard');

      const text = name_english
        ? `An anime from my personal AnimesList!\r\n${name_english} : ${link ?? 'no link found'}`
        : '';
      await navigator.clipboard.writeText(text);
      setSuccess(true);
    };

    const shareExternal = async () => {
      if (navigator.share) {
        console.log('Using navigator.share');

        await navigator.share({
          title: name_english,
          text: `An anime from my personal AnimesList!\r\n${name_english}`,
          url: link,
        });
        setSuccess(true);
      } else {
        console.log('No navigator.share, defaulting to navigator.clipboard');

        await copyToClipboard();
      }
    };

    useEffect(() => {
      if (isSuccess) {
        setTimeout(() => setSuccess(false), 1250);
      }
    }, [isSuccess]);

    return (
      <ListGroupItem key={id}>
        <Container fluid>
          <Row>
            <Col md='auto'>
              <Figure>
                {image && (
                  <NavLink onClick={handleShow}>
                    <Image src={image} alt={id + '-image'} rounded>
                      {Status[status as keyof typeof Status]}
                    </Image>
                  </NavLink>
                )}
                <Figure.Caption>
                  Score: {Score[score as keyof typeof Score]}
                </Figure.Caption>
              </Figure>
            </Col>

            <Col>
              <NavLink onClick={handleShow}>
                <h5 className='text-uppercase'>{name_english}</h5>
              </NavLink>
              <Form.Text>
                <h6 className='subtitle'>{name_japanese}</h6>
              </Form.Text>
              <Form.Text className='mb-3'>
                {types.map((t) => (
                  <Badge pill variant='dark' className='ml-1' key={t}>
                    {t}
                  </Badge>
                ))}
              </Form.Text>
              <Form.Group controlId={id + '-comments'}>
                <Form.Label className='float-left'>Comments</Form.Label>
                <Form.Control
                  disabled={!editable}
                  as='textarea'
                  value={comments}
                  onChange={(e) => onChange(e.currentTarget.value, 'comments')}
                />
              </Form.Group>
              <Button
                variant='primary'
                onClick={handleShow}
                title='View more information about this item'
                className='btn-item'
              >
                VIEW MORE
              </Button>{' '}
              <Button
                variant='secondary'
                onClick={isMobile ? shareExternal : copyToClipboard}
                title='Share this anime'
                ref={target}
                className='btn-item'
              >
                <HiShare />
              </Button>
              <Overlay
                target={target.current}
                show={isSuccess}
                placement='right'
              >
                {(props) => (
                  <Tooltip id='copy-tooltip' {...props}>
                    Copied!
                  </Tooltip>
                )}
              </Overlay>{' '}
              <Button
                variant='secondary'
                onClick={openLink}
                title="Open the entry's link"
                className='btn-item'
              >
                <FaRegShareSquare />
              </Button>{' '}
              {editable && <Button
                disabled={!editable}
                variant='danger'
                onClick={handleDelete}
                title='Delete this anime'
                className='btn-item'
              >
                DELETE
              </Button>}
            </Col>
          </Row>
        </Container>

        <AnimeModalItem
          editable={editable}
          show={show}
          handleClose={handleClose}
          onDelete={handleDelete}
          onChange={onChange}
          id={id}
          image={image}
          name_english={name_english}
          name_japanese={name_japanese}
          comments={comments}
          types={types}
          score={score}
          status={status}
          link={link}
          {...rest}
        />
      </ListGroupItem>
    );
};
