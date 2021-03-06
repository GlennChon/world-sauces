import React, { Component } from "react";
import Img from "react-image";
import moment from "moment";
import { defaultImg, loaderImg } from "../../config.json";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import * as solid from "@fortawesome/free-solid-svg-icons";
import * as regular from "@fortawesome/free-regular-svg-icons";

import { toast } from "react-toastify";

import "../../css/display.css";
import { Button } from "react-bootstrap";
const { faHeart: heartSolid } = solid;
const { faHeart: heartRegular } = regular;

class Display extends Component {
  state = { data: {}, isLiked: false };

  handleBtnClick = e => {
    e.preventDefault();
    // take recipe id and open recipeForm
    this.doEdit();
  };

  handleLikeClick = e => {
    e.preventDefault();

    // add handling of unregistered user here

    const user = this.state.user;
    if (!user) {
      toast.error("Please login to save recipes", {
        autoClose: 3000
      });
      return;
    }

    let { isLiked, data } = this.state;
    if (isLiked === true) {
      isLiked = false;
      data.likes -= 1;
    } else {
      isLiked = true;
      data.likes += 1;
    }

    this.setState({ isLiked, data });

    this.doLike();
  };

  renderLikes = (likes = 0, isLiked = false) => {
    let icon = isLiked ? heartSolid : heartRegular;
    likes = this.state.data.likes;
    return (
      <React.Fragment>
        <button
          className="btn btn-likes"
          onClick={e => this.handleLikeClick(e)}
        >
          <FontAwesomeIcon icon={icon} className="card-icon" />
        </button>
        <h5>{likes}</h5>
      </React.Fragment>
    );
  };

  renderButton = label => {
    return (
      <Button
        size="lg"
        variant="warning"
        aria-label={"Button " + label}
        onClick={e => this.handleBtnClick(e)}
      >
        {label}
      </Button>
    );
  };

  renderImg = (name, imgClassName) => {
    const data = this.state.data;
    return (
      <React.Fragment>
        <Img
          src={data[name]}
          alt={data["title"] + " Image"}
          className={"cover " + imgClassName}
          loader={
            <img
              src={window.location.origin + loaderImg}
              className={"cover " + imgClassName}
              alt="Loading Gif"
            />
          }
          unloader={
            <img
              src={defaultImg}
              className={"cover " + imgClassName}
              alt="Placeholder"
            />
          }
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
