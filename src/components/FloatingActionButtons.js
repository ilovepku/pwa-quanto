import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Fab from "@material-ui/core/Fab";
import AddIcon from "@material-ui/icons/Add";

const styles = theme => ({
  fab: {
    margin: theme.spacing.unit
  },
  extendedIcon: {
    marginRight: theme.spacing.unit
  }
});

function FloatingActionButtons({ classes, handleChange }) {
  return (
    <Fab color="primary" aria-label="Add" className={classes.fab}>
      <AddIcon onClick={handleChange} />
    </Fab>
  );
}

FloatingActionButtons.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(FloatingActionButtons);
