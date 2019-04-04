import React from "react";

import { connect } from "react-redux";

import { VictoryPie, VictoryLegend } from "victory";

import { duration2HHMM } from "../global/duration2HHMM";

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
    const durationHistory = history.map(function(item, index) {
      const nextDatetime =
        index !== history.length - 1 ? new Date(history[index + 1].datetime) : new Date();
      return {
        activity: item.activity,
        detail: item.detail,
        duration: Math.ceil((nextDatetime - new Date(item.datetime)) / 1000 / 60)
        // Math.ceil to prevent no chart on first load
      };
    });

    // generate data arrs for VictoryPie with custom function
    const activityData = groupBy(durationHistory, "activity");
    const detailData = groupBy(
      durationHistory.filter(item => item.activity === selectedActivity),
      "detail"
    );

    // data switch between activity and detail
    let data = !selectedActivity ? activityData : detailData;

    // sort data descendingly by duration
    data.sort((a, b) => {
      return b.y - a.y;
    });

    // add name field for VictoryLegend data
    const dataSum = data.reduce((acc, cur) => acc + cur.y, 0);
    data = data.map(item => {
      item.name = `${((item.y / dataSum) * 100).toFixed(2)}% ${duration2HHMM(
        item.y
      )} ${item.x}`;
      return item;
    });

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
          // add left padding of 50 if legend has less than 2 columns
          itemsPerRow={5}
          centerTitle={data.length > 10 ? false : true}
          borderPadding={{ left: data.length > 10 ? 0 : 50 }}
          gutter={0}
          title={
            !selectedActivity
              ? `Stats - All Activities ${duration2HHMM(dataSum)}`
              : `Stats - ${selectedActivity} ${duration2HHMM(dataSum)}`
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
                          this.setState({
                            selectedActivity: props.datum.x
                          });
                        } else {
                          this.setState({ selectedActivity: "" });
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
                          this.setState({
                            selectedActivity: nameArr[nameArr.length - 1]
                          });
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
