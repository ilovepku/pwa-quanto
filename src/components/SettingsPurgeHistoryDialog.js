// react
import React, { useState, useContext } from "react";
import { HistoryContext } from "../contexts/historyContext";
import { SnackbarContext } from "../contexts/snackbarContext";
import { PURGE_HISTORY, OPEN_SNACKBAR } from "../contexts/constants";

// material ui
import Button from "@material-ui/core/Button";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import DialogActions from "@material-ui/core/DialogActions";
import { MuiPickersUtilsProvider } from "@material-ui/pickers";
import { DatePicker } from "@material-ui/pickers";

// libs
import DateFnsUtils from "@date-io/date-fns";

const SettingsPurgeHistoryDialog = props => {
  const { handleCloseDialog } = props;
  const [date, setDate] = useState(new Date());
  const { dispatch } = useContext(HistoryContext);
  const snackbarContext = useContext(SnackbarContext);

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
            dispatch({ type: PURGE_HISTORY, payload: date });
            handleCloseDialog();
            snackbarContext.dispatch({
              type: OPEN_SNACKBAR,
              payload: {
                msg: "Successfully purged.",
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
};

export default SettingsPurgeHistoryDialog;
