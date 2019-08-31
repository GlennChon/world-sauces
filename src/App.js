import React, { Component } from "react";
import "./css/App.css";

import Recipes from "./components/recipes";
import Recipe from "./components/recipe";
import Logo from "./components/logo";
import NavBar from "./components/navBar";
import SearchBar from "./components/searchBar";
import Footer from "./components/footer";

class App extends Component {
  state = { logoIsSmall: true };

  searchRecipes = () => {
    console.log("search recipes");
  };

  render() {
    return (
      <React.Fragment>
        <header className="App-header">
          <Logo isSmall={this.state.logoIsSmall} />
          <NavBar />
          <SearchBar
            handleSearchClick={this.searchRecipes}
            onFormSubmit={this.searchRecipes}
          />
        </header>

        <Recipe />
        <main className="App">
          <Recipes />
        </main>
        <Footer />
      </React.Fragment>
    );
  }
}

export default App;
