import React from 'react';
import { FormControl, InputGroup } from 'react-bootstrap';

type Props = {
  value?: string,
  setValue: (newFilter: string) => void
};

export const SearchField: React.FC<Props> = ({ value, setValue }) => {
  const handleSearch = (event: any) => {
    setValue(event.target.value);
  }

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
          placeholder='Search'
          onChange={handleSearch}
          onPaste={handleSearch}
          onDrop={handleSearch}
        />
      </InputGroup>
  );
};