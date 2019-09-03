import React, { Component } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
class SearchBar extends Component {
  state = { searchQuery: "", searchCountry: "" };

  handleSearchChange = e => {
    this.setState({ searchQuery: e.target.value });
  };

  handleCountryChange = e => {
    console.log(e.target.value);
    this.setState({ searchCountry: e.target.value });
  };

  handleSubmit = e => {
    e.preventDefault();
    this.props.handleFormSubmit(
      this.state.searchQuery,
      this.state.searchCountry
    );
  };

  render() {
    return (
      <React.Fragment>
        <form onSubmit={this.handleSubmit}>
          <div className="form-group">
            <div className="input-group">
              <input
                name="recipe-search"
                type="search"
                placeholder="Search Recipes..."
                onChange={this.handleSearchChange}
                value={this.state.searchQuery}
                className="form-control"
              />
              <button className="btn" onClick={this.handleSubmit}>
                <FontAwesomeIcon icon={faSearch} />
              </button>
            </div>
            <select
              name="Countries"
              id="Countries"
              onChange={this.handleCountryChange}
              className="form-control"
            >
              <option value="any">Any Country</option>
              {this.props.countries.map(option => (
                <option key={option.code} value={option.code}>
                  {option.name}
                </option>
              ))}
            </select>
          </div>
        </form>
      </React.Fragment>
    );
  }
}

export default SearchBar;
