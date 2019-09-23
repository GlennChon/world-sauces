import React, { useState } from "react";
import Joi from "joi-browser";
import { Redirect } from "react-router-dom";

import FormComponent from "./common/formComponent";

import * as authService from "../services/authService";
import { getCountries } from "../services/countryService";
import { getTasteProfiles } from "../services/tasteProfileService";
import * as recipeService from "../services/recipeService";

import { Modal, Button, Row, Col, Form } from "react-bootstrap";
import "../css/recipeForm.css";

class RecipeForm extends FormComponent {
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
    },
    countries: [],
    taste_profiles: [],
    checkedItems: new Map(),
    dynamicInputs: new Map(),
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
      .items(Joi.object({ value: Joi.string().min(3) }).min(1))
      .min(1)
      .required()
      .label("Ingredients"),
    instructions: Joi.array()
      .items(Joi.object({ value: Joi.string().min(3) }).min(1))
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
  }

  componentDidUpdate = async nextProps => {
    if (nextProps.match.params.id !== this.props.match.params.id) {
      await this.populateRecipe();
      await this.fillCheckedItems();
    }
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
      if (id === "new") {
        const user = authService.getCurrentUser();
        let author = user.username;
        this.setState({
          data: {
            title: "",
            origin_country: "",
            author: author,
            likes: 0,
            image_link: "",
            description: "",
            taste_profile: [],
            ingredients: [],
            instructions: []
          },
          disabled: false
        });
        return;
      }

      const recipe = await recipeService.getRecipe(id);
      const user = authService.getCurrentUser();
      if (user.username !== recipe.data.author) {
        this.props.history.push("/recipe/" + recipe.data._id);
      }
      this.setState({ data: this.mapToViewModel(recipe), disabled: true });
    } catch (ex) {
      if (ex.response && ex.response.status === 404) {
        this.props.history.replace("/not-found");
      }
    }
  };

  doSubmit = async () => {
    // Call the server
    try {
      let result = await recipeService.saveRecipe(this.state.data);
      this.props.history.push("/recipe/" + result.data._id);
    } catch (ex) {
      if (ex.response && ex.response.status === 400) {
        let errors = { ...this.state.errors };

        this.setState({ errors });
      }
    }
  };

  doDelete = async () => {
    try {
      await recipeService.deleteRecipe(this.state.data._id);
      this.props.history.push("/");
    } catch (ex) {
      if (ex.response && ex.response.status === 400) {
        let errors = { ...this.state.errors };

        this.setState({ errors });
      }
    }
  };

  render() {
    if (!authService.getCurrentUser()) return <Redirect to="/" />;
    const isDisabled = this.state.disabled;
    return (
      <React.Fragment>
        <div className="recipe-form-container">
          <div className="recipe-form-wrapper">
            <h1>Recipe</h1>
            <Form onSubmit={this.handleSubmit}>
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
              {this.renderDynamicInputs(
                "ingredients",
                "Ingredients",
                this.state.data.ingredients,
                "e.g. 1/4 Cup Vinegar"
              )}
              <br />
              {/* Dynamic Instructions*/}
              {this.renderDynamicInputs(
                "instructions",
                "Instructions",
                this.state.data.instructions,
                "e.g. Toast spices."
              )}
              <Row>
                <div className="recipe-form-btn-container">
                  <Col>
                    <div className="btn-submit">
                      {this.props.match.params.id === "new" ? null : (
                        <div>{this.renderDeleteButton("Delete")}</div>
                      )}
                    </div>
                  </Col>
                  <Col>
                    <div className="btn-submit">
                      {this.renderButton("Save")}
                    </div>
                  </Col>
                </div>
              </Row>
            </Form>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default RecipeForm;
