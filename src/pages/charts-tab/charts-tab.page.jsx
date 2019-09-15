// react
import React, { Fragment, useState, useContext } from "react";

// contexts
import { HistoryContext } from "../../contexts/history/history.context";
import { SettingsContext } from "../../contexts/settings/settings.context";
import {
  prevChartsFilter,
  nextChartsFilter
} from "../../contexts/settings/settings.actions";

// material ui
import { makeStyles } from "@material-ui/core/styles";
import Box from "@material-ui/core/Box";
import Fab from "@material-ui/core/Fab";
import SkipPreviousIcon from "@material-ui/icons/SkipPrevious";
import SkipNextIcon from "@material-ui/icons/SkipNext";

// libs
import { VictoryPie, VictoryLegend } from "victory";

// utils
import { duration2HHMM } from "../../utils/duration2HHMM.utils";

const useStyles = makeStyles({
  fabs: {
    position: "absolute",
    top: 10,
    right: 10,
    "& button": {
      marginLeft: 10
    }
  }
});

const ChartsTab = () => {
  const classes = useStyles();
  const { history } = useContext(HistoryContext);
  const { settings, dispatchSettings } = useContext(SettingsContext);
  const [selectedActivity, setSelectedActivity] = useState("");

  // generate chartsDateFilterStart-End in MM/DD format for legend title
  const chartsDateFilterSpan =
    settings.chartsDateFilter &&
    `${new Date(settings.chartsDateFilterStart).getMonth() + 1}/${new Date(
      settings.chartsDateFilterStart
    ).getDate()}-${new Date(settings.chartsDateFilterEnd).getMonth() +
      1}/${new Date(settings.chartsDateFilterEnd).getDate()}`;

  // check for chartsDateFilter switch in settings and filter the history
  const filteredHistory = settings.chartsDateFilter
    ? history.filter(
        item =>
          new Date(item.datetime) - new Date(settings.chartsDateFilterStart) >=
            0 &&
          new Date(item.datetime) - new Date(settings.chartsDateFilterEnd) <= 0
      )
    : [...history];

  // fix for first filtered activty started before settings.chartsDateFilterStart
  if (
    settings.chartsDateFilter &&
    filteredHistory.length &&
    new Date(filteredHistory[filteredHistory.length - 1].datetime) -
      new Date(settings.chartsDateFilterStart) >
      0 // check if first filtered activity started later than chartsDateFilterStart
  ) {
    const firstFilteredHistoryActivityIdxInHistory = history.indexOf(
      filteredHistory[filteredHistory.length - 1]
    );
    if (firstFilteredHistoryActivityIdxInHistory < history.length - 1) {
      // making sure first filtered activity is not first activity in history
      filteredHistory.push({
        ...history[firstFilteredHistoryActivityIdxInHistory + 1] // copy object to prevent next operation from changing the original
      }); // add the previous activity to the filtered array
      filteredHistory[filteredHistory.length - 1].datetime = new Date(
        settings.chartsDateFilterStart
      ); // and make it start at chartsDateFilterStart
    }
  }

  // generate history arr with duration property (calculated from started)
  let durationHistory = filteredHistory.map((item, idx) => {
    let nextDatetime =
      idx !== 0 ? new Date(filteredHistory[idx - 1].datetime) : new Date();

    // fix for last filterd activity ending after chartsDateFilterEnd
    // check if nextDatetime started after settings.chartsDateFilterEnd
    if (
      settings.chartsDateFilter &&
      new Date(settings.chartsDateFilterEnd) - new Date(nextDatetime) <= 0
    ) {
      nextDatetime = new Date(settings.chartsDateFilterEnd);
    }

    return {
      activity: item.activity,
      detail: item.detail,
      duration: Math.round((nextDatetime - new Date(item.datetime)) / 1000 / 60)
    };
  });

  // check for chartsExclude switch in settings and filter the durationHistory
  if (settings.chartsKeyExclude) {
    durationHistory = durationHistory.filter(
      item =>
        !settings.chartsExcludeKeysList.includes(item.activity) &&
        !settings.chartsExcludeKeysList.includes(item.detail)
    );
  }

  // data switch between activity and detail (generated for VictoryPie with a custom function)
  let data = !selectedActivity
    ? groupBy(durationHistory, "activity")
    : groupBy(
        durationHistory.filter(item => item.activity === selectedActivity),
        "detail"
      );

  // sort data descendingly by duration
  data.sort((a, b) => {
    return b.y - a.y;
  });

  // add name field for VictoryLegend data, format: "percentage% duration name"
  const dataSum = data.reduce((acc, cur) => acc + cur.y, 0);
  data = data.map(item => {
    item.name = `${
      dataSum ? ((item.y / dataSum) * 100).toFixed(2) : 0
    }% ${duration2HHMM(item.y)} ${item.x}`;
    // fix for showing NaN when divided by 0
    return item;
  });

  return (
    <Fragment>
      <VictoryPie
        data={data}
        padAngle={1} // separation between adjacent slices in number of degrees
        innerRadius={75} // distance between chart center and donut chart's inner edge in number of pixels
        labels={() => null} // no labels
        colorScale={!selectedActivity ? "qualitative" : "heatmap"}
        events={[
          {
            target: "data",
            eventHandlers: {
              onClick: () => {
                return [
                  {
                    mutation: props => {
                      if (!selectedActivity) {
                        setSelectedActivity(props.datum.x);
                      } else {
                        setSelectedActivity("");
                      }
                    }
                  }
                ];
              }
            }
          }
        ]}
      />

      <VictoryLegend
        data={data}
        orientation={"horizontal"}
        itemsPerRow={3}
        gutter={0} // number of pixels between legend columns
        title={
          !selectedActivity
            ? `Stats - All Activities ${
                chartsDateFilterSpan ? chartsDateFilterSpan : ""
              } ${duration2HHMM(dataSum)}`
            : `Stats - ${selectedActivity} ${
                chartsDateFilterSpan ? chartsDateFilterSpan : ""
              } ${duration2HHMM(dataSum)}`
        }
        style={{ title: { fontSize: 20 } }}
        colorScale={!selectedActivity ? "qualitative" : "heatmap"}
        events={[
          {
            target: "labels",
            eventHandlers: {
              onClick: () => {
                return [
                  {
                    mutation: props => {
                      if (!selectedActivity) {
                        setSelectedActivity(props.datum.x);
                      } else {
                        setSelectedActivity("");
                      }
                    }
                  }
                ];
              }
            }
          }
        ]}
      />

      {/* prev/next filter switches */}
      <Box className={classes.fabs}>
        <Fab
          disabled={!settings.chartsDateFilter}
          size="small"
          onClick={() => dispatchSettings(prevChartsFilter())}
        >
          <SkipPreviousIcon />
        </Fab>
        <Fab
          disabled={!settings.chartsDateFilter}
          size="small"
          onClick={() => dispatchSettings(nextChartsFilter())}
        >
          <SkipNextIcon />
        </Fab>
      </Box>
    </Fragment>
  );
};

export default ChartsTab;

// custom function to generate data arrs for VictoryPie
function groupBy(objectArray, property) {
  const resultArray = [];
  objectArray.forEach(item => {
    var index = resultArray.findIndex(obj => obj.x === item[property]);
    if (index === -1) {
      resultArray.push({ x: item[property], y: item.duration });
    } else {
      resultArray[index].y += item.duration;
    }
  });
  return resultArray;
}
