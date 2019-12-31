import React, { useState, useEffect } from "react";
import { Form } from "react-bootstrap";
import extractInputProps from "./extractInputProps";
import PropTypes from "prop-types";

const SelectInput = props => {
  const [options, setOptions] = useState(["Loading..."]);
  useEffect(() => {
    if (props.options != null) {
      setOptions(props.options);
    }
  }, [props.options]);

  return (
    <Form.Control {...extractInputProps(props)}>
      <option key="0" value="">
        Select a value
      </option>
      {options.map((item, key) => (
        <option key={key} value={item.value}>
          {item.label}
        </option>
      ))}
    </Form.Control>
  );
};

SelectInput.propTypes = {
  type: "select",
  label: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  onBlur: PropTypes.func.isRequired,
  errors: PropTypes.object.isRequired,
  touched: PropTypes.object.isRequired,
  values: PropTypes.object.isRequired,
  options: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.string,
      value: PropTypes.oneOfType(PropTypes.string, PropTypes.number)
    })
  ),
  placeholder: PropTypes.string
};
export default SelectInput;
