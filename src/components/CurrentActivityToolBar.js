// Todo: show activity & detail, elapsed time; implement interupt

import React from "react";

import { connect } from "react-redux";
import {
  addToHistory,
  addInterruption,
  displayNotification
} from "../redux/actions";

import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";

import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";

import AddIcon from "@material-ui/icons/Add";
import PauseIcon from "@material-ui/icons/Pause";
import PlayArrowIcon from "@material-ui/icons/PlayArrow";

import { duration2HHMM } from "../global/duration2HHMM";

const styles = () => ({
  title: {
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
    addToHistory: () => dispatch(addToHistory()),
    addInterruption: () => dispatch(addInterruption()),
    displayNotification: () => dispatch(displayNotification())
  };
};

class CurrentActivityToolBar extends React.Component {
  state = {
    lastHistoryItemDuration: 0
  };

  componentWillReceiveProps(nextProps) {
    this.props.displayNotification();
    this.setState({
      lastHistoryItemDuration: Math.floor(
        (new Date() -
          nextProps.history[nextProps.history.length - 1].datetime) /
          1000 /
          60
      )
    });
  }

  // ticker for elapsed
  componentDidMount() {
    this.intervalID = setInterval(() => {
      this.setState({
        lastHistoryItemDuration: this.state.lastHistoryItemDuration + 1
      });
      this.props.displayNotification();
    }, 1000 * 60);
  }
  componentWillUnmount() {
    clearInterval(this.intervalID);
  }

  render() {
    const { classes, history, addToHistory, addInterruption } = this.props;
    const lastHistoryItem = history.length ? history[history.length - 1] : null;
    const elapsed = duration2HHMM(this.state.lastHistoryItemDuration);

    return (
      <Toolbar className={classes.toolBar}>
        <Typography className={classes.title}>
          {lastHistoryItem
            ? `${lastHistoryItem.activity}: ${lastHistoryItem.detail}`
            : "Loading"}
        </Typography>

        <Typography className={classes.title}>
          {lastHistoryItem ? `Elapsed: ${elapsed}` : null}
        </Typography>

        <IconButton onClick={addToHistory}>
          <AddIcon />
        </IconButton>
        <IconButton onClick={addInterruption}>
          {history.length &&
          history[history.length - 1].activity === "Interruption" ? (
            // if current activity is interruption, show play button; else show pause button
            <PlayArrowIcon />
          ) : (
            <PauseIcon />
          )}
        </IconButton>
      </Toolbar>
    );
  }
}

CurrentActivityToolBar.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(CurrentActivityToolBar)
);
