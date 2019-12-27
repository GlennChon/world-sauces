import React from "react";
import LoginForm from "../forms/loginForm.jsx";

import "./loginForm.css";
const Login = () => {
  return (
    <div className="login-form-container">
      <div className="login-form-wrapper">
        <LoginForm />
      </div>
    </div>
  );
};

export default Login;
