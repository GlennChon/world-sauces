import React from "react";

import Display from "./common/display";
import * as userService from "../services/userService";
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
      const username = this.props.match.params.username;
      const { data: userInfo } = await userService.getUserInfo(username);
      this.setState({ data: this.mapUserToViewModel(userInfo) });
    } catch (ex) {
      if (ex.response && ex.response.status === 404)
        this.props.history.replace("/not-found");
    }
  };

  doEdit = async () => {
    this.props.history.push("/profile/edit/" + this.state.data._id);
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
