import React from "react";
import { Form } from "react-bootstrap";

const Select = ({ name, label, options, error, isDisabled, ...rest }) => {
  return (
    <Form.Group controlid={`input-select-${label}`}>
      <Form.Label htmlFor={name}>{label}</Form.Label>
      <Form.Control
        as="select"
        name={name}
        id={name}
        {...rest}
        disabled={isDisabled}
      >
        <option value="" />
        {options.map(option => (
          <option key={option.code} value={option.name}>
            {option.name}
          </option>
        ))}
      </Form.Control>
      {error && <div className="alert alert-danger">{error}</div>}
    </Form.Group>
  );
};

export default Select;
