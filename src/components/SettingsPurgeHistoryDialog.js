import React, { Component } from "react";

import { connect } from "react-redux";
import { purgeHistory } from "../redux/actions";

import Button from "@material-ui/core/Button";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";

import { MuiPickersUtilsProvider } from "material-ui-pickers";
import { DatePicker } from "material-ui-pickers";
import DateFnsUtils from "@date-io/date-fns";

import { withSnackbar } from "notistack";

const mapDispatchToProps = dispatch => {
  return {
    purgeHistory: payload => dispatch(purgeHistory(payload))
  };
};

class SettingsPurgeHistoryDialog extends Component {
  state = {
    date: new Date()
  };
  handleDateChange = date => {
    this.setState({ date: date.setHours(23, 59, 59, 999) });
  };
  render() {
    const { purgeHistory, enqueueSnackbar, handleCloseEditDialog } = this.props;
    const { date } = this.state;
    return (
      <React.Fragment>
        <DialogTitle>Purge History</DialogTitle>
        <DialogContent>
          <MuiPickersUtilsProvider utils={DateFnsUtils}>
            <DatePicker
              openTo="day"
              label="Purge on and before:"
              format="yyyy/MM/dd"
              value={date}
              onChange={this.handleDateChange}
              showTodayButton
            />
          </MuiPickersUtilsProvider>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseEditDialog} color="primary">
            Cancel
          </Button>
          <Button
            onClick={() => {
              purgeHistory(date);
              handleCloseEditDialog();
              enqueueSnackbar("Successfully purged.", {
                variant: "success"
              });
            }}
            color="primary"
          >
            Save
          </Button>
        </DialogActions>
      </React.Fragment>
    );
  }
}

export default withSnackbar(
  connect(
    null,
    mapDispatchToProps
  )(SettingsPurgeHistoryDialog)
);
