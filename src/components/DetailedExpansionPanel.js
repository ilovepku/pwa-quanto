import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import classNames from "classnames";
import { withStyles } from "@material-ui/core/styles";
import ExpansionPanel from "@material-ui/core/ExpansionPanel";
import ExpansionPanelDetails from "@material-ui/core/ExpansionPanelDetails";
import ExpansionPanelSummary from "@material-ui/core/ExpansionPanelSummary";
import ExpansionPanelActions from "@material-ui/core/ExpansionPanelActions";
import Typography from "@material-ui/core/Typography";
import CreateIcon from "@material-ui/icons/Create";
import DeleteIcon from "@material-ui/icons/Delete";
import CallSplitIcon from "@material-ui/icons/CallSplit";
import SaveIcon from "@material-ui/icons/Save";
import Button from "@material-ui/core/Button";
import Divider from "@material-ui/core/Divider";
import DateTimePicker from "./DateTimePicker";
import NativeSelects from "./NativeSelects";

import { saveActivity, splitActivity, deleteActivity } from "../actions";

const styles = theme => ({
  heading: {
    fontSize: theme.typography.pxToRem(15)
  },
  secondaryHeading: {
    fontSize: theme.typography.pxToRem(15),
    color: theme.palette.text.secondary
  },
  details: {
    alignItems: "center"
  },
  column: {
    flexBasis: "50%"
  },
  button: {
    margin: theme.spacing.unit
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
    activityNameList: state.activityNameList
  };
};

const mapDispatchToProps = dispatch => {
  return {
    saveActivity: payload => dispatch(saveActivity(payload)),
    splitActivity: payload => dispatch(splitActivity(payload)),
    deleteActivity: payload => dispatch(deleteActivity(payload))
  };
};

class DetailedExpansionPanel extends Component {
  state = {
    datetime: this.props.item.datetime,
    activity: this.props.item.activity,
    detail: this.props.item.detail
  };

  handleDateChange = date => {
    this.setState({ datetime: date });
  };

  handleActivityChange = event => {
    this.setState({
      activity: event.target.value,
      detail: this.props.activityNameList.filter(
        item => item.parent === event.target.value
      )[0].name
    });
  };

  handleDetailChange = event => {
    this.setState({ detail: event.target.value });
  };

  render() {
    const {
      classes,
      activityNameList,
      saveActivity,
      splitActivity,
      deleteActivity,
      index
    } = this.props;
    const { datetime, activity, detail } = this.state;

    const activityList = [
      ...new Set(activityNameList.map(item => item.parent))
    ];
    const detailList = activityNameList.filter(
      item => item.parent === activity
    );

    return (
      <ExpansionPanel>
        <ExpansionPanelSummary expandIcon={<CreateIcon />}>
          <div className={classes.column}>
            <Typography className={classes.heading}>
              {this.props.item.datetime.toLocaleDateString("en-US", {
                year: "numeric",
                month: "numeric",
                day: "numeric",
                hour: "numeric",
                minute: "numeric",
                hour12: false
              })}
            </Typography>
          </div>
          <div className={classes.column}>
            <Typography className={classes.secondaryHeading}>
              {this.props.item.activity}: {this.props.item.detail}
            </Typography>
          </div>
        </ExpansionPanelSummary>
        <ExpansionPanelDetails className={classes.details}>
          <div className={classes.column}>
            <DateTimePicker
              datetime={datetime}
              handleDateChange={this.handleDateChange}
            />
          </div>
          <div className={classes.column}>
            <NativeSelects
              activityList={activityList}
              detailList={detailList}
              activity={activity}
              detail={detail}
              handleActivityChange={this.handleActivityChange}
              handleDetailChange={this.handleDetailChange}
            />
          </div>
        </ExpansionPanelDetails>
        <Divider />
        <ExpansionPanelActions>
          <Button
            variant="outlined"
            size="small"
            color="secondary"
            className={classes.button}
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
            color="secondary"
            className={classes.button}
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
            className={classes.button}
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

DetailedExpansionPanel.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(DetailedExpansionPanel)
);
