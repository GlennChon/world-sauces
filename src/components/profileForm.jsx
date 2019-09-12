import React from "react";
import Form from "./common/form";

import Joi from "joi-browser";
import { Redirect } from "react-router-dom";

import * as authService from "../services/authService";
import * as userService from "../services/userService";
import * as recipeService from "../services/recipeService";

class ProfileForm extends Form {
  state = {
    data: {
      _id: "",
      username: "",
      firstName: "",
      lastName: "",
      about: "",
      email: "",
      registerDate: "",
      likes: []
    },
    errors: {},
    authoredRecipes: {},
    likedRecipes: {}
  };

  schema = {
    firstName: Joi.string().label("First Name"),
    lastName: Joi.string().label("Last Name"),
    about: Joi.string()
      .max(1000)
      .label("About"),
    email: Joi.string()
      .email()
      .label("Email")
  };

  mapUserToViewModel(user) {
    const data = user.data;
    return {
      _id: data._id,
      username: data.username,
      firstName: data.firstName,
      lastName: data.lastName,
      about: data.about,
      email: data.email,
      registerDate: data.registerDate,
      likes: data.likes
    };
  }

  componentDidMount = async () => {
    await this.populateUser();
    await this.getUserRecipes();
    await this.getUserLikes();
    console.log(this.state.errors);
  };

  populateUser = async () => {
    try {
      const user = await authService.getCurrentUser();
      if (!user) return this.props.history.replace("/not-found");
      const userInfo = await userService.getMeInfo(user.username);
      console.log(userInfo);
      this.setState({ data: this.mapUserToViewModel(userInfo) });
    } catch (ex) {
      if (ex.response && ex.response.status === 400) {
        let errors = { ...this.state.errors };

        this.setState({ errors });
      }
    }
  };

  getUserRecipes = async () => {
    const userRecipes = await recipeService.getRecipes(
      "",
      "",
      this.state.data.username
    );
    this.setState({ authoredRecipes: userRecipes });
  };

  getUserLikes = async () => {
    let likedRecipes = await recipeService.getRecipesLiked(
      this.state.data.likes
    );
    this.setState({ likedRecipes });
  };

  doSubmit = async () => {
    // Call the server
    try {
      await userService.updateUser(this.state.data);
    } catch (ex) {
      if (ex.response && ex.response.status === 400) {
        let errors = { ...this.state.errors };

        this.setState({ errors });
      }
    }
  };

  render() {
    if (!authService.getCurrentUser()) return <Redirect to="/" />;
    return (
      <React.Fragment>
        <form onSubmit={this.handleSubmit}>
          {this.renderInput("firstName", "First Name")}
          {this.renderInput("lastName", "Last Name")}
          {this.renderInput("about", "About")}
          {this.renderInput("email", "Email")}
          <div className="btn-edit"> {this.renderButton("Save")} </div>
        </form>
      </React.Fragment>
    );
  }
}

export default ProfileForm;
