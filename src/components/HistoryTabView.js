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
  const panels = history.length
    ? history.map((item, index) => (
        <HistoryItemExpansionPanel
          key={"history-" + index}
          index={index}
          item={item}
        />
      ))
    : null;
  return <div>{panels.slice().reverse()}</div>;
}

export default connect(mapStateToProps)(HistoryTabView);
