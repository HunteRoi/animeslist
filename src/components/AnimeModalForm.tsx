import ReactTagInput from '@pathofdev/react-tag-input';
import React from 'react';
import { Col, Form, Row, Image } from 'react-bootstrap';
import { AnimeModel, Score, Status } from '../models';
import './AnimeModalForm.css';

type Props = {
  onChange: (
    value: string | undefined | null | Status | Score | string[],
    propname: string
  ) => void;
} & AnimeModel;

const AnimeModalForm: React.FC<Props> = ({
  onChange,
  id,
  image,
  name_english,
  name_japanese,
  types,
  score,
  status,
  comments,
}) => {
  return (<Form>
    {image && (
      <Image
        src={image}
        alt={id}
        className='img-thumbnail rounded mx-auto d-block mb-2'
      />
    )}

    <Form.Group as={Row} controlId={id + '-name_english'}>
      <Form.Label column sm={2}>English Name</Form.Label>
      <Col sm={10}>
        <Form.Control
          value={name_english}
          type='text'
          required
          onChange={(e) => onChange(e.currentTarget.value, 'name_english')}
        />
      </Col>
    </Form.Group>

    <Form.Group as={Row} controlId={id + '-name_japanese'}>
      <Form.Label column sm={2}>Japanese Name</Form.Label>
      <Col sm={10}>
        <Form.Control
          value={name_japanese}
          type='text'
          required
          onChange={(e) => onChange(e.currentTarget.value, 'name_japanese')}
        />
      </Col>
    </Form.Group>

    <Form.Group as={Row} controlId={id + '-status'}>
      <Form.Label column sm={2}>Status</Form.Label>
      <Col sm={10}>
        <Form.Control 
          as='select' custom
          defaultValue={status}
          onChange={(e) => onChange(e.target.value, 'status')}
        >
          {Object.keys(Status).map((stat: keyof typeof Status) => (
            <option key={stat} value={stat}>{Status[stat]}</option>
          ))}
        </Form.Control>
      </Col>
    </Form.Group>

    <Form.Group as={Row} controlId={id + '-score'}>
      <Form.Label column sm={2}>Score</Form.Label>
      <Col sm={10}>
        <Form.Control 
          as='select' custom
          defaultValue={score}
          onChange={(e) => onChange(e.target.value, 'score')}
        >
          {Object.keys(Score).map((sc: keyof typeof Score) => (
            <option key={sc} value={sc}>{Score[sc]}</option>
          ))}
        </Form.Control>
      </Col>
    </Form.Group>

    <Form.Group as={Row} controlId={id + '-types'}>
      <Form.Label column sm={2}>Types</Form.Label>
      <Col sm={10}>
        <ReactTagInput
          tags={types}
          placeholder={' '}
          onChange={(newTypes) => onChange(newTypes, 'types')}
          removeOnBackspace={true}
        />
      </Col>
    </Form.Group>

    <Form.Group as={Row} controlId={id + '-comments'}>
      <Form.Label column sm={2}>Comments</Form.Label>
      <Col sm={10}>
        <Form.Control
          as='textarea'
          value={comments}
          type='text'
          required
          onChange={(e) => onChange(e.currentTarget.value, 'comments')}
        />
      </Col>
    </Form.Group>
  </Form>);
};

export default AnimeModalForm;