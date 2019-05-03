import React, { Component } from "react";

import { connect } from "react-redux";
import {
  addActivity,
  interruptActivity,
  displayNotification
} from "../redux/actions";

import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";

import AddIcon from "@material-ui/icons/Add";
import PauseIcon from "@material-ui/icons/Pause";
import PlayArrowIcon from "@material-ui/icons/PlayArrow";

import { duration2HHMM } from "../global/duration2HHMM";

import { withStyles } from "@material-ui/core/styles";

const styles = () => ({
  card: {
    display: "flex"
  },
  content: {
    flex: "1 0 auto",
    padding: "0px 10px 0px 10px"
  },
  controls: {
    display: "flex"
  },
  addIcon: {
    height: 38,
    width: 38
  }
});

const mapStateToProps = state => {
  return {
    history: state.history
  };
};
const mapDispatchToProps = dispatch => {
  return {
    addActivity: () => dispatch(addActivity()),
    interruptActivity: () => dispatch(interruptActivity()),
    displayNotification: () => dispatch(displayNotification())
  };
};

class CurrentActivityCard extends Component {
  state = {
    lastHistoryItemElapsed: 0
  };

  UNSAFE_componentWillReceiveProps(nextProps) {
    const { history } = nextProps;
    this.loopingUpdateElapsedAndDisplayNotifcation(
      history[0].datetime
      // last history item start datetime
    );
  }

  componentDidMount() {
    const { history } = this.props;
    this.loopingUpdateElapsedAndDisplayNotifcation(
      history[0].datetime
      // last history item start datetime
    );
  }

  loopingUpdateElapsedAndDisplayNotifcation(datetime) {
    // update toolbar elpased and display notification once
    this.updateElapsedAndDisplayNotifcation(datetime);
    // clearInterval and set new Interval to update toolbar elapsed and display notifcation every minute
    clearInterval(this.intervalID);
    this.intervalID = setInterval(() => {
      this.updateElapsedAndDisplayNotifcation(datetime);
    }, 1000 * 60);
  }

  updateElapsedAndDisplayNotifcation(datetime) {
    this.setState({
      lastHistoryItemElapsed: duration2HHMM(
        Math.floor((new Date() - new Date(datetime)) / 1000 / 60)
      )
    });
    this.props.displayNotification();
  }

  componentWillUnmount() {
    clearInterval(this.intervalID);
  }

  render() {
    const { classes, history, addActivity, interruptActivity } = this.props;
    const { lastHistoryItemElapsed } = this.state;
    const lastHistoryItem = history[0];

    return (
      <div className={classes.card}>
        <div className={classes.content}>
          <Typography component="h6" variant="h6">
            {`Elapsed: ${lastHistoryItemElapsed}`}
          </Typography>
          <Typography variant="subtitle1" color="textSecondary">
            {`${lastHistoryItem.activity}: ${lastHistoryItem.detail}`}
          </Typography>
        </div>
        <div className={classes.controls}>
          <IconButton aria-label="Add" onClick={addActivity}>
            <AddIcon className={classes.addIcon} />
          </IconButton>
          <IconButton aria-label="Interrupt" onClick={interruptActivity}>
            {lastHistoryItem.activity === "Interruption" ? (
              // if current activity is interruption, show play button; else show pause button
              <PlayArrowIcon color="secondary" />
            ) : (
              <PauseIcon />
            )}
          </IconButton>
        </div>
      </div>
    );
  }
}

export default withStyles(styles)(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(CurrentActivityCard)
);