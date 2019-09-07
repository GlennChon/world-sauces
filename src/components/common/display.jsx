import React, { Component } from "react";
import Img from "react-image";
import { defaultImg } from "../../config.json";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart } from "@fortawesome/free-solid-svg-icons";

class Display extends Component {
  state = { data: {} };

  handleEditClick = e => {
    e.preventDefault();
    // take recipe id and open recipeForm
    this.doEdit();
  };

  renderLikes = (likes = 0) => {
    return (
      <React.Fragment>
        <div className="likes">
          <FontAwesomeIcon icon={faHeart} className="card-icon" />
          <h5>{likes}</h5>
        </div>
      </React.Fragment>
    );
  };

  renderEditButton = (onClick, btnClassName = "") => {
    return (
      <React.Fragment>
        <button
          className={"btn btn-primary " + btnClassName}
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
        <Img src={[data[name], defaultImg]} className="cover" />
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
        <h4>{label === "" ? item : label + " : " + item}</h4>
      </React.Fragment>
    );
  };

  renderHorizontalList = name => {
    const data = { ...this.state.data };
    return (
      <React.Fragment>
        {data[name].map((item, k) => (
          <span className="profile-item" key={k}>
            {item}
          </span>
        ))}
      </React.Fragment>
    );
  };

  renderList = (name, label = "", groupClassName = "", itemClassName = "") => {
    const data = { ...this.state.data };
    return (
      <React.Fragment>
        <h2>{label}</h2>
        <ul className={"list-group " + groupClassName}>
          {data[name].map((item, k) => (
            <li className={"list-group-item " + itemClassName} key={k}>
              {item.value}
            </li>
          ))}
        </ul>
      </React.Fragment>
    );
  };

  renderNumberedList = (
    name,
    label = "",
    groupClassName = "",
    itemClassName = ""
  ) => {
    const data = { ...this.state.data };

    return (
      <React.Fragment>
        <h2>{label}</h2>
        <ol className={"list-group " + groupClassName}>
          {data[name].map((item, k) => (
            <li className={"list-group-item " + itemClassName} key={k}>
              {k + 1 + ".\t" + item.value}
            </li>
          ))}
        </ol>
      </React.Fragment>
    );
  };
}

export default Display;
