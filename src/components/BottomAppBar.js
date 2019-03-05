import React from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import CssBaseline from "@material-ui/core/CssBaseline";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import AddIcon from "@material-ui/icons/Add";
import PauseIcon from "@material-ui/icons/Pause";
import IconLabelTabs from "./IconLabelTabs";

import { addToHistory } from "../actions";

const styles = theme => ({
  title: {
    flexGrow: 1
  },
  appBar: {
    top: "auto",
    bottom: 0
  },
  toolbar: {
    alignItems: "center",
    justifyContent: "space-between"
  }
});

const mapDispatchToProps = dispatch => {
  return {
    addToHistory: () => dispatch(addToHistory())
  };
};

function BottomAppBar(props) {
  const { classes, addToHistory } = props;
  return (
    <React.Fragment>
      <CssBaseline />
      <AppBar position="fixed" color="primary" className={classes.appBar}>
        <Toolbar className={classes.toolbar}>
          <Typography className={classes.title} variant="h6" color="inherit">
            Current Activity
          </Typography>
          <div>
            <IconButton color="inherit" onClick={addToHistory}>
              <AddIcon />
            </IconButton>
            <IconButton color="inherit">
              <PauseIcon />
            </IconButton>
          </div>
        </Toolbar>
        <IconLabelTabs />
      </AppBar>
    </React.Fragment>
  );
}

BottomAppBar.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(
  connect(
    null,
    mapDispatchToProps
  )(BottomAppBar)
);
