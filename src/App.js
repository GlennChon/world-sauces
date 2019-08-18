import React, { Component } from "react";
import "./css/App.css";

import Recipes from "./components/recipes";

class App extends Component {
  render() {
    return (
      <React.Fragment>
        <header className="App-header" />
        <main className="App">
          <Recipes />
        </main>
      </React.Fragment>
    );
  }
}

export default App;
