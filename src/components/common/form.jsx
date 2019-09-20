import React, { Component } from "react";
import Joi from "joi-browser";

import Select from "./select";
import Input from "./input";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimesCircle } from "@fortawesome/free-regular-svg-icons";

class Form extends Component {
  state = {
    data: {},
    checkedItems: new Map(),
    dynamicInputs: new Map(),
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

  handleDynamicInputAdd = e => {
    e.preventDefault();
    const { data, errors, dynamicInputs } = this.state;
    const name = e.currentTarget.name;
    //get dynamic input field from map and push value
    const list = data[name];
    const text = dynamicInputs[name];
    list.push({ value: text });
    dynamicInputs[name] = "";
    const obj = { name: name, value: data[name] };
    const errorMessage = this.validateProperty(obj);
    if (errorMessage) {
      errors[name] = errorMessage;
    } else {
      delete errors[name];
    }
    this.setState({ errors, data, dynamicInputs });
  };

  handleDynamicInputRemove = (e, name, key) => {
    e.preventDefault();
    const { data, errors } = this.state;
    const items = data[name];
    if (items[key]) {
      items.splice(key, 1);
    }

    const obj = { name: name, value: items };
    const errorMessage = this.validateProperty(obj);
    if (errorMessage) {
      errors[name] = errorMessage;
    } else {
      delete errors[name];
    }
    this.setState({ errors, data });
  };
  keyPress(e) {
    if (e.keyCode === 13) {
      this.handleDynamicInputAdd(e);
    }
  }

  handleDynamicInputChange = ({ currentTarget: input }) => {
    // change dynamic input field
    const { dynamicInputs } = this.state;
    const item = input.name;
    if (!dynamicInputs.has(item)) {
      dynamicInputs.set(item, "");
    }
    dynamicInputs[item] = input.value;

    this.setState({ dynamicInputs });
  };

  handleCheckboxChange = ({ currentTarget: input }, checkboxGroupName) => {
    // Clone all in state.errors
    const { errors, data } = this.state;
    const item = input.name;
    const isChecked = input.checked;
    let checkedItems = this.state.checkedItems;
    // add or remove from taste array
    if (isChecked) {
      data[checkboxGroupName].push(item);
    } else {
      let index = data[checkboxGroupName].indexOf(item);
      data[checkboxGroupName].splice(index, 1);
    }
    checkedItems[item] = isChecked;
    const obj = { name: checkboxGroupName, value: data[checkboxGroupName] };
    const errorMessage = this.validateProperty(obj);
    if (errorMessage) {
      errors[checkboxGroupName] = errorMessage;
    } else {
      delete errors[checkboxGroupName];
    }

    this.setState({ checkedItems, data, errors });
  };

  renderButton(label) {
    return (
      <button
        aria-label={"Button " + label}
        disabled={this.validate()}
        className="btn btn-warning form-control"
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
        value={data[name] || ""}
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

  renderDynamicInputs(name, label, options, placeholder = "", type = "text") {
    const { errors, dynamicInputs } = this.state;
    return (
      <React.Fragment>
        <div className="form-group">
          <label htmlFor={name}>{label}</label>
          <div className="input-group">
            <input
              name={name}
              placeholder={"Press 'enter' to add: " + placeholder}
              className="form-control"
              type={type}
              value={dynamicInputs[name] || ""}
              onKeyDown={e => this.keyPress(e)}
              onChange={e => this.handleDynamicInputChange(e, name)}
            />
          </div>
          <ul className="list-group">
            {options.map((item, i) => (
              <li
                key={i}
                className="list-group-item d-flex justify-content-between align-items-center dynamic-input-list-item"
              >
                {item.value}
                <button
                  className="btn dynamic-input-btn"
                  onClick={e => this.handleDynamicInputRemove(e, name, i)}
                >
                  <FontAwesomeIcon icon={faTimesCircle} />
                </button>
              </li>
            ))}
          </ul>
          {errors[name] && (
            <div className="alert alert-danger">{errors[name]}</div>
          )}
        </div>
      </React.Fragment>
    );
  }

  renderCheckboxes(name, label, options, checkedItems, type = "checkbox") {
    const { errors } = this.state;
    return (
      <React.Fragment>
        <div className="form-group">
          <label htmlFor={name}>{label}</label>
          <br />
          {options.map(item => (
            <div className="form-check form-check-inline" key={item._id}>
              <label htmlFor={item.name} className="form-check-label">
                {item.name}
              </label>
              <input
                key={item._id}
                id={item.name}
                checked={!!checkedItems[item.name]}
                name={item.name}
                onChange={e => this.handleCheckboxChange(e, name)}
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
}

export default Form;
