import React from "react";
import Img from "react-image";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart } from "@fortawesome/free-solid-svg-icons";

const RecipeCard = ({ recipe }) => {
  const { image_link, taste_profile, title, origin_country, likes } = {
    ...recipe
  };
  const defaultImg =
    "https://upload.wikimedia.org/wikipedia/commons/a/a8/Emojione_BW_1F372.svg";

  return (
    <React.Fragment>
      <div className="recipe-short-image-container">
        <Img src={[image_link, defaultImg]} className="cover" />
        <div className="recipe-card-likes">
          <FontAwesomeIcon icon={faHeart} className="card-icon" />
          <h5>{likes}</h5>
        </div>
      </div>
      <span className="profile-container">
        <div className="profile-wrapper">
          {taste_profile.map((desc, k) => (
            <span className="profile-item" key={k}>
              {desc.name}
            </span>
          ))}
        </div>
      </span>
      <h3>{title}</h3>
      <h5>
        Origin: {origin_country.name == null ? " ~ " : origin_country.name}
      </h5>
    </React.Fragment>
  );
};

export default RecipeCard;
