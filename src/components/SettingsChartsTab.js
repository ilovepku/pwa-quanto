import React, { Component } from "react";

import { connect } from "react-redux";
import {
  chartsFilterSwitch,
  chartsFilterSet,
  chartsExcludeSwitch,
  addChartsExcludeKey,
  delChartsExcludeKey
} from "../redux/actions";

import FormControlLabel from "@material-ui/core/FormControlLabel";
import Switch from "@material-ui/core/Switch";
import Chip from "@material-ui/core/Chip";
import TextField from "@material-ui/core/TextField";
import IconButton from "@material-ui/core/IconButton";

import CreateIcon from "@material-ui/icons/Create";

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
    chartsFilterSet: payload => dispatch(chartsFilterSet(payload)),
    chartsExcludeSwitch: () => dispatch(chartsExcludeSwitch()),
    addChartsExcludeKey: payload => dispatch(addChartsExcludeKey(payload)),
    delChartsExcludeKey: payload => dispatch(delChartsExcludeKey(payload))
  };
};

class SettingsChartsTab extends Component {
  state = { value: null };

  handleChange(event) {
    this.setState({ value: event.target.value });
  }

  handleSubmit(event) {
    event.preventDefault();
    if (!this.state.value) {
      this.props.enqueueSnackbar("Keyword is empty", {
        variant: "error"
      });
    } else if (
      this.props.settings.chartsExcludeList.includes(this.state.value)
    ) {
      this.props.enqueueSnackbar("Keyword already exists", {
        variant: "error"
      });
    } else {
      this.props.addChartsExcludeKey(this.state.value);
      this.myFormRef.reset(); // manually reset form
    }
  }

  render() {
    const {
      settings,
      chartsFilterSwitch,
      chartsFilterSet,
      chartsExcludeSwitch,
      delChartsExcludeKey,
      enqueueSnackbar
    } = this.props;
    return (
      <React.Fragment>
        <FormControlLabel
          control={
            <Switch
              checked={settings.chartsFilter}
              onChange={() => {
                if (settings.chartsFilterStart > settings.chartsFilterEnd) {
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
            value={new Date(settings.chartsFilterStart)}
            onChange={date =>
              chartsFilterSet({
                type: "chartsFilterStart",
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
            value={new Date(settings.chartsFilterEnd)}
            onChange={date =>
              chartsFilterSet({
                type: "chartsFilterEnd",
                date: date.setHours(23, 59, 59, 999)
              })
            }
            showTodayButton
          />
        </MuiPickersUtilsProvider>
        <FormControlLabel
          control={
            <Switch
              checked={settings.chartsExclude}
              onChange={chartsExcludeSwitch}
              value="chartsExcludeSwitch"
              color="primary"
            />
          }
          label="Excluded listed from charts"
        />
        <div>
          {settings.chartsExcludeList.map((item, index) => {
            return (
              <Chip
                key={"chartsExcludeKey-" + index}
                label={item}
                onDelete={() => delChartsExcludeKey(index)}
              />
            );
          })}
        </div>
        <form
          onSubmit={event => this.handleSubmit(event)}
          ref={el => (this.myFormRef = el)} // ref for manually reset form
        >
          <TextField
            inputRef={el => (this.myTextField = el)}
            // ref for focus
            placeholder={"Add a new one here!"}
            onChange={event => this.handleChange(event)}
            variant="outlined"
          />

          <IconButton type="submit" aria-label="add">
            <CreateIcon />
          </IconButton>
        </form>
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
