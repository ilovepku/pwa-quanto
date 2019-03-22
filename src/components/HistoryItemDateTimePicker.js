// Todo: lessen width

import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import DateFnsUtils from "@date-io/date-fns";
import { MuiPickersUtilsProvider } from "material-ui-pickers";
import { DatePicker, TimePicker } from "material-ui-pickers";

const styles = theme => ({
  root: {
    display: "flex",
    flexWrap: "wrap"
  },
  picker: {
    margin: "8px"
  }
});

function HistoryItemDateTimePicker(props) {
  const { classes, datetime, handleDateChange } = props;
  return (
    <div className={classes.root}>
      <div className={classes.picker}>
        <MuiPickersUtilsProvider utils={DateFnsUtils}>
          <DatePicker
            label="Started Date"
            value={datetime}
            format="yyyy/MM/dd"
            views={["year", "month", "day"]}
            onChange={handleDateChange}
          />
        </MuiPickersUtilsProvider>
      </div>
      <div className={classes.picker}>
        <MuiPickersUtilsProvider utils={DateFnsUtils}>
          <TimePicker
            clearable
            ampm={false}
            label="Started Time"
            value={datetime}
            onChange={handleDateChange}
          />
        </MuiPickersUtilsProvider>
      </div>
    </div>
  );
}

HistoryItemDateTimePicker.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(HistoryItemDateTimePicker);
