import React from "react";
import Img from "react-image";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart } from "@fortawesome/free-solid-svg-icons";
import { defaultImg, loaderImg } from "../config.json";
import { Row } from "react-bootstrap";

import VisibilitySensor from "react-visibility-sensor";
import "../css/recipeCard.css";

const RecipeCard = ({ recipe }) => {
  const { image_link, taste_profile, title, origin_country, likes } = {
    ...recipe
  };

  return (
    <React.Fragment>
      <VisibilitySensor>
        {({ isVisible }) => (
          <a
            style={{ textDecoration: "none" }}
            href={"/recipe/" + recipe._id}
            className="recipe-card"
          >
            <section>
              <div
                className="recipe-card-image-container"
                aria-label="recipe card"
              >
                <Img
                  src={image_link}
                  alt={title + " Image"}
                  className="cover"
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
                />
                <div className="recipe-card-likes">
                  <FontAwesomeIcon icon={faHeart} className="card-icon" />
                  <h5>{likes}</h5>
                </div>
              </div>
            </section>
            <section>
              <Row className="justify-content-around">
                <div className="card-profile-wrapper">
                  {taste_profile.map((desc, k) => (
                    <span className="card-profile-item" key={k}>
                      {desc}
                    </span>
                  ))}
                </div>
              </Row>

              <Row className="justify-content-around">
                <h3>{title}</h3>
              </Row>

              <Row className="justify-content-around">
                <h5>
                  Origin: {origin_country == null ? " ~ " : origin_country}
                </h5>
              </Row>
            </section>
          </a>
        )}
      </VisibilitySensor>
    </React.Fragment>
  );
};

export default RecipeCard;
