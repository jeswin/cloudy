import React, { useState, FormEvent, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import Fab from "@material-ui/core/Fab";
import NavigateNext from "@material-ui/icons/NavigateNext";
import { getAuthServiceUrl } from "../../utils/url";
import { navigateTo } from "../../utils/routing";
import * as cookies from "browser-cookies";

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
  const jwt = cookies.get("jwt-auth-service-jwt");

  const classes = useStyles();

  const [values, setValues] = React.useState({
    userId: ""
  });

  const [available, setAvailability] = React.useState(false);

  useEffect(() => {
    if (values.userId.length) {
      fetch(getAuthServiceUrl(`/user-ids/${values.userId}`)).then(result =>
        result.json().then(json => setAvailability(!json.exists))
      );
    }
  });

  const handleChange = (name: string) => (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setValues({ ...values, [name]: event.target.value });
  };

  function selectUserId() {
    if (available) {
      if (jwt) {
        fetch(getAuthServiceUrl("/users"), {
          body: JSON.stringify({ userId: values.userId }),
          method: "POST",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            "jwt-auth-service-jwt": jwt
          }
        })
          .then(result =>
            result
              .json()
              .then(
                (json: any) => (
                  cookies.erase("jwt-auth-service-jwt"),
                  cookies.set(
                    "jwt-auth-service-jwt",
                    json["jwt-auth-service-jwt"],
                    { domain: json["jwt-auth-service-domain"], expires: 30 }
                  ),
                  cookies.erase("jwt-auth-service-user-id"),
                  cookies.set(
                    "jwt-auth-service-user-id",
                    json["jwt-auth-service-user-id"],
                    { domain: json["jwt-auth-service-domain"], expires: 30 }
                  ),
                  navigateTo("/")
                )
              )
          )
          .catch((ex: any) => console.log(ex));
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
            value={values.userId}
            onChange={handleChange("userId")}
            margin="normal"
            variant="outlined"
          />
          <Fab
            color="primary"
            aria-label="Add"
            className={classes.fab}
            onClick={selectUserId}
          >
            <NavigateNext />
          </Fab>
          <br />
          {values.userId ? (
            available ? (
              <span
                className={classes.availabilityText}
                style={{ color: "Green" }}
              >
                {values.userId} is available.
              </span>
            ) : (
              <span
                className={classes.availabilityText}
                style={{ color: "Red" }}
              >
                {values.userId} is taken.
              </span>
            )
          ) : (
            []
          )}
        </p>
      </form>
      {/* <p className={classes.descText}>
        We'll give you a little box on the internet
        <br /> accessible at {values.userId || "username"}.toocloudy.com
      </p> */}
    </div>
  );
}
