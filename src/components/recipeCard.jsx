import React from "react";
import Img from "react-image";
import vegetableImg from "../images/vegetables.svg";

const RecipeCard = ({ recipe }) => {
  const { image_link, taste_profile, title, origin_country } = { ...recipe };
  return (
    <React.Fragment>
      <div className="recipe-short-image-container">
        <Img src={[image_link, vegetableImg]} className="cover" />
      </div>
      <span className="profile-container">
        <div className="profile-wrapper">
          {taste_profile.map((desc, k) => (
            <span className="profile-item" key={k}>
              {desc}
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
