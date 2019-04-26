import React, { Component, Fragment } from "react";

import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import {
  restoreHistory,
  restoreCategories,
  restoreSettings,
  enqueueSnackbar
} from "../redux/actions";

import { firebase } from "../global/firebase";

import Button from "@material-ui/core/Button";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import DialogActions from "@material-ui/core/DialogActions";

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    { restoreHistory, restoreCategories, restoreSettings, enqueueSnackbar },
    dispatch
  );

class SettingsRestoreDialog extends Component {
  state = {
    backup: null
  };
  componentDidMount() {
    firebase
      .firestore()
      .collection("backup")
      .doc(firebase.auth().currentUser.uid)
      .get()
      .then(doc => {
        if (doc.exists) {
          this.setState({
            backup: doc.data()
          });
        }
      });
  }
  handleRestoreClick = () => {
    const {
      restoreHistory,
      restoreCategories,
      restoreSettings,
      enqueueSnackbar
    } = this.props;
    restoreHistory(this.state.backup.history);
    restoreCategories(this.state.backup.categories);
    restoreSettings(this.state.backup.settings);
    enqueueSnackbar({
      message: "Successfully restored.",
      options: {
        variant: "success"
      }
    });
  };
  render() {
    const { handleCloseDialog } = this.props;
    return (
      <Fragment>
        <DialogTitle>Restore</DialogTitle>
        <DialogContent>
          <p>Your last backup was made at:</p>
          <p>
            {this.state.backup
              ? this.state.backup.createdAt.toDate().toString()
              : "Error finding previous backup."}
          </p>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog}>Cancel</Button>
          <Button
            disabled={this.state.backup ? false : true}
            onClick={() => {
              this.handleRestoreClick();
              handleCloseDialog();
            }}
            color="secondary"
          >
            Restore
          </Button>
        </DialogActions>
      </Fragment>
    );
  }
}

export default connect(
  null,
  mapDispatchToProps
)(SettingsRestoreDialog);
