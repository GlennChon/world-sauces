import React, { Component } from "react";

class SearchBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      searchValue: ""
    };
  }

  handleChange = e => {
    this.setState({ searchValue: e.target.value });
  };

  handleSubmit = e => {
    e.preventDefault();
    this.props.handleSearchClick(this.state.searchValue);
  };

  render() {
    return (
      <React.Fragment>
        <form className="search-wrapper" onFormSubmit={this.handleSubmit}>
          <input
            type="search"
            placeholder="Sauce Search"
            onChange={this.handleChange}
            value={this.state.searchValue}
          />
          <button
            type="submit"
            className="search-btn"
            onClick={this.handleSubmit}
          >
            Search
          </button>
        </form>
      </React.Fragment>
    );
  }
}

export default SearchBar;
