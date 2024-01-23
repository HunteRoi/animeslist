import React from 'react';
import { Button, Form } from 'react-bootstrap';

type Props = {
  copy: () => void,
  setCopyFullList: (value: boolean) => void;
};

export const CopyField: React.FC<Props> = ({ copy, setCopyFullList }) => (
  <div style={{ display: 'flex', flexDirection: 'row', gap: '1em' }}>
    <Button variant='secondary' onClick={copy} size='sm'>Copy list</Button>
    <Form.Check inline id='copyFullListSwitch' className='me-3' label='Copy full list' type='switch' onChange={e => setCopyFullList(e.currentTarget.checked)}></Form.Check>
  </div>
);
