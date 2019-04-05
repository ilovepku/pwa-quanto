import React from "react";

import { connect } from "react-redux";
import { updateState, addToHistory } from "./redux/actions";

import TabViews from "./components/TabViews";

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
  render() {
    return <TabViews />;
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App);
