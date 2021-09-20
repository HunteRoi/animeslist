import React from 'react';
import { Button, Form } from 'react-bootstrap';

type Props = {
  copy: () => void,
  setCopyFullList: (value: boolean) => void;
};

const CopyField: React.FC<Props> = ({ copy, setCopyFullList }) => (
  <>
    <Button variant='secondary' onClick={copy} size='sm'>COPY LIST</Button>
    <Form.Check inline id='copyFullListSwitch' className='ml-3' label='Copy full list' type='switch' onChange={(e: any)=> setCopyFullList(e.currentTarget.checked)}></Form.Check>
  </>
);

export default CopyField;