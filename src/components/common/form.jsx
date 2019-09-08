import React, { Component } from "react";
import Joi from "joi-browser";

import Select from "./select";
import Input from "./input";

class Form extends Component {
  state = {
    data: {},
    checkedItems: new Map(),
    errors: {},
    disabled: false
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
    console.log(input);
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

  handleCheckboxChange = ({ currentTarget: input }) => {
    // Clone all in state.errors
    const errors = { ...this.state.errors };

    //hardcoded input here, TODO figure out how to abstract this.
    const obj = { name: "taste_profile", value: input.checked };
    const errorMessage = this.validateProperty(obj);
    if (errorMessage) {
      errors[obj] = errorMessage;
    } else {
      delete errors[obj];
    }
    const data = { ...this.state.data };
    const item = input.name;
    const isChecked = input.checked;
    let checkedItems = this.state.checkedItems;
    // add or remove from taste array
    if (isChecked) {
      data["taste_profile"].push(item);
    } else {
      let index = data["taste_profile"].indexOf(item);
      data["taste_profile"].splice(index, 1);
    }
    checkedItems[item] = isChecked;
    this.setState({ checkedItems, data });
  };

  renderButton(label) {
    return (
      <button
        disabled={this.validate()}
        className="btn btn-primary form-control"
      >
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

  renderSelect(name, label, options, isDisabled) {
    const { data, errors } = this.state;
    return (
      <Select
        name={name}
        value={data[name]}
        label={label}
        options={options}
        onChange={this.handleChange}
        error={errors[name]}
        isDisabled={isDisabled}
      />
    );
  }

  renderCheckboxes(name, label, options, checkedItems, type = "checkbox") {
    const { errors } = this.state;
    return (
      <React.Fragment>
        <div className="form-group">
          <label htmlFor={name}>{label}</label>
          <br />
          {options.map(taste => (
            <div className="form-check form-check-inline" key={taste._id}>
              <label htmlFor={taste.name} className="form-check-label">
                {taste.name}
              </label>
              <input
                key={taste._id}
                id={taste.name}
                checked={!!checkedItems[taste.name]}
                name={taste.name}
                onChange={this.handleCheckboxChange}
                className="form-check-input"
                type={type}
              />
            </div>
          ))}
          {errors[name] && (
            <div className="alert alert-danger">{errors[name]}</div>
          )}
        </div>
      </React.Fragment>
    );
  }
  renderListInput(name, label, type = "text") {
    return <h1></h1>;
  }
}

export default Form;
