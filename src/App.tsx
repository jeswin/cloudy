import React, { useState } from "react";
import "./App.css";

import { setUrlSetter, matchUrlPrefix } from "./utils/routing";
import Home from "./pages/Home";
import Login from "./pages/Login";
import { getCookie } from "./utils/cookie";

export default function App() {
  const [urlInState, setUrl] = useState(window.location.pathname);
  setUrlSetter(setUrl);
  
  return (
    <div>
      {matchUrlPrefix("/", { exact: true }, <Home />)}
      {matchUrlPrefix("/login", {}, <Login />)}
    </div>
  );
}
