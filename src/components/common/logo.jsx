import React from "react";
import Logo_sm from "../images/logo_sm.png";
import Logo_lg from "../images/logo_lg.png";

const Logo = ({ isSmall }) => {
  //let imgSrc = isSmall == true ? Logo_sm : Logo_lg;
  console.log(isSmall);
  let imgSrc = isSmall === true ? Logo_sm : Logo_lg;
  return (
    <React.Fragment>
      <div className="logo-image-container">
        <img src={imgSrc} />
      </div>
    </React.Fragment>
  );
};

export default Logo;
