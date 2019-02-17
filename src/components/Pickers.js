import React from "react";
import PropTypes from "prop-types";
import Grid from "@material-ui/core/Grid";
import { withStyles } from "@material-ui/core/styles";
import DateFnsUtils from "@date-io/date-fns";
import {
  MuiPickersUtilsProvider,
  TimePicker,
  DatePicker
} from "material-ui-pickers";

const styles = {
  grid: {
    width: "60%"
  }
};

function Pickers({ classes, date, handleChange }) {
  return (
    <MuiPickersUtilsProvider utils={DateFnsUtils}>
      <Grid container className={classes.grid} justify="space-around">
        <DatePicker
          margin="normal"
          label="Date picker"
          value={date}
          onChange={handleChange}
        />
        <TimePicker
          margin="normal"
          label="Time picker"
          value={date}
          onChange={handleChange}
        />
      </Grid>
    </MuiPickersUtilsProvider>
  );
}

Pickers.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(Pickers);
