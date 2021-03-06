// react
import React, { useContext, useState } from "react";

// contexts
import { HistoryContext } from "../../contexts/history/history.context";
import { SnackbarContext } from "../../contexts/snackbar/snackbar.context";
import { splitActivity } from "../../contexts/history/history.actions";
import { openSnackbar } from "../../contexts/snackbar/snackbar.actions";

// material ui
import {
  Button,
  DialogActions,
  DialogContent,
  DialogTitle,
  Box,
  Grid
} from "@material-ui/core";
import { MuiPickersUtilsProvider, DateTimePicker } from "@material-ui/pickers";

// libs
import DateFnsUtils from "@date-io/date-fns";

interface HistoryItemSplitDialogProps {
  index: number;
  handleCloseDialog: () => void;
}

const HistoryItemSplitDialog = ({
  index,
  handleCloseDialog
}: HistoryItemSplitDialogProps) => {
  const { history, dispatchHistory } = useContext(HistoryContext);
  const { dispatchSnackbar } = useContext(SnackbarContext);

  const datetime = new Date(history[index].datetime);
  const nextItemDatetime = history[index - 1]
    ? new Date(history[index - 1].datetime)
    : null;

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
    <Box className="dialog-container">
      <DialogTitle>Split Activity</DialogTitle>

      <DialogContent>
        <Grid container direction="column">
          <MuiPickersUtilsProvider utils={DateFnsUtils}>
            <DateTimePicker
              margin="dense"
              format="yyyy/MM/dd HH:mm"
              value={datetime}
              label="Start"
              onChange={null}
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
              onChange={null}
              disabled
            />
          </MuiPickersUtilsProvider>
        </Grid>
      </DialogContent>

      <DialogActions>
        <Button onClick={handleCloseDialog}>Cancel</Button>
        <Button onClick={handleActivitySplit}>Save</Button>
      </DialogActions>
    </Box>
  );
};

export default HistoryItemSplitDialog;
