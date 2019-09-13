import React from "react";
import Form from "./common/form";

import Joi from "joi-browser";
import { Redirect } from "react-router-dom";

import * as authService from "../services/authService";
import * as userService from "../services/userService";
import * as recipeService from "../services/recipeService";
import RecipeList from "./recipeList";
import { toast } from "react-toastify";

import { Tab, Row, Col, Nav } from "react-bootstrap";
import "../css/profileForm.css";

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
      emailVerified: false,
      likes: []
    },
    errors: {},
    authoredRecipes: {},
    likedRecipes: {},
    navItem: "first"
  };

  toastOptions = {
    autoClose: 2000
  };

  schema = {
    _id: Joi.string(),
    username: Joi.string(),
    email: Joi.string()
      .email()
      .required()
      .label("Email"),
    firstName: Joi.string()
      .allow("", null)
      .label("First Name"),
    lastName: Joi.string()
      .allow("", null)
      .label("Last Name"),
    about: Joi.string()
      .allow("", null)
      .label("About"),
    registerDate: Joi.string(),
    emailVerified: Joi.boolean(),
    likes: Joi.array()
  };

  mapUserToViewModel(user) {
    return {
      _id: user._id,
      username: user.username,
      firstName: user.firstName,
      lastName: user.lastName,
      about: user.about,
      email: user.email,
      registerDate: user.registerDate,
      emailVerified: user.emailVerified,
      likes: user.likes
    };
  }

  componentDidMount = async () => {
    await this.populateUser();
  };

  populateUser = async () => {
    try {
      const user = await authService.getCurrentUser();
      if (!user) this.props.history.replace("/not-found");
      const { data: userInfo } = await userService.getMeInfo(user.username);
      const userRecipes = await recipeService.getRecipes(
        "",
        "",
        userInfo.username
      );
      const likedRecipes = await recipeService.getRecipesLiked(userInfo.likes);
      this.setState({
        data: this.mapUserToViewModel(userInfo),
        authoredRecipes: userRecipes.data,
        likedRecipes: likedRecipes.data
      });
    } catch (ex) {
      if (ex.response && ex.response.status === 400) {
        let errors = { ...this.state.errors };

        this.setState({ errors });
      }
    }
  };

  updateUser = async () => {
    try {
      const { data: user } = this.state;
      const updatedUserInfo = {
        _id: user._id,
        firstName: user.firstName,
        lastName: user.lastName,
        about: user.about,
        email: user.email
      };
      const result = await userService.updateUser(updatedUserInfo);
      if (result.status === 200) {
        toast.success(`${user.username} Profile Updated`, this.toastOptions);
      } else {
        toast.error(
          `Error code: ${result.status} - ${result.statusText}`,
          this.toastOptions
        );
      }
    } catch (ex) {
      console.log(ex);
      if (ex.response && ex.response.status === 400) {
        let errors = { ...this.state.errors };
        toast.error(ex.response.status + " " + ex.response, this.toastOptions);
        this.setState({ errors });
      }
    }
  };

  doSubmit = async () => {
    if (this.state.navItem === "third") {
      await this.updateUser();
    } else if (this.state.navItem === "fourth") {
      console.log("button in fourth pushed");
    }
  };

  handlePillSelect = e => {
    this.setState({ navItem: e });
  };

  render() {
    if (!authService.getCurrentUser()) return <Redirect to="/" />;
    return (
      <React.Fragment>
        <Tab.Container
          id="left-tabs-example"
          defaultActiveKey="first"
          onSelect={e => this.handlePillSelect(e)}
        >
          <Row>
            <Col sm={2}>
              <Nav variant="pills" className="flex-column tab-nav">
                <Nav.Item>
                  <Nav.Link eventKey="first">Likes</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                  <Nav.Link eventKey="second">My Recipes</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                  <Nav.Link eventKey="third">Profile</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                  <Nav.Link eventKey="fourth">Password</Nav.Link>
                </Nav.Item>
              </Nav>
            </Col>
            <Col sm={10}>
              <Tab.Content>
                {/* Likes */}
                <Tab.Pane eventKey="first" className="tab-pane">
                  <RecipeList recipes={this.state.likedRecipes} />
                </Tab.Pane>
                {/* My Recipes */}
                <Tab.Pane eventKey="second" className="tab-pane">
                  <RecipeList recipes={this.state.authoredRecipes} />
                </Tab.Pane>
                {/* Profile */}
                <Tab.Pane eventKey="third" className="tab-pane">
                  <form onSubmit={this.handleSubmit}>
                    {this.renderInput("firstName", "First Name")}
                    {this.renderInput("lastName", "Last Name")}
                    {this.renderInput("about", "About")}
                    {this.renderInput("email", "Email")}
                    {this.renderButton("Save")}
                  </form>
                </Tab.Pane>
                {/* Password */}
                <Tab.Pane eventKey="fourth" className="tab-pane">
                  <form onSubmit={this.handleSubmit}>
                    {this.renderButton("Submit")}
                  </form>
                </Tab.Pane>
              </Tab.Content>
            </Col>
          </Row>
        </Tab.Container>
      </React.Fragment>
    );
  }
}

export default ProfileForm;
