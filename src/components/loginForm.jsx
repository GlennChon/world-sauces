import React from "react";
import { Redirect } from "react-router-dom";
import Joi from "joi-browser";

import Form from "./common/form";

import * as authService from "../services/authService";

import "../css/loginForm.css";

class LoginForm extends Form {
  state = {
    data: { username: "", password: "" },
    errors: {}
  };

  schema = {
    username: Joi.string()
      .required()
      .label("Username"),
    password: Joi.string()
      .required()
      .label("Password")
  };

  doSubmit = async () => {
    // Call the server
    try {
      const { data } = this.state;
      // Get json webtoken on proper login
      await authService.login(data.username, data.password);
      // Redirect as logged in user
      const { state } = this.props.location;
      window.location = state ? state.from.pathname : "/";
    } catch (ex) {
      if (ex.response && ex.response.status === 400) {
        const errors = { ...this.state.errors };
        errors.password = ex.response.data;
        this.setState({ errors });
      }
    }
  };

  render() {
    if (authService.getCurrentUser()) return <Redirect to="/" />;
    return (
      <React.Fragment>
        <div className="login-form-container">
          <div className="login-form-wrapper">
            <h1>Login</h1>
            <form onSubmit={this.handleSubmit}>
              {this.renderInput("username", "Username")}
              {this.renderInput("password", "Password", "password")}
              <div className="btn-submit">{this.renderButton("Login")}</div>
            </form>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default LoginForm;
