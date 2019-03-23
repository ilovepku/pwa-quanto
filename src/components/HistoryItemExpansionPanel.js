import React from "react";

import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";

import { connect } from "react-redux";
import { saveActivity, splitActivity, deleteActivity } from "../redux/actions";

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
    detail: this.props.item.detail
  };

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

  render() {
    const {
      classes,
      fullActivityList,
      saveActivity,
      splitActivity,
      deleteActivity,
      item,
      index
    } = this.props;
    const { datetime, activity, detail } = this.state;

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

    return (
      <ExpansionPanel>
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
            onClick={() => deleteActivity(index)}
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
            onClick={() => splitActivity({ datetime, activity, detail, index })}
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
            onClick={() => saveActivity({ datetime, activity, detail, index })}
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

export default withStyles(styles)(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(HistoryItemExpansionPanel)
);
