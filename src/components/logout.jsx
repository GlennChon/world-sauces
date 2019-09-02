import { Component } from "react";
import authService from "../services/authService";

class Logout extends Component {
  componentDidMount() {
    authService.logout();

    window.location = "/home";
  }

  render() {
    return null;
  }
}

export default Logout;
