import React, { Component } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { Form } from "react-bootstrap";
class SearchBar extends Component {
  state = { searchQuery: "", searchCountry: "" };

  handleSearchChange = e => {
    this.setState({ searchQuery: e.target.value });
  };

  handleCountryChange = e => {
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
        <Form onSubmit={this.handleSubmit}>
          <div className="form-group">
            <div className="input-group">
              <select
                name="Countries"
                id="Countries"
                onChange={this.handleCountryChange}
                className="form-control"
              >
                <option value="any">Any Country</option>
                {this.props.countries.map(option => (
                  <option key={option.name} value={option.name}>
                    {option.name}
                  </option>
                ))}
              </select>
              <input
                name="recipe-search"
                type="search"
                placeholder="Search Recipes..."
                onChange={this.handleSearchChange}
                value={this.state.searchQuery}
                className="form-control input-group"
              />
              <div class="input-group-append">
                <button
                  className="btn btn-secondary"
                  type="submit"
                  onClick={this.handleSubmit}
                >
                  <FontAwesomeIcon icon={faSearch} />
                </button>
              </div>
            </div>
          </div>
        </Form>
      </React.Fragment>
    );
  }
}

export default SearchBar;
