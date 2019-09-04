import React, { Component } from "react";

class Display extends Component {
  state = { data: {} };

  handleEditClick = () => {
    // take recipe id and open recipeForm
    console.log("edit btn clicked");
  };

  renderEditButton = () => {
    // check if user is recipe author
    // if true, render edit btn
    return (
      <React.Fragment>
        <button className="btn btn-primary">Edit</button>
      </React.Fragment>
    );
  };
  renderImg = () => {
    // take img src
    // use IMG component
    return (
      <React.Fragment>
        <Img></Img>
      </React.Fragment>
    );
  };

  renderMainTitle = () => {
    return (
      <React.Fragment>
        <h1>Main Title</h1>
      </React.Fragment>
    );
  };

  renderChildTitle = () => {
    return (
      <React.Fragment>
        <h4>Child Title</h4>
      </React.Fragment>
    );
  };

  renderTasteProfiles = () => {
    // iterate over each profile in array
    // display
    return (
      <React.Fragment>
        <div>Taste Profiles Array</div>
      </React.Fragment>
    );
  };
  renderIngredients = () => {
    // iterate over each ingredient in array
    // display each in list
    return (
      <React.Fragment>
        <ul style="list-style-type:none;">
          <li>Coffee</li>
          <li>Tea</li>
          <li>Milk</li>
        </ul>
      </React.Fragment>
    );
  };

  renderInstructions = () => {
    // iterate over each instruction in array
    // display each in numbered list
    return (
      <React.Fragment>
        <ol>
          <li>Coffee</li>
          <li>Tea</li>
          <li>Milk</li>
        </ol>
      </React.Fragment>
    );
  };
}

export default Display;
