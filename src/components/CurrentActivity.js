import React from "react";
import { connect } from "react-redux";
import Picker from "./Picker";
import SelectActivity from "./SelectActivity";
import SelectDetail from "./SelectDetail";
import FloatingActionButtons from "./FloatingActionButtons";

const mapStateToProps = state => {
  return {
    activityNameList: state.setHistoryReducer.activityNameList,
    history: state.setHistoryReducer.history
  };
};

function CurrentActivity({ activityNameList, history }) {
  const index = history.length - 1;
  const { datetime, activity, detail } = history[index];
  return <Picker datetime={datetime} index={index} />;
}

export default connect(mapStateToProps)(CurrentActivity);
