import React from "react";

import { connect } from "react-redux";
import { updateState } from "./redux/actions";

import CacheManager from "./global/cache";

import SwipeableTabViews from "./components/SwipeableTabViews";

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

class App extends React.Component {
  // Todo: logic change, async probably?
  componentWillMount = () => {
    cache.readData("state").then(savedState => {
      if (!savedState) {
        cache.writeData("state", this.props.state);
        return;
      }
      this.props.updateState(savedState);
    });
  };

  render() {
    return <SwipeableTabViews />;
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App);
