import React, { Component } from "react";
import DetailedExpansionPanel from "./DetailedExpansionPanel";
import BottomAppBar from "./BottomAppBar";

class HistoryView extends Component {
  render() {
    return (
      <div>
        <DetailedExpansionPanel />
        <BottomAppBar />
      </div>
    );
  }
}

export default HistoryView;
