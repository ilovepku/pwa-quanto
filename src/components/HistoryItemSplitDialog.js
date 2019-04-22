import React, { Component, Fragment } from "react";

import { connect } from "react-redux";
import { splitActivity } from "../redux/actions";

import Button from "@material-ui/core/Button";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";

import { MuiPickersUtilsProvider } from "material-ui-pickers";
import { DateTimePicker } from "material-ui-pickers";
import DateFnsUtils from "@date-io/date-fns";

import { withSnackbar } from "notistack";

const mapStateToProps = state => {
  return {
    categories: state.categories
  };
};
const mapDispatchToProps = dispatch => {
  return {
    splitActivity: payload => dispatch(splitActivity(payload))
  };
};

class HistoryItemSplitDialog extends Component {
  state = {
    datetime: new Date(this.props.datetime),
    // get mid point between start and end datetime
    splitDatetime: new Date(
      (new Date(this.props.datetime).getTime() +
        (this.props.nextItemDatetime
          ? this.props.nextItemDatetime.getTime()
          : new Date().getTime())) /
        2
    )
  };

  handleSplitDateChange = datetime => {
    this.setState({ splitDatetime: datetime });
  };

  handleActivitySplit = () => {
    const {
      index,
      nextItemDatetime,
      splitActivity,
      handleCloseDialog,
      enqueueSnackbar
    } = this.props;
    const { datetime, splitDatetime } = this.state;
    if (
      (!nextItemDatetime && splitDatetime > new Date()) || // split time cannot be in the future
      (nextItemDatetime && splitDatetime > nextItemDatetime) || // split time cannot be later than next entry's start time
      splitDatetime < datetime // split time cannot be earlier than current entry's start time
    ) {
      enqueueSnackbar("Split time must be between 'Start' and 'End'.", {
        variant: "error"
      });
    } else {
      splitActivity({ splitDatetime, index });
      handleCloseDialog();
      enqueueSnackbar("Activity splitted.", {
        variant: "success"
      });
    }
  };

  render() {
    const { nextItemDatetime, handleCloseDialog } = this.props;
    const { datetime, splitDatetime } = this.state;

    return (
      <Fragment>
        <DialogTitle>Split Activity</DialogTitle>

        <DialogContent>
          <MuiPickersUtilsProvider utils={DateFnsUtils}>
            <DateTimePicker
              format="yyyy/MM/dd HH:mm"
              value={datetime}
              onChange={this.handleSplitDateChange /* delete this? */}
              label="Start"
              disabled
            />
          </MuiPickersUtilsProvider>

          <MuiPickersUtilsProvider utils={DateFnsUtils}>
            <DateTimePicker
              margin="dense"
              format="yyyy/MM/dd HH:mm"
              ampm={false}
              openTo="minutes"
              value={splitDatetime}
              onChange={this.handleSplitDateChange}
              label="Split At"
              showTodayButton
            />
          </MuiPickersUtilsProvider>

          <MuiPickersUtilsProvider utils={DateFnsUtils}>
            <DateTimePicker
              margin="dense"
              format="yyyy/MM/dd HH:mm"
              value={nextItemDatetime ? nextItemDatetime : new Date()}
              label="End"
              onChange={this.handleSplitDateChange /* delete this? */}
              disabled
            />
          </MuiPickersUtilsProvider>
        </DialogContent>

        <DialogActions>
          <Button onClick={handleCloseDialog}>Cancel</Button>
          <Button onClick={this.handleActivitySplit} color="primary">
            Save
          </Button>
        </DialogActions>
      </Fragment>
    );
  }
}

export default withSnackbar(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(HistoryItemSplitDialog)
);
