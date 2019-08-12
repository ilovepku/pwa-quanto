import React, { Component } from "react";

import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import {
  saveActivity,
  deleteActivity,
  enqueueSnackbar
} from "../redux/actions";

import Button from "@material-ui/core/Button";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";

import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import NativeSelect from "@material-ui/core/NativeSelect";
import Input from "@material-ui/core/Input";

import { MuiPickersUtilsProvider } from "material-ui-pickers";
import { DateTimePicker } from "material-ui-pickers";
import DateFnsUtils from "@date-io/date-fns";

import { duration2HHMM } from "../global/duration2HHMM";

import nanoid from "nanoid";

import { withStyles } from "@material-ui/core/styles";

const styles = () => ({
  formControl: {
    minWidth: 180
  }
});

const mapStateToProps = state => {
  return {
    categories: state.categories
  };
};
const mapDispatchToProps = dispatch =>
  bindActionCreators(
    { saveActivity, deleteActivity, enqueueSnackbar },
    dispatch
  );

class HistoryItemEditDialog extends Component {
  state = {
    datetime: new Date(this.props.item.datetime),
    nextItemDatetime: this.props.nextItemDatetime
      ? new Date(this.props.nextItemDatetime)
      : null,
    activity: this.props.item.activity,
    detail: this.props.item.detail
  };

  handleDateChange = (name, datetime) => {
    this.setState({ [name]: datetime });
  };

  // on activity change, load its details and select the first detail
  handleActivityChange = event => {
    const { categories } = this.props;
    const selectedActivity = Object.values(categories.activities).filter(
      item => item.name === event.target.value
    )[0];
    const detailList = selectedActivity.detailIds.map(
      detailId => categories.details[detailId]
    );

    this.setState({
      activity: event.target.value,
      detail: detailList.length ? detailList[0].name : "-" // fix for selecting activity with no detail
    });
  };

  handleDetailChange = event => {
    this.setState({ detail: event.target.value });
  };

  handleActivitySave = () => {
    const {
      index,
      lastItemDatetime,
      nextNextItemDatetime,
      saveActivity,
      handleCloseDialog,
      enqueueSnackbar
    } = this.props;
    const { datetime, nextItemDatetime, activity, detail } = this.state;
    if (lastItemDatetime && datetime < lastItemDatetime) {
      // new time cannot be earlier than previou entry's start time
      enqueueSnackbar({
        message: "Start time before last activity.",
        options: {
          variant: "error"
        }
      });
    } else if (
      nextItemDatetime &&
      datetime > nextItemDatetime // new time cannot be later than next entry's start time
    ) {
      enqueueSnackbar({
        message: "Start time after end time.",
        options: {
          variant: "error"
        }
      });
    } else if (!nextItemDatetime && datetime > new Date()) {
      // new start time is in the future
      enqueueSnackbar({
        message: "Start time in the future.",
        options: {
          variant: "error"
        }
      });
    } else if (
      nextNextItemDatetime &&
      nextItemDatetime > nextNextItemDatetime
      // new end time cannot be earlier than start time of next next item
    ) {
      enqueueSnackbar({
        message: "End time after next activity.",
        options: {
          variant: "error"
        }
      });
    } else if (
      !nextNextItemDatetime &&
      nextItemDatetime > new Date()
      // new end time cannot be in the future
    ) {
      enqueueSnackbar({
        message: "End time in the future.",
        options: {
          variant: "error"
        }
      });
    } else {
      saveActivity({
        datetime: datetime,
        nextItemDatetime: nextItemDatetime,
        activity: activity,
        detail: detail,
        index: index
      });
      handleCloseDialog();
      enqueueSnackbar({
        message: "Activity saved.",
        options: {
          variant: "success"
        }
      });
    }
  };

  handleActivityDel = () => {
    const {
      index,
      lastItemDatetime,
      deleteActivity,
      handleCloseDialog,
      enqueueSnackbar
    } = this.props;
    const { nextItemDatetime } = this.state;
    if (!lastItemDatetime && !nextItemDatetime) {
      // if is last entry
      enqueueSnackbar({
        message: "A new activity has been started.",
        options: {
          variant: "warning"
        }
      });
    } else {
      enqueueSnackbar({
        message: "Activity deleted.",
        options: {
          variant: "success"
        }
      });
    }
    deleteActivity(index);
    handleCloseDialog();
  };

  render() {
    const { classes, categories, handleCloseDialog } = this.props;
    const { datetime, nextItemDatetime, activity, detail } = this.state;

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
              onChange={datetime => this.handleDateChange("datetime", datetime)}
              label="Start"
              showTodayButton
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
                onChange={datetime =>
                  this.handleDateChange("nextItemDatetime", datetime)
                }
                label="End"
                showTodayButton
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
              onChange={this.handleActivityChange}
              input={<Input name="activity" id="activity" />}
            >
              {activityNameListItems}
            </NativeSelect>
          </FormControl>

          <FormControl margin="dense" className={classes.formControl}>
            <InputLabel htmlFor="detail">Detail</InputLabel>
            <NativeSelect
              value={detail}
              onChange={this.handleDetailChange}
              input={<Input name="detail" id="detail" />}
            >
              {detailNameListItems}
            </NativeSelect>
          </FormControl>
        </DialogContent>

        <DialogActions>
          <Button onClick={this.handleActivityDel} color="secondary">
            DELETE
          </Button>

          <Button onClick={handleCloseDialog}>Cancel</Button>

          <Button onClick={this.handleActivitySave} color="primary">
            Save
          </Button>
        </DialogActions>
      </div>
    );
  }
}

export default withStyles(styles)(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(HistoryItemEditDialog)
);
