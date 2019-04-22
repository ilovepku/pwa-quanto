import React, { Component } from "react";

import { connect } from "react-redux";
import {
  addActivity,
  interruptActivity,
  displayNotification
} from "../redux/actions";

import { withStyles } from "@material-ui/core/styles";

import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";

import AddIcon from "@material-ui/icons/Add";
import PauseIcon from "@material-ui/icons/Pause";
import PlayArrowIcon from "@material-ui/icons/PlayArrow";

import { duration2HHMM } from "../global/duration2HHMM";

const styles = () => ({
  text: {
    flexGrow: 1
  },
  toolBar: {
    minHeight: 0
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

class CurrentActivityToolBar extends Component {
  state = {
    lastHistoryItemElapsed: 0
  };

  UNSAFE_componentWillReceiveProps(nextProps) {
    const { history } = nextProps;
    this.loopingUpdateElapsedAndDisplayNotifcation(
      history[history.length - 1].datetime
      // last history item start datetime
    );
  }

  componentDidMount() {
    const { history } = this.props;
    this.loopingUpdateElapsedAndDisplayNotifcation(
      history[history.length - 1].datetime
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
    const lastHistoryItem = history[history.length - 1];

    return (
      <Toolbar className={classes.toolBar}>
        <div className={classes.text}>
          {`${lastHistoryItem.activity}: ${lastHistoryItem.detail}`}
        </div>

        <div className={classes.text}>
          {`Elapsed: ${lastHistoryItemElapsed}`}
        </div>

        <IconButton onClick={addActivity}>
          <AddIcon />
        </IconButton>
        <IconButton onClick={interruptActivity}>
          {lastHistoryItem.activity === "Interruption" ? (
            // if current activity is interruption, show play button; else show pause button
            <PlayArrowIcon color="secondary" />
          ) : (
            <PauseIcon />
          )}
        </IconButton>
      </Toolbar>
    );
  }
}

export default withStyles(styles)(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(CurrentActivityToolBar)
);
