import React, { Component } from "react";
import RecipeCard from "./recipeCard";

import { withRouter } from "react-router-dom";

class RecipeList extends Component {
  handleCardClick = (recipeId, e) => {
    e.preventDefault();
    console.log("clicked: " + recipeId);

    this.props.history.push("/recipe/" + recipeId);
  };
  mapRecipeList = () => {
    try {
      return this.props.recipes.map((recipe, i) => (
        <div
          key={i}
          className="recipe-short-wrapper"
          onClick={e => this.handleCardClick(recipe._id, e)}
        >
          <RecipeCard recipe={recipe} />
        </div>
      ));
    } catch (err) {
      console.log(err);
    }
  };

  render() {
    return (
      <React.Fragment>
        <div className="recipe-short-container">
          {this.mapRecipeList(this.props.recipes)}
        </div>
      </React.Fragment>
    );
  }
}

export default withRouter(RecipeList);
