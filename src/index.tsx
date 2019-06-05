import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import * as serviceWorker from "./serviceWorker";
import { setUrl, navigateTo } from "./utils/routing";
import { getCookie } from "./utils/cookie";

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();

if (document.readyState === "loading") {
  // Loading hasn't finished yet
  document.addEventListener("DOMContentLoaded", startup);
} else {
  // `DOMContentLoaded` has already fired
  startup();
}

function startup() {
  ReactDOM.render(<App />, document.getElementById("root"));

  // Check if we have an active session.
  if (window.location.pathname !== "/auth/newuser" && !getCookie("session")) {
    navigateTo("/auth/login");
  }
}

window.onpopstate = ev => setUrl(window.location.pathname);
