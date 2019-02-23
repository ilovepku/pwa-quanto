import React, { Component } from "react";
import { connect } from "react-redux";
import FloatingActionButtons from "./components/FloatingActionButtons";
// import CurrentActivity from "./components/CurrentActivity";
import History from "./components/History";

import { updateState } from "./actions";
import CacheManager from "./cache";

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

class App extends Component {
  componentWillMount = () => {
    cache.readData("state").then(oldState => {
      if (!oldState) {
        cache.writeData("state", this.props.state);
      }
      this.props.updateState(oldState);
    });
  };

  render() {
    return (
      <div>
        {/* <CurrentActivity /> */}
        <FloatingActionButtons />
        <History />
      </div>
    );
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App);
