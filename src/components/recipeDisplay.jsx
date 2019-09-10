import React from "react";
import Display from "./common/display";
import * as authService from "../services/authService";
import * as recipeService from "../services/recipeService";
import * as userService from "../services/userService";

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
      instructions: [],
      liked: false
    },
    isLiked: false,
    user: {}
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

  componentDidMount = async () => {
    await this.populateRecipe();
    await this.updateCurrentUser();
    if (this.state.user) {
      await this.checkUserLikes(this.state.user.username);
    }
  };

  doLike = async () => {
    await this.populateRecipe();
  };
  updateCurrentUser = async () => {
    const user = await authService.getCurrentUser();
    this.setState({ user });
  };

  checkUserLikes = async username => {
    const userInfo = await userService.getMeInfo(username);
    const { _id: recipeId } = this.state.data;
    const userLikes = userInfo.data.likes;
    let isLiked = false;
    if (userLikes.includes(recipeId)) {
      isLiked = true;
    }
    this.setState({ isLiked });
  };

  populateRecipe = async () => {
    try {
      const recipeId = this.props.match.params.id;
      const { data: recipe } = await recipeService.getRecipe(recipeId);
      this.setState({ data: this.mapToViewModel(recipe) });
    } catch (ex) {
      if (ex.response && ex.response.status === 404)
        this.props.history.replace("/not-found");
    }
  };

  doEdit = async () => {
    this.props.history.push("/recipe/edit/" + this.state.data._id);
  };

  render() {
    return (
      <React.Fragment>
        <div className="recipe-display-container">
          {/*IMAGE*/}
          {this.renderImg("image_link", "display-img")}
          {/*TASTE PROFILE*/}
          <span className="display-profile-container">
            {this.renderHorizontalList(
              "taste_profile",
              "display-profile-wrapper",
              "display-profile-item"
            )}
          </span>
          {/*RECIPE WRAPPER*/}
          <div className="recipe-display-wrapper">
            {/*RECIPE NAME*/}
            {this.renderMainTitle("title")}
            {/*LIKES*/}
            {this.renderLikes(this.state.data.likes)}
            {/*INFORMATION*/}
            <div className="row">
              <div className="col">
                <h2 className="display-information-title">Information</h2>
              </div>
            </div>
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
            {/*INGREDIENTS*/}
            <div className="row">
              <div className="col-md-4">
                <h2 className="display-ingredients-title">Ingredients</h2>
                {this.renderList(
                  "ingredients",
                  "list-unstyled ingredient-container",
                  "ingredient-wrapper"
                )}
              </div>
              {/*INSTRUCTIONS*/}
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
        </div>
        <div className="btn-edit">
          {this.state.user &&
            (this.state.user.username === this.state.data.author &&
              this.renderEditButton("btn-warning"))}
        </div>
      </React.Fragment>
    );
  }
}

export default RecipeDisplay;
