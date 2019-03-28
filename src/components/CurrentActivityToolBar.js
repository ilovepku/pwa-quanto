// Todo: show activity & detail, elapsed time; implement interupt

import React from "react";

import { connect } from "react-redux";
import { addToHistory, splitActivity } from "../redux/actions";

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
    splitActivity: payload => dispatch(splitActivity(payload))
  };
};

class CurrentActivityToolBar extends React.Component {
  state = {
    lastHistoryItemDuration: 0
  };

  componentWillReceiveProps(nextProps) {
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
    this.intervalID = setInterval(
      () =>
        this.setState({
          lastHistoryItemDuration: this.state.lastHistoryItemDuration + 1
        }),
      1000 * 60
    );
  }
  componentWillUnmount() {
    clearInterval(this.intervalID);
  }

  render() {
    const { classes, history, addToHistory, splitActivity } = this.props;
    const lastHistoryItem = history.length ? history[history.length - 1] : null;

    return (
      <Toolbar className={classes.toolBar}>
        <Typography className={classes.title}>
          {lastHistoryItem
            ? `${lastHistoryItem.activity}: ${lastHistoryItem.detail}`
            : "Loading"}
        </Typography>

        <Typography className={classes.title}>
          {lastHistoryItem
            ? `Elapsed: ${duration2HHMM(this.state.lastHistoryItemDuration)}`
            : null}
        </Typography>

        <IconButton onClick={addToHistory}>
          <AddIcon />
        </IconButton>
        <IconButton
          onClick={() => {
            if (
              // if current activity is interruption, ends interruption
              history.length &&
              history[history.length - 1].activity === "Interruption"
            ) {
              splitActivity({
                datetime: new Date(),
                activity: history[history.length - 2].activity,
                detail: history[history.length - 2].detail,
                index: history.length - 1
              });
            } else {
              // if current activity is not interruption, starts interruption
              splitActivity({
                datetime: new Date(),
                activity: "Interruption",
                detail: "-",
                index: history.length - 1
              });
            }
          }}
        >
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

displayConfirmNotification();

function displayConfirmNotification() {
  Notification.requestPermission(result => {
    if (result !== "granted") {
      console.log("no notification permission granted");
    } else {
      if ("serviceWorker" in navigator) {
        var options = {
          body: "Elasped: 00:00",
          /* badge: "", */
          icon: "android-chrome-192x192.png",
          tag: "default",
          silent: true,
          actions: [
            {
              action: "new",
              title: "New",
              icon: "icon-plus-24.png"
            },
            {
              action: "interrupt",
              title: "Interrupt",
              icon: "icon-pause-24.png"
            }
          ]
        };

        navigator.serviceWorker.ready.then(swreg => {
          swreg.showNotification("Eat - Meal", options);
        });
      }
    }
  });
}
