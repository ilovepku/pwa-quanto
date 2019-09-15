// react
import React, { useState, useContext } from "react";

// contexts
import { HistoryContext } from "../../contexts/history/history.context";
import { SnackbarContext } from "../../contexts/snackbar/snackbar.context";
import { purgeHistory } from "../../contexts/history/history.actions";
import { openSnackbar } from "../../contexts/snackbar/snackbar.actions";

// material ui
import Button from "@material-ui/core/Button";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import DialogActions from "@material-ui/core/DialogActions";
import { MuiPickersUtilsProvider } from "@material-ui/pickers";
import { DatePicker } from "@material-ui/pickers";

// libs
import DateFnsUtils from "@date-io/date-fns";

const SettingsPurgeHistoryDialog = ({ handleCloseDialog }) => {
  const [date, setDate] = useState(new Date());
  const { dispatchHistory } = useContext(HistoryContext);
  const { dispatchSnackbar } = useContext(SnackbarContext);

  const handleDateChange = date => {
    setDate(date.setHours(23, 59, 59, 999));
  };
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
            onChange={handleDateChange}
            showTodayButton
          />
        </MuiPickersUtilsProvider>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleCloseDialog}>Cancel</Button>
        <Button
          onClick={() => {
            dispatchHistory(purgeHistory(date));
            dispatchSnackbar(
              openSnackbar({
                msg: "Successfully purged.",
                variant: "success"
              })
            );
            handleCloseDialog();
          }}
        >
          Purge
        </Button>
      </DialogActions>
    </div>
  );
};

export default SettingsPurgeHistoryDialog;
