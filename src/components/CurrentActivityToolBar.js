// Todo: show activity & detail, elapsed time; implement interupt

import React from "react";

import { connect } from "react-redux";
import { addToHistory } from "../redux/actions";

import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";

import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";

import AddIcon from "@material-ui/icons/Add";
import PauseIcon from "@material-ui/icons/Pause";

const styles = () => ({
  title: {
    flexGrow: 1
  },
  toolBar: {
    minHeight: 0
  }
});

const mapDispatchToProps = dispatch => {
  return {
    addToHistory: () => dispatch(addToHistory())
  };
};

function CurrentActivityToolBar(props) {
  const { classes, addToHistory } = props;
  return (
    <Toolbar className={classes.toolBar}>
      <Typography className={classes.title} variant="h6">
        Current Activity
      </Typography>

      <IconButton onClick={addToHistory}>
        <AddIcon />
      </IconButton>
      <IconButton>
        <PauseIcon />
      </IconButton>
    </Toolbar>
  );
}

CurrentActivityToolBar.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(
  connect(
    null,
    mapDispatchToProps
  )(CurrentActivityToolBar)
);
