// react
import React, { useContext, useState } from "react";
import { CategoriesContext } from "../contexts/categoriesContext";
import { HistoryContext } from "../contexts/historyContext";

// material ui
import { withStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import NativeSelect from "@material-ui/core/NativeSelect";
import Input from "@material-ui/core/Input";
import { MuiPickersUtilsProvider } from "@material-ui/pickers";
import { DateTimePicker } from "@material-ui/pickers";

// lib
import nanoid from "nanoid";
import DateFnsUtils from "@date-io/date-fns";
import { useSnackbar } from "notistack";

// functions
import { duration2HHMM } from "../global/duration2HHMM";

const styles = () => ({
  formControl: {
    minWidth: 180
  }
});

const HistoryItemEditDialog = props => {
  const { classes, handleCloseDialog } = props;

  const { categories } = useContext(CategoriesContext);
  const { dispatch } = useContext(HistoryContext);
  const { enqueueSnackbar } = useSnackbar();

  const [datetime, setDatetime] = useState(new Date(props.item.datetime));
  const [nextItemDatetime, setNextItemDatetime] = useState(
    props.nextItemDatetime ? new Date(props.nextItemDatetime) : null
  );
  const [activity, setActivity] = useState(props.item.activity);
  const [detail, setDetail] = useState(props.item.detail);

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
    const {
      index,
      lastItemDatetime,
      nextNextItemDatetime,
      handleCloseDialog
    } = props;
    if (lastItemDatetime && datetime < lastItemDatetime) {
      // new time cannot be earlier than previou entry's start time
      enqueueSnackbar("Start time before last activity.", {
        variant: "error"
      });
    } else if (
      nextItemDatetime &&
      datetime > nextItemDatetime // new time cannot be later than next entry's start time
    ) {
      enqueueSnackbar("Start time after end time.", {
        variant: "error"
      });
    } else if (!nextItemDatetime && datetime > new Date()) {
      // new start time is in the future
      enqueueSnackbar("Start time in the future.", {
        variant: "error"
      });
    } else if (
      nextNextItemDatetime &&
      nextItemDatetime > nextNextItemDatetime
      // new end time cannot be earlier than start time of next next item
    ) {
      enqueueSnackbar("End time after next activity.", {
        variant: "error"
      });
    } else if (
      !nextNextItemDatetime &&
      nextItemDatetime > new Date()
      // new end time cannot be in the future
    ) {
      enqueueSnackbar("End time in the future.", {
        variant: "error"
      });
    } else {
      dispatch({
        type: "SAVE_ACTIVITY",
        payload: {
          datetime,
          nextItemDatetime,
          activity,
          detail,
          index
        }
      });

      handleCloseDialog();
      enqueueSnackbar("Activity saved.", {
        variant: "success"
      });
    }
  };

  const handleActivityDel = () => {
    const { index, lastItemDatetime, handleCloseDialog } = props;
    if (!lastItemDatetime && !nextItemDatetime) {
      // if is last entry
      enqueueSnackbar("A new activity has been started.", {
        variant: "warning"
      });
    } else {
      enqueueSnackbar("Activity deleted.", {
        variant: "success"
      });
    }
    dispatch({ type: "DELETE_ACTIVITY", payload: index });
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
    <div className="dialog-container">
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
        <Button onClick={handleActivityDel} color="secondary">
          DELETE
        </Button>

        <Button onClick={handleCloseDialog}>Cancel</Button>

        <Button onClick={handleActivitySave} color="primary">
          Save
        </Button>
      </DialogActions>
    </div>
  );
};

export default withStyles(styles)(HistoryItemEditDialog);
