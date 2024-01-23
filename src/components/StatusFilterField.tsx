import React from 'react';
import { Form, Row, Col } from 'react-bootstrap';
import { Status } from '../models';

type Props = {
  setValue: (value: string) => void;
};

export const StatusFilterField: React.FC<Props> = ({ setValue }) => (
  <Form.Group as={Row}>
    <Form.Label column sm={3}>
      Filter by Status
    </Form.Label>
    <Col md='auto'>
      <Form.Control
        as='select'
        onChange={(e) => setValue(e.currentTarget.value)}
        size='sm'
      >
        <option key='' value=''>None</option>
        {Object.keys(Status).map((stat: string) => (
          <option key={stat} value={stat}>
            {Status[stat as keyof typeof Status]}
         </option>
        ))}
      </Form.Control>
    </Col>
  </Form.Group>
);
