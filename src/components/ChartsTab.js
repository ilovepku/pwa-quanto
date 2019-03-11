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
    selectedActivity: this.props.history[0].activity
  };
  render() {
    const { history } = this.props;
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
    const chartData = groupBy(durationHistory, "activity");
    const dataSum = chartData.reduce((acc, cur) => acc + cur.y, 0);
    const legendData = chartData.map(item => ({
      name: `${item.x} ${Math.floor(item.y / 60)}:${("0" + (item.y % 60)).slice(
        -2
      )} ${((item.y / dataSum) * 100).toFixed(2)}%`
    }));
    const data2 = groupBy(
      durationHistory.filter(
        item => item.activity === this.state.selectedActivity
      ),
      "detail"
    );
    return (
      <div>
        <VictoryPie
          data={chartData}
          colorScale={"qualitative"}
          events={[
            {
              target: "data",
              eventHandlers: {
                onClick: () => {
                  return [
                    {
                      target: "data",
                      mutation: props => {
                        this.setState({ selectedActivity: props.datum.x });
                      }
                    }
                  ];
                }
              }
            }
          ]}
        />
        {/* <VictoryPie
          data={data2}
          height={300}
          padding={{ left: 0, top: 10, right: 0, bottom: 0 }}
          colorScale={"heatmap"}
          labelRadius={45}
          labels={d =>
            `${d.x} ${Math.floor(d.y / 60)}:${("0" + (d.y % 60)).slice(-2)}`
          }
          style={{ labels: { fill: "white", fontSize: 16 } }}
        /> */}
        <VictoryLegend
          itemsPerRow={5}
          title="All Activities"
          centerTitle
          colorScale={"qualitative"}
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
