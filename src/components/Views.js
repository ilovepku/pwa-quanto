import React, { Component } from "react";
import DetailedExpansionPanel from "./DetailedExpansionPanel";
import BottomAppBar from "./BottomAppBar";

class Views extends Component {
  render() {
    return (
      <div>
        <DetailedExpansionPanel />
        <BottomAppBar />
      </div>
    );
  }
}

export default Views;
