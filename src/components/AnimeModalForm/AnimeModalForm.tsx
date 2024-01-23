import ReactTagInput from '@pathofdev/react-tag-input';
import React from 'react';
import { Col, Form, Figure, FloatingLabel } from 'react-bootstrap';

import { AnimeModel, Score, Status } from '../../models';

import './AnimeModalForm.css';

type Props = {
  editable: boolean;
  onChange: (
    value: string | undefined | boolean | null | Status | Score | string[],
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
    
    <FloatingLabel className='mb-2' controlId={id + '-image'} label='Image URL' >
      <Form.Control
        placeholder='Image URL'
        disabled={!editable}
        defaultValue={image}
        type='url'
        required
        onChange={(e) => onChange(e.currentTarget.value, 'image')}
      />
    </FloatingLabel>
    
    <FloatingLabel className='mb-2' controlId={id + '-name_english'} label='English Name' >
      <Form.Control
        placeholder='English Name'
        disabled={!editable}
        defaultValue={name_english}
        type='text'
        required
        onChange={(e) => onChange(e.currentTarget.value, 'name_english')}
      />
    </FloatingLabel>

    <FloatingLabel className='mb-2' controlId={id + '-name_japanese'} label='Japanese Name'>
      <Form.Control
        placeholder='Japanese Name'
        disabled={!editable}
        defaultValue={name_japanese}
        type='text'
        required
        onChange={(e) => onChange(e.currentTarget.value, 'name_japanese')}
      />
    </FloatingLabel>

    <FloatingLabel className='mb-2' controlId={id + '-status'} label='Status'>
      <Form.Select
        aria-label='Status'
        disabled={!editable}
        defaultValue={status}
        onChange={(e) => onChange(e.currentTarget.value, 'status')}
      >
        {Object.keys(Status).map((stat: string) => (
          <option key={stat} value={stat}>{Status[stat as keyof typeof Status]}</option>
        ))}
      </Form.Select>
    </FloatingLabel>

    <FloatingLabel className='mb-2' controlId={id + '-score'} label='Score'>
      <Form.Select
        aria-label='Score'
        disabled={!editable}
        defaultValue={score}
        onChange={(e) => onChange(e.currentTarget.value, 'score')}
      >
        {Object.keys(Score).reverse().map((sc: string) => (
          <option key={sc} value={sc}>{Score[sc as keyof typeof Score]}</option>
        ))}
      </Form.Select>
    </FloatingLabel>

    <FloatingLabel className='mb-2' controlId={id + '-link'} label='Link'>
      <Form.Control
        placeholder='Link'
        disabled={!editable}
        defaultValue={link}
        type='url'
        required
        onChange={(e) => onChange(e.currentTarget.value, 'link')}
      />
    </FloatingLabel>

    <FloatingLabel className='mb-2' controlId={id + '-comments'} label='Comments'>
      <Form.Control
        placeholder='Comments'
        disabled={!editable}
        as='textarea'
        defaultValue={comments}
        type='text'
        required
        onChange={(e) => onChange(e.currentTarget.value, 'comments')}
      />
    </FloatingLabel>

    <Form.Group className='mb-2' controlId={id + '-types'}>
      <Form.Label column sm={2}>Types</Form.Label>
      <Col sm={10}>
        <ReactTagInput
          placeholder=' '
          editable={editable}
          readOnly={!editable}
          tags={types ?? []}
          onChange={(newTypes) => onChange(newTypes, 'types')}
          removeOnBackspace={true}
        />
      </Col>
    </Form.Group>

    <Form.Group className='mb-2' controlId={id + '-ispublic'} style={{ margin: '.5em 0 .3em 0', display: 'flex', flexDirection: 'row', gap: '1em', alignItems: 'center' }}>
      <Form.Label as={'span'} style={{ marginBottom: '-.25em' }}>Is public</Form.Label>
      <Form.Check
        disabled={!editable}
        style={{ paddingTop: '7px' }}
        type='switch'
        checked={isPublic}
        onChange={(e) => onChange(e.currentTarget.checked, 'isPublic')}
      />
    </Form.Group>
  </Form>);
};
