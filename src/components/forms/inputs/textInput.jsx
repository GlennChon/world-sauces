//codesandbox.io/s/yqlz84rnyv
import React from "react";
import { Form } from "react-bootstrap";

import PropTypes from "prop-types";
import extractInputProps from "./extractInputProps";

const TextInput = props => <Form.Control {...extractInputProps(props)} />;

TextInput.propTypes = {
  type: "text",
  label: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  onBlur: PropTypes.func.isRequired,
  errors: PropTypes.object.isRequired,
  touched: PropTypes.object.isRequired,
  values: PropTypes.object.isRequired,
  placeholder: PropTypes.string
};

export default TextInput;
