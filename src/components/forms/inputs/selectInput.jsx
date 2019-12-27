import React, { useState, useEffect } from "react";
import { Form } from "react-bootstrap";
import extractInputProps from "./extractInputProps";

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
          {item.value}
        </option>
      ))}
    </Form.Control>
  );
};
export default SelectInput;
