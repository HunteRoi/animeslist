import React from 'react';
import {Accordion } from 'react-bootstrap';

import useStorage from '../../hooks/useStorage';
import './Accordionned.css';

type Props = {
  label: string
};

const Accordionned: React.FC<Props> = ({ label, children }) => {
  const [shown, setShown] = useStorage(`show-${label.replace(" ","")}Form`, true);

  return (
  <Accordion activeKey={shown ? '0' : undefined} className='accordion'>
    <Accordion.Toggle as='span' eventKey='0' onClick={() => setShown(!shown)} className='accordion-toggle'>
      {shown ? '🞃' : '🞂'}{' '}{label}
    </Accordion.Toggle>
    <Accordion.Collapse eventKey='0' className='accordion-collapse'>
      <>
        {children}
      </>
    </Accordion.Collapse>
  </Accordion>
  );
};

export default Accordionned;