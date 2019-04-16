import React from "react";

import { connect } from "react-redux";
import { displayNotification } from "../redux/actions";

import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import CardActions from "@material-ui/core/CardActions";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";

import SettingsPurgeHistoryDialog from "./SettingsPurgeHistoryDialog";
import SettingsDefaultCategoriesDialog from "./SettingsDefaultCategoriesDialog";
import SettingsGeneralBackup from "./SettingsGeneralBackup";

const mapDispatchToProps = dispatch => {
  return {
    displayNotification: () => dispatch(displayNotification())
  };
};

class SettingsGeneralTab extends React.Component {
  state = {
    purgeDialogOpen: false,
    defaultCategoriesDialogOpen: false,
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
      defaultCategoriesDialogOpen: false
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
      defaultCategoriesDialogOpen
    } = this.state;

    return (
      <React.Fragment>
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

        <SettingsGeneralBackup />

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
      </React.Fragment>
    );
  }
}

export default connect(
  null,
  mapDispatchToProps
)(SettingsGeneralTab);
