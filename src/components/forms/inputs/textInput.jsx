//codesandbox.io/s/yqlz84rnyv
import React from "react";
import { Form } from "react-bootstrap";

import extractInputProps from "./extractInputProps";

const TextInput = props => <Form.Control {...extractInputProps(props)} />;

export default TextInput;
