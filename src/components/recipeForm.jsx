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
      origin_country: "",
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
    errors: {},
    disabled: false
  };

  schema = {
    _id: Joi.string(),
    title: Joi.string()
      .min(2)
      .max(255)
      .required()
      .label("Title"),
    origin_country: Joi.string()
      .min(2)
      .max(50)
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
    const data = recipe.data;
    return {
      _id: data._id,
      title: data.title,
      origin_country: data.origin_country,
      author: data.author,
      likes: data.likes,
      image_link: data.image_link,
      description: data.description,
      taste_profile: data.taste_profile,
      ingredients: data.ingredients,
      instructions: data.instructions
    };
  };

  async componentDidMount() {
    await this.populateTasteProfiles();
    await this.populateCountries();
    await this.populateRecipe();
    await this.fillCheckedItems();
    await this.setAuthor();
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

  fillCheckedItems = () => {
    const tasteProfiles = this.state.taste_profiles;
    const tasteProfile = this.state.data.taste_profile;
    let checkedItems = this.state.checkedItems;

    tasteProfiles.forEach(obj => {
      if (tasteProfile.includes(obj.name)) {
        checkedItems[obj.name] = true;
      } else {
        checkedItems[obj.name] = false;
      }
    });
    this.setState({ checkedItems });
  };

  populateTasteProfiles = async () => {
    const { data: taste_profiles } = await getTasteProfiles();
    this.setState({ taste_profiles });
  };

  populateRecipe = async () => {
    try {
      const { id } = this.props.match.params;
      if (id === "new") return;

      const recipe = await recipeService.getRecipe(id);
      this.setState({ data: this.mapToViewModel(recipe), disabled: true });
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
    this.setState({ data });
  };

  doSubmit = async () => {
    // Call the server
    console.log(this.state.data);
    try {
      let result = await recipeService.saveRecipe(this.state.data);
      this.props.history.push("/recipe/" + result.data._id);
    } catch (ex) {
      if (ex.response && ex.response.status === 400) {
        let errors = { ...this.state.errors };
        console.log(ex.response);

        this.setState({ errors });
      }
    }
  };

  render() {
    if (!authService.getCurrentUser()) return <Redirect to="/" />;

    //const { data: recipe, countries, taste_profiles } = this.state.data;
    const ingredientList = "ingredients";
    const instructionList = "instructions";
    const isDisabled = this.state.disabled;
    return (
      <React.Fragment>
        <h1>Recipe</h1>
        <form onSubmit={this.handleSubmit}>
          {this.renderInput("title", "Title")}
          {this.renderCheckboxes(
            "taste_profile",
            "Taste Profile",
            this.state.taste_profiles,
            this.state.checkedItems
          )}
          {this.renderSelect(
            "origin_country",
            "Country",
            this.state.countries,
            isDisabled
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
