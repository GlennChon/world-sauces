import React, { Component } from "react";
import _ from "lodash";

import * as recipeService from "../services/recipeService";
import { paginate } from "../utils/paginate";
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
    await this.populateCountries();
    await this.popularRecipes();
  }

  populateCountries = async () => {
    const countries = await getCountries();
    this.setState({ countries: countries.data });
  };

  popularRecipes = async () => {
    let json = await recipeService.getPopular();
    this.setState({ recipes: json });
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

  searchRecipes = async (searchQuery, searchCountry) => {
    if (!searchQuery) searchQuery = "";
    if (!searchCountry || searchCountry === "any") searchCountry = "";
    let json = await recipeService.getRecipes(searchQuery, searchCountry);
    this.setState({ recipes: json, searchQuery });
  };

  render() {
    return (
      <React.Fragment>
        <br />
        {/*Search*/}
        <SearchBar
          handleFormSubmit={this.searchRecipes}
          countries={this.state.countries}
        />
        {/*Recipe List */}
        <RecipeList recipes={this.state.recipes.data} />
      </React.Fragment>
    );
  }
}

export default Recipes;
