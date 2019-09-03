import React, { Component } from "react";
import * as recipeService from "../services/recipeService";
import _ from "lodash";

import RecipeCard from "./recipeCard";
import { faUmbrella } from "@fortawesome/free-solid-svg-icons";
import { async } from "q";

class Home extends Component {
  state = {
    popular: {},
    random: {}
  };
  async componentDidMount() {
    await this.loadPopularRecipes();
    await this.loadRandomRecipes();
  }

  loadPopularRecipes = async () => {
    let json = await recipeService.getPopular();
    this.setState({ popular: json });
  };

  loadRandomRecipes = async () => {
    let json = await recipeService.getRandom();
    this.setState({ random: json });
  };

  renderPopular() {
    let recipes = this.state.popular.data;
    let popular = [];
    if (_.isEmpty(this.state.popular)) {
      return null;
    } else {
      for (let i = 0; i < 3; i++) {
        popular.push(
          <div key={i} className="recipe-short-wrapper">
            <RecipeCard key={recipes[i].id} recipe={recipes[i]} />
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
          <div key={i} className="recipe-short-wrapper">
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
        <br />
        <h1>Most Popular</h1>
        <div className="recipe-short-container">{this.renderPopular()}</div>
        <br />
        <h1>Random</h1>
        <div className="recipe-short-container">{this.renderRandom()}</div>
      </React.Fragment>
    );
  }
}

export default Home;
