import React from "react";
import Img from "react-image";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart } from "@fortawesome/free-solid-svg-icons";
import { defaultImg, loaderImg } from "../config.json";

const RecipeCard = ({ recipe }) => {
  const { image_link, taste_profile, title, origin_country, likes } = {
    ...recipe
  };

  return (
    <React.Fragment>
      <div className="recipe-card-image-container">
        <Img
          src={image_link}
          loader={
            <img
              src={window.location.origin + loaderImg}
              className="cover"
              alt="sauce"
            />
          }
          unloader={
            <img src={defaultImg} className="cover" alt="placeholder" />
          }
          className="cover"
        />
        <div className="recipe-card-likes">
          <FontAwesomeIcon icon={faHeart} className="card-icon" />
          <h5>{likes}</h5>
        </div>
      </div>
      <span className="card-profile-container">
        <div className="card-profile-wrapper">
          {taste_profile.map((desc, k) => (
            <span className="card-profile-item" key={k}>
              {desc}
            </span>
          ))}
        </div>
      </span>
      <h3>{title}</h3>
      <h5>Origin: {origin_country == null ? " ~ " : origin_country}</h5>
    </React.Fragment>
  );
};

export default RecipeCard;
