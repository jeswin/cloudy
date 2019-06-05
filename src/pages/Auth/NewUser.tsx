import React, { useState, FormEvent, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import Fab from "@material-ui/core/Fab";
import NavigateNext from "@material-ui/icons/NavigateNext";
import { getAuthServiceUrl } from "../../utils/url";
import { getCookie } from "../../utils/cookie";

const useStyles = makeStyles(theme => ({
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    width: "12em"
  },
  availabilityText: {
    fontSize: "0.8em",
    color: theme.palette.grey[500],
    display: "block",
    width: "20em",
    textAlign: "left",
    margin: "auto"
  },
  descText: {
    fontSize: "0.8em",
    color: theme.palette.grey[500]
  },
  fab: {
    margin: theme.spacing(1),
    marginTop: "1em"
  }
}));

export default function() {
  const classes = useStyles();

  const [values, setValues] = React.useState({
    username: ""
  });

  const [available, setAvailability] = React.useState(false);

  useEffect(() => {
    if (values.username.length) {
      fetch(getAuthServiceUrl(`/usernames/${values.username}`)).then(result =>
        result.json().then(json => setAvailability(!json.exists))
      );
    }
  });

  const handleChange = (name: string) => (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setValues({ ...values, [name]: event.target.value });
  };

  function selectUsername() {
    if (available) {
      const jwt = getCookie("jwt-auth-service-token");
      console.log("KKDD", jwt);
      if (jwt) {
        fetch(getAuthServiceUrl("/users"), {
          body: JSON.stringify({ username: values.username }),
          method: "POST",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            "jwt-auth-service-token": jwt
          }
        })
          .then(result =>
            result.json().then(json => console.log("JSORES", json))
          )
          .catch(ex => console.log(ex));
      }
    }
  }

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
      <p>You need a username.</p>

      <form noValidate autoComplete="off">
        <p>
          <TextField
            id="outlined-name"
            label="Username"
            className={classes.textField}
            value={values.username}
            onChange={handleChange("username")}
            margin="normal"
            variant="outlined"
          />
          <Fab
            color="primary"
            aria-label="Add"
            className={classes.fab}
            onClick={selectUsername}
          >
            <NavigateNext />
          </Fab>
          <br />
          {values.username ? (
            available ? (
              <span
                className={classes.availabilityText}
                style={{ color: "Green" }}
              >
                {values.username} is available.
              </span>
            ) : (
              <span
                className={classes.availabilityText}
                style={{ color: "Red" }}
              >
                {values.username} is taken.
              </span>
            )
          ) : (
            []
          )}
        </p>
      </form>
      {/* <p className={classes.descText}>
        We'll give you a little box on the internet
        <br /> accessible at {values.username || "username"}.toocloudy.com
      </p> */}
    </div>
  );
}
