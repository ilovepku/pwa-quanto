import React from "react";
import { connect } from "react-redux";
import DateFnsUtils from "@date-io/date-fns";
import { MuiPickersUtilsProvider } from "material-ui-pickers";
import { DateTimePicker } from "material-ui-pickers";

import { setActivityDatetime } from "../actions";

const mapDispatchToProps = dispatch => {
  return {
    setActivityDatetime: payload => dispatch(setActivityDatetime(payload))
  };
};

function Picker({ datetime, index, setActivityDatetime }) {
  const handleDatetimeChange = datetime => {
    setActivityDatetime({
      datetime,
      index
    });
  };
  return (
    <MuiPickersUtilsProvider utils={DateFnsUtils}>
      <DateTimePicker
        value={datetime}
        onChange={handleDatetimeChange}
        label="Started"
      />
    </MuiPickersUtilsProvider>
  );
}

export default connect(
  null,
  mapDispatchToProps
)(Picker);
