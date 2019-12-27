import React from "react";
import { useField, ErrorMessage } from "formik";
import { Form, InputGroup, Button } from "react-bootstrap";

import extractInputProps from "./extractInputProps";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";

const DynamicTextInput = props => {
  return (
    <InputGroup>
      <Form.Control {...extractInputProps(props)} />
      <InputGroup.Append>
        <Button
          variant="outline-secondary"
          type="button"
          onClick={e => this.handleDynamicInputAdd(e)}
        >
          <FontAwesomeIcon icon={faPlus} />
        </Button>
      </InputGroup.Append>
    </InputGroup>
  );
};

export default DynamicTextInput;
