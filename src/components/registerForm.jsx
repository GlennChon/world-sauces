import React from "react";
import Joi from "joi-browser";
import { Redirect } from "react-router-dom";

import FormComponent from "./common/formComponent";
import * as userService from "../services/userService";
import authService from "../services/authService";
import "../css/registerForm.css";
import { Form } from "react-bootstrap";

class RegisterForm extends FormComponent {
  state = {
    data: { email: "", username: "", password: "" },
    errors: {}
  };

  schema = {
    email: Joi.string()
      .email()
      .min(5)
      .max(255)
      .required()
      .label("Email"),
    username: Joi.string()
      .min(3)
      .max(20)
      .required()
      .label("Username"),
    password: Joi.string()
      .min(6)
      .max(128)
      .required()
      .label("Password"),
    firstName: Joi.string()
      .allow("", null)
      .label("First Name"),
    lastName: Joi.string()
      .allow("", null)
      .label("Last Name")
  };

  doSubmit = async () => {
    // Call the server
    try {
      const response = await userService.register(this.state.data);
      authService.loginWithJwt(response.headers["ws-auth-token"]);
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
    if (authService.getCurrentUser()) return <Redirect to="/" />;
    return (
      <React.Fragment>
        <div className="register-form-container">
          <div className="register-form-wrapper">
            <h1>Register</h1>
            <Form onSubmit={this.handleSubmit}>
              {this.renderInput("email", "Email")}
              {this.renderInput("username", "Username")}
              {this.renderInput("password", "Password", "password")}
              <div className="btn-submit">{this.renderButton("Submit")}</div>
            </Form>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default RegisterForm;
