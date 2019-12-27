import React from "react";
import * as Yup from "yup";

import * as authService from "../../services/authService";
import * as userService from "../../services/userService";
import FormComponent from "../common/formComponent";

import { toast } from "react-toastify";
import { Form } from "react-bootstrap";
class UserInfoForm extends FormComponent {
  state = {
    data: {
      _id: "",
      username: "",
      firstName: "",
      lastName: "",
      about: ""
    },
    errors: {}
  };

  toastOptions = {
    autoClose: 2000
  };

  schema = {
    _id: Joi.string(),
    username: Joi.string(),
    firstName: Joi.string()
      .allow("", null)
      .label("First Name"),
    lastName: Joi.string()
      .allow("", null)
      .label("Last Name"),
    about: Joi.string()
      .allow("", null)
      .label("About")
  };

  componentDidMount = () => {
    this.populateUserInfo();
  };

  populateUserInfo = async () => {
    const user = await authService.getCurrentUser();
    const { data: userInfo } = await userService.getMeInfo(user.username);
    this.setState({ data: this.mapToViewModel(userInfo) });
  };

  mapToViewModel(user) {
    return {
      _id: user._id,
      username: user.username,
      firstName: user.firstName,
      lastName: user.lastName,
      about: user.about
    };
  }

  doSubmit = async () => {
    try {
      const { data: user } = this.state;
      const updatedUserInfo = {
        _id: user._id,
        firstName: user.firstName,
        lastName: user.lastName,
        about: user.about
      };
      const result = await userService.updateUser(updatedUserInfo);
      if (result.status === 200) {
        toast.success(`${user.username} Profile Updated`, this.toastOptions);
      }
    } catch (err) {
      toast.error(
        `Error code: ${err.response.status} - ${err.response.data}`,
        this.toastOptions
      );
    }
  };

  render() {
    return (
      <React.Fragment>
        <Form onSubmit={this.handleSubmit}>
          <h2>{this.state.username}</h2>
          {this.renderInput("firstName", "First Name")}
          {this.renderInput("lastName", "Last Name")}
          {this.renderInput("about", "About")}
          <div className="btn-submit">{this.renderButton("Update")}</div>
        </Form>
      </React.Fragment>
    );
  }
}

export default UserInfoForm;
