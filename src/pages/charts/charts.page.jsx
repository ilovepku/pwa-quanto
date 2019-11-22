// react
import React, { Fragment, useState, useContext } from "react";

// contexts
import { HistoryContext } from "../../contexts/history/history.context";
import { SettingsContext } from "../../contexts/settings/settings.context";
import {
  prevChartsFilterDate,
  nextChartsFilterDate
} from "../../contexts/settings/settings.actions";

// material ui
import { makeStyles } from "@material-ui/core/styles";
import { Box, Fab } from "@material-ui/core";
import SkipPreviousIcon from "@material-ui/icons/SkipPrevious";
import SkipNextIcon from "@material-ui/icons/SkipNext";

// libs
import { VictoryPie, VictoryLegend } from "victory";

// utils
import { duration2HHMM } from "../../utils/duration2HHMM.utils";

const useStyles = makeStyles({
  fabs: {
    position: "fixed",
    "& button": {
      margin: 5
    }
  }
});

const ChartsPage = () => {
  const classes = useStyles();
  const { history } = useContext(HistoryContext);
  const { settings, dispatchSettings } = useContext(SettingsContext);
  const [selectedActivity, setSelectedActivity] = useState("");

  // generate chartsFilterDateStart-End in MM/DD format for legend title
  const chartsDateFilterSpan =
    settings.chartsDateFilter &&
    `${new Date(settings.chartsFilterDateStart).getMonth() + 1}/${new Date(
      settings.chartsFilterDateStart
    ).getDate()}-${new Date(settings.chartsFilterDateEnd).getMonth() +
      1}/${new Date(settings.chartsFilterDateEnd).getDate()}`;

  // check for chartsDateFilter switch in settings and filter the history
  const filteredHistory = settings.chartsDateFilter
    ? history.filter(
        item =>
          new Date(item.datetime) - new Date(settings.chartsFilterDateStart) >=
            0 &&
          new Date(item.datetime) - new Date(settings.chartsFilterDateEnd) <= 0
      )
    : [...history];

  // fix for first filtered activty started before settings.chartsFilterDateStart
  if (
    settings.chartsDateFilter &&
    filteredHistory.length &&
    new Date(filteredHistory[filteredHistory.length - 1].datetime) -
      new Date(settings.chartsFilterDateStart) >
      0 // check if first filtered activity started later than chartsFilterDateStart
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
        settings.chartsFilterDateStart
      ); // and make it start at chartsFilterDateStart
    }
  }

  // generate history arr with duration property (calculated from started)
  let durationHistory = filteredHistory.map((item, idx) => {
    let nextDatetime =
      idx !== 0 ? new Date(filteredHistory[idx - 1].datetime) : new Date();

    // fix for last filterd activity ending after chartsFilterDateEnd
    // check if nextDatetime started after settings.chartsFilterDateEnd
    if (
      settings.chartsDateFilter &&
      new Date(settings.chartsFilterDateEnd) - new Date(nextDatetime) <= 0
    ) {
      nextDatetime = new Date(settings.chartsFilterDateEnd);
    }

    return {
      activity: item.activity,
      detail: item.detail,
      duration: Math.round((nextDatetime - new Date(item.datetime)) / 1000 / 60)
    };
  });

  // check for chartsExclude switch in settings and filter the durationHistory
  if (settings.chartsKeyFilter) {
    durationHistory = durationHistory.filter(
      item =>
        !settings.chartsFilterKeyList.includes(item.activity) &&
        !settings.chartsFilterKeyList.includes(item.detail)
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
      {/* prev/next filter switches */}
      {settings.chartsDateFilter && (
        <Box className={classes.fabs}>
          <Fab
            size="small"
            onClick={() => dispatchSettings(prevChartsFilterDate())}
          >
            <SkipPreviousIcon />
          </Fab>
          <Fab
            size="small"
            onClick={() => dispatchSettings(nextChartsFilterDate())}
          >
            <SkipNextIcon />
          </Fab>
        </Box>
      )}
      <svg viewBox="0 0 400 800">
        <VictoryPie
          standalone={false}
          animate={{
            duration: 100
          }}
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
        <g transform={"translate(25, 400)"}>
          <VictoryLegend
            standalone={false}
            data={data}
            orientation={"horizontal"}
            itemsPerRow={2}
            // gutter={0} // number of pixels between legend columns
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
        </g>
      </svg>
    </Fragment>
  );
};

export default ChartsPage;

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
