import React from "react";

import { connect } from "react-redux";
import { defaultCategories, displayNotification } from "../redux/actions";

import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";

import SettingsPurgeHistoryDialog from "./SettingsPurgeHistoryDialog";

const mapDispatchToProps = dispatch => {
  return {
    defaultCategories: () => dispatch(defaultCategories()),
    displayNotification: () => dispatch(displayNotification())
  };
};

class SettingsGeneralTab extends React.Component {
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
    const { defaultCategories } = this.props;
    const { open, disabled, buttonText } = this.state;

    return (
      <React.Fragment>
        <p>General Settings</p>
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
            Enable Notification to check/pause/add an activity without opening
            the app or even unlocking your device).
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
          <p>
            Delete all history entries on and before a certain date of your
            choice (a new activity will be startted if all history entries are
            purged).
          </p>
        </div>

        <div>
          <Button
            variant="contained"
            color="secondary"
            onClick={defaultCategories}
          >
            DEFAULT CATEGORIES
          </Button>
          <p>Restore default categories</p>
        </div>

        <Dialog open={open} onClose={this.handleCloseEditDialog}>
          <SettingsPurgeHistoryDialog
            handleCloseEditDialog={this.handleCloseEditDialog}
          />
        </Dialog>
      </React.Fragment>
    );
  }
}

export default connect(
  null,
  mapDispatchToProps
)(SettingsGeneralTab);
