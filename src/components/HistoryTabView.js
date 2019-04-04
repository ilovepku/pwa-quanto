import React from "react";

import { connect } from "react-redux";

import HistoryItemExpansionPanel from "./HistoryItemExpansionPanel";

const mapStateToProps = state => {
  return {
    history: state.history
  };
};

function HistoryTabView(props) {
  const { history } = props;
  const panels = history
    .map((item, index) => (
      <HistoryItemExpansionPanel
        key={"history-" + index}
        index={index}
        item={item}
        lastItemDatetime={
          history[index - 1] ? new Date(history[index - 1].datetime) : null
        }
        nextItemDatetime={
          history[index + 1] ? new Date(history[index + 1].datetime) : null
        }
      />
    ))
    .slice()
    .reverse();
  return <React.Fragment>{panels}</React.Fragment>;
}

export default connect(mapStateToProps)(HistoryTabView);
