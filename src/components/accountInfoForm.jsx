import React from "react";
import Joi from "joi-browser";

import * as authService from "../services/authService";
import * as userService from "../services/userService";
import Form from "./common/form";
import { toast } from "react-toastify";

class AccountInfoForm extends Form {
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
    autoClose: 2000
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
        toast.success(`${user.username} Account Updated`, this.toastOptions);
      }
      await authService.logout();
      await authService.loginWithJwt(result.headers["ws-auth-token"]);
      let newUser = await authService.getCurrentUser();

      this.setState({ user: newUser });
      window.location = "/profile/" + newUser.username;
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
        <form onSubmit={this.handleSubmit}>
          {this.renderInput("email", "Email")}
          {this.renderInput("newPass", "New Password", "password")}
          {this.renderInput("password", "Current Password", "password")}
          {this.renderButton("Update")}
        </form>
      </React.Fragment>
    );
  }
}

export default AccountInfoForm;
