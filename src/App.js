import React, { Component } from "react";
import "./css/App.css";

import Recipes from "./components/recipes";
import Header from "./components/header";
import Footer from "./components/footer";

class App extends Component {
  render() {
    return (
      <React.Fragment>
        <Header className="App-header" />
        <main className="App">
          <Recipes />
        </main>
      </React.Fragment>
    );
  }
}

export default App;
