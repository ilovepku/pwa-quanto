// react
import React, { Component, Fragment } from "react";

// redux
import { connect } from "react-redux";
import { displayNotification } from "../redux/actions";

// material ui
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import CardActions from "@material-ui/core/CardActions";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";

// components
import SettingsPurgeHistoryDialog from "./SettingsPurgeHistoryDialog";
import SettingsDefaultCategoriesDialog from "./SettingsDefaultCategoriesDialog";
import SettingsRestoreDialog from "./SettingsRestoreDialog";
import SettingsGeneralBackup from "./SettingsGeneralBackup";

const mapDispatchToProps = dispatch => {
  return {
    displayNotification: () => dispatch(displayNotification())
  };
};

class SettingsGeneralTab extends Component {
  state = {
    purgeDialogOpen: false,
    defaultCategoriesDialogOpen: false,
    restoreDialogOpen: false,
    disabled: Notification.permission === "granted" ? true : false
  };

  handleOpenDialog = dialog => {
    this.setState({
      [dialog]: true
    });
  };

  handleCloseDialog = () => {
    this.setState({
      purgeDialogOpen: false,
      defaultCategoriesDialogOpen: false,
      restoreDialogOpen: false
    });
  };

  handlePermissionRequestClick() {
    const { displayNotification } = this.props;
    Notification.requestPermission(result => {
      if (result === "granted") {
        displayNotification();
        this.setState({
          disabled: true
        });
      }
    });
  }

  render() {
    const {
      disabled,
      purgeDialogOpen,
      restoreDialogOpen,
      defaultCategoriesDialogOpen
    } = this.state;

    return (
      <Fragment>
        <Card>
          <CardContent>
            Enable Notification to check/pause/add an activity without opening
            the app or even unlocking your device).
          </CardContent>
          <CardActions>
            <Button
              disabled={disabled}
              color="primary"
              onClick={() => this.handlePermissionRequestClick()}
            >
              {disabled ? "Notification Enabled" : "Enable Notification"}
            </Button>
          </CardActions>
        </Card>

        <SettingsGeneralBackup handleOpenDialog={this.handleOpenDialog} />

        <Card>
          <CardContent>
            Delete all history entries on and before a certain date of your
            choice (a new activity will be started if all history entries are
            purged).
          </CardContent>
          <CardActions>
            <Button
              color="secondary"
              onClick={() => this.handleOpenDialog("purgeDialogOpen")}
            >
              Purge History
            </Button>
          </CardActions>
        </Card>

        <Card>
          <CardContent>Restore default categories</CardContent>
          <CardActions>
            <Button
              color="secondary"
              onClick={() =>
                this.handleOpenDialog("defaultCategoriesDialogOpen")
              }
            >
              DEFAULT CATEGORIES
            </Button>
          </CardActions>
        </Card>

        <Dialog open={purgeDialogOpen} onClose={this.handleCloseDialog}>
          <SettingsPurgeHistoryDialog
            handleCloseDialog={this.handleCloseDialog}
          />
        </Dialog>

        <Dialog
          open={defaultCategoriesDialogOpen}
          onClose={this.handleCloseDialog}
        >
          <SettingsDefaultCategoriesDialog
            handleCloseDialog={this.handleCloseDialog}
          />
        </Dialog>

        <Dialog open={restoreDialogOpen} onClose={this.handleCloseDialog}>
          <SettingsRestoreDialog handleCloseDialog={this.handleCloseDialog} />
        </Dialog>
      </Fragment>
    );
  }
}

export default connect(
  null,
  mapDispatchToProps
)(SettingsGeneralTab);
