import React, { Component } from "react";

import { Redirect } from "react-router-dom";

import * as authService from "../services/authService";
import * as userService from "../services/userService";
import * as recipeService from "../services/recipeService";
import RecipeList from "./recipeList";
import UserInfoForm from "./userInfoForm";
import AccountInfoForm from "./accountInfoForm";

import { Tab, Row, Col, Nav } from "react-bootstrap";
import "../css/profileForm.css";

class ProfileForm extends Component {
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
      password: "",
      newPass: ""
    },
    errors: {},
    authoredRecipes: [],
    likedRecipes: []
  };

  componentDidMount = async () => {
    await this.populateUser();
  };

  populateUser = async () => {
    try {
      // Get current user
      const user = await authService.getCurrentUser();
      const { data: userInfo } = await userService.getMeInfo(user.username);

      // Get the user's recipes
      const userRecipes = await recipeService.getRecipes(
        "",
        "",
        "",
        "",
        "",
        userInfo.username
      );

      // Get the user's liked recipes
      const likedRecipes = await recipeService.getRecipesLiked(userInfo.likes);
      this.setState({
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

  render() {
    if (!authService.getCurrentUser()) return <Redirect to="/" />;
    return (
      <React.Fragment>
        <Tab.Container id="left-tabs-example" defaultActiveKey="first">
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
                  <Nav.Link eventKey="fourth">Account</Nav.Link>
                </Nav.Item>
              </Nav>
            </Col>
            <Col sm={10}>
              <Tab.Content>
                {/* Likes */}
                <Tab.Pane eventKey="first" className="tab-pane">
                  {<RecipeList recipes={this.state.likedRecipes} />}
                </Tab.Pane>
                {/* My Recipes */}
                <Tab.Pane eventKey="second" className="tab-pane">
                  {<RecipeList recipes={this.state.authoredRecipes} />}
                </Tab.Pane>
                {/* Profile */}
                <Tab.Pane eventKey="third" className="tab-pane">
                  <UserInfoForm />
                </Tab.Pane>
                {/* Account */}
                <Tab.Pane eventKey="fourth" className="tab-pane">
                  <AccountInfoForm />
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
