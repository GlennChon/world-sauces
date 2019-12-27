import React from "react";
import { useField, ErrorMessage } from "formik";
import { Form } from "react-bootstrap";

const DynamicTextInput = ({
  name,
  label,
  error,
  touched,
  type = "text",
  ...props
}) => {
  const [field, meta] = useField({ ...props });
  const getStyles = () => {
    if (error && touched) {
      return {
        border: "1px solid red"
      };
    }
  };
  return (
    <Form.Group controlId={name}>
      <Form.Label>{label}</Form.Label>
      <Form.Control {...props} as="input" style={getStyles()} />
      {meta.touched && meta.error ? <ErrorMessage name={name} /> : null}
    </Form.Group>
  );
};

export default DynamicTextInput;
