import React, { FC, InputHTMLAttributes } from 'react';
import { Form, InputGroup } from 'react-bootstrap';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string | undefined;
  value?: string | number | string[] | undefined;
  prepend?: string | undefined;
  helpText?: string | undefined;
}

export const Input: FC<InputProps> = ({
  label,
  id,
  placeholder,
  onChange,
  value,
  required,
  autoComplete = 'off',
  type = 'text',
  className = undefined,
  prepend = undefined,
  helpText = undefined
}) => {
  const formControl = (
    <>
      {label && (
        <Form.Label>{label} {required && <span className='text-danger'>*</span>}</Form.Label>
      )}
      <Form.Control
        type={type}
        placeholder={placeholder}
        onChange={onChange}
        name={id}
        value={value}
        required={required}
        autoComplete={autoComplete}
        className={className}
      />
      {helpText && <Form.Text muted>{helpText}</Form.Text>}
    </>
  );

  return (
    <Form.Group controlId={id}>
      {prepend && !label
      ? (
        <InputGroup>
          <InputGroup.Text>{prepend}</InputGroup.Text>
          {formControl}
        </InputGroup>
      )
      : formControl}
    </Form.Group>
  );
};
