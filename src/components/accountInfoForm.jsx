import React from "react";
import Joi from "joi-browser";

import * as authService from "../services/authService";
import * as userService from "../services/userService";
import FormComponent from "./common/formComponent";
import { toast } from "react-toastify";
import { Form } from "react-bootstrap";

class AccountInfoForm extends FormComponent {
  state = {
    data: {
      _id: "",
      username: "",
      email: "",
      registerDate: "",
      emailVerified: false,
      password: "",
      newPass: ""
    },
    errors: {}
  };

  toastOptions = {
    autoClose: 3000
  };

  schema = {
    _id: Joi.string(),
    email: Joi.string()
      .email()
      .required()
      .label("Email"),
    username: Joi.string().required(),
    registerDate: Joi.string().allow("", null),
    emailVerified: Joi.boolean(),
    newPass: Joi.string()
      .min(6)
      .allow("", null)
      .label("New Password"),
    password: Joi.string()
      .min(6)
      .max(30)
      .required()
      .label("Current Password")
  };

  componentDidMount = () => {
    this.populateAccountInfo();
  };
  populateAccountInfo = async () => {
    const user = await authService.getCurrentUser();
    const { data: userInfo } = await userService.getMeInfo(user.username);
    this.setState({ data: this.mapToViewModel(userInfo) });
  };

  mapToViewModel(user) {
    return {
      _id: user._id,
      username: user.username,
      email: user.email,
      emailVerified: user.emailVerified,
      registerDate: user.registerDate
    };
  }

  doSubmit = async () => {
    try {
      const { data: user } = this.state;
      const updatedAccountInfo = {
        username: user.username,
        email: user.email,
        password: user.password,
        newPass: user.newPass
      };

      const result = await userService.updateEmailandPass(updatedAccountInfo);
      if (result.status === 200) {
        toast.success(
          `${user.username} Account Updated, Please Login Again`,
          this.toastOptions
        );
      }
      // replace existing token
      await authService.loginWithJwt(result.headers["ws-auth-token"]);
      // wait 3 seconds then send to login screen
      setTimeout(function() {
        window.location = "/login";
      }, 3000);
    } catch (err) {
      if (err.response) {
        toast.error(
          `Error code: ${err.response.status} - ${err.response.data}`,
          this.toastOptions
        );
      } else {
        toast.error(err, this.toastOptions);
      }
    }
  };

  render() {
    return (
      <React.Fragment>
        <Form onSubmit={this.handleSubmit}>
          {this.renderInput("email", "Email")}
          {this.renderInput("newPass", "New Password", "password")}
          {this.renderInput("password", "Current Password", "password")}
          <div className="btn-submit">{this.renderButton("Update")}</div>
        </Form>
      </React.Fragment>
    );
  }
}

export default AccountInfoForm;
