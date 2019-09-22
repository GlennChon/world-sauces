import React, { Component } from "react";
import _ from "lodash";

import * as recipeService from "../services/recipeService";
import { paginate } from "../utils/paginate";
import { getCountries } from "../services/countryService";
import SearchBar from "./common/searchBar";
import RecipeList from "./recipeList";
import Pagination from "./common/pagination";
import "../css/recipes.css";
import { Row, Col } from "react-bootstrap";

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
    searchSort: ""
  };

  async componentDidMount() {
    const { data: recipes } = await recipeService.getPopular();
    const { data: countries } = await getCountries();
    this.setState({ recipes, countries });
  }

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

    const pagedRecipes = paginate(sorted, currentPage, pageSize);

    return { totalCount: filtered.length, data: pagedRecipes };
  };

  searchRecipes = async (searchQuery, searchCountry) => {
    if (!searchQuery) searchQuery = "";
    if (!searchCountry || searchCountry === "any") searchCountry = "";
    const { data: recipes } = await recipeService.getRecipes(
      searchQuery,
      searchCountry
    );
    this.setState({ recipes, searchQuery });
  };

  render() {
    const { length: count } = this.state.recipes;
    const { pageSize, currentPage } = this.state;

    if (count === 0)
      return (
        <React.Fragment>
          <Col xs={12} className="container recipes-container">
            {/*Search*/}
            <SearchBar
              handleFormSubmit={this.searchRecipes}
              countries={this.state.countries}
            />
            <p>No Recipes Found</p>
          </Col>
        </React.Fragment>
      );

    const { data: recipes } = this.getPagedData();
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
          {/*Recipe List */}
          <RecipeList recipes={recipes} />
          <div className="pagination d-flex justify-content-center">
            <Pagination
              itemsCount={count}
              pageSize={pageSize}
              currentPage={currentPage}
              onPageChange={this.handlePageChange}
            />
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default Recipes;
