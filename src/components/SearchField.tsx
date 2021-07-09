import React from 'react';
import { FormControl, InputGroup } from 'react-bootstrap';

type Props = {
  filter: string,
  setFilter: (newFilter: string) => void
};

export const SearchField: React.FC<Props> = ({ filter, setFilter }) => {

  return (
      <InputGroup className='mb-3 sticky-top'>
        <InputGroup.Prepend>
          <InputGroup.Text>
            <span role='img' aria-labelledby='search emoji'>
              🔍
            </span>
          </InputGroup.Text>
        </InputGroup.Prepend>
        <FormControl
          type='text'
          value={filter}
          placeholder='Search'
          onChange={(e) => setFilter(e.currentTarget.value)}
        />
      </InputGroup>
  );
};