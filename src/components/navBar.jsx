import React, { Component } from "react";
import Logo from "./logo";

class NavBar extends Component {
  render() {
    return (
      <React.Fragment>
        <ul>
          <li>About</li>
          <li>Contact</li>
        </ul>
      </React.Fragment>
    );
  }
}

export default NavBar;
