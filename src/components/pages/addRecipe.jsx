import React, { useState, useEffect } from "react";
import FormWizard from "../forms/wizard/formWizard";

import RecipeStep from "../forms/recipe/recipeStep";
import AboutStep from "../forms/recipe/aboutStep";
import DetailStep from "../forms/recipe/detailStep";
import DisplayStep from "../forms/recipe/displayStep";

import { Col } from "react-bootstrap";

const AddRecipe = ({ user }) => {
  const [values, setValues] = useState({
    ingredients: "",
    instructions: "",
    tips: ""
  });

  const doSubmit = values => {
    setValues(values);
    console.log("formState:", values);
    console.log("submitting works");
  };

  return (
    <React.Fragment>
      <Col>
        <FormWizard
          initialState={values}
          formComponents={{
            about: AboutStep
          }}
          doSubmit={doSubmit}
        />
      </Col>
    </React.Fragment>
  );
};
export default AddRecipe;
