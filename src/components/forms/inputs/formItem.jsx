import React from "react";

import { useField } from "formik";
import { Form } from "react-bootstrap";

//input components
import TextInput from "./textInput";
import TextAreaInput from "./textAreaInput";
import DynamicTextInput from "./dynamicTextInput";
import SelectInput from "./selectInput";
import CheckboxInput from "./checkboxInput";

//styles
import "../forms.css";

const FormInput = props => {
  switch (props.type) {
    case "checkbox":
      return CheckboxInput(props);
    case "select":
      return SelectInput(props);
    case "dynamic-text":
      return DynamicTextInput(props);
    case "textarea":
      return TextAreaInput(props);
    case "text":
      return TextInput(props);
    default:
      return TextInput(props);
  }
};

const FormItem = ({ label, ...props }) => {
  const [field, meta] = useField(props);

  return (
    <Form.Group controlId={field.name}>
      {label && <Form.Label>{label}</Form.Label>}

      <FormInput {...field} {...props} />

      {meta.error && meta.touched && (
        <Form.Control.Feedback type="invalid">
          {meta.error}
        </Form.Control.Feedback>
      )}
    </Form.Group>
  );
};

export default FormItem;
