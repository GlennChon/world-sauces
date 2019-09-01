import React, { Component } from "react";
import Joi from "joi-browser";

import Form from "./common/form";

class RegisterForm extends Form {
  state = {
    data: { username: "", password: "" },
    errors: {}
  };

  schema = {
    email: Joi.string()
      .email()
      .required()
      .label("Email"),
    username: Joi.string()
      .min(3)
      .max(16)
      .required()
      .label("Username"),
    password: Joi.string()
      .min(6)
      .max(30)
      .required()
      .label("Password"),
    firstName: Joi.string().label("First Name"),
    lastName: Joi.string().label("Last Name")
  };

  doSubmit = () => {
    // Call the server
    console.log("Form Submitted.");
  };

  render() {
    // object destructuring to preven writing this.state....
    return (
      <div>
        <h1>Register</h1>
        <form onSubmit={this.handleSubmit}>
          {this.renderInput("email", "Email")}
          {this.renderInput("username", "Username")}
          {this.renderInput("password", "Password", "password")}

          {this.renderButton("Register")}
        </form>
      </div>
    );
  }
}

export default RegisterForm;
