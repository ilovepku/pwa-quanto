// react
import React, { useEffect, useState, useContext } from "react";
import { SettingsContext } from "../contexts/settingsContext";
import { CategoriesContext } from "../contexts/categoriesContext";
import { HistoryContext } from "../contexts/historyContext";

// material ui
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import CardActions from "@material-ui/core/CardActions";
import Button from "@material-ui/core/Button";

// libs
import StyledFirebaseAuth from "react-firebaseui/StyledFirebaseAuth";
import { firebase, uiConfig } from "../global/firebase";

const SettingsGeneralBackup = props => {
  const { setRestoreDialogOpen } = props;
  const [isSignedIn, setIsSignedIn] = useState(false);
  const { settings } = useContext(SettingsContext);
  const { categories } = useContext(CategoriesContext);
  const { history } = useContext(HistoryContext);
  console.log(settings, categories, history); // to-do: delte this temp placehoder log
  useEffect(() => {
    // Listen to the Firebase Auth state and set the local state.
    const unregisterAuthObserver = firebase
      .auth()
      .onAuthStateChanged(user => setIsSignedIn(!!user));
    return () => {
      // Make sure we un-register Firebase observers when the component unmounts.
      unregisterAuthObserver();
    };
  });
  if (!isSignedIn) {
    return (
      <Card>
        <CardContent>
          Sign in to backup or restore your activity history, custom categories
          and settings:
        </CardContent>
        <CardActions>
          <StyledFirebaseAuth
            uiConfig={uiConfig}
            firebaseAuth={firebase.auth()}
          />
        </CardActions>
      </Card>
    );
  }
  return (
    <Card>
      <CardContent>
        Welcome {firebase.auth().currentUser.displayName}! You can now backup or
        restore your activity history, custom categories and settings!
      </CardContent>

      <CardActions>
        <Button onClick={() => firebase.auth().signOut()}>Sign-out</Button>
        <Button // to-do: not yet implemented with new context api
          /* onClick={() => backup({ history, categories, settings })} */ color="primary"
        >
          Back-up
        </Button>
        <Button onClick={() => setRestoreDialogOpen(true)} color="secondary">
          Restore
        </Button>
      </CardActions>
    </Card>
  );
};

export default SettingsGeneralBackup;
