import React from "react";
import { Form, Col } from "react-bootstrap";

const Input = ({ name, label, error, ...rest }) => {
  return (
    <Col>
      <Form.Control {...rest} name={name} id={name} />
      {error && <div className="alert alert-danger">{error}</div>}
    </Col>
  );
};

export default Input;
