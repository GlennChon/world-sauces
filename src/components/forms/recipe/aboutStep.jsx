import React, { useState, useEffect } from "react";
import { Formik } from "formik";
import { Form, Button, Row } from "react-bootstrap";
import * as Yup from "yup";

//Inputs
import FormItem from "../inputs/formItem";
import DynamicTextDisplay from "../inputs/dynamicTextDisplay";

import "../forms.css";

const AboutSchema = Yup.object().shape({
  description: Yup.string()
    .min(2, "Too Short!")
    .max(70, "Too Long!")
    .required("Required"),
  taste_profile: Yup.string()
    .min(2, "Too Short!")
    .max(70, "Too Long!")
    .required("Required"),
  country: Yup.string()
    .min(2, "Too Short!")
    .max(70, "Too Long!")
    .required("Required"),
  sauce_type: Yup.string()
    .min(2, "Too Short!")
    .max(70, "Too Long!")
    .required("Required"),
  test: Yup.array()
});

const AboutStep = ({ back, next, values = null }) => {
  const [countries, setCountries] = useState([{ value: "loading..." }]);
  useEffect(() => {
    getCountries();
  }, []);

  const getCountries = async () => {
    let countriesString = sessionStorage.getItem("countries");
    if (countriesString === null || countriesString === undefined) {
      await fetch("https://restcountries.eu/rest/v2/all")
        .then(response => response.json())
        .then(data => {
          const countryArray = [];
          data.map(country => {
            return countryArray.push({ value: country.name });
          });
          sessionStorage.setItem("countries", JSON.stringify(countryArray));
        });
    }
    return setCountries(JSON.parse(sessionStorage.getItem("countries")));
  };

  console.log("about step values:", values);
  return (
    <div>
      <h1>About</h1>
      <Formik
        enableReinitialize={true}
        initialValues={{
          description: values.description != null ? values.description : "",
          taste_profile:
            values.taste_profile != null ? values.taste_profile : [],
          country: values.country != null ? values.country : "",
          sauce_type: values.sauce_type != null ? values.sauce_type : "",
          test: []
        }}
        validationSchema={AboutSchema}
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
              //Select Country
            }
            <FormItem
              name="country"
              type="select"
              label="Country"
              placeholder="Country"
              options={countries}
              onChange={handleChange}
              onBlur={handleBlur}
              values={values}
              errors={errors}
              touched={touched}
            />
            {
              //Select Sauce Type
            }
            <FormItem
              name="sauce_type"
              type="select"
              label="Sauce Type"
              placeholder="Sauce Type"
              options={[
                { label: "Condiment", value: "Condiment" },
                { label: "Dip", value: "Dip" },
                { label: "Sauce", value: "Sauce" },
                { label: "Marinade", value: "Marinade" },
                { label: "Other", value: "Other" }
              ]}
              onChange={handleChange}
              onBlur={handleBlur}
              values={values}
              errors={errors}
              touched={touched}
            />
            <FormItem
              name="description"
              type="textarea"
              label="Description"
              placeholder="Describe your sauce"
              onChange={handleChange}
              onBlur={handleBlur}
              values={values}
              errors={errors}
              touched={touched}
            />
            {
              //Checkboxes TasteProfile
            }
            <FormItem
              name="taste_profile"
              type="checkbox"
              label="Taste Profile"
              placeholder="Taste Profile"
              options={[
                { id: "bitter", label: "Bitter" },
                { id: "numbing", label: "Numbing" },
                { id: "salty", label: "Salty" },
                { id: "sour", label: "Sour" },
                { id: "spicy", label: "Spicy" },
                { id: "sweet", label: "Sweet" },
                { id: "umami", label: "Umami" }
              ]}
              onChange={handleChange}
              onBlur={handleBlur}
              values={values}
              errors={errors}
              touched={touched}
            />
            <FormItem
              name="test"
              label="Test"
              type="dynamictext"
              placeholder="Test Form Item"
              onChange={handleChange}
              onBlur={handleBlur}
              values={values}
              errors={errors}
              touched={touched}
            />
            <DynamicTextDisplay
              name="testdisplay"
              values={[
                { value: "test 1" },
                { value: "test 2" },
                { value: "test 3" }
              ]}
            />
            <Row>
              <Button
                disabled={isSubmitting}
                variant="warning"
                onClick={e => back(e, values)}
              >
                Back
              </Button>
              <Button disabled={isSubmitting} variant="warning" type="submit">
                Next
              </Button>
            </Row>
          </Form>
        )}
      </Formik>
    </div>
  );
};
export default AboutStep;
