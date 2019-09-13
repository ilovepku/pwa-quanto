// react
import React, { useContext, useState } from "react";

// contexts
import { HistoryContext } from "../../contexts/history/history.context";
import { SnackbarContext } from "../../contexts/snackbar/snackbar.context";
import { splitActivity } from "../../contexts/history/history.actions";
import { openSnackbar } from "../../contexts/snackbar/snackbar.actions";

// material ui
import Button from "@material-ui/core/Button";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import { MuiPickersUtilsProvider } from "@material-ui/pickers";
import { DateTimePicker } from "@material-ui/pickers";

// libs
import DateFnsUtils from "@date-io/date-fns";

const HistoryItemSplitDialog = ({
  datetime,
  nextItemDatetime,
  index,
  handleCloseDialog
}) => {
  const { dispatchHistory } = useContext(HistoryContext);
  const { dispatchSnackbar } = useContext(SnackbarContext);

  const [splitDatetime, setSplitDatetime] = useState(
    new Date(
      (datetime.getTime() +
        (nextItemDatetime
          ? nextItemDatetime.getTime()
          : new Date().getTime())) /
        2
    )
  ); // get mid point between start and end datetime

  const handleActivitySplit = () => {
    if (
      (!nextItemDatetime && splitDatetime > new Date()) || // split time cannot be in the future
      (nextItemDatetime && splitDatetime > nextItemDatetime) || // split time cannot be later than next entry's start time
      splitDatetime < datetime // split time cannot be earlier than current entry's start time
    ) {
      dispatchSnackbar(
        openSnackbar({
          msg: "Split time must be between 'Start' and 'End'.",
          variant: "error"
        })
      );
    } else {
      dispatchHistory(splitActivity({ splitDatetime, index }));
      dispatchSnackbar(
        openSnackbar({
          msg: "Activity splitted.",
          variant: "success"
        })
      );
      handleCloseDialog();
    }
  };

  return (
    <div className="dialog-container">
      <DialogTitle>Split Activity</DialogTitle>

      <DialogContent>
        <MuiPickersUtilsProvider utils={DateFnsUtils}>
          <DateTimePicker
            format="yyyy/MM/dd HH:mm"
            value={datetime}
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
            onChange={setSplitDatetime}
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
            disabled
          />
        </MuiPickersUtilsProvider>
      </DialogContent>

      <DialogActions>
        <Button onClick={handleCloseDialog}>Cancel</Button>
        <Button onClick={handleActivitySplit} color="primary">
          Save
        </Button>
      </DialogActions>
    </div>
  );
};

export default HistoryItemSplitDialog;
