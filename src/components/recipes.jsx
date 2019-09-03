import React, { Component } from "react";
import { Link } from "react-router-dom";
import _ from "lodash";

import * as recipeService from "../services/recipeService";
import { paginate } from "../utils/paginate";
import Pagination from "./common/pagination";
import { getCountries } from "../services/countryService";
import SearchBar from "./common/searchBar";
import RecipeList from "./recipeList";

class Recipes extends Component {
  state = {
    data: { selectValue: "" },
    recipes: {},
    countries: [],
    currentPage: 1,
    pageSize: 4,
    searchQuery: "",
    searchCountry: "",
    searchAuthor: "",
    searchSort: ""
  };

  async componentDidMount() {
    await this.popularRecipes();
    await this.populateCountries();
  }

  populateCountries = async () => {
    const countries = await getCountries();
    this.setState({ countries: countries.data });
  };

  popularRecipes = async () => {
    let searchSort = "likes-asc";
    let json = await recipeService.getRecipes("", "", "", searchSort);
    console.log(json.data);
    this.setState({ recipes: json, searchSort });
  };

  handleLike = recipe => {
    const recipes = [...this.state.recipes];
    const index = recipes.indexOf(recipe);
    recipes[index] = { ...recipes[index] };
    recipes[index].liked = !recipes[index].liked;
    this.setState({ recipes });
  };

  handlePageChange = page => {
    this.setState({ currentPage: page });
  };

  handleCountrySelect = country => {
    this.setState({
      searchCountry: country
    });
  };

  getPagedData = () => {
    const {
      pageSize,
      currentPage,
      searchCountry,
      searchQuery,
      recipes
    } = this.state;

    let filtered = recipes;
    if (searchQuery)
      filtered = recipes.filter(r =>
        r.title.toLowerCase().startsWith(searchQuery.toLowerCase())
      );
    else if (searchCountry && searchCountry._id)
      filtered = recipes.filter(
        r => r._origin_country_code._id === searchCountry._id
      );

    const sorted = _.orderBy(filtered);

    const movies = paginate(sorted, currentPage, pageSize);

    return { totalCount: filtered.length, data: movies };
  };

  handleClick = i => {
    console.log(this.state.recipes[i]);
  };

  searchRecipes = async (searchQuery, searchCountry) => {
    if (!searchQuery) searchQuery = "";
    if (!searchCountry || searchCountry === "Any") searchCountry = "";
    let json = await recipeService.getRecipes(
      searchQuery,
      searchCountry,
      "",
      ""
    );
    this.setState({ recipes: json, searchQuery });
  };

  render() {
    const { pageSize, currentPage, searchQuery } = this.state;
    const { user } = this.props;

    const searchPlaceHolder = "Search ...";
    return (
      <React.Fragment>
        {/*Search*/}
        <SearchBar
          handleFormSubmit={this.searchRecipes}
          countries={this.state.countries}
        />
        {/*Recipe List */}
        <RecipeList recipes={this.state.recipes.data} />
        <Pagination
          pageSize={pageSize}
          currentPage={currentPage}
          onPageChange={this.handlePageChange}
        />
      </React.Fragment>
    );
  }
}

export default Recipes;
