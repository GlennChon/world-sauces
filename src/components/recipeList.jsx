import React, { Component } from "react";
import RecipeCard from "./recipeCard";
import VisibilitySensor from "react-visibility-sensor";
import { withRouter } from "react-router-dom";

class RecipeList extends Component {
  handleCardClick = (recipeId, e) => {
    e.preventDefault();
    this.props.history.push("/recipe/" + recipeId);
  };
  mapRecipeList = () => {
    try {
      return this.props.recipes.map((recipe, i) => (
        <VisibilitySensor>
          <div
            key={i}
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
          {this.mapRecipeList(this.props.recipes)}
        </div>
      </React.Fragment>
    );
  }
}

export default withRouter(RecipeList);
