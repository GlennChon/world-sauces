import React, { Component } from "react";
import Joi from "joi-browser";

import Input from "./input";

class Form extends Component {
  state = {
    data: {},
    errors: {}
  };

  validate = () => {
    const options = { abortEarly: false };
    const { error } = Joi.validate(this.state.data, this.schema, options);

    if (!error) return null;

    const errors = {};
    for (let item of error.details) {
      errors[item.path[0]] = item.message;
      return errors;
    }
  };

  validateProperty = ({ name, value }) => {
    // Get specific property by name from schema
    const obj = { [name]: value };
    const schema = { [name]: this.schema[name] };
    // Validate that property
    const { error } = Joi.validate(obj, schema);
    return error ? error.details[0].message : null;
  };

  handleSubmit = e => {
    // Prevents full page reload on submit
    e.preventDefault();

    const errors = this.validate();
    // Pass empty object to errors if it's empty
    this.setState({ errors: errors || {} });
    if (errors) return;
    this.doSubmit();
  };

  handleChange = ({ currentTarget: input }) => {
    // Clone all in state.errors
    const errors = { ...this.state.errors };
    const errorMessage = this.validateProperty(input);
    if (errorMessage) {
      errors[input.name] = errorMessage;
    } else {
      delete errors[input.name];
    }

    // Clone state data
    const data = { ...this.state.data };
    // Takes name of target inputs and sets value based on name
    data[input.name] = input.value;
    // Set state with new data
    this.setState({ data, errors });
  };

  renderButton(label) {
    return (
      <button className="btn btn-primary" disabled={this.validate()}>
        {label}
      </button>
    );
  }

  renderInput(name, label, type = "text") {
    const { data, errors } = this.state;
    return (
      <Input
        name={name}
        type={type}
        label={label}
        value={data[name]}
        error={errors[name]}
        onChange={this.handleChange}
      />
    );
  }
}

export default Form;
