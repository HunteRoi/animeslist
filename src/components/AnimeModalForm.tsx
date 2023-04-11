import ReactTagInput from '@pathofdev/react-tag-input';
import React from 'react';
import { Col, Form, Row, Figure } from 'react-bootstrap';
import { AnimeModel, Score, Status } from '../models';
import './AnimeModalForm.css';

type Props = {
  editable: boolean;
  onChange: (
    value: string | undefined | null | Status | Score | string[] | boolean,
    propname: string
  ) => void;
} & AnimeModel;

export const AnimeModalForm: React.FC<Props> = ({
  editable,
  onChange,
  id,
  image,
  name_english,
  name_japanese,
  types,
  score,
  status,
  comments,
  link,
  isPublic
}) => {
  return (<Form>
    {image && <Figure.Image src={image} alt={id} rounded className='mx-auto d-block mb-3'/>}
    <Form.Group as={Row} controlId={id + '-image'}>
      <Form.Label column sm={2}>Image URL</Form.Label>
      <Col sm={10}>
        <Form.Control
          disabled={!editable}
          defaultValue={image}
          type='url'
          required
          onChange={(e) => onChange(e.currentTarget.value, 'image')}
        />
      </Col>
    </Form.Group>

    <Form.Group as={Row} controlId={id + '-name_english'}>
      <Form.Label column sm={2}>English Name</Form.Label>
      <Col sm={10}>
        <Form.Control
          disabled={!editable}
          defaultValue={name_english}
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
          disabled={!editable}
          defaultValue={name_japanese}
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
          disabled={!editable}
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

    <Form.Group  as={Row} controlId={id + '-ispublic'}>
      <Form.Label column sm={2}>Is public</Form.Label>
      <Col sm={10}>
        <Form.Check
          disabled={!editable}
          style={{ paddingTop: '7px' }}
          type='switch'
          defaultChecked={isPublic}
          onChange={(e) => onChange(e.target.checked, 'isPublic')}
        />
      </Col>
    </Form.Group>

    <Form.Group as={Row} controlId={id + '-score'}>
      <Form.Label column sm={2}>Score</Form.Label>
      <Col sm={10}>
        <Form.Control
          disabled={!editable}
          as='select' custom
          defaultValue={score}
          onChange={(e) => onChange(e.target.value, 'score')}
        >
          {Object.keys(Score).reverse().map((sc: keyof typeof Score) => (
            <option key={sc} value={sc}>{Score[sc]}</option>
          ))}
        </Form.Control>
      </Col>
    </Form.Group>

    <Form.Group as={Row} controlId={id + '-link'}>
      <Form.Label column sm={2}>Link</Form.Label>
      <Col sm={10}>
        <Form.Control
          disabled={!editable}
          defaultValue={link}
          type='url'
          required
          onChange={(e) => onChange(e.currentTarget.value, 'link')}
        />
      </Col>
    </Form.Group>

    <Form.Group as={Row} controlId={id + '-types'}>
      <Form.Label column sm={2}>Types</Form.Label>
      <Col sm={10}>
        <ReactTagInput
          editable={editable}
          readOnly={!editable}
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
          disabled={!editable}
          as='textarea'
          defaultValue={comments}
          type='text'
          required
          onChange={(e) => onChange(e.currentTarget.value, 'comments')}
        />
      </Col>
    </Form.Group>
  </Form>);
};
