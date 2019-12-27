import React, { useState } from "react";
import * as authService from "../../services/authService";

import { Formik } from "formik";
import { Form, Button, Row } from "react-bootstrap";
import * as Yup from "yup";
//Inputs
import FormItem from "./inputs/formItem";
//styles
import "./forms.css";

const LoginForm = () => {
  const [loginError, setLoginError] = useState("");

  const LoginSchema = Yup.object().shape({
    username: Yup.string()
      .min(2, "Too Short! Min 2")
      .max(70, "Too Long! Max 70")
      .required("Username or Email Required"),
    password: Yup.string()
      .min(6, "Passwords are at least 6 characters")
      .required("Password Required")
  });
  const doSubmit = async values => {
    try {
      // Get json webtoken on proper login
      await authService.login(values.username, values.password);

      // Redirect as logged in user
      window.location = "/";
    } catch (ex) {
      if (ex.response && ex.response.status === 400) {
        setLoginError(ex.response.data);

        console.log(ex.response);
      }
    }
  };

  return (
    <div>
      <h1>Login</h1>
      <Formik
        enableReinitialize={true}
        initialValues={{ username: "", password: "" }}
        validationSchema={LoginSchema}
        onSubmit={async values => {
          doSubmit(values);
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
              name="username"
              type="text"
              label="Username"
              placeholder="Username"
              onChange={handleChange}
              onBlur={handleBlur}
              values={values}
              errors={errors}
              touched={touched}
            />
            <FormItem
              name="password"
              type="password"
              label="Password"
              placeholder="Password"
              onChange={handleChange}
              onBlur={handleBlur}
              values={values}
              errors={errors}
              touched={touched}
            />
            {loginError}
            <br />
            <Button disabled={isSubmitting} variant="warning" type="submit">
              Login
            </Button>
          </Form>
        )}
      </Formik>
    </div>
  );
};
export default LoginForm;
