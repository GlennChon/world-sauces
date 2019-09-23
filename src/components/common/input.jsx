import React from "react";
import { Form, InputGroup } from "react-bootstrap";

const Input = ({ name, label, error, ...rest }) => {
  return (
    <React.Fragment>
      <Form.Control {...rest} name={name} id={name} />
      {error && <div className="alert alert-danger">{error}</div>}
    </React.Fragment>
  );
};

export default Input;
