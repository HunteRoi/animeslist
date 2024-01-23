import React, { PropsWithChildren } from 'react';
import { Accordion } from 'react-bootstrap';

import { useStorage } from '../../hooks/useStorage';

type Props = {
  label: string
} & PropsWithChildren;

export const Accordionned: React.FC<Props> = ({ label, children }) => {
  const [shown, setShown] = useStorage(`show-${label.replace(' ','')}Form`, false);

  return (
  <Accordion activeKey={shown ? '0' : undefined} style={{ textAlign: 'left', marginBottom: '1rem' }}>
    <Accordion.Item eventKey='0' >
      <Accordion.Header onClick={() => setShown(!shown)}>
        {label}
      </Accordion.Header>
      <Accordion.Body>
        <>
          {children}
        </>
      </Accordion.Body>
    </Accordion.Item>
  </Accordion>
  );
};
