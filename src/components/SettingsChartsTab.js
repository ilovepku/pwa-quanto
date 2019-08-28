// react
import React, { Component, Fragment } from "react";

// redux
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import {
  chartsFilterSwitch,
  chartsFilterSet,
  chartsExcludeSwitch,
  addChartsExcludeKey,
  delChartsExcludeKey,
  enqueueSnackbar
} from "../redux/actions";

// material ui
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Switch from "@material-ui/core/Switch";
import Chip from "@material-ui/core/Chip";
import TextField from "@material-ui/core/TextField";
import IconButton from "@material-ui/core/IconButton";
import { MuiThemeProvider, createMuiTheme } from "@material-ui/core/styles";
import AddIcon from "@material-ui/icons/Add";
import { MuiPickersUtilsProvider } from "material-ui-pickers";
import { DatePicker } from "material-ui-pickers";

// libs
import DateFnsUtils from "@date-io/date-fns";

const theme = createMuiTheme({
  overrides: {
    MuiSwitch: {
      iconChecked: {
        color: "#deb887"
      }
    },
    MuiIconButton: {
      colorPrimary: {
        color: "#2f4353"
      }
    }
  },
  typography: { useNextVariants: true }
});

const mapStateToProps = state => {
  return {
    settings: state.settings
  };
};
const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      chartsFilterSwitch,
      chartsFilterSet,
      chartsExcludeSwitch,
      addChartsExcludeKey,
      delChartsExcludeKey,
      enqueueSnackbar
    },
    dispatch
  );

class SettingsChartsTab extends Component {
  state = { value: null };

  handleTextFieldChange(event) {
    this.setState({ value: event.target.value });
  }

  handleSubmit(event) {
    const { settings, addChartsExcludeKey, enqueueSnackbar } = this.props;
    const { value } = this.state;
    event.preventDefault();
    if (!value) {
      enqueueSnackbar({
        message: "Keyword is empty",
        options: {
          variant: "error"
        }
      });
    } else if (settings.chartsExcludeList.includes(value)) {
      enqueueSnackbar({
        message: "Keyword already exists",
        options: {
          variant: "error"
        }
      });
    } else {
      addChartsExcludeKey(value);
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
      <Fragment>
        <Card>
          <CardContent>
            <MuiThemeProvider theme={theme}>
              <FormControlLabel
                control={
                  <Switch
                    checked={settings.chartsFilter}
                    onChange={() => {
                      if (
                        settings.chartsFilterStart > settings.chartsFilterEnd
                      ) {
                        enqueueSnackbar({
                          message: "End date earlier than start date.",
                          options: {
                            variant: "error"
                          }
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
            </MuiThemeProvider>
          </CardContent>
        </Card>

        <Card>
          <CardContent>
            <MuiThemeProvider theme={theme}>
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
              <form
                onSubmit={event => this.handleSubmit(event)}
                ref={el => (this.myFormRef = el)} // ref for manually reset form
              >
                <TextField
                  inputRef={el => (this.myTextField = el)}
                  // ref for focus
                  placeholder={"Add a new one here!"}
                  onChange={event => this.handleTextFieldChange(event)}
                />

                <IconButton type="submit" aria-label="add" color="primary">
                  <AddIcon />
                </IconButton>
              </form>
              <div>
                {settings.chartsExcludeList.length
                  ? settings.chartsExcludeList.map((item, index) => {
                      return (
                        <Chip
                          key={"chartsExcludeKey-" + index}
                          label={item}
                          onDelete={() => delChartsExcludeKey(index)}
                        />
                      );
                    })
                  : "List is currently empty."}
              </div>
            </MuiThemeProvider>
          </CardContent>
        </Card>
      </Fragment>
    );
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SettingsChartsTab);
