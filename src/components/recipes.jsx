import React, { Component } from "react";
import { getRecipes } from "../services/fakeRecipeService";
import "../css/recipes.css";
class Recipes extends Component {
  state = {
    recipes: []
  };

  componentDidMount() {
    this.loadRecipes();
  }

  loadRecipes = async () => {
    let rcps = await getRecipes();
    console.log(rcps);
    this.setState({
      recipes: rcps
    });
  };

  handleClick = recipe => {};

  render() {
    return (
      <React.Fragment>
        <div className="recipe-short-container">
          {this.state.recipes.map((recipe, i) => (
            <div className="recipe-short-wrapper" key={i}>
              <div className="recipe-short-image-container">
                <img
                  src={
                    recipe.imageLink
                      ? recipe.imageLink
                      : require("../images/vegetables.svg")
                  }
                  className="cover"
                />
              </div>
              <span className="profile-container">
                <div className="profile-wrapper">
                  {recipe.tasteProfile.map((desc, k) => (
                    <item className="profile-item" key={k}>
                      {desc}
                    </item>
                  ))}
                </div>
              </span>
              <h2>{recipe.title}</h2>
              <h3>Origin: {recipe.originCountry}</h3>
            </div>
          ))}
        </div>
      </React.Fragment>
    );
  }
}

export default Recipes;
