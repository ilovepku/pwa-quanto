import React from "react";

import { connect } from "react-redux";
import { saveActivity, splitActivity, deleteActivity } from "../redux/actions";

import Button from "@material-ui/core/Button";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";

import HistoryItemDateTimePicker from "./HistoryItemDateTimePicker";
import HistoryItemNativeSelects from "./HistoryItemNativeSelects";

import { withSnackbar } from "notistack";

import nanoid from "nanoid";

const mapStateToProps = state => {
  return {
    fullActivityList: state.fullActivityList
  };
};
const mapDispatchToProps = dispatch => {
  return {
    saveActivity: payload => dispatch(saveActivity(payload)),
    splitActivity: payload => dispatch(splitActivity(payload)),
    deleteActivity: payload => dispatch(deleteActivity(payload))
  };
};

class HistoryItemDialog extends React.Component {
  state = {
    datetime: new Date(this.props.item.datetime),
    // get mid point between start and end datetime
    splitDatetime: new Date(
      (new Date(this.props.item.datetime).getTime() +
        (this.props.nextItemDatetime
          ? this.props.nextItemDatetime.getTime()
          : new Date().getTime())) /
        2
    ),
    activity: this.props.item.activity,
    detail: this.props.item.detail
  };

  // temp workaround: to merge into one method
  handleDateChange = datetime => {
    this.setState({ datetime });
  };
  handleSplitDateChange = datetime => {
    this.setState({ splitDatetime: datetime });
  };

  // on activity change, load its details and select the first detail
  handleActivityChange = event => {
    const selectedActivity = Object.values(
      this.props.fullActivityList.activities
    ).filter(item => item.name === event.target.value)[0];
    const detailList = selectedActivity.detailIds.map(
      detailId => this.props.fullActivityList.details[detailId]
    );

    this.setState({
      activity: event.target.value,
      detail: detailList[0].name
    });
  };

  handleDetailChange = event => {
    this.setState({ detail: event.target.value });
  };

  render() {
    const {
      fullActivityList,
      saveActivity,
      splitActivity,
      deleteActivity,
      index,
      lastItemDatetime,
      nextItemDatetime,
      split,
      handleCloseEditDialog,
      enqueueSnackbar
    } = this.props;
    const { datetime, splitDatetime, activity, detail } = this.state;

    // load activity and detail lists
    const activityList = fullActivityList.activityIds.map(activityId => {
      return fullActivityList.activities[activityId];
    });

    let detailList;
    const currentActivity = activityList.find(item => item.name === activity);
    if (currentActivity === undefined) {
      // if activity no longer exists in activity list, add a temp activity
      activityList.unshift({ id: "activity-" + nanoid(10), name: activity });
      detailList = [{ id: "detail-" + nanoid(10), name: detail }];
    } else {
      detailList = currentActivity.detailIds.map(
        detailId => fullActivityList.details[detailId]
      );
      if (!detailList.find(item => item.name === detail)) {
        // if detail no longer exists in activity list, add a temp detail
        detailList.unshift({ id: "detail-" + nanoid(10), name: detail });
      }
    }
    // check for "-" to avoid duplicate "-"
    detail !== "-" && detailList.unshift({ id: "detail-0", name: "-" });

    return (
      <React.Fragment>
        <DialogTitle>
          {split ? "Split Activity" : "Edit Activity Details"}
        </DialogTitle>
        <DialogContent>
          <HistoryItemDateTimePicker
            datetime={datetime}
            nextItemDatetime={nextItemDatetime}
            splitDatetime={splitDatetime}
            split={split}
            handleDateChange={this.handleDateChange}
            handleSplitDateChange={this.handleSplitDateChange}
          />
          {!split && (
            <HistoryItemNativeSelects
              activityList={activityList}
              detailList={detailList}
              activity={activity}
              detail={detail}
              handleActivityChange={this.handleActivityChange}
              handleDetailChange={this.handleDetailChange}
            />
          )}
        </DialogContent>
        <DialogActions>
          {!split && (
            <Button
              onClick={() => {
                if (!lastItemDatetime && !nextItemDatetime) {
                  // if is last entry
                  enqueueSnackbar("Cannot delete last entry.", {
                    variant: "warning"
                  });
                } else {
                  deleteActivity(index);
                  handleCloseEditDialog();
                  enqueueSnackbar("Entry deleted.", { variant: "success" });
                }
              }}
              color="secondary"
            >
              DELETE
            </Button>
          )}
          <Button onClick={handleCloseEditDialog} color="primary">
            Cancel
          </Button>
          <Button
            onClick={() => {
              if (split) {
                if (
                  (!nextItemDatetime && splitDatetime > new Date()) || // split time cannot be in the future
                  (nextItemDatetime && splitDatetime > nextItemDatetime) || // split time cannot be later than next entry's start time
                  splitDatetime < datetime // split time cannot be earlier than current entry's start time
                ) {
                  enqueueSnackbar("Split time out of range.", {
                    variant: "error"
                  });
                } else {
                  splitActivity({ splitDatetime, activity, detail, index });
                  handleCloseEditDialog();
                }
              } else {
                if (
                  (!nextItemDatetime && datetime > new Date()) || // new time cannot be in the future
                  (nextItemDatetime && datetime > nextItemDatetime) || // new time cannot be later than next entry's start time
                  (lastItemDatetime && datetime < lastItemDatetime) // new time cannot be earlier than previou entry's start time
                ) {
                  enqueueSnackbar("New time out of range.", {
                    variant: "error"
                  });
                } else {
                  saveActivity({ datetime, activity, detail, index });
                  handleCloseEditDialog();
                  enqueueSnackbar("Successfully saved.", {
                    variant: "success"
                  });
                }
              }
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
    mapStateToProps,
    mapDispatchToProps
  )(HistoryItemDialog)
);
