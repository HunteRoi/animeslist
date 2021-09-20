import React from 'react';
import { Form, Row, Col } from 'react-bootstrap';
import { Status } from '../models';

type Props = {
  setValue: (value: string) => void;
};

const StatusFilterField: React.FC<Props> = ({ setValue }) => (
  <Form.Group as={Row}>
    <Form.Label column sm={3}>
      Filter by Status
    </Form.Label>
    <Col md='auto'>
      <Form.Control
        as='select'
        custom
        onChange={(e) => setValue(e.currentTarget.value)}
        size='sm'
      >
        <option key='' value=''>None</option>
        {Object.keys(Status).map((stat: keyof typeof Status) => (
          <option key={stat} value={stat}>
            {Status[stat]}
          </option>
        ))}
      </Form.Control>
    </Col>
  </Form.Group>
);

export default StatusFilterField;
