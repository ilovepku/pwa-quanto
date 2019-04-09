// Todo: show activity & detail, elapsed time; implement interupt

import React from "react";

import { connect } from "react-redux";
import {
  addActivity,
  interruptActivity,
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
    addActivity: () => dispatch(addActivity()),
    interruptActivity: () => dispatch(interruptActivity()),
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
          new Date(nextProps.history[nextProps.history.length - 1].datetime)) /
          1000 /
          60
      )
    });
    clearInterval(this.intervalID);
    // ticker for elapsed
    this.intervalID = setInterval(() => {
      this.setState({
        lastHistoryItemDuration: Math.floor(
          (new Date() -
            new Date(
              nextProps.history[nextProps.history.length - 1].datetime
            )) /
            1000 /
            60
        )
      });
      this.props.displayNotification();
    }, 1000 * 60);
  }

  componentDidMount() {
    this.props.displayNotification();
    this.setState({
      lastHistoryItemDuration: Math.floor(
        (new Date() -
          new Date(
            this.props.history[this.props.history.length - 1].datetime
          )) /
          1000 /
          60
      )
    });
    clearInterval(this.intervalID);
    // ticker for elapsed
    this.intervalID = setInterval(() => {
      this.setState({
        lastHistoryItemDuration: Math.floor(
          (new Date() -
            new Date(
              this.props.history[this.props.history.length - 1].datetime
            )) /
            1000 /
            60
        )
      });
      this.props.displayNotification();
    }, 1000 * 60);
  }

  componentWillUnmount() {
    clearInterval(this.intervalID);
  }

  render() {
    const { classes, history, addActivity, interruptActivity } = this.props;
    const lastHistoryItem = history[history.length - 1];
    const elapsed = duration2HHMM(this.state.lastHistoryItemDuration);

    return (
      <Toolbar className={classes.toolBar}>
        <Typography className={classes.title}>
          {`${lastHistoryItem.activity}: ${lastHistoryItem.detail}`}
        </Typography>

        <Typography className={classes.title}>
          {`Elapsed: ${elapsed}`}
        </Typography>

        <IconButton onClick={addActivity}>
          <AddIcon color="primary" />
        </IconButton>
        <IconButton onClick={interruptActivity}>
          {history[history.length - 1].activity === "Interruption" ? (
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

CurrentActivityToolBar.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(CurrentActivityToolBar)
);
