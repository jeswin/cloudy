import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import { url } from "inspector";

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

export default function() {
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
        From organizing birthdays to managing <br />
        your accounts to messaging your friends.
      </p>
      <p>
        <Button variant="outlined" className={classes.button}>
          Login with Google
        </Button>
      </p>
    </div>
  );
}
