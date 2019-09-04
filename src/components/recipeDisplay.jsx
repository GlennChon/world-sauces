import React, { Component } from "react";
import Display from "./common/display";
import * as authService from "../services/authService";
import * as recipeService from "../services/recipeService";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faAppleAlt,
  faEgg,
  faCarrot,
  faLemon,
  faPepperHot
} from "@fortawesome/free-solid-svg-icons";

class RecipeDisplay extends Display {
  state = {
    data: {
      _id: "",
      title: "",
      origin_country: {},
      author: "",
      likes: 0,
      image_link: "",
      description: "",
      taste_profile: [],
      ingredients: [],
      instructions: []
    }
  };

  mapToViewModel(recipe) {
    console.log(recipe);
    return {
      _id: recipe._id,
      title: recipe.title,
      origin_country: recipe.origin_country,
      author: recipe.author,
      likes: recipe.likes,
      image_link: recipe.image_link,
      description: recipe.description,
      taste_profile: recipe.taste_profile,
      ingredients: recipe.ingredients,
      instructions: recipe.instructions
    };
  }

  async populateRecipe() {
    try {
      const recipeId = this.props.match.params.id;
      const { data: recipe } = await recipeService.getRecipe(recipeId);
      console.log(recipe);
      this.setState({ data: this.mapToViewModel(recipe) });
    } catch (ex) {
      if (ex.response && ex.response.status === 404)
        this.props.history.replace("/not-found");
    }
  }

  async componentDidMount() {
    await this.populateRecipe();
  }

  render() {
    const user = authService.getCurrentUser();

    return (
      <React.Fragment>
        <div className="container"> </div>
        {this.renderMainTitle("title")}
        {this.renderImg("image_link")}
        {this.renderLikes()}
        {this.renderHorizontalList("taste_profile")}
        {this.renderChildTitle("origin_country", "name", "Country")}
        <div className="row">
          <div className="col-sm-8">
            {this.renderList(
              "ingredients",
              "Ingredients",
              "ingredients-list",
              "borderless ingredient"
            )}
          </div>
        </div>
        {this.renderNumberedList(
          "instructions",
          "Instructions",
          "instructions-list"
        )}
        {user &&
          (user.username === this.state.data.author && this.renderEditButton())}
      </React.Fragment>
    );
  }
}

export default RecipeDisplay;
