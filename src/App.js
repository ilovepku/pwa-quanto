import React from "react";

import { connect } from "react-redux";
import { updateState, addToHistory } from "./redux/actions";

import SwipeableTabViews from "./components/SwipeableTabViews";

/* import CacheManager from "./global/cache";
const cache = new CacheManager(); */

const mapStateToProps = state => {
  return {
    state
  };
};

const mapDispatchToProps = dispatch => {
  return {
    updateState: value => dispatch(updateState(value)),
    addToHistory: () => dispatch(addToHistory())
  };
};

class App extends React.Component {
  /* componentWillMount = () => {
    cache.readData("state").then(savedState => {
      if (!savedState) {
        this.props.addToHistory();
        cache.writeData("state", this.props.state);
        return;
      }
      this.props.updateState(savedState);
    });
  }; */

  render() {
    return <SwipeableTabViews />;
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App);
