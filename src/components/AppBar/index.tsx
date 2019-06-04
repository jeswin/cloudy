import React from "react";
import { withStyles } from "@material-ui/core/styles";
import MUIAppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/MoreVert";
import SearchIcon from "@material-ui/icons/Search";

const styles = {
  root: {
    flexGrow: 1
  },
  grow: {
    flexGrow: 1
  },
  menuButton: {
    marginLeft: -12,
    marginRight: 20
  }
};

interface IProps {
  classes: any;
  children?: JSX.Element[] | JSX.Element;
}

function AppBar(props: IProps) {
  const { classes } = props;
  return (
    <MUIAppBar title="Hello" position="fixed">
      <Toolbar>
        <Typography variant="h6" color="inherit" className={classes.grow}>
          Open Messenger
        </Typography>
        <IconButton
          className={classes.searchButton}
          color="inherit"
          aria-label="Search"
        >
          <SearchIcon />
        </IconButton>
        <IconButton
          className={classes.menuButton}
          color="inherit"
          aria-label="Menu"
        >
          <MenuIcon />
        </IconButton>
      </Toolbar>
      {props.children}
    </MUIAppBar>
  );
}

export default withStyles(styles)(AppBar);
