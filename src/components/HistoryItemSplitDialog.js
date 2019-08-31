// react
import React, { useContext, useState } from "react";
import { HistoryContext } from "../contexts/historyContext";

// material ui
import Button from "@material-ui/core/Button";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import { MuiPickersUtilsProvider } from "@material-ui/pickers";
import { DateTimePicker } from "@material-ui/pickers";

// libs
import { useSnackbar } from "notistack";
import DateFnsUtils from "@date-io/date-fns";

const HistoryItemSplitDialog = props => {
  const { nextItemDatetime, handleCloseDialog } = props;

  const { enqueueSnackbar } = useSnackbar();
  const { dispatch } = useContext(HistoryContext);
  const [datetime] = useState(new Date(props.datetime));
  const [splitDatetime, setSplitDatetime] = useState(
    new Date(
      (new Date(datetime).getTime() +
        (nextItemDatetime
          ? nextItemDatetime.getTime()
          : new Date().getTime())) /
        2
    )
  ); // get mid point between start and end datetime

  const handleActivitySplit = () => {
    const { index } = props;
    if (
      (!nextItemDatetime && splitDatetime > new Date()) || // split time cannot be in the future
      (nextItemDatetime && splitDatetime > nextItemDatetime) || // split time cannot be later than next entry's start time
      splitDatetime < datetime // split time cannot be earlier than current entry's start time
    ) {
      enqueueSnackbar("Split time must be between 'Start' and 'End'.", {
        variant: "error"
      });
    } else {
      dispatch({ type: "SPLIT_ACTIVITY", payload: { splitDatetime, index } });
      handleCloseDialog();
      enqueueSnackbar("Activity splitted.", {
        variant: "success"
      });
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
