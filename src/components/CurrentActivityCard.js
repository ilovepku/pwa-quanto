// react
import React, { useState, useContext, useEffect } from "react";
import { HistoryContext } from "../contexts/historyContext";

// material ui
import {
  withStyles,
  MuiThemeProvider,
  createMuiTheme
} from "@material-ui/core/styles";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import AddIcon from "@material-ui/icons/Add";
import PauseIcon from "@material-ui/icons/Pause";
import PlayArrowIcon from "@material-ui/icons/PlayArrow";

// functions
import { duration2HHMM } from "../global/duration2HHMM";

const theme = createMuiTheme({
  overrides: {
    MuiSvgIcon: {
      root: {
        fill: "#f8f8fa"
      },
      colorSecondary: {
        fill: "#BB4D4C"
      }
    }
  },
  typography: {
    useNextVariants: true
  }
});

const styles = () => ({
  card: {
    display: "flex"
  },
  content: {
    flex: "1 0 auto",
    padding: "0px 10px 0px 10px"
  },
  controls: {
    display: "flex"
  },
  addIcon: {
    height: 38,
    width: 38,
    background: "linear-gradient(315deg, #CFB53B 0%, #C19A6B 74%)",
    borderRadius: "50%",
    boxShadow: "0 0 10px #AFAFAF"
  }
});

const CurrentActivityCard = props => {
  const [lastHistoryItemElapsed, setLastHistoryItemElapsed] = useState(0);
  const { history, dispatch } = useContext(HistoryContext);
  useEffect(() => {
    function updateElapsedAndDisplayNotifcation(datetime) {
      setLastHistoryItemElapsed(
        duration2HHMM(Math.floor((new Date() - new Date(datetime)) / 1000 / 60))
      );
      dispatch({ type: "DISPLAY_NOTIFICATION" });
    }
    function loopingUpdateElapsedAndDisplayNotifcation(datetime) {
      // update toolbar elpased and display notification once
      updateElapsedAndDisplayNotifcation(datetime);
      // clearInterval and set new Interval to update toolbar elapsed and display notifcation every minute
      clearInterval(intervalID);
      intervalID = setInterval(() => {
        updateElapsedAndDisplayNotifcation(datetime);
      }, 1000 * 60);
    }
    let intervalID;
    loopingUpdateElapsedAndDisplayNotifcation(
      history[0].datetime // last history item start datetime
    );
    return () => {
      clearInterval(intervalID);
    };
  }, [history, dispatch]); // "history" to run effect on history change, "dispatch" to supress missing dependency warning
  const { classes } = props;
  const lastHistoryItem = history[0];
  return (
    <MuiThemeProvider theme={theme}>
      <div className={classes.card}>
        <div className={classes.content}>
          <Typography variant="h6" color="inherit">
            {`Elapsed: ${lastHistoryItemElapsed}`}
          </Typography>
          <Typography variant="subtitle1" color="inherit">
            {`${lastHistoryItem.activity}: ${lastHistoryItem.detail}`}
          </Typography>
        </div>
        <div className={classes.controls}>
          <IconButton
            aria-label="Add"
            onClick={() => dispatch({ type: "ADD_ACTIVITY" })}
          >
            <AddIcon className={classes.addIcon} />
          </IconButton>
          <IconButton
            aria-label="Interrupt"
            onClick={() => dispatch({ type: "INTERRUPT_ACTIVITY" })}
          >
            {lastHistoryItem.activity === "Interruption" ? (
              // if current activity is interruption, show play button; else show pause button
              <PlayArrowIcon color="secondary" />
            ) : (
              <PauseIcon />
            )}
          </IconButton>
        </div>
      </div>
    </MuiThemeProvider>
  );
};

export default withStyles(styles)(CurrentActivityCard);
