import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import Fab from "@material-ui/core/Fab";
import AddIcon from "@material-ui/icons/Add";

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
    height: "100vh"
  },
  menuButton: {
    marginRight: theme.spacing(2)
  },
  title: {
    flexGrow: 1
  },
  fab: {
    margin: "0px",
    top: "auto",
    right: "20px",
    bottom: "20px",
    left: "auto",
    position: "fixed"
  }
}));

export default function ButtonAppBar() {
  const classes = useStyles();

  // useEffect(() => {
  //   fetch()
  // }, [])

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            edge="start"
            className={classes.menuButton}
            color="inherit"
            aria-label="Menu"
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" className={classes.title}>
            Messages
          </Typography>
          <Button color="inherit">Logout</Button>
        </Toolbar>
      </AppBar>

      <div
        style={{
          minHeight: "100%",
          display: "flex",
          flexDirection: "column"
        }}
      >
        <h1
          style={{
            display: "flex",
            margin: "1em 0 0 1.5em",
            fontSize: "1.3em",
            textAlign: "left"
          }}
        >
          Get started by adding a new thread.
        </h1>
        <div
          style={{
            flex: 1
          }}
        >
          <ul
            style={{
              textAlign: "left",
              lineHeight: "2em"
            }}
          >
            <li>
              <a href="#">Start chatting with friends</a>
            </li>
            <li>
              <a href="#">Create a todo list</a>
            </li>
            <li>
              <a href="#">Make a Travel Plan</a>
            </li>
            <li>
              <a href="#">Just show me the armoury!</a>
            </li>
          </ul>
        </div>
      </div>
      <Fab color="primary" aria-label="Add" className={classes.fab}>
        <AddIcon />
      </Fab>
    </div>
  );
}
