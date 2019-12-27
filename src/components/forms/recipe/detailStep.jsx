import React from "react";
import { Formik, ErrorMessage } from "formik";
import * as Yup from "yup";
import { Form, Button, Row } from "react-bootstrap";
//Inputs
import FormItem from "../inputs/formItem";

const DetailSchema = Yup.object().shape({
  yield: Yup.string()
    .min(2, "Too Short!")
    .max(70, "Too Long!")
    .required("Required"),
  expiration: Yup.string()
    .min(2, "Too Short!")
    .max(70, "Too Long!")
    .required("Required"),
  allergies: Yup.string()
    .min(2, "Too Short!")
    .max(70, "Too Long!")
    .required("Required")
});

const DetailStep = ({ back, next, values = null }) => (
  <div>
    <h1>Detail</h1>
    <Formik
      enableReinitialize={true}
      initialValues={{
        yield: values != null ? values.yield : "",
        expiration: values != null ? values.expiration : "",
        allergies: values != null ? values.allergies : ""
      }}
      validationSchema={DetailSchema}
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
          <FormItem
            name="yield"
            label="Yield"
            type="text"
            placeholder="Amount the Recipe Makes"
            onChange={handleChange}
            onBlur={handleBlur}
            values={values}
            errors={errors}
            touched={touched}
          />
          <FormItem
            name="expiration"
            label="Expiration"
            type="text"
            placeholder="e.g. 1 Week Refridgerated"
            onChange={handleChange}
            onBlur={handleBlur}
            values={values}
            errors={errors}
            touched={touched}
          />
          {
            //Dynamic Checkboxes Allergies
          }
          <FormItem
            name="allergies"
            label="Allergies"
            type="text"
            placeholder="Allergies"
            onChange={handleChange}
            onBlur={handleBlur}
            values={values}
            errors={errors}
            touched={touched}
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

export default DetailStep;
