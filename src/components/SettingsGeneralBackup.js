// Import FirebaseAuth and firebase.
import React from "react";

import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import CardActions from "@material-ui/core/CardActions";
import Button from "@material-ui/core/Button";

import StyledFirebaseAuth from "react-firebaseui/StyledFirebaseAuth";
import { firebase, uiConfig } from "../global/firebase";

class SettingsGeneralBackup extends React.Component {
  // The component's Local state.
  state = {
    isSignedIn: false // Local signed-in state.
  };

  // Listen to the Firebase Auth state and set the local state.
  componentDidMount() {
    this.unregisterAuthObserver = firebase
      .auth()
      .onAuthStateChanged(user => this.setState({ isSignedIn: !!user }));
  }

  // Make sure we un-register Firebase observers when the component unmounts.
  componentWillUnmount() {
    this.unregisterAuthObserver();
  }

  render() {
    if (!this.state.isSignedIn) {
      return (
        <Card>
          <CardContent>
            Sign in to backup or restore your activity history and custom
            categories:
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
          Welcome {firebase.auth().currentUser.displayName}! You can now backup
          or restore your activity history and custom categories!
        </CardContent>
        <CardActions>
          <Button onClick={() => firebase.auth().signOut()}>Sign-out</Button>
        </CardActions>
      </Card>
    );
  }
}

export default SettingsGeneralBackup;
