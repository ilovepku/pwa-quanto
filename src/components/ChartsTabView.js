// react
import React, { Fragment, useState, useContext } from "react";
import { HistoryContext } from "../contexts/historyContext";
import { SettingsContext } from "../contexts/settingsContext";

// material ui
import { withStyles } from "@material-ui/core/styles";
import Fab from "@material-ui/core/Fab";
import SkipPreviousIcon from "@material-ui/icons/SkipPrevious";
import SkipNextIcon from "@material-ui/icons/SkipNext";

// libs
import { VictoryPie, VictoryLegend } from "victory";

// function
import { duration2HHMM } from "../global/duration2HHMM";

const styles = () => ({
  fabs: {
    position: "absolute",
    bottom: 125,
    right: 10
  }
});

const ChartsTabView = props => {
  const { history } = useContext(HistoryContext);
  const { settings, dispatch } = useContext(SettingsContext);
  const [selectedActivity, setSelectedActivity] = useState("");

  const { classes } = props;

  // check for chartsFilter switch in settings and filter the history
  const filteredHistory = settings.chartsFilter
    ? history.filter(
        item =>
          new Date(item.datetime).getTime() >= settings.chartsFilterStart &&
          new Date(item.datetime).getTime() <= settings.chartsFilterEnd
      )
    : history.slice();

  // fix for oldest activty started before settings.chartsFilterStart
  if (
    settings.chartsFilter &&
    filteredHistory.length &&
    new Date(filteredHistory[filteredHistory.length - 1].datetime).getTime() >
      settings.chartsFilterStart && // oldest filtered activity started later than chartsFilterStart
    history.indexOf(filteredHistory[filteredHistory.length - 1]) <
      history.length - 1 // oldest filtered activity is not the oldest activity in history
  ) {
    filteredHistory.push(
      Object.assign(
        {},
        history[
          history.indexOf(filteredHistory[filteredHistory.length - 1]) + 1
        ]
      ) // copy the object to prevent modifiying history at the same time
    );
    filteredHistory[filteredHistory.length - 1].datetime = new Date(
      settings.chartsFilterStart
    );
  }

  // generate history arr with duration property (calculated from started)
  let durationHistory = filteredHistory.map((item, index) => {
    let nextDatetime =
      index !== 0 ? new Date(filteredHistory[index - 1].datetime) : new Date();

    // check if nextDatetime started after settings.chartsFilterEnd
    if (
      settings.chartsFilter &&
      settings.chartsFilterEnd <= new Date(nextDatetime).getTime()
    ) {
      nextDatetime = settings.chartsFilterEnd;
    }

    return {
      activity: item.activity,
      detail: item.detail,
      duration: Math.round((nextDatetime - new Date(item.datetime)) / 1000 / 60)
    };
  });

  // check for chartsExclude switch in settings and filter the durationHistory
  if (settings.chartsExclude) {
    durationHistory = durationHistory.filter(
      item =>
        !settings.chartsExcludeList.includes(item.activity) &&
        !settings.chartsExcludeList.includes(item.detail)
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

  // add name field for VictoryLegend data
  const dataSum = data.reduce((acc, cur) => acc + cur.y, 0);
  data = data.map(item => {
    item.name = `${
      dataSum ? ((item.y / dataSum) * 100).toFixed(2) : 0
    }% ${duration2HHMM(item.y)} ${item.x}`;
    // fix for showing NaN when divided by 0
    return item;
  });

  // generate chartsFilterStart-End in MM/DD format
  const chartsFilterSpan =
    settings.chartsFilter &&
    `${new Date(settings.chartsFilterStart).getMonth() + 1}/${new Date(
      settings.chartsFilterStart
    ).getDate()}-${new Date(settings.chartsFilterEnd).getMonth() +
      1}/${new Date(settings.chartsFilterEnd).getDate()}`;

  return (
    <Fragment>
      <VictoryPie
        padAngle={3}
        innerRadius={100}
        data={data}
        labels={() => null}
        colorScale={!selectedActivity ? "qualitative" : "heatmap"}
        events={[
          {
            target: "data",
            eventHandlers: {
              onClick: () => {
                return [
                  {
                    target: "data",
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
        // add left padding of 50 if legend has less than 2 columns
        itemsPerRow={5}
        centerTitle={data.length > 12 ? false : true}
        borderPadding={{ left: data.length > 12 ? 0 : 50 }}
        gutter={0}
        title={
          !selectedActivity
            ? `Stats - All Activities ${
                chartsFilterSpan ? chartsFilterSpan : ""
              } ${duration2HHMM(dataSum)}`
            : `Stats - ${selectedActivity} ${
                chartsFilterSpan ? chartsFilterSpan : ""
              } ${duration2HHMM(dataSum)}`
        }
        colorScale={!selectedActivity ? "qualitative" : "heatmap"}
        style={{ title: { fontSize: 20 } }}
        data={data}
        events={[
          {
            target: "data",
            eventHandlers: {
              onClick: () => {
                return [
                  {
                    target: "data",
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
          },
          {
            target: "labels",
            eventHandlers: {
              onClick: () => {
                return [
                  {
                    target: "labels",
                    mutation: props => {
                      if (!selectedActivity) {
                        const nameArr = props.datum.name.split(" ");
                        setSelectedActivity(nameArr[nameArr.length - 1]);
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
      {settings.chartsFilter && (
        <div className={classes.fabs}>
          <Fab
            aria-label="Previous"
            size="small"
            onClick={dispatch({ type: "PREV_CHARTS_FILTER" })}
          >
            <SkipPreviousIcon />
          </Fab>
          {"  "}
          <Fab
            aria-label="Next"
            size="small"
            onClick={dispatch({ type: "NEXT_CHARTS_FILTER" })}
          >
            <SkipNextIcon />
          </Fab>
        </div>
      )}
    </Fragment>
  );
};

export default withStyles(styles)(ChartsTabView);

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
