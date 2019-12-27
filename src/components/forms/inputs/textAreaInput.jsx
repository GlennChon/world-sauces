import React from "react";
import { FormControl } from "react-bootstrap";
import extractInputProps from "./extractInputProps";

const TextAreaInput = props => <FormControl {...extractInputProps(props)} />;
export default TextAreaInput;
