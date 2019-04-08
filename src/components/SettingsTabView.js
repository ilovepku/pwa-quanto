import React, { Component, Fragment } from "react";

import { connect } from "react-redux";
import {
  clearHistory,
  defaultActivityList,
  displayNotification
} from "../redux/actions";

import Button from "@material-ui/core/Button";

const mapDispatchToProps = dispatch => {
  return {
    clearHistory: () => dispatch(clearHistory()),
    defaultActivityList: () => dispatch(defaultActivityList()),
    displayNotification: () => dispatch(displayNotification())
  };
};

class SettingsTabView extends Component {
  state = {
    disabled: Notification.permission === "granted" ? true : false,
    buttonText:
      Notification.permission === "granted"
        ? "Notification Enabled"
        : "Enable Notification"
  };
  componentWillUnmount() {
    clearInterval(this.intervalID);
  }
  handlePermissionRequestClick() {
    Notification.requestPermission(result => {
      if (result === "granted") {
        this.props.displayNotification();
        clearInterval(this.intervalID);
        // ticker for elapsed
        this.intervalID = setInterval(() => {
          this.props.displayNotification();
        }, 1000 * 60);
        this.setState({
          disabled: true
        });
      }
    });
  }

  render() {
    const { clearHistory, defaultActivityList } = this.props;
    const { disabled, buttonText } = this.state;
    return (
      <Fragment>
        <div>
          <Button
            disabled={disabled}
            variant="contained"
            color="secondary"
            onClick={() => this.handlePermissionRequestClick()}
          >
            {buttonText}
          </Button>
          <p>
            Enable this to check/pause/resume your current activity and add a
            new activity from notifiction (even without unlocking your device).
          </p>
        </div>

        <div>
          <Button variant="contained" color="secondary" onClick={clearHistory}>
            CLEAR HISTORY
          </Button>
        </div>

        <div>
          <Button
            variant="contained"
            color="secondary"
            onClick={defaultActivityList}
          >
            DEFAULT ACTIVITY LIST
          </Button>
        </div>

        <div>By Sean LEE</div>
      </Fragment>
    );
  }
}

export default connect(
  null,
  mapDispatchToProps
)(SettingsTabView);
