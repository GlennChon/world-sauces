import React from "react";
import { Form } from "react-bootstrap";

const Input = ({ name, label, error, ...rest }) => {
  return (
    <Form.Group controlId={"input-" + label}>
      <Form.Label htmlFor={name}>{label}</Form.Label>
      <Form.Control {...rest} name={name} id={name} />
      {error && <div className="alert alert-danger">{error}</div>}
    </Form.Group>
  );
};

export default Input;
