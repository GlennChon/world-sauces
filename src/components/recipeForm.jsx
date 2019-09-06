import React from "react";
import Joi from "joi-browser";
import { Redirect } from "react-router-dom";

import Form from "./common/form";

import * as authService from "../services/authService";
import { getCountries } from "../services/countryService";
import { getTasteProfiles } from "../services/tasteProfileService";
import * as recipeService from "../services/recipeService";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMinusCircle, faPlusCircle } from "@fortawesome/free-solid-svg-icons";

class RecipeForm extends Form {
  state = {
    data: {
      title: "",
      origin_country_code: "",
      author: "",
      likes: 0,
      image_link: "",
      description: "",
      taste_profile: [],
      ingredients: [],
      instructions: []
    },
    countries: [],
    taste_profiles: [],
    checkedItems: new Map(),
    errors: {}
  };

  schema = {
    _id: Joi.string(),
    title: Joi.string()
      .min(2)
      .max(255)
      .required()
      .label("Title"),
    origin_country_code: Joi.string()
      .min(2)
      .max(2)
      .required()
      .label("Country"),
    author: Joi.string()
      .required()
      .label("Author"),
    likes: Joi.number()
      .integer()
      .label("Likes"),
    image_link: Joi.string().label("Image Link"),
    description: Joi.string().label("Description"),
    taste_profile: Joi.array()
      .min(1)
      .required()
      .label("Taste Profile"),
    ingredients: Joi.array()
      .min(1)
      .required()
      .label("Ingredients"),
    instructions: Joi.array()
      .min(1)
      .required()
      .label("Instructions")
  };

  mapToViewModel = recipe => {
    return {
      _id: recipe._id,
      title: recipe.title,
      origin_country_code: recipe.origin_country_code,
      author: recipe.author,
      likes: recipe.likes,
      image_link: recipe.image_link,
      description: recipe.description,
      taste_profile: recipe.taste_profile,
      ingredients: recipe.ingredients,
      instructions: recipe.instructions
    };
  };

  async componentDidMount() {
    await this.populateTasteProfiles();
    await this.populateCountries();
    await this.setAuthor();
    await this.populateRecipe();
  }
  setAuthor = async () => {
    // set author
    const user = authService.getCurrentUser();
    let data = this.state.data;
    data.author = user.username;
    this.setState({ data });
  };
  populateCountries = async () => {
    const { data: countries } = await getCountries();
    this.setState({ countries });
  };

  populateTasteProfiles = async () => {
    const { data: taste_profiles } = await getTasteProfiles();
    this.setState({ taste_profiles });
  };

  populateRecipe = async () => {
    try {
      const recipeId = this.props.match.params._id;
      if (recipeId === "new") return;

      const { data: recipe } = await recipeService.getRecipe(recipeId);
      this.setState({ data: this.mapToViewModel(recipe) });
    } catch (ex) {
      if (ex.response && ex.response.status === 404) {
        this.props.history.replace("/not-found");
      }
    }
  };

  // + and - handlers for dynamic input fields
  handleDynamicChange = (i, listName, event) => {
    const data = this.state.data;
    const list = data[listName];
    list[i].value = event.target.value;
    this.setState({ data });
  };

  removeClick = (i, listName, e) => {
    e.preventDefault();
    const data = this.state.data;
    data[listName].splice(i, 1);
    this.setState({ data });
  };

  addClick = (listName, e) => {
    e.preventDefault();
    let data = this.state.data;
    data[listName].push({ value: null });
    console.log(this.state);
    this.setState({ data });
  };

  doSubmit = async () => {
    // Call the server
    console.log(this.state.data);
    try {
      console.log(this.state.data);
      let result = await recipeService.saveRecipe(this.state.data);
      this.props.history.push("/recipe/" + result.data._id);
    } catch (ex) {
      if (ex.response && ex.response.status === 400) {
        const errors = { ...this.state.errors };

        errors.push(ex.response.data.message);

        this.setState({ errors });
      }
    }
  };

  render() {
    if (!authService.getCurrentUser()) return <Redirect to="/" />;

    //const { data: recipe, countries, taste_profiles } = this.state.data;
    const ingredientList = "ingredients";
    const instructionList = "instructions";
    return (
      <React.Fragment>
        <h1>Recipe</h1>
        <form onSubmit={this.handleSubmit}>
          {this.renderInput("title", "Title")}
          {this.renderCheckboxes(
            "taste_profile",
            "Taste Profile",
            this.state.taste_profiles
          )}
          {this.renderSelect(
            "origin_country_code",
            "Country",
            this.state.countries
          )}
          {this.renderInput("description", "Description")}
          {this.renderInput("image_link", "Image Link")}
          {/* Dynamic Ingredients*/}
          <label htmlFor="ingredients">Ingredients</label>
          <br />
          {this.state.data.ingredients.map((el, i) => (
            <div key={i}>
              <div className="input-group">
                <input
                  name="ingredients"
                  placeholder="e.g. 1/4 Cup Vinegar"
                  className="form-control"
                  type="text"
                  value={el.value || ""}
                  onChange={e => this.handleDynamicChange(i, ingredientList, e)}
                />
                <button
                  className="btn btn-danger"
                  onClick={e => this.removeClick(i, ingredientList, e)}
                >
                  <FontAwesomeIcon icon={faMinusCircle} />
                </button>

                <br />
              </div>
            </div>
          ))}
          <button
            className="btn btn-success"
            onClick={e => this.addClick(ingredientList, e)}
          >
            <FontAwesomeIcon icon={faPlusCircle} />
          </button>
          <br />
          {/* Dynamic Instructions*/}
          <label htmlFor="instructions">Instructions</label>
          <br />
          {this.state.data.instructions.map((el, i) => (
            <div key={i}>
              <div className="input-group">
                <input
                  name="instructions"
                  placeholder="e.g. Toast dry spices"
                  className="form-control"
                  type="text"
                  value={el.value || ""}
                  onChange={e =>
                    this.handleDynamicChange(i, instructionList, e)
                  }
                />
                <button
                  className="btn btn-danger"
                  onClick={e => this.removeClick(i, instructionList, e)}
                >
                  <FontAwesomeIcon icon={faMinusCircle} />
                </button>

                <br />
              </div>
            </div>
          ))}
          <button
            className="btn btn-success"
            onClick={e => this.addClick(instructionList, e)}
          >
            <FontAwesomeIcon icon={faPlusCircle} />
          </button>
          <br />
          {this.renderButton("Save")}
        </form>
      </React.Fragment>
    );
  }
}

export default RecipeForm;
