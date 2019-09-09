import React, { Component } from "react";
import RecipeCard from "./recipeCard";
import VisibilitySensor from "react-visibility-sensor";
import { withRouter } from "react-router-dom";
import { loaderImg } from "../config.json";
import Img from "react-image";

class RecipeList extends Component {
  handleCardClick = (recipeId, e) => {
    e.preventDefault();
    this.props.history.push("/recipe/" + recipeId);
  };
  mapRecipeList = () => {
    try {
      return this.props.recipes.map((recipe, i) => (
        <VisibilitySensor key={i}>
          <div
            className="recipe-card-wrapper"
            onClick={e => this.handleCardClick(recipe._id, e)}
          >
            <RecipeCard recipe={recipe} />
          </div>
        </VisibilitySensor>
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
