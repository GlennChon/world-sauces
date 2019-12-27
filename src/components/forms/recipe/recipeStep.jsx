import React from "react";
import { Formik } from "formik";
import * as Yup from "yup";
import { Form, Button, Col, Row } from "react-bootstrap";
//Inputs
import FormItem from "../inputs/formItem";

const RecipeSchema = Yup.object().shape({
  ingredients: Yup.string()
    .min(3, "Too Short!")
    .max(70)
    .required("*Required"),
  instructions: Yup.string()
    .min(3, "Too Short!")
    .max(255)
    .required("*Required"),
  tips: Yup.string().max(255)
});

const RecipeStep = ({ next, values = null }) => (
  <div>
    <h1>Recipe</h1>
    <Formik
      enableReinitialize={true}
      initialValues={{
        ingredients: values != null ? values.ingredients : "",
        instructions: values != null ? values.instructions : "",
        tips: values != null ? values.tips : ""
      }}
      validationSchema={RecipeSchema}
      onSubmit={values => {
        next(values);
      }}
    >
      {({
        values,
        errors,
        touched,
        handleChange,
        handleBlur,
        handleSubmit,
        isSubmitting
      }) => (
        <Form onSubmit={handleSubmit}>
          {
            //Dynamic Input Ingredients
          }
          <FormItem
            name="ingredients"
            label="Ingredients"
            type="text"
            placeholder="Type Ingredients"
            onChange={handleChange}
            onBlur={handleBlur}
            values={values}
            errors={errors}
            touched={touched}
          />
          {
            //Dynamic Input Instructions
          }
          <FormItem
            name="instructions"
            label="Instructions"
            type="text"
            placeholder="Type Instructions"
            onChange={handleChange}
            onBlur={handleBlur}
            values={values}
            errors={errors}
            touched={touched}
          />
          {
            //Dynamic Input Tips
          }
          <FormItem
            name="tips"
            label="Tips"
            type="text"
            placeholder="Any Tips?"
            onChange={handleChange}
            onBlur={handleBlur}
            values={values}
            errors={errors}
            touched={touched}
          />

          <Button disabled={isSubmitting} type="submit">
            Next
          </Button>
        </Form>
      )}
    </Formik>
  </div>
);

export default RecipeStep;
