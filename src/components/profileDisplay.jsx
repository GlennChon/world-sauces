import React from "react";

import Display from "./common/display";
import * as userService from "../services/userService";
import * as authService from "../services/authService";
import * as recipeService from "../services/recipeService";

class ProfileDisplay extends Display {
  state = {
    data: {
      _id: "",
      username: "",
      firstName: "",
      lastName: "",
      about: "",
      email: "",
      registerDate: "",
      emailVerified: "",
      likes: []
    },
    user: {}
  };

  mapMeToViewModel(user) {
    return {
      _id: user._id,
      username: user.username,
      firstName: user.firstName,
      lastName: user.lastName,
      about: user.about,
      email: user.email,
      registerDate: user.registerDate,
      emailVerified: user.emailVerified,
      likes: user.likes
    };
  }
  mapUserToViewModel(user) {
    return {
      _id: user._id,
      username: user.username,
      about: user.about,
      registerDate: user.registerDate
    };
  }
  componentDidMount = async () => {
    await this.populateUser();
  };

  populateUser = async () => {
    try {
      let user = authService.getCurrentUser();
      const username = this.props.match.params.username;
      if (user) {
        if (username !== user.username) {
          const { data: userInfo } = await userService.getUserInfo(username);
          this.setState({ data: this.mapUserToViewModel(userInfo), user });
        } else {
          const { data: userInfo } = await userService.getMeInfo(username);
          this.setState({ data: this.mapMeToViewModel(userInfo), user });
        }
      } else {
        const { data: userInfo } = await userService.getUserInfo(username);
        this.setState({ data: this.mapUserToViewModel(userInfo) });
      }
    } catch (ex) {
      if (ex.response && ex.response.status === 404)
        this.props.history.replace("/not-found");
    }
  };

  doEdit = async () => {
    this.props.history.push("/profile/edit/" + this.state.data._id);
  };

  renderPersonalInfo = () => {
    if (this.state.user.username === this.state.data.username) {
      console.log("test");
      return (
        <React.Fragment>
          <div className="row justify-content-center">
            {this.renderChildTitle("firstName", "First Name")}
            {this.renderChildTitle("lastName", "Last Name")}
          </div>
          <div className="row justify-content-center">
            <div className="col">{this.renderChildTitle("email", "Email")}</div>
          </div>
        </React.Fragment>
      );
    }
  };

  render() {
    return (
      <React.Fragment>
        <div className="display-container">
          <div className="row justify-content-center">
            {this.renderMainTitle("username")}
          </div>
          <div className="row justify-content-center">
            <div className="col">{this.renderChildTitle("about", "About")}</div>
          </div>
          <div className="row justify-content-center">
            <div className="col">
              {this.renderDate("registerDate", "User Since")}
            </div>
          </div>
          {this.renderPersonalInfo()}
        </div>
        <div className="btn-edit">
          {this.state.user &&
            (this.state.user.username === this.state.data.username &&
              this.renderEditButton("btn-warning"))}
        </div>
      </React.Fragment>
    );
  }
}

export default ProfileDisplay;
