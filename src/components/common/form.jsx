import React, { Component } from "react";
import Joi from "joi-browser";

import Checkbox from "./checkbox";
import Select from "./select";
import Input from "./input";

class Form extends Component {
  state = {
    data: {},
    checkedItems: new Map(),
    errors: {},
    fields: []
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

  handleCheckboxChange = ({ currentTarget: input }) => {
    const data = { ...this.state.data };
    const item = input.name;
    const isChecked = input.checked;
    // add or remove from taste array
    if (isChecked) {
      data["taste_profile"].push(item);
    } else {
      let index = data["taste_profile"].indexOf(item);
      data["taste_profile"].splice(index, 1);
    }
    this.setState(
      prevState => (
        {
          checkedItems: prevState.checkedItems.set(item, isChecked)
        },
        { data }
      )
    );
  };

  renderButton(label) {
    return (
      <React.Fragment>
        <button className="btn btn-primary">{label}</button>
      </React.Fragment>
    );
  }

  renderInput(name, label, type = "text") {
    const { data, errors } = this.state;
    return (
      <React.Fragment>
        <Input
          name={name}
          type={type}
          label={label}
          value={data[name]}
          error={errors[name]}
          onChange={this.handleChange}
        />
      </React.Fragment>
    );
  }

  renderSelect(name, label, options) {
    const { data, errors } = this.state;
    return (
      <Select
        name={name}
        value={data[name]}
        label={label}
        options={options}
        onChange={this.handleChange}
        error={errors[name]}
      />
    );
  }

  renderCheckboxes(label, options) {
    return (
      <React.Fragment>
        {label}
        <br />
        {options.map(taste => (
          <React.Fragment key={taste._id}>
            <Checkbox
              name={taste.name}
              checked={this.state.checkedItems.get(taste.name)}
              onChange={this.handleCheckboxChange}
            />
          </React.Fragment>
        ))}
      </React.Fragment>
    );
  }
}

export default Form;
