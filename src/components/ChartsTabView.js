import React from "react";

import { connect } from "react-redux";

import { VictoryPie, VictoryLegend } from "victory";

const mapStateToProps = state => {
  return {
    history: state.history
  };
};

class ChartsTabView extends React.Component {
  state = {
    selectedActivity: ""
  };
  render() {
    const { history } = this.props;
    const { selectedActivity } = this.state;

    // generate history arr with duration property (calculated from started)
    const durationHistory = history.length
      ? history.map(function(item, index) {
          const nextDatetime =
            index !== history.length - 1
              ? history[index + 1].datetime
              : new Date();
          return {
            activity: item.activity,
            detail: item.detail,
            duration: Math.ceil((nextDatetime - item.datetime) / 1000 / 60)
            // Math.ceil to prevent no chart on first load
          };
        })
      : [{ activity: "Loading", detail: "Loading", duration: 1 }]; // placeholder while loading

    // generate data arrs for VictoryPie with custom function
    const activityData = groupBy(durationHistory, "activity");
    const detailData = groupBy(
      durationHistory.filter(item => item.activity === selectedActivity),
      "detail"
    );

    // data switch between activity and detail
    const data = !selectedActivity ? activityData : detailData;

    // generate data for VictoryLegend
    const dataSum = data.reduce((acc, cur) => acc + cur.y, 0);
    const legendData = data.map(item => ({
      name: `${((item.y / dataSum) * 100).toFixed(2)}% ${duration2HHMM(
        item.y
      )} ${item.x}`
    }));

    return (
      <React.Fragment>
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
                          this.setState({ selectedActivity: props.datum.x });
                        } else {
                          this.setState({ selectedActivity: "" });
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
          height={200}
          itemsPerRow={5}
          gutter={0}
          title={
            !selectedActivity
              ? `Stats - All Activities ${duration2HHMM(dataSum)}`
              : `Stats - ${selectedActivity} ${duration2HHMM(dataSum)}`
          }
          colorScale={!selectedActivity ? "qualitative" : "heatmap"}
          style={{ title: { fontSize: 20 } }}
          data={legendData}
        />
      </React.Fragment>
    );
  }
}

export default connect(mapStateToProps)(ChartsTabView);

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

// custom fuction to convert duration time (in minutes) to HHMM format
function duration2HHMM(date) {
  return Math.floor(date / 60) + ":" + ("0" + (date % 60)).slice(-2);
}
