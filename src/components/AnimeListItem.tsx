import React, { useState, useRef, useEffect } from 'react';
import { Button, ListGroupItem, Container, Col, Row, Form, Badge, Figure, NavLink, Overlay, Tooltip } from 'react-bootstrap';

import { AnimeModel, Status, Score } from '../models';
import AnimeModalItem from './AnimeModalItem';
import Image from './Image';
import './AnimeListItem.css';

type Props = {
  onChange: (value: string | undefined | null | Status | Score, propname: string) => void;
  onDelete: () => void;
} & AnimeModel;

const AnimeListItem: React.FC<Props> = ({ 
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
    const [copySuccess, setCopySuccess] = useState(false);

    const copyToClipboard = async () => {
      console.log(link);
      await navigator.clipboard.writeText(link ?? '');
      setCopySuccess(true);
    };

    useEffect(() => {
      if (copySuccess) {
        setTimeout(() => setCopySuccess(false), 1250);
      }
    }, [copySuccess]);

    return (
      <ListGroupItem key={id}>
        <Container fluid>
          <Row>
            <Col md='auto'>
              <Figure>
                {image && (
                  <NavLink onClick={handleShow}>
                    <Image src={image} alt={id + '-image'} rounded>
                      {status}
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
                  as='textarea'
                  value={comments}
                  onChange={(e) => onChange(e.currentTarget.value, 'comments')}
                />
              </Form.Group>
              <Button
                variant='primary'
                onClick={handleShow}
                title='View more information about this item'
              >
                View more
              </Button>{' '}
              <Button
                variant='danger'
                onClick={onDelete}
                title='Delete this anime'
              >
                Delete
              </Button>{' '}
              <Button
                variant='secondary'
                onClick={copyToClipboard}
                title='Copy the link to this anime and share it'
                ref={target}
              >
                Share
              </Button>
              <Overlay target={target.current} show={copySuccess} placement='right'>
                {(props) => (
                  <Tooltip id='copy-tooltip' {...props}>Copied!</Tooltip>
                )}
              </Overlay>
            </Col>
          </Row>
        </Container>

        <AnimeModalItem
          show={show}
          handleClose={handleClose}
          onDelete={onDelete}
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

export default AnimeListItem;
