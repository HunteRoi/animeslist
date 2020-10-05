import React, { useState, } from 'react';
import { AnimeModel, Status, Score } from '../models';
import AnimeModalItem from './AnimeModalItem';
import { Button, ListGroupItem, Container, Col, Row, Form, Badge, Figure } from 'react-bootstrap';

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
  comments,
  types,
  score,
  ...rest}) => {
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    return (
      <ListGroupItem key={id}>
        <Container fluid>
          <Row>
            <Col md='auto'>
              <Figure>
                {image && <Figure.Image src={image} alt={id + '-image'} rounded />}
                <Figure.Caption>
                  {types.map(t => <Badge pill variant='dark' className='ml-1' key={t}>{t}</Badge>)}
                </Figure.Caption>
              </Figure>
            </Col>

            <Col>
              <h5 className='text-uppercase'>{name_english}</h5>
              <Form.Text className='mb-3'>Score: {Score[score as keyof typeof Score]}</Form.Text>

              <Form.Group controlId={id + '-comments'}>
                <Form.Label className='float-left'>Comments</Form.Label>
                <Form.Control
                  as='textarea'
                  value={comments}
                  onChange={(e) => onChange(e.currentTarget.value, 'comments')}
                />
              </Form.Group>

              <Button variant='primary' onClick={handleShow} title='View more information about this item'>View more</Button>
              {' '}
              <Button variant='danger' onClick={onDelete} title='Delete this anime'>Delete</Button>
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
          comments={comments}
          types={types}
          score={score}
          {...rest}
        />
      </ListGroupItem>
    );
};

export default AnimeListItem;
