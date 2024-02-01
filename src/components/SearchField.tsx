import React from 'react';
import { FormControl, InputGroup } from 'react-bootstrap';

type Props = {
	value?: string;
	setValue: (newFilter: string) => void;
	className?: string
};

export const SearchField: React.FC<Props> = ({ value, setValue, className }) => {
	// eslint-disable-next-line
	const handleSearch = (event: any) => {
		setValue(event.target.value.trim());
	};

	return (
		<InputGroup className={`${className} mb-3`}>
			<InputGroup.Text>
				<span role='img' aria-labelledby='search emoji'>
					🔍
				</span>
			</InputGroup.Text>
			<FormControl
				type='text'
				placeholder='Search'
				onChange={handleSearch}
				onPaste={handleSearch}
				onDrop={handleSearch}
				defaultValue={value}
			/>
		</InputGroup>
	);
};
