import React, { Component } from "react";
import RecipeCard from "./recipeCard";
import { withRouter } from "react-router-dom";
import { loaderImg } from "../config.json";
import Img from "react-image";

class RecipeList extends Component {
  mapRecipeList = () => {
    try {
      return this.props.recipes.map((recipe, i) => (
        <div key={i} className="recipe-card-wrapper">
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
        <div className="recipe-card-container">
          {this.props.recipes ? (
            this.mapRecipeList(this.props.recipes)
          ) : (
            <Img src={loaderImg} className="cover" />
          )}
        </div>
      </React.Fragment>
    );
  }
}

export default withRouter(RecipeList);
