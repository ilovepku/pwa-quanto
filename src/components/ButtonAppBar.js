import React from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import AddIcon from "@material-ui/icons/Add";
import PauseIcon from "@material-ui/icons/Pause";

import { addToHistory } from "../actions";

const styles = theme => ({
  title: {
    flexGrow: 1
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

function ButtonAppBar(props) {
  const { classes, addToHistory } = props;
  return (
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
  );
}

ButtonAppBar.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(
  connect(
    null,
    mapDispatchToProps
  )(ButtonAppBar)
);
