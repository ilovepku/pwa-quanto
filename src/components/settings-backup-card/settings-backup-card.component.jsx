// react
import React, { Fragment, useEffect, useState, useContext } from "react";

// contexts
import { SettingsContext } from "../../contexts/settings/settings.context";
import { CategoriesContext } from "../../contexts/categories/categories.context";
import { HistoryContext } from "../../contexts/history/history.context";
import { SnackbarContext } from "../../contexts/snackbar/snackbar.context";
import { openSnackbar } from "../../contexts/snackbar/snackbar.actions";

// material ui
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import CardActions from "@material-ui/core/CardActions";
import Button from "@material-ui/core/Button";

// libs
import StyledFirebaseAuth from "react-firebaseui/StyledFirebaseAuth";

// utils
import firebase from "../../utils/firebase.utils";

const firebaseUiConfig = {
  signInSuccessUrl: "/settings",
  signInOptions: [firebase.auth.GoogleAuthProvider.PROVIDER_ID]
};

const SettingsBackupCard = ({ setRestoreDialogOpen }) => {
  const [isSignedIn, setIsSignedIn] = useState(false);
  const { settings } = useContext(SettingsContext);
  const { categories } = useContext(CategoriesContext);
  const { history } = useContext(HistoryContext);
  const { dispatchSnackbar } = useContext(SnackbarContext);

  useEffect(() => {
    // Listen to the Firebase Auth state and set the local state.
    const unregisterAuthObserver = firebase
      .auth()
      .onAuthStateChanged(user => setIsSignedIn(!!user));
    return () => {
      // Make sure we un-register Firebase observers when the component unmounts.
      unregisterAuthObserver();
    };
  }, []); // [] to run effect only once

  const backup = () => {
    const user = firebase.auth().currentUser;

    if (user) {
      firebase
        .firestore()
        .collection("backup")
        .doc(user.uid)
        .set({
          history: history,
          categories: categories,
          settings: settings,
          createdAt: new Date()
        })
        .then(() => {
          dispatchSnackbar(
            openSnackbar({ msg: "Backup complete.", variant: "success" })
          );
        })
        .catch(() => {
          dispatchSnackbar(
            openSnackbar({
              msg: "Backup error, try again later.",
              variant: "error"
            })
          );
        });
    } else {
      console.log("No user is signed in.");
    }
  };

  return (
    <Fragment>
      {!isSignedIn ? (
        <Card>
          <CardContent>
            Sign in to backup or restore your activity history, custom
            categories and settings:
          </CardContent>
          <CardActions>
            <StyledFirebaseAuth
              uiConfig={firebaseUiConfig}
              firebaseAuth={firebase.auth()}
            />
          </CardActions>
        </Card>
      ) : (
        <Card>
          <CardContent>
            Welcome {firebase.auth().currentUser.displayName}! You can now
            backup or restore your activity history, custom categories and
            settings!
          </CardContent>

          <CardActions>
            <Button onClick={() => firebase.auth().signOut()}>Sign-out</Button>
            <Button onClick={backup} color="primary">
              Back-up
            </Button>
            <Button
              onClick={() => setRestoreDialogOpen(true)}
              color="secondary"
            >
              Restore
            </Button>
          </CardActions>
        </Card>
      )}
    </Fragment>
  );
};

export default SettingsBackupCard;
