import React, { Component } from "react";

import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { purgeHistory, enqueueSnackbar } from "../redux/actions";

import Button from "@material-ui/core/Button";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import DialogActions from "@material-ui/core/DialogActions";

import { MuiPickersUtilsProvider } from "material-ui-pickers";
import { DatePicker } from "material-ui-pickers";
import DateFnsUtils from "@date-io/date-fns";

const mapDispatchToProps = dispatch =>
  bindActionCreators({ purgeHistory, enqueueSnackbar }, dispatch);

class SettingsPurgeHistoryDialog extends Component {
  state = {
    date: new Date()
  };
  handleDateChange = date => {
    this.setState({ date: date.setHours(23, 59, 59, 999) });
  };
  render() {
    const { purgeHistory, handleCloseDialog, enqueueSnackbar } = this.props;
    const { date } = this.state;
    return (
      <div className="dialog-container">
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
          <Button onClick={handleCloseDialog}>Cancel</Button>
          <Button
            onClick={() => {
              purgeHistory(date);
              handleCloseDialog();
              enqueueSnackbar({
                message: "Successfully purged.",
                options: {
                  variant: "success"
                }
              });
            }}
            color="secondary"
          >
            Purge
          </Button>
        </DialogActions>
      </div>
    );
  }
}

export default connect(
  null,
  mapDispatchToProps
)(SettingsPurgeHistoryDialog);
