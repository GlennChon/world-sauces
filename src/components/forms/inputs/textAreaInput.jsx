import React from "react";
import { FormControl } from "react-bootstrap";
import extractInputProps from "./extractInputProps";

import PropTypes from "prop-types";

const TextAreaInput = props => <FormControl {...extractInputProps(props)} />;

TextAreaInput.propTypes = {
  type: "textarea",
  label: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  onBlur: PropTypes.func.isRequired,
  errors: PropTypes.object.isRequired,
  touched: PropTypes.object.isRequired,
  values: PropTypes.object.isRequired,
  placeholder: PropTypes.string
};
export default TextAreaInput;
