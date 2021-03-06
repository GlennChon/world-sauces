import React, { Component } from "react";
import * as recipeService from "../../services/recipeService";
import _ from "lodash";
import { withRouter } from "react-router-dom";

import RecipeCard from "../recipeCard";
//import RegisterForm from "./registerForm";
import authService from "../../services/authService";

import "./home.css";

class Home extends Component {
  _isMounted = false;
  state = {
    popular: {},
    random: {}
  };

  async componentDidMount() {
    this._isMounted = true;
    if (this._isMounted) {
      await this.loadPopularRecipes();
      await this.loadRandomRecipes();
      setTimeout(this.apiResponseCheck(), 5000);
    }
  }

  async componentWillUnmount() {
    this._isMounted = false;
  }

  // Temporary solution for spin up time of heroku free tier
  apiResponseCheck = () => {
    if (this.state.popular == null) {
      window.location.reload();
    }
    return;
  };
  handleCardClick = (recipeId, e) => {
    e.preventDefault();
    this.props.history.push("/recipe/" + recipeId);
  };
  loadPopularRecipes = async () => {
    let json = await recipeService.getPopular();
    this.setState({ popular: json });
  };

  loadRandomRecipes = async () => {
    let json = await recipeService.getRandom();
    this.setState({ random: json });
  };

  // renderLoggedOutInMsg = () => {
  //   let msg = "Join the community!";
  //   if (authService.getCurrentUser()) {
  //     return;
  //   } else {
  //     return (
  //       <React.Fragment>
  //         <div className="register-container">
  //           <h1>{msg}</h1>
  //           <RegisterForm></RegisterForm>
  //         </div>
  //       </React.Fragment>
  //     );
  //   }
  // };

  renderLoggedInMsg = () => {};

  renderPopular() {
    let recipes = this.state.popular.data;
    let popular = [];
    if (_.isEmpty(this.state.popular)) {
      return null;
    } else {
      for (let i = 0; i < 3; i++) {
        popular.push(
          <div
            key={i}
            className="recipe-card-wrapper"
            onClick={e => this.handleCardClick(recipes[i]._id, e)}
          >
            <RecipeCard recipe={recipes[i]} />
          </div>
        );
      }
      return popular;
    }
  }

  renderRandom() {
    let recipes = this.state.random.data;
    let random = [];
    if (_.isEmpty(this.state.random)) {
      return null;
    } else {
      for (let i = 0; i < 3; i++) {
        random.push(
          <div
            key={i}
            className="recipe-card-wrapper"
            onClick={e => this.handleCardClick(recipes[i]._id, e)}
          >
            <RecipeCard key={recipes[i].id} recipe={recipes[i]} />
          </div>
        );
      }
      return random;
    }
  }

  render() {
    return (
      <React.Fragment>
        <div className="home-container">
          <h1>Most Popular</h1>
          <div className="recipe-card-container">{this.renderPopular()}</div>
          <br />
          <h1>Random</h1>
          <div className="recipe-card-container">{this.renderRandom()}</div>
        </div>
        {
          //this.renderLoggedOutInMsg()
        }
      </React.Fragment>
    );
  }
}

export default withRouter(Home);
