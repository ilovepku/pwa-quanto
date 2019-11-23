// react
import React, { useState, useContext, useEffect } from "react";

// contexts
import { HistoryContext } from "../../contexts/history/history.context";
import {
  newActivity,
  pauseActivity,
  displayNotification
} from "../../contexts/history/history.actions";

// material ui
import { makeStyles } from "@material-ui/core/styles";
import { IconButton, Typography, Box } from "@material-ui/core";
import AddIcon from "@material-ui/icons/Add";
import PauseIcon from "@material-ui/icons/Pause";
import PlayArrowIcon from "@material-ui/icons/PlayArrow";

// utils
import { duration2HHMM } from "../../utils/duration2HHMM.utils";

const useStyles = makeStyles({
  card: {
    display: "flex",
    background:
      "linear-gradient(to bottom, rgba(255,255,255,0.15) 0%, rgba(0,0,0,0.15) 100%), radial-gradient(at top center, rgba(255,255,255,0.40) 0%, rgba(0,0,0,0.40) 90%) #7a7a7a",
    backgroundBlendMode: "multiply,multiply"
  },
  content: {
    flex: "1",
    paddingLeft: "10px"
  },
  controls: {
    "& svg": {
      fill: "#f8f8fa"
    }
  },
  addIcon: {
    height: 38,
    width: 38,
    background: "linear-gradient(315deg, #cfb53b 0%, #c19a6b 74%)",
    boxShadow: "0 0 10px #afafaf",
    borderRadius: "50%"
  }
});

const CurrentActivityBar = () => {
  const classes = useStyles({});
  const { history, dispatchHistory } = useContext(HistoryContext);
  const [lastHistoryItemElapsed, setLastHistoryItemElapsed] = useState("");
  const lastHistoryItem = history[0];

  useEffect(() => {
    const updateElapsedAndDisplayNotifcation = (datetime: string) => {
      const duration = duration2HHMM(
        Math.floor(
          (new Date().valueOf() - new Date(datetime).valueOf()) / 1000 / 60
        )
      );
      setLastHistoryItemElapsed(duration);
      dispatchHistory(displayNotification(duration));
    };

    // update elpased and display notification once
    updateElapsedAndDisplayNotifcation(lastHistoryItem.datetime);
    // update elapsed and display notifcation every minute
    const intervalID = setInterval(() => {
      updateElapsedAndDisplayNotifcation(lastHistoryItem.datetime);
    }, 1000 * 60);

    return () => {
      clearInterval(intervalID);
    };
  }, [lastHistoryItem.datetime, dispatchHistory]);

  return (
    <Box className={classes.card}>
      <Box className={classes.content}>
        <Typography variant="h6">
          {`Elapsed: ${lastHistoryItemElapsed}`}
        </Typography>
        <Typography variant="subtitle1">
          {`${lastHistoryItem.activity}: ${lastHistoryItem.detail}`}
        </Typography>
      </Box>
      <Box className={classes.controls}>
        <IconButton onClick={() => dispatchHistory(newActivity())}>
          <AddIcon className={classes.addIcon} />
        </IconButton>
        <IconButton onClick={() => dispatchHistory(pauseActivity())}>
          {lastHistoryItem.activity === "Interruption" ? (
            // if current activity is interruption, show play button; else show pause button
            <PlayArrowIcon />
          ) : (
            <PauseIcon />
          )}
        </IconButton>
      </Box>
    </Box>
  );
};

export default CurrentActivityBar;
