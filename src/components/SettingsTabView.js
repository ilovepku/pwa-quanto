import React, { Component, Fragment } from "react";

import { connect } from "react-redux";
import { defaultActivityList, displayNotification } from "../redux/actions";

import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";

import PurgeHistoryDialog from "./PurgeHistoryDialog";

const mapDispatchToProps = dispatch => {
  return {
    defaultActivityList: () => dispatch(defaultActivityList()),
    displayNotification: () => dispatch(displayNotification())
  };
};

class SettingsTabView extends Component {
  state = {
    open: false,
    disabled: Notification.permission === "granted" ? true : false,
    buttonText:
      Notification.permission === "granted"
        ? "Notification Enabled"
        : "Enable Notification"
  };

  componentWillUnmount() {
    clearInterval(this.intervalID);
  }

  handleOpenEditDialog = () => {
    this.setState({
      open: true
    });
  };

  handleCloseEditDialog = () => {
    this.setState({
      open: false
    });
  };

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
    const { defaultActivityList } = this.props;
    const { open, disabled, buttonText } = this.state;
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
          <Button
            variant="contained"
            color="secondary"
            onClick={this.handleOpenEditDialog}
          >
            Purge History
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

        <Dialog open={open} onClose={this.handleCloseEditDialog}>
          <PurgeHistoryDialog
            handleCloseEditDialog={this.handleCloseEditDialog}
          />
        </Dialog>
      </Fragment>
    );
  }
}

export default connect(
  null,
  mapDispatchToProps
)(SettingsTabView);
