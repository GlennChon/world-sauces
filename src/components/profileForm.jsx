import React from "react";
import Form from "./common/form";

import Joi from "joi-browser";
import { Redirect } from "react-router-dom";

import * as authService from "../services/authService";
import * as userService from "../services/userService";
import * as recipeService from "../services/recipeService";
import { toast } from "react-toastify";
import { Tab, Row, Col, Nav } from "react-bootstrap";

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
    likedRecipes: {}
  };

  schema = {
    _id: Joi.string(),
    username: Joi.string(),
    email: Joi.string()
      .email()
      .required()
      .label("Email"),
    firstName: Joi.string().label("First Name"),
    lastName: Joi.string().label("Last Name"),
    about: Joi.string().label("About"),
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
    await this.getUserRecipes();
    await this.getUserLikes();
  };

  populateUser = async () => {
    try {
      const user = await authService.getCurrentUser();
      if (!user) this.props.history.replace("/not-found");
      const { data: userInfo } = await userService.getMeInfo(user.username);
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
    const toastOptions = {
      autoClose: 2000
    };
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
        toast.success(`${user.username} Profile Updated`, toastOptions);
      } else {
        toast.error(
          `Error code: ${result.status} - ${result.statusText}`,
          toastOptions
        );
      }
    } catch (ex) {
      console.log(ex);
      if (ex.response && ex.response.status === 400) {
        let errors = { ...this.state.errors };
        toast.error(ex.response.status + " " + ex.response, toastOptions);
        this.setState({ errors });
      }
    }
  };

  render() {
    if (!authService.getCurrentUser()) return <Redirect to="/" />;
    return (
      <React.Fragment>
        <Tab.Container id="left-tabs-example" defaultActiveKey="first">
          <Row>
            <Col sm={3}>
              <Nav variant="pills" className="flex-column">
                <Nav.Item>
                  <Nav.Link eventKey="first">Profile</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                  <Nav.Link eventKey="second">Likes</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                  <Nav.Link eventKey="third">My Recipes</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                  <Nav.Link eventKey="fourth">Password</Nav.Link>
                </Nav.Item>
              </Nav>
            </Col>
            <Col sm={9}>
              <Tab.Content>
                <Tab.Pane eventKey="first">
                  <form onSubmit={this.handleSubmit}>
                    {this.renderInput("firstName", "First Name")}
                    {this.renderInput("lastName", "Last Name")}
                    {this.renderInput("about", "About")}
                    {this.renderInput("email", "Email")}
                    {this.renderButton("Save")}
                  </form>
                </Tab.Pane>
                <Tab.Pane eventKey="second">
                  <p>text 2</p>
                </Tab.Pane>
              </Tab.Content>
              <Tab.Pane eventKey="third">
                <p>text 3</p>
              </Tab.Pane>
              <Tab.Pane eventKey="fourth">
                <p>text 4</p>
              </Tab.Pane>
            </Col>
          </Row>
        </Tab.Container>
      </React.Fragment>
    );
  }
}

export default ProfileForm;
