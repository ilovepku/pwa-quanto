import React, { PureComponent } from "react";
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

class DateTimePicker extends PureComponent {
  state = {
    selectedDate: new Date()
  };

  handleDateChange = date => {
    this.setState({ selectedDate: date });
  };

  render() {
    const { selectedDate } = this.state;
    const { classes } = this.props;
    return (
      <div className={classes.root}>
        <div className={classes.picker}>
          <MuiPickersUtilsProvider utils={DateFnsUtils}>
            <DatePicker
              label="Started Date"
              value={selectedDate}
              format="yyyy/MM/dd"
              views={["year", "month", "day"]}
              onChange={this.handleDateChange}
            />
          </MuiPickersUtilsProvider>
        </div>
        <div className={classes.picker}>
          <MuiPickersUtilsProvider utils={DateFnsUtils}>
            <TimePicker
              clearable
              ampm={false}
              label="Started Time"
              value={selectedDate}
              onChange={this.handleDateChange}
            />
          </MuiPickersUtilsProvider>
        </div>
      </div>
    );
  }
}

DateTimePicker.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(DateTimePicker);
