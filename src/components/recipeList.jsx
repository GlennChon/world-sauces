import React, { Component } from "react";
import RecipeCard from "./recipeCard";

class RecipeList extends Component {
  mapRecipeList = () => {
    try {
      return this.props.recipes.map((recipe, i) => (
        <div key={i} className="recipe-short-wrapper">
          <RecipeCard key={recipe.id} recipe={recipe} />
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

export default RecipeList;
