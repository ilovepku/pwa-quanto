// react
import React, { Fragment, useContext, useEffect } from "react";
import { Link } from "react-router-dom";

// contexts
import { UserContext } from "../../contexts/user/user.context";
import { setCurrentUser } from "../../contexts/user/user.actions";

// material ui
import {
  ListItem,
  ListItemText,
  Button,
  ListItemSecondaryAction
} from "@material-ui/core";

// utils
import firebase from "../../utils/firebase.utils";

const AuthListItem = () => {
  const {
    user: { currentUser },
    dispatchUser
  } = useContext(UserContext);

  useEffect(() => {
    // Listen to the Firebase Auth state and set the local state.
    const unregisterAuthObserver = firebase.auth().onAuthStateChanged(user => {
      if (user) {
        dispatchUser(
          setCurrentUser({ displayName: user.displayName, email: user.email })
        );
      } else {
        dispatchUser(setCurrentUser(null));
      }
    });
    return () => {
      // Make sure we un-register Firebase observers when the component unmounts.
      unregisterAuthObserver();
    };
  }, [dispatchUser]);
  return (
    <Fragment>
      <ListItem alignItems="flex-start">
        <ListItemText
          primary={
            currentUser
              ? `Hello, ${currentUser.displayName}`
              : "Hello, guest user!"
          }
          secondary={"Sign in to backup/restore data"}
        />
        <ListItemSecondaryAction>
          {currentUser ? (
            <Button onClick={() => firebase.auth().signOut()}>
              SIGN OUT
            </Button>
          ) : (
            <Button component={Link} to="/auth">
              SIGN IN
            </Button>
          )}
        </ListItemSecondaryAction>
      </ListItem>
    </Fragment>
  );
};

export default AuthListItem;
