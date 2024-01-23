import React from 'react';
import { Row, Col } from 'react-bootstrap';

import { Accordionned } from './Accordionned';
import { CopyField } from './CopyField';
import { StatusFilterField } from './StatusFilterField';

type Props = {
  setStatusFilter: (value: string) => void;
  setCopyFullList: (value: boolean) => void;
  copyListToClipboard: () => void;
};

export const FilterForm: React.FC<Props> = ({
  setStatusFilter,
  setCopyFullList,
  copyListToClipboard,
}) => {
  return (
    <>
      <Accordionned label='Filters'>
        <Row>
          <Col>
            <StatusFilterField setValue={setStatusFilter} />
          </Col>
          <Col>
            <CopyField
              copy={copyListToClipboard}
              setCopyFullList={setCopyFullList}
            />
          </Col>
        </Row>
      </Accordionned>
    </>
  );
};
