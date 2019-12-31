import React from "react";
import { Form } from "react-bootstrap";
import { FieldArray } from "formik";
import extractInputProps from "./extractInputProps";
import PropTypes from "prop-types";

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

CheckboxInput.propTypes = {
  type: "text",
  label: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  onBlur: PropTypes.func.isRequired,
  errors: PropTypes.object.isRequired,
  touched: PropTypes.object.isRequired,
  values: PropTypes.object.isRequired,
  placeholder: PropTypes.string,
  options: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.oneOfType(PropTypes.string, PropTypes.number),
      label: PropTypes.string
    })
  )
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
