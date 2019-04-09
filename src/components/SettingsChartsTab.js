import React, { Component } from "react";

import { connect } from "react-redux";
import { chartsFilterSwitch, chartsFilterSet } from "../redux/actions";

import FormControlLabel from "@material-ui/core/FormControlLabel";
import Switch from "@material-ui/core/Switch";

import { MuiPickersUtilsProvider } from "material-ui-pickers";
import { DatePicker } from "material-ui-pickers";
import DateFnsUtils from "@date-io/date-fns";

import { withSnackbar } from "notistack";

const mapStateToProps = state => {
  return {
    settings: state.settings
  };
};
const mapDispatchToProps = dispatch => {
  return {
    chartsFilterSwitch: () => dispatch(chartsFilterSwitch()),
    chartsFilterSet: payload => dispatch(chartsFilterSet(payload))
  };
};

class SettingsChartsTab extends Component {
  render() {
    const {
      chartsFilterSwitch,
      chartsFilterSet,
      settings,
      enqueueSnackbar
    } = this.props;
    return (
      <React.Fragment>
        <FormControlLabel
          control={
            <Switch
              checked={settings.chartsFilter}
              onChange={() => {
                if (settings.chartsStart > settings.chartsEnd) {
                  enqueueSnackbar("End date earlier than start date.", {
                    variant: "error"
                  });
                } else {
                  chartsFilterSwitch();
                }
              }}
              value="chartsFilterSwitch"
              color="primary"
            />
          }
          label="Only include activities from"
        />
        <MuiPickersUtilsProvider utils={DateFnsUtils}>
          <DatePicker
            openTo="day"
            label="Start"
            format="yyyy/MM/dd"
            value={new Date(settings.chartsStart)}
            onChange={date =>
              chartsFilterSet({
                type: "chartsStart",
                date: date.setHours(0, 0, 0, 0)
              })
            }
            showTodayButton
          />
          <DatePicker
            margin="dense"
            openTo="day"
            label="End"
            format="yyyy/MM/dd"
            value={new Date(settings.chartsEnd)}
            onChange={date =>
              chartsFilterSet({
                type: "chartsEnd",
                date: date.setHours(23, 59, 59, 999)
              })
            }
            showTodayButton
          />
        </MuiPickersUtilsProvider>
      </React.Fragment>
    );
  }
}

export default withSnackbar(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(SettingsChartsTab)
);
