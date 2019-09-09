import React, { Component } from "react";
import Img from "react-image";
import { defaultImg, loaderImg } from "../../config.json";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import * as solid from "@fortawesome/free-solid-svg-icons";
import * as regular from "@fortawesome/free-regular-svg-icons";

const { faHeart: heartSolid } = solid;
const { faHeart: heartRegular } = regular;

class Display extends Component {
  state = { data: {}, isLiked: false };

  handleEditClick = e => {
    e.preventDefault();
    // take recipe id and open recipeForm
    this.doEdit();
  };

  handleLikeClick = e => {
    e.preventDefault();
    const isLiked = this.state.isLiked;
    this.setState({ isLiked: !isLiked });
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

  renderImg = name => {
    const data = this.state.data;
    return (
      <React.Fragment>
        <Img
          src={data[name]}
          loader={
            <img src={window.location.origin + loaderImg} className="cover" />
          }
          unloader={<img src={defaultImg} className="cover" />}
          className="cover"
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

  renderChildTitle = (name, label = null, name2 = null) => {
    const data = { ...this.state.data };
    let item;
    if (name2) {
      item = data[name][name2];
    } else {
      item = data[name];
    }
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
