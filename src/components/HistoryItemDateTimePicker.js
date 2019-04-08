import React from "react";

import { MuiPickersUtilsProvider } from "material-ui-pickers";
import { DateTimePicker } from "material-ui-pickers";
import DateFnsUtils from "@date-io/date-fns";

import { duration2HHMM } from "../global/duration2HHMM";

function HistoryItemDateTimePicker(props) {
  const {
    datetime,
    nextItemDatetime,
    splitDatetime,
    split,
    handleDateChange,
    handleSplitDateChange
  } = props;
  return (
    <React.Fragment>
      <MuiPickersUtilsProvider utils={DateFnsUtils}>
        <DateTimePicker
          format="yyyy/MM/dd HH:mm"
          ampm={false}
          openTo="minutes"
          value={datetime}
          onChange={handleDateChange}
          label="Start"
          showTodayButton
          disabled={split ? true : false}
        />
      </MuiPickersUtilsProvider>

      {split && (
        <MuiPickersUtilsProvider utils={DateFnsUtils}>
          <DateTimePicker
            margin="dense"
            format="yyyy/MM/dd HH:mm"
            ampm={false}
            openTo="minutes"
            value={splitDatetime}
            onChange={handleSplitDateChange}
            label="Split At"
            showTodayButton
          />
        </MuiPickersUtilsProvider>
      )}

      {(nextItemDatetime || split) && (
        // show end datetime if it's not current activity or it's a split
        <MuiPickersUtilsProvider utils={DateFnsUtils}>
          <DateTimePicker
            margin="dense"
            format="yyyy/MM/dd HH:mm"
            value={nextItemDatetime ? nextItemDatetime : new Date()}
            label="End"
            onChange={handleDateChange}
            disabled
          />
        </MuiPickersUtilsProvider>
      )}

      {!split &&
        (nextItemDatetime
          ? // show duration or elapsed depending on if it's the current activity
            `Duration: ${duration2HHMM(
              Math.floor((nextItemDatetime - datetime) / 1000 / 60)
            )}`
          : `Elapsed: ${duration2HHMM(
              Math.floor((new Date() - datetime) / 1000 / 60)
            )}`)}
    </React.Fragment>
  );
}

export default HistoryItemDateTimePicker;
