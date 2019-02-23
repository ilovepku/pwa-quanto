import React from "react";
import { connect } from "react-redux";
import Picker from "./Picker";
import Select from "./Select";

const mapStateToProps = state => {
  return {    
    history: state.history
  };
};

function ActivityDetails({ history, index }) {
  const { datetime, activity, detail } = history[index];
  return (
    <div>
      <Picker datetime={datetime} index={index} /> 
      {/* <p>Elapsed: X hrs X mins</p> */}
      <Select activity={activity} detail={detail} index={index} />
    </div>
  );
}

export default connect(mapStateToProps)(ActivityDetails);
