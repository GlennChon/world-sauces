import React from "react";
import Display from "./common/display";
import * as authService from "../services/authService";
import * as recipeService from "../services/recipeService";
import * as userService from "../services/userService";
import { Row, Col } from "react-bootstrap";
import {
  FacebookShareButton,
  FacebookIcon,
  TwitterShareButton,
  TwitterIcon,
  VKShareButton,
  VKIcon,
  WhatsappShareButton,
  WhatsappIcon,
  LineShareButton,
  LineIcon,
  PinterestShareButton,
  PinterestIcon,
  EmailShareButton,
  EmailIcon
} from "react-share";

import "../css/recipeDisplay.css";

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
    let { isLiked } = this.state;
    let result;
    try {
      if (isLiked === true) {
        result = await userService.removeLike(
          this.state.user._id,
          this.state.data._id
        );
      } else {
        result = await userService.saveLike(
          this.state.user._id,
          this.state.data._id
        );
      }

      this.setState({ data: result.data });
    } catch (ex) {
      console.log(ex);
    }

    //this.setState({ data: result });
  };
  updateCurrentUser = async () => {
    const user = await authService.getCurrentUser();
    this.setState({ user });
  };

  checkUserLikes = async username => {
    const userInfo = await userService.getMeInfo(username);
    const { _id: recipeId } = this.state.data;
    const userLikes = userInfo.data.likes;
    let isLiked = userLikes.includes(recipeId) ? true : false;
    console.log(isLiked);
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
        <div className="display-container">
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
            <Row>
              <Col>
                <Row className="display-main-title">
                  {this.renderMainTitle("title")}
                </Row>
                {/*LIKES*/}
                <Row>
                  {this.renderLikes(this.state.likes, this.state.isLiked)}
                </Row>
                {/*RECIPE NAME*/}
              </Col>
              <Col className="share-col ">
                <Row className="share-row ">
                  {/*SOCIAL MEDIA SHARE LINKS*/}
                  <div className="social-media-share-icon">
                    <FacebookShareButton
                      className="btn-share"
                      url={window.location.href}
                      quote={"Sauce Nerd : " + this.state.data.title}
                      hashtag="#SauceNerd"
                    >
                      <FacebookIcon size={32} round />
                    </FacebookShareButton>
                  </div>
                  <div className="social-media-share-icon">
                    <TwitterShareButton
                      url={window.location.href}
                      title={"Sauce Nerd : " + this.state.data.title}
                      className="btn-share"
                    >
                      <TwitterIcon size={32} round />
                    </TwitterShareButton>
                  </div>
                  <div className="social-media-share-icon">
                    <WhatsappShareButton
                      url={window.location.href}
                      title={"Sauce Nerd : " + this.state.data.title}
                      separator=":: "
                      className="btn-share"
                    >
                      <WhatsappIcon size={32} round />
                    </WhatsappShareButton>
                  </div>
                  <div className="social-media-share-icon">
                    <LineShareButton
                      url={window.location.href}
                      title={"Sauce Nerd : " + this.state.data.title}
                      className="btn-share"
                    >
                      <LineIcon size={32} round />
                    </LineShareButton>
                  </div>
                  <div className="social-media-share-icon">
                    <PinterestShareButton
                      url={window.location.href}
                      media={this.state.data.image_link}
                      title={"Sauce Nerd : " + this.state.data.title}
                      description={this.state.data.description}
                      className="btn-share"
                    >
                      <PinterestIcon size={32} round />
                    </PinterestShareButton>
                  </div>
                  <div className="social-media-share-icon">
                    <VKShareButton
                      url={window.location.href}
                      title={"Sauce Nerd : " + this.state.data.title}
                      description={this.state.data.description}
                      className="btn-share"
                    >
                      <VKIcon size={32} round />
                    </VKShareButton>
                  </div>
                  <div className="social-media-share-icon">
                    <EmailShareButton
                      url={window.location.href}
                      subject={"Check out this sauce recipe!"}
                      body={"Sauce Nerd Recipe for " + this.state.data.title}
                      separator=" : "
                      className="btn-share"
                    >
                      <EmailIcon size={32} round />
                    </EmailShareButton>
                  </div>
                </Row>
              </Col>
            </Row>
            {/*INFORMATION*/}
            <Row>
              <Col>
                <h2 className="display-section-title">Information</h2>
              </Col>
            </Row>
            <Row>
              <Col className="col-md-4">
                {this.renderChildTitle("origin_country", "Country")}
                <a href={"/profile/" + this.state.data.author}>
                  {this.renderChildTitle("author", "Author")}
                </a>
              </Col>
              <Col className="col-md-8">
                {this.renderChildTitle("description", "Description")}
              </Col>
            </Row>
            {/*INGREDIENTS*/}
            <Row>
              <Col className="col-md-4">
                <h2 className="display-section-title">Ingredients</h2>
                {this.renderList(
                  "ingredients",
                  "list-unstyled ingredient-container",
                  "ingredient-wrapper"
                )}
              </Col>
              {/*INSTRUCTIONS*/}
              <Col className="col-md-8">
                <h2 className="display-section-title">Instructions</h2>
                {this.renderNumberedList(
                  "instructions",
                  "list-styled instruction-container",
                  "instruction-wrapper"
                )}
              </Col>
            </Row>
          </div>
        </div>
        <div className="btn-edit">
          {this.state.user &&
            (this.state.user.username === this.state.data.author &&
              this.renderButton("Edit", "btn-warning"))}
        </div>
      </React.Fragment>
    );
  }
}

export default RecipeDisplay;
