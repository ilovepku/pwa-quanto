import React, { Fragment } from "react";
import { Link } from "react-router-dom";

// material ui
import { makeStyles } from "@material-ui/core/styles";
import { Typography, IconButton, Toolbar, AppBar } from "@material-ui/core";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";

// libs
import StyledFirebaseAuth from "react-firebaseui/StyledFirebaseAuth";

// utils
import firebase from "../../utils/firebase.utils";

const useStyles = makeStyles(theme => ({
  appBar: {
    position: "relative"
  },
  title: {
    marginLeft: theme.spacing(2),
    flex: 1
  }
}));

// Configure FirebaseUI.
const firebaseUiConfig = {
  signInSuccessUrl: "/settings",
  signInOptions: [
    firebase.auth.GoogleAuthProvider.PROVIDER_ID,
    firebase.auth.FacebookAuthProvider.PROVIDER_ID,
    firebase.auth.TwitterAuthProvider.PROVIDER_ID,
    firebase.auth.GithubAuthProvider.PROVIDER_ID,
    firebase.auth.EmailAuthProvider.PROVIDER_ID,
    firebase.auth.PhoneAuthProvider.PROVIDER_ID
  ],
  credentialHelper: "none"
};

const AuthPage = () => {
  const classes = useStyles();
  return (
    <Fragment>
      <AppBar className={classes.appBar}>
        <Toolbar>
          <IconButton
            edge="start"
            color="inherit"
            aria-label="close"
            component={Link}
            to="/settings"
          >
            <ArrowBackIcon />
          </IconButton>
          <Typography variant="h6" className={classes.title}>
            Sign in
          </Typography>
        </Toolbar>
      </AppBar>
      <StyledFirebaseAuth
        uiConfig={firebaseUiConfig}
        firebaseAuth={firebase.auth()}
      />
    </Fragment>
  );
};

export default AuthPage;
