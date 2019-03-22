import React, { Component } from "react";
import { connect } from "react-redux";
import { VictoryPie, VictoryLegend } from "victory";

const mapStateToProps = state => {
  return {
    history: state.history
  };
};

class ChartsTab extends Component {
  state = {
    selectedActivity: ""
  };
  render() {
    const { history } = this.props;
    const { selectedActivity } = this.state;
    const durationHistory = history.length
      ? history.map(function(item, index) {
          const nextDatetime =
            index !== history.length - 1
              ? history[index + 1].datetime
              : new Date();
          return {
            activity: item.activity,
            detail: item.detail,
            duration: Math.round((nextDatetime - item.datetime) / 1000 / 60)
          };
        })
      : null;

    const activityData = groupBy(durationHistory, "activity");

    const detailData = groupBy(
      durationHistory.filter(item => item.activity === selectedActivity),
      "detail"
    );
    // data switch between activity and detail
    const data = !selectedActivity ? activityData : detailData;
    // data for legend
    const dataSum = data.reduce((acc, cur) => acc + cur.y, 0);
    const legendData = data.map(item => ({
      name: `${((item.y / dataSum) * 100).toFixed(2)}% ${date2HHMM(item.y)} ${
        item.x
      }`
    }));
    return (
      <div>
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
          height={150}
          itemsPerRow={4}
          title={
            !selectedActivity
              ? `Stats - All Activities ${date2HHMM(dataSum)}`
              : `Stats - ${selectedActivity} ${date2HHMM(dataSum)}`
          }
          colorScale={!selectedActivity ? "qualitative" : "heatmap"}
          style={{ title: { fontSize: 20 } }}
          data={legendData}
        />
      </div>
    );
  }
}

export default connect(mapStateToProps)(ChartsTab);

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

function date2HHMM(date) {
  return Math.floor(date / 60) + ":" + ("0" + (date % 60)).slice(-2);
}
