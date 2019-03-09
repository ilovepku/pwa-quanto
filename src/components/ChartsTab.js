import React from "react";
import { connect } from "react-redux";
import { VictoryPie } from "victory";

const mapStateToProps = state => {
  return {
    history: state.history
  };
};

function ChartsTab(props) {
  const { history } = props;
  const durationHistory = history.length
    ? history.map(function(item, index) {
        const nextDatetime =
          index !== history.length - 1
            ? history[index + 1].datetime
            : new Date();
        return {
          activity: item.activity,
          detail: item.detail,
          duration: nextDatetime - item.datetime
        };
      })
    : null;
  let data = [];
  durationHistory.forEach(item => {
    var index = data.findIndex(obj => obj.x === item.activity);
    if (index === -1) {
      data.push({ x: item.activity, y: item.duration });
    } else {
      data[index].y += item.duration;
    }
  });
  return <VictoryPie data={data} />;
}

export default connect(mapStateToProps)(ChartsTab);
