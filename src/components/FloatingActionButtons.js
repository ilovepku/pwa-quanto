import React from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Fab from "@material-ui/core/Fab";
import AddIcon from "@material-ui/icons/Add";

import { setActivityHistory } from "../actions";

const mapStateToProps = state => {
  return {
    datetime: state.setActivityReducer.datetime,
    category: state.setActivityReducer.category,
    detail: state.setActivityReducer.detail
  };
};

const mapDispatchToProps = dispatch => {
  return {
    setActivityHistory: value => dispatch(setActivityHistory(value))
  };
};

const styles = theme => ({
  fab: {
    margin: theme.spacing.unit
  },
  extendedIcon: {
    marginRight: theme.spacing.unit
  }
});

function FloatingActionButtons({
  classes,
  datetime,
  category,
  detail,
  setActivityHistory
}) {
  return (
    <Fab color="primary" aria-label="Add" className={classes.fab}>
      <AddIcon
        onClick={() => setActivityHistory({ datetime, category, detail })}
      />
    </Fab>
  );
}

FloatingActionButtons.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(FloatingActionButtons)
);
