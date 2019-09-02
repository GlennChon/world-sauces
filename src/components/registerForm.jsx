import React from "react";
import Joi from "joi-browser";

import Form from "./common/form";
import * as userService from "../services/userService";
import authService from "../services/authService";

class RegisterForm extends Form {
  state = {
    data: { email: "", username: "", password: "" },
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

  doSubmit = async () => {
    // Call the server
    try {
      const response = await userService.register(this.state.data);
      authService.loginWithJwt(response.headers["x-auth-token"]);
      window.location = "/";
    } catch (ex) {
      if (ex.response && ex.response.status === 400) {
        const errors = { ...this.state.errors };
        if (ex.response.data.ex === "Email") {
          errors.email = ex.response.data.message;
        } else {
          errors.username = ex.response.data.message;
        }
        this.setState({ errors });
      }
    }
  };

  render() {
    return (
      <React.Fragment>
        <h1>Register</h1>
        <form onSubmit={this.handleSubmit}>
          {this.renderInput("email", "Email")}
          {this.renderInput("username", "Username")}
          {this.renderInput("password", "Password", "password")}
          {this.renderButton("Register")}
        </form>
      </React.Fragment>
    );
  }
}

export default RegisterForm;
