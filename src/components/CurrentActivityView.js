import React, { Component } from "react";
import BottomAppBar from "./BottomAppBar";
import CurrentActivityCard from "./CurrentActivityCard";

class CurrentActivityView extends Component {
  render() {
    return (
      <div>
        <CurrentActivityCard />
        <BottomAppBar />
      </div>
    );
  }
}

export default CurrentActivityView;
