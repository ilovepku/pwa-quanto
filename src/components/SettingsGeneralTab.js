import React from "react";

import { withStyles } from "@material-ui/core/styles";

import { connect } from "react-redux";
import { defaultCategories, displayNotification } from "../redux/actions";

import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";

import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";

import SettingsPurgeHistoryDialog from "./SettingsPurgeHistoryDialog";

const styles = () => ({
  cards: {
    marginTop: 5,
    marginBottom: 5
  }
});

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
    const { classes, defaultCategories } = this.props;
    const { open, disabled, buttonText } = this.state;

    return (
      <React.Fragment>
        <Card className={classes.cards}>
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
              {buttonText}
            </Button>
          </CardActions>
        </Card>

        <Card className={classes.cards}>
          <CardContent>
            Delete all history entries on and before a certain date of your
            choice (a new activity will be startted if all history entries are
            purged).
          </CardContent>
          <CardActions>
            <Button color="secondary" onClick={this.handleOpenEditDialog}>
              Purge History
            </Button>
          </CardActions>
        </Card>

        <Card className={classes.cards}>
          <CardContent>Restore default categories</CardContent>
          <CardActions>
            <Button color="secondary" onClick={defaultCategories}>
              DEFAULT CATEGORIES
            </Button>
          </CardActions>
        </Card>

        <Dialog open={open} onClose={this.handleCloseEditDialog}>
          <SettingsPurgeHistoryDialog
            handleCloseEditDialog={this.handleCloseEditDialog}
          />
        </Dialog>
      </React.Fragment>
    );
  }
}

export default withStyles(styles)(
  connect(
    null,
    mapDispatchToProps
  )(SettingsGeneralTab)
);
