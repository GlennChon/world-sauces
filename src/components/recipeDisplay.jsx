import React from "react";
import Display from "./common/display";
import * as authService from "../services/authService";
import * as recipeService from "../services/recipeService";

class RecipeDisplay extends Display {
  state = {
    data: {
      _id: "",
      title: "",
      origin_country: "",
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
      this.setState({ data: this.mapToViewModel(recipe) });
    } catch (ex) {
      if (ex.response && ex.response.status === 404)
        this.props.history.replace("/not-found");
    }
  }

  async componentDidMount() {
    await this.populateRecipe();
  }

  doEdit = async () => {
    this.props.history.push("/recipe/edit/" + this.state.data._id);
  };

  render() {
    const user = authService.getCurrentUser();

    return (
      <React.Fragment>
        <div className="recipe-display-container">
          {this.renderImg("image_link")}
          <span className="display-profile-container">
            {this.renderHorizontalList(
              "taste_profile",
              "display-profile-wrapper",
              "display-profile-item"
            )}
          </span>
          {this.renderMainTitle("title")}
          {this.renderLikes()}
          <h2 className="display-information-title">Information</h2>

          <div className="row">
            <div className="col-md-6">
              {this.renderChildTitle("origin_country", "Country")}
            </div>
            <div className="col-md-6">
              {this.renderChildTitle("author", "Author")}
            </div>
          </div>

          <div className="row">
            <div className="col-md">
              {this.renderChildTitle("description", "Description")}
            </div>
          </div>
          <div className="row">
            <div className="col-md-4">
              <h2 className="display-ingredients-title">Ingredients</h2>
              {this.renderList(
                "ingredients",
                "list-unstyled ingredient-container",
                "ingredient-wrapper"
              )}
            </div>
            <div className="col-md-8">
              <h2 className="display-instructions-title">Instructions</h2>
              {this.renderNumberedList(
                "instructions",
                "list-styled instruction-container",
                "instruction-wrapper"
              )}
            </div>
          </div>
        </div>
        <div className="btn-edit">
          {user &&
            (user.username === this.state.data.author &&
              this.renderEditButton("btn-warning"))}
        </div>
      </React.Fragment>
    );
  }
}

export default RecipeDisplay;
