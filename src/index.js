import App from "./App";
import React from "react";
import ReactDOM from "react-dom";
import WebFont from "webfontloader";
import * as serviceWorker from "./serviceWorker";
import { BrowserRouter } from "react-router-dom";

import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.min.js";
import "react-toastify/dist/ReactToastify.css";
import "./index.css";

WebFont.load({
  google: {
    families: [
      "Playfair Display",
      "Museo Sans Rounded",
      "Roboto Condensed",
      "Roboto",
      "Arial",
      "sans-serif"
    ]
  }
});
ReactDOM.render(
  <BrowserRouter>
    <App />
  </BrowserRouter>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.register();
