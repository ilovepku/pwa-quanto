// react
import React, { useContext, useState } from "react";

// contexts
import { CategoriesContext } from "../../contexts/categories/categories.context";
import { HistoryContext } from "../../contexts/history/history.context";
import { SnackbarContext } from "../../contexts/snackbar/snackbar.context";
import {
  saveActivity,
  deleteActivity
} from "../../contexts/history/history.actions";
import { openSnackbar } from "../../contexts/snackbar/snackbar.actions";

// material ui
import { makeStyles } from "@material-ui/core/styles";
import {
  Button,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControl,
  InputLabel,
  NativeSelect,
  Input,
  Box
} from "@material-ui/core";
import { MuiPickersUtilsProvider, DateTimePicker } from "@material-ui/pickers";

// libs
import nanoid from "nanoid";
import DateFnsUtils from "@date-io/date-fns";

// utils
import { duration2HHMM } from "../../utils/duration2HHMM.utils";

const useStyles = makeStyles({
  formControl: {
    minWidth: 175
  }
});

const HistoryItemEditDialog = ({
  handleCloseDialog,
  index,
  item,
  lastItemDatetime,
  nextItemDatetimeProp,
  nextNextItemDatetime
}) => {
  const classes = useStyles();
  const { categories } = useContext(CategoriesContext);
  const { dispatchHistory } = useContext(HistoryContext);
  const { dispatchSnackbar } = useContext(SnackbarContext);

  const [datetime, setDatetime] = useState(new Date(item.datetime));
  const [nextItemDatetime, setNextItemDatetime] = useState(
    nextItemDatetimeProp ? new Date(nextItemDatetimeProp) : null
  );
  const [activity, setActivity] = useState(item.activity);
  const [detail, setDetail] = useState(item.detail);

  // on activity change, load its details and select the first detail
  const handleActivityChange = e => {
    const selectedActivity = Object.values(categories.activities).filter(
      item => item.name === e.target.value
    )[0];
    const detailList = selectedActivity.detailIds.map(
      detailId => categories.details[detailId]
    );

    setActivity(e.target.value);
    setDetail(detailList.length ? detailList[0].name : "-"); // fix for selecting activity with no detail
  };

  const handleActivitySave = () => {
    if (lastItemDatetime && datetime < lastItemDatetime) {
      // new time cannot be earlier than previou entry's start time
      dispatchSnackbar(
        openSnackbar({
          msg: "Start time before last activity.",
          variant: "error"
        })
      );
    } else if (
      nextItemDatetime &&
      datetime > nextItemDatetime // new time cannot be later than next entry's start time
    ) {
      dispatchSnackbar(
        openSnackbar({
          msg: "Start time after end time.",
          variant: "error"
        })
      );
    } else if (!nextItemDatetime && datetime > new Date()) {
      // new start time is in the future
      dispatchSnackbar(
        openSnackbar({
          msg: "Start time in the future.",
          variant: "error"
        })
      );
    } else if (
      nextNextItemDatetime &&
      nextItemDatetime > nextNextItemDatetime
      // new end time cannot be earlier than start time of next next item
    ) {
      dispatchSnackbar(
        openSnackbar({
          msg: "End time after next activity.",
          variant: "error"
        })
      );
    } else if (
      !nextNextItemDatetime &&
      nextItemDatetime > new Date()
      // new end time cannot be in the future
    ) {
      dispatchSnackbar(
        openSnackbar({
          msg: "End time in the future.",
          variant: "error"
        })
      );
    } else {
      dispatchHistory(
        saveActivity({
          datetime,
          nextItemDatetime,
          activity,
          detail,
          index
        })
      );

      dispatchSnackbar(
        openSnackbar({
          msg: "Activity saved.",
          variant: "success"
        })
      );

      handleCloseDialog();
    }
  };

  const handleActivityDel = () => {
    if (!lastItemDatetime && !nextItemDatetime) {
      // if is last entry
      dispatchSnackbar(
        openSnackbar({
          msg: "A new activity has been started.",
          variant: "warning"
        })
      );
    } else {
      dispatchSnackbar(
        openSnackbar({
          msg: "Activity deleted.",
          variant: "success"
        })
      );
    }
    dispatchHistory(deleteActivity(index));
    handleCloseDialog();
  };

  // load activity and detail lists
  const activityList = categories.activityIds.map(activityId => {
    return categories.activities[activityId];
  });

  let detailList;
  const currentActivity = activityList.find(item => item.name === activity);
  if (currentActivity === undefined) {
    // if activity no longer exists in activity list, add a temp activity
    activityList.unshift({ id: "activity-" + nanoid(10), name: activity });
    detailList = [{ id: "detail-" + nanoid(10), name: detail }];
  } else {
    detailList = currentActivity.detailIds.map(
      detailId => categories.details[detailId]
    );
    if (!detailList.find(item => item.name === detail)) {
      // if detail no longer exists in activity list, add a temp detail
      detailList.unshift({ id: "detail-" + nanoid(10), name: detail });
    }
  }
  // check for "-" to avoid duplicate "-"
  detail !== "-" && detailList.unshift({ id: "detail-0", name: "-" });

  // generate options for selects
  const activityNameListItems = activityList.map(item => {
    return (
      <option value={item.name} key={item.id}>
        {item.name}
      </option>
    );
  });
  const detailNameListItems = detailList.map(item => {
    return (
      <option value={item.name} key={item.id}>
        {item.name}
      </option>
    );
  });
  return (
    <Box className="dialog-container">
      <DialogTitle>Edit Activity Details</DialogTitle>
      <DialogContent>
        <MuiPickersUtilsProvider utils={DateFnsUtils}>
          <DateTimePicker
            format="yyyy/MM/dd HH:mm"
            ampm={false}
            openTo="minutes"
            value={datetime}
            onChange={setDatetime}
            label="Start"
            showTodayButton
            todayLabel="Now"
          />
        </MuiPickersUtilsProvider>

        {nextItemDatetime && (
          // show end datetime if it's not current activity
          <MuiPickersUtilsProvider utils={DateFnsUtils}>
            <DateTimePicker
              margin="dense"
              format="yyyy/MM/dd HH:mm"
              ampm={false}
              openTo="minutes"
              value={nextItemDatetime}
              onChange={setNextItemDatetime}
              label="End"
              showTodayButton
              todayLabel="Now"
            />
          </MuiPickersUtilsProvider>
        )}

        <p>
          {nextItemDatetime
            ? // show duration or elapsed depending on if it's the current activity
              `Duration: ${duration2HHMM(
                Math.floor((nextItemDatetime - datetime) / 1000 / 60)
              )}
        `
            : `Elapsed: ${duration2HHMM(
                Math.floor((new Date() - datetime) / 1000 / 60)
              )}`}
        </p>

        <FormControl margin="dense" className={classes.formControl}>
          <InputLabel htmlFor="activity">Activity</InputLabel>
          <NativeSelect
            value={activity}
            onChange={handleActivityChange}
            input={<Input name="activity" id="activity" />}
          >
            {activityNameListItems}
          </NativeSelect>
        </FormControl>

        <FormControl margin="dense" className={classes.formControl}>
          <InputLabel htmlFor="detail">Detail</InputLabel>
          <NativeSelect
            value={detail}
            onChange={e => setDetail(e.target.value)}
            input={<Input name="detail" id="detail" />}
          >
            {detailNameListItems}
          </NativeSelect>
        </FormControl>
      </DialogContent>

      <DialogActions>
        <Button onClick={handleActivityDel}>DELETE</Button>
        <Button onClick={handleActivitySave}>Save</Button>
        <Button onClick={handleCloseDialog}>Cancel</Button>
      </DialogActions>
    </Box>
  );
};

export default HistoryItemEditDialog;