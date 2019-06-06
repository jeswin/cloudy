import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import { getAuthServiceUrl, getWebUrl } from "../../utils/url";
import * as cookies from "browser-cookies";

const useStyles = makeStyles(theme => ({
  button: {
    height: "4em",
    width: "16em",
    background: "url(/images/google-logo.png)",
    backgroundSize: "32px 32px",
    backgroundPosition: "1em",
    backgroundRepeat: "no-repeat",
    margin: theme.spacing(1),
    paddingLeft: "4em"
  }
}));

function onLogin() {
  const successUrl = getWebUrl("/");

  const newuserUrl = getWebUrl("/auth/newuser");

  const url = getAuthServiceUrl(
    `/authenticate/github?success=${successUrl}&newuser=${newuserUrl}`
  );

  (window as any).location = url;
}

export default function() {
  cookies.erase("jwt-auth-service-jwt");
  cookies.erase("jwt-auth-service-username");
  cookies.erase("jwt-auth-service-domain");

  const classes = useStyles();

  return (
    <div style={{ padding: "1em", textAlign: "center" }}>
      <p>
        <img
          height="240"
          width="240"
          src="/images/too-cloudy-logo.png"
          alt="logo"
        />
      </p>
      <p>
        An easy-to-use, personal database <br />
        that you can use for anything.
      </p>
      <p>
        From organizing parties to conducting
        <br /> surveys to messaging your friends.
      </p>
      <p style={{ paddingTop: "2em" }}>
        <Button variant="outlined" className={classes.button} onClick={onLogin}>
          Login with Google
        </Button>
      </p>
    </div>
  );
}
