import React, { useState } from "react";
import "./App.css";

import { setUrlSetter, matchUrlPrefix } from "./utils/routing";
import Home from "./pages/Home";
import Login from "./pages/Auth/Login";
import NewUser from "./pages/Auth/NewUser";
import { ThemeProvider } from "@material-ui/styles";
import { createMuiTheme } from "@material-ui/core";

const theme = createMuiTheme({
  palette: {
    primary: { main: "#2196f3" }, // Purple and green play nicely together.
    secondary: { main: "#11cb5f" } // This is just green.A700 as hex.
  }
});

export default function App() {
  const [urlInState, setUrl] = useState(window.location.pathname);
  setUrlSetter(setUrl);

  return (
    <ThemeProvider theme={theme}>
      <div>
        {matchUrlPrefix("/", { exact: true }, <Home />)}
        {matchUrlPrefix("/auth/login", {}, <Login />)}
        {matchUrlPrefix("/auth/newuser", {}, <NewUser />)}
      </div>
    </ThemeProvider>
  );
}
