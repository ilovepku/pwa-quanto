import React from "react";

import { MuiPickersUtilsProvider } from "material-ui-pickers";
import { DatePicker, TimePicker } from "material-ui-pickers";
import DateFnsUtils from "@date-io/date-fns";

function HistoryItemDateTimePicker(props) {
  const { datetime, handleDateChange } = props;

  return (
    <div>
      <MuiPickersUtilsProvider utils={DateFnsUtils}>
        <DatePicker
          label="Started Date"
          value={datetime}
          format="yyyy/MM/dd"
          views={["year", "month", "day"]}
          onChange={handleDateChange}
        />
      </MuiPickersUtilsProvider>

      <MuiPickersUtilsProvider utils={DateFnsUtils}>
        <TimePicker
          margin="dense"
          ampm={false}
          label="Started Time"
          value={datetime}
          onChange={handleDateChange}
        />
      </MuiPickersUtilsProvider>
    </div>
  );
}

export default HistoryItemDateTimePicker;
