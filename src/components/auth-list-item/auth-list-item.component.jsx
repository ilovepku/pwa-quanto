import React, {
  Fragment,
  forwardRef,
  useContext,
  useState,
  useEffect
} from "react";

// contexts
import { UserContext } from "../../contexts/user/user.context";
import { setCurrentUser } from "../../contexts/user/user.actions";

// material ui
import { makeStyles } from "@material-ui/core/styles";
import {
  ListItem,
  ListItemText,
  Button,
  Typography,
  IconButton,
  Toolbar,
  Dialog,
  AppBar,
  Slide,
  ListItemSecondaryAction
} from "@material-ui/core";
import CloseIcon from "@material-ui/icons/Close";

// libs
import StyledFirebaseAuth from "react-firebaseui/StyledFirebaseAuth";

// utils
import firebase from "../../utils/firebase.utils";

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

const useStyles = makeStyles(theme => ({
  appBar: {
    position: "relative"
  },
  title: {
    marginLeft: theme.spacing(2),
    flex: 1
  }
}));

const Transition = forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const AuthListItem = () => {
  const classes = useStyles();
  const {
    user: { currentUser },
    dispatchUser
  } = useContext(UserContext);
  const [open, setOpen] = useState(false);

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
              ? `Hello, ${firebase.auth().currentUser.displayName}`
              : "Hello, guest user!"
          }
          secondary={"Sign in to backup/restore data"}
        />
        <ListItemSecondaryAction>
          {currentUser ? (
            <Button edge="end" onClick={() => firebase.auth().signOut()}>
              SIGN OUT
            </Button>
          ) : (
            <Button edge="end" onClick={() => setOpen(true)}>
              SIGN IN
            </Button>
          )}
        </ListItemSecondaryAction>
      </ListItem>
      <Dialog
        fullScreen
        open={open}
        onClose={() => setOpen(false)}
        TransitionComponent={Transition}
      >
        <AppBar className={classes.appBar}>
          <Toolbar>
            <IconButton
              edge="start"
              color="inherit"
              onClick={() => setOpen(false)}
              aria-label="close"
            >
              <CloseIcon />
            </IconButton>
            <Typography variant="h6" className={classes.title}>
              Sign in
            </Typography>
            <Button color="inherit" onClick={() => setOpen(false)}>
              CANCEL
            </Button>
          </Toolbar>
        </AppBar>
        <StyledFirebaseAuth
          uiConfig={firebaseUiConfig}
          firebaseAuth={firebase.auth()}
        />
      </Dialog>
    </Fragment>
  );
};

export default AuthListItem;
