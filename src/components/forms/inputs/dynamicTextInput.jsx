import React from "react";
import { useField, ErrorMessage } from "formik";
import { Form, InputGroup, Button } from "react-bootstrap";

import extractInputProps from "./extractInputProps";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";

import PropTypes from "prop-types";

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

DynamicTextInput.propTypes = {
  type: "dynamictext",
  label: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  onBlur: PropTypes.func.isRequired,
  errors: PropTypes.object.isRequired,
  touched: PropTypes.object.isRequired,
  values: PropTypes.object.isRequired,
  placeholder: PropTypes.string
};

export default DynamicTextInput;
