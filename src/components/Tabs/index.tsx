import React, { useState, EventHandler, ChangeEvent } from "react";
import { withStyles } from "@material-ui/core/styles";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Typography from "@material-ui/core/Typography";

function TabContainer(props: any) {
  return (
    <Typography component="div" style={{ padding: 8 * 3 }}>
      {props.children}
    </Typography>
  );
}

const styles = (theme: any) => ({
  root: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.paper,
    marginTop: "72px"
  }
});

interface ITab {
  name: string;
  component: any;
}

interface IProps {
  tabs: ITab[];
  classes: any;
}

function SimpleTabs(props: IProps) {
  const [currentTab, setCurrentTab] = useState(0);

  const handleChange = (event: React.ChangeEvent<{}>, value: any) => {
    setCurrentTab(value);
  };

  const classes = props.classes;

  return (
    <div className={classes.root}>
      <Tabs centered value={currentTab} onChange={handleChange}>
        {props.tabs.map((t, index) => (
          <Tab key={t.name + index} label={t.name} />
        ))}
      </Tabs>
      {<TabContainer>{props.tabs[currentTab].component}</TabContainer>}
    </div>
  );
}

export default withStyles(styles)(SimpleTabs);
