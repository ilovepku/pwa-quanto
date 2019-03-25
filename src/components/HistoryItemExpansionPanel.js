import React from "react";

import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";

import { connect } from "react-redux";
import { saveActivity, splitActivity, deleteActivity } from "../redux/actions";

import { withSnackbar } from "notistack";

import ExpansionPanel from "@material-ui/core/ExpansionPanel";
import ExpansionPanelDetails from "@material-ui/core/ExpansionPanelDetails";
import ExpansionPanelSummary from "@material-ui/core/ExpansionPanelSummary";
import ExpansionPanelActions from "@material-ui/core/ExpansionPanelActions";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import Divider from "@material-ui/core/Divider";

import CreateIcon from "@material-ui/icons/Create";
import DeleteIcon from "@material-ui/icons/Delete";
import CallSplitIcon from "@material-ui/icons/CallSplit";
import SaveIcon from "@material-ui/icons/Save";

import classNames from "classnames";

import HistoryItemDateTimePicker from "./HistoryItemDateTimePicker";
import HistoryItemNativeSelects from "./HistoryItemNativeSelects";

const styles = theme => ({
  leftColumn: {
    flexBasis: "40%"
  },
  rightIcon: {
    marginLeft: theme.spacing.unit
  },
  iconSmall: {
    fontSize: 20
  }
});

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

class HistoryItemExpansionPanel extends React.Component {
  state = {
    datetime: this.props.item.datetime,
    activity: this.props.item.activity,
    detail: this.props.item.detail,
    expanded: null
  };

  // fix for splitted item form reset
  componentWillReceiveProps(nextProps) {
    this.setState({
      datetime: nextProps.item.datetime,
      activity: nextProps.item.activity,
      detail: nextProps.item.detail
    });
  }

  handleDateChange = datetime => {
    this.setState({ datetime });
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

  handleChange = panel => (event, expanded) => {
    this.setState({
      expanded: expanded ? panel : false
    });
  };

  render() {
    const {
      classes,
      fullActivityList,
      saveActivity,
      splitActivity,
      deleteActivity,
      item,
      index,
      lastItemDatetime,
      nextItemDatetime,
      enqueueSnackbar
    } = this.props;
    const { datetime, activity, detail, expanded } = this.state;

    // if current history item's activity doesn't exist in activity list, select default activity
    const fullActivityListActivities = Object.values(
      fullActivityList.activities
    );
    const currentActivity = fullActivityListActivities.filter(
      item => item.name === activity
    )[0];
    const selectedActivity = !currentActivity
      ? fullActivityListActivities[0]
      : currentActivity;

    // load activity and detail lists
    const activityList = fullActivityList.activityIds.map(activityId => {
      return fullActivityList.activities[activityId];
    });
    const detailList = selectedActivity.detailIds.map(
      detailId => fullActivityList.details[detailId]
    );
    detailList.unshift({ id: "detail-0", name: "-" });

    return (
      <ExpansionPanel
        expanded={expanded === "panel-" + index}
        onChange={this.handleChange("panel-" + index)}
      >
        <ExpansionPanelSummary expandIcon={<CreateIcon />}>
          <Typography className={classes.leftColumn}>
            {item.datetime.toLocaleDateString("en-US", {
              year: "numeric",
              month: "numeric",
              day: "numeric",
              hour: "numeric",
              minute: "numeric",
              hour12: false
            })}
          </Typography>
          <Typography>
            {item.activity}: {item.detail}
          </Typography>
        </ExpansionPanelSummary>

        <ExpansionPanelDetails>
          <HistoryItemDateTimePicker
            datetime={datetime}
            handleDateChange={this.handleDateChange}
          />
          <HistoryItemNativeSelects
            activityList={activityList}
            detailList={detailList}
            activity={activity}
            detail={detail}
            handleActivityChange={this.handleActivityChange}
            handleDetailChange={this.handleDetailChange}
          />
        </ExpansionPanelDetails>

        <Divider variant="middle" />
        <ExpansionPanelActions>
          <Button
            variant="outlined"
            size="small"
            color="secondary"
            onClick={() => {
              this.setState({ expanded: null });
              if (!lastItemDatetime && !nextItemDatetime) {
                // if is last entry
                enqueueSnackbar("Cannot delete last entry.", {
                  variant: "warning"
                });
              } else {
                deleteActivity(index);
                enqueueSnackbar("Entry deleted.", { variant: "success" });
              }
            }}
          >
            Delete
            <DeleteIcon
              className={classNames(classes.rightIcon, classes.iconSmall)}
            />
          </Button>
          <Button
            variant="outlined"
            size="small"
            color="primary"
            onClick={() => {
              if (
                (!nextItemDatetime && datetime > new Date()) || // split time cannot be in the future
                (nextItemDatetime && datetime > nextItemDatetime) || // split time cannot be later than next entry's time
                datetime < this.props.item.datetime // split time cannot be earlier than current entry's time
              ) {
                enqueueSnackbar("Split time out of range.", {
                  variant: "error"
                });
              } else {
                splitActivity({ datetime, activity, detail, index });
                // reset form after split
                this.setState({
                  datetime: this.props.item.datetime,
                  activity: this.props.item.activity,
                  detail: this.props.item.detail,
                  expanded: null
                });
              }
            }}
          >
            Split
            <CallSplitIcon
              className={classNames(classes.rightIcon, classes.iconSmall)}
            />
          </Button>
          <Button
            variant="outlined"
            size="small"
            color="primary"
            onClick={() => {
              if (
                (!nextItemDatetime && datetime > new Date()) || // new time cannot be in the future
                (nextItemDatetime && datetime > nextItemDatetime) || // new time cannot be later than next entry's time
                (lastItemDatetime && datetime < lastItemDatetime) // new time cannot be earlier than later entry's time
              ) {
                enqueueSnackbar("New time out of range.", {
                  variant: "error"
                });
              } else {
                this.setState({ expanded: null });
                saveActivity({ datetime, activity, detail, index });
              }
            }}
          >
            Save
            <SaveIcon
              className={classNames(classes.rightIcon, classes.iconSmall)}
            />
          </Button>
        </ExpansionPanelActions>
      </ExpansionPanel>
    );
  }
}

HistoryItemExpansionPanel.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withSnackbar(
  withStyles(styles)(
    connect(
      mapStateToProps,
      mapDispatchToProps
    )(HistoryItemExpansionPanel)
  )
);
