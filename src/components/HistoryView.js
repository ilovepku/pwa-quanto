import React, { Component } from "react";
import { connect } from "react-redux";
import HistoryPanels from "./HistoryPanels";
import BottomAppBar from "./BottomAppBar";

import { updateState } from "../actions";
import CacheManager from "../cache";

const cache = new CacheManager();

const mapStateToProps = state => {
  return {
    state
  };
};

const mapDispatchToProps = dispatch => {
  return {
    updateState: value => dispatch(updateState(value))
  };
};

class HistoryView extends Component {
  componentWillMount = () => {
    cache.readData("state").then(oldState => {
      if (!oldState.history) {
        cache.writeData("state", {
          ...this.props.state,
          history: [
            { datetime: new Date(), activity: "Work", detail: "Reading" }
          ]
        });
        return;
      }
      this.props.updateState(oldState);
    });
  };

  render() {
    return (
      <div>
        <HistoryPanels />
        <BottomAppBar />
      </div>
    );
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(HistoryView);
