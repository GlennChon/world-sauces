import React, { Component } from "react";
import _ from "lodash";
import InfiniteScroll from "react-infinite-scroll-component";
import * as recipeService from "../services/recipeService";
import { getCountries } from "../services/countryService";
import SearchBar from "./common/searchBar";
import RecipeList from "./recipeList";
import "../css/recipes.css";
import { Col } from "react-bootstrap";

class Recipes extends Component {
  state = {
    data: { selectValue: "" },
    recipes: [],
    countries: [],
    currentPage: 1,
    pageSize: 6,
    searchQuery: "",
    searchCountry: "",
    searchAuthor: "",
    searchSort: "",
    hasRecipes: true,
    hasMoreRecipes: true
  };

  async componentDidMount() {
    const { data: recipes } = await recipeService.getRecipes(
      this.state.currentPage,
      this.state.pageSize,
      this.state.searchQuery,
      this.state.searchCountry
    );
    const { data: countries } = await getCountries();
    this.setState({ recipes, countries });
  }

  fetchMoreRecipes = async () => {
    const {
      pageSize,
      currentPage,
      searchCountry,
      searchQuery,
      recipes,
      totalCount
    } = this.state;

    const newRecipes = await recipeService.getRecipes(
      currentPage,
      pageSize,
      searchQuery,
      searchCountry
    );

    // if it getRecipes returns nothing, end of infinite scroll
    if (newRecipes.data.length < 1 || newRecipes.data.length < pageSize) {
      this.setState({
        recipes: recipes.concat(newRecipes.data),
        currentPage: currentPage + 1,
        totalCount: totalCount + newRecipes.length,
        hasMoreRecipes: false
      });
    } else {
      this.setState({
        recipes: recipes.concat(newRecipes.data),
        currentPage: currentPage + 1,
        totalCount: totalCount + newRecipes.length,
        hasMoreRecipes: true,
        hasRecipes: true
      });
    }
  };

  searchRecipes = async (searchQuery, searchCountry) => {
    console.log(searchQuery + " " + searchCountry);
    searchCountry = searchCountry === "any" ? "" : searchCountry;
    const { data: recipes } = await recipeService.getRecipes(
      1,
      this.state.pageSize,
      searchQuery,
      searchCountry
    );
    if (recipes.length === 0) {
      this.setState({ hasMoreRecipes: false, hasRecipes: false });
    } else if (recipes.length < this.state.pageSize) {
      this.setState({
        recipes,
        searchQuery,
        searchCountry,
        currentPage: 1,
        hasMoreRecipes: false,
        hasRecipes: true
      });
    } else {
      this.setState({
        recipes,
        searchQuery,
        searchCountry,
        currentPage: 1,
        hasRecipes: true,
        hasMoreRecipes: true
      });
    }
  };

  hasRecipesRender = () => {
    const { recipes, hasMoreRecipes } = this.state;
    if (this.state.hasRecipes) {
      return (
        <InfiniteScroll
          dataLength={recipes.length}
          next={this.fetchMoreRecipes}
          hasMore={hasMoreRecipes}
          loader={<h4>Loading...</h4>}
        >
          <RecipeList recipes={recipes} />
        </InfiniteScroll>
      );
    } else {
      return <h4>No Recipes</h4>;
    }
  };

  render() {
    return (
      <React.Fragment>
        <div className="recipes-container">
          {/*Search*/}
          <div className="search-bar">
            <SearchBar
              handleFormSubmit={this.searchRecipes}
              countries={this.state.countries}
            />
          </div>

          {this.hasRecipesRender()}
        </div>
      </React.Fragment>
    );
  }
}

export default Recipes;
