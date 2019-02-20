import React from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import Grid from "@material-ui/core/Grid";
import { withStyles } from "@material-ui/core/styles";
import DateFnsUtils from "@date-io/date-fns";
import {
  MuiPickersUtilsProvider,
  TimePicker,
  DatePicker
} from "material-ui-pickers";

import { setActivityDatetime } from "../actions";

const styles = {
  grid: {
    width: "60%"
  }
};

const mapStateToProps = state => {
  return {
    datetime: state.setActivityReducer.datetime
  };
};

const mapDispatchToProps = dispatch => {
  return {
    setActivityDatetime: value => dispatch(setActivityDatetime(value))
  };
};

function Pickers({ classes, datetime, setActivityDatetime }) {
  return (
    <MuiPickersUtilsProvider utils={DateFnsUtils}>
      <Grid container className={classes.grid} justify="space-around">
        <DatePicker
          margin="normal"
          label="Date picker"
          value={datetime}
          onChange={setActivityDatetime}
        />
        <TimePicker
          margin="normal"
          label="Time picker"
          value={datetime}
          onChange={setActivityDatetime}
        />
      </Grid>
    </MuiPickersUtilsProvider>
  );
}

Pickers.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(Pickers)
);
