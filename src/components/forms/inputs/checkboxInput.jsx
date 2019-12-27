import React from "react";
import { Form } from "react-bootstrap";
import { FieldArray } from "formik";
import extractInputProps from "./extractInputProps";
const CheckboxInput = ({ options, ...props }) => {
  return (
    <FieldArray
      name={props.name}
      render={checkhelper => (
        <React.Fragment>
          <br />
          {options.map((option, key) => (
            <Form.Check
              inline
              key={key}
              {...extractInputProps({ checkhelper, ...option, ...props })}
            />
          ))}
        </React.Fragment>
      )}
    ></FieldArray>
  );
};

export default CheckboxInput;
/*
    <FieldArray
      name={props.name}
      render={checkhelper => (
        <React.Fragment>
          <br />
          {options.map((option, key) => (
            <Form.Check
              inline
              key={key}
              {...extractInputProps({ checkhelper, ...option, ...props })}
            />
          ))}
        </React.Fragment>
      )}
    ></FieldArray> */
