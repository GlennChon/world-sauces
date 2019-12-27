import React from "react";
import { Formik } from "formik";
import * as Yup from "yup";
import { Form, Button, Row } from "react-bootstrap";
//Inputs
import FormItem from "../inputs/formItem";

const DisplaySchema = Yup.object().shape({
  title: Yup.string()
    .min(2, "Too Short!")
    .max(70, "Too Long!")
    .required("Required"),
  img_url: Yup.string()
    .url("Invalid url")
    .required("Required"),
  author: Yup.string()
});

//TODO: require url to have an image file ext. (.jpg, .gif, .png, etc.)

const getAuthor = () => {
  const author = "Unregistered";
  // attempt to get author
  // if author is not found return 'Unregistered'
  return author;
};

const DisplayStep = ({ back, next, values = null }) => (
  <div>
    <h1>Display</h1>
    {/*if back is pressed, values from previous next press are re-entered as initial*/}
    <Formik
      enableReinitialize={true}
      initialValues={{
        title: values != null ? values.title : "",
        img_url: values != null ? values.img_url : "",
        author: getAuthor()
      }}
      validationSchema={DisplaySchema}
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
            name="author"
            label="Author"
            type="text"
            disabled={true}
            onChange={handleChange}
            onBlur={handleBlur}
            values={values}
            errors={errors}
            touched={touched}
          />
          <FormItem
            name="title"
            label="Title"
            type="text"
            placeholder="Title"
            onChange={handleChange}
            onBlur={handleBlur}
            values={values}
            errors={errors}
            touched={touched}
          />
          <FormItem
            name="img_url"
            label="Image URL"
            type="text"
            placeholder="e.g. https://www.someImageHoster.com/image.png"
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

export default DisplayStep;
