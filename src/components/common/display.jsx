import React, { Component } from "react";
import Img from "react-image";
import moment from "moment";
import { defaultImg, loaderImg } from "../../config.json";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import * as solid from "@fortawesome/free-solid-svg-icons";
import * as regular from "@fortawesome/free-regular-svg-icons";
import * as userService from "../../services/userService";

const { faHeart: heartSolid } = solid;
const { faHeart: heartRegular } = regular;

class Display extends Component {
  state = { data: {}, isLiked: false };

  handleEditClick = e => {
    e.preventDefault();
    // take recipe id and open recipeForm
    this.doEdit();
  };

  handleLikeClick = async e => {
    e.preventDefault();
    const user = this.state.user;
    if (!user) return;

    const isLiked = this.state.isLiked;
    if (isLiked === true) {
      await userService.removeLike(this.state.user._id, this.state.data._id);
      this.setState({ isLiked: false });
    } else {
      await userService.saveLike(this.state.user._id, this.state.data._id);
      this.setState({ isLiked: true });
    }
    this.doLike();
  };

  renderLikes = (likes = 0) => {
    const { isLiked } = this.state;
    let icon = isLiked ? heartSolid : heartRegular;
    return (
      <React.Fragment>
        <button
          className="btn btn-likes"
          onClick={e => this.handleLikeClick(e)}
        >
          <FontAwesomeIcon icon={icon} className="card-icon" />

          <h5>{likes}</h5>
        </button>
      </React.Fragment>
    );
  };

  renderEditButton = (btnClassName = "") => {
    return (
      <React.Fragment>
        <button
          className={"btn " + btnClassName}
          onClick={e => this.handleEditClick(e)}
        >
          Edit
        </button>
      </React.Fragment>
    );
  };

  renderImg = (name, imgClassName) => {
    const data = this.state.data;
    return (
      <React.Fragment>
        <Img
          src={data[name]}
          loader={
            <img
              src={window.location.origin + loaderImg}
              className={"cover " + imgClassName}
              alt="sauce"
            />
          }
          unloader={
            <img
              src={defaultImg}
              className={"cover " + imgClassName}
              alt="placeholder"
            />
          }
          className={"cover " + imgClassName}
        />
      </React.Fragment>
    );
  };

  renderMainTitle = name => {
    const data = { ...this.state.data };
    return (
      <React.Fragment>
        <h1>{data[name]}</h1>
      </React.Fragment>
    );
  };

  renderChildTitle = (title, label = null, itemName = null) => {
    const data = { ...this.state.data };
    let item;
    if (itemName) {
      item = data[title][itemName];
    } else {
      item = data[title];
    }
    return (
      <React.Fragment>
        <label>{label ? label : ""}</label>
        <p>{item}</p>
      </React.Fragment>
    );
  };
  renderDate = (title, label = null) => {
    const data = { ...this.state.data };
    let item = moment(data[title]).format("YYYY MMM DD");
    if (item === "Invalid date") return;
    return (
      <React.Fragment>
        <label>{label ? label : ""}</label>
        <p>{item}</p>
      </React.Fragment>
    );
  };

  renderHorizontalList = (name, groupClassName = "", itemClassName = "") => {
    const data = { ...this.state.data };
    return (
      <React.Fragment>
        <div className={groupClassName}>
          {data[name].map((item, k) => (
            <span className={itemClassName} key={k}>
              {item}
            </span>
          ))}
        </div>
      </React.Fragment>
    );
  };

  renderList = (name, groupClassName = "", itemClassName = "") => {
    const data = { ...this.state.data };
    return (
      <React.Fragment>
        <ul className={groupClassName}>
          {data[name].map((item, k) => (
            <li className={itemClassName} key={k}>
              {item.value}
            </li>
          ))}
        </ul>
      </React.Fragment>
    );
  };

  renderNumberedList = (name, groupClassName = "", itemClassName = "") => {
    const data = { ...this.state.data };

    return (
      <React.Fragment>
        <ol className={groupClassName}>
          {data[name].map((item, k) => (
            <li className={itemClassName} key={k}>
              {item.value}
            </li>
          ))}
        </ol>
      </React.Fragment>
    );
  };
}

export default Display;
