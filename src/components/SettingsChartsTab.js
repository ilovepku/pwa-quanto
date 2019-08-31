// react
import React, { Fragment, useContext, useState, useRef } from "react";
import { SettingsContext } from "../contexts/settingsContext";

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
import { MuiPickersUtilsProvider } from "@material-ui/pickers";
import { DatePicker } from "@material-ui/pickers";

// libs
import DateFnsUtils from "@date-io/date-fns";
import { useSnackbar } from "notistack";

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

const SettingsChartsTab = props => {
  const [value, setValue] = useState(null);
  const { settings, dispatch } = useContext(SettingsContext);
  const formRef = useRef(null);
  const { enqueueSnackbar } = useSnackbar();

  const handleSubmit = e => {
    e.preventDefault();
    if (!value) {
      enqueueSnackbar("Keyword is empty.", {
        variant: "error"
      });
    } else if (settings.chartsExcludeList.includes(value)) {
      enqueueSnackbar("Keyword already exists.", {
        variant: "error"
      });
    } else {
      dispatch({ type: "ADD_CHARTS_EXCLUDE_KEY", payload: value });
      formRef.current.reset(); // manually reset form
    }
  };
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
                    if (settings.chartsFilterStart > settings.chartsFilterEnd) {
                      enqueueSnackbar("End date earlier than start date.", {
                        variant: "error"
                      });
                    } else {
                      dispatch({ type: "CHARTS_FILTER_SWITCH" });
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
                openTo="date"
                label="Start"
                format="yyyy/MM/dd"
                value={new Date(settings.chartsFilterStart)}
                onChange={date =>
                  dispatch({
                    type: "CHARTS_FILTER_SET",
                    payload: {
                      type: "chartsFilterStart",
                      date: date.setHours(0, 0, 0, 0)
                    }
                  })
                }
                showTodayButton
              />
              <DatePicker
                margin="dense"
                openTo="date"
                label="End"
                format="yyyy/MM/dd"
                value={new Date(settings.chartsFilterEnd)}
                onChange={date =>
                  dispatch({
                    type: "CHARTS_FILTER_SET",
                    payload: {
                      type: "chartsFilterEnd",
                      date: date.setHours(23, 59, 59, 999)
                    }
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
                  onChange={() => {
                    dispatch({ type: "CHARTS_EXCLUDE_SWITCH" });
                  }}
                  value="chartsExcludeSwitch"
                  color="primary"
                />
              }
              label="Excluded listed from charts"
            />
            <form
              onSubmit={event => handleSubmit(event)}
              ref={formRef} // ref for manually reset form
            >
              <TextField
                placeholder={"Add a new one here!"}
                onChange={e => setValue(e.target.value)}
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
                        onDelete={() =>
                          dispatch({
                            type: "DEL_CHARTS_EXCLUDE_KEY",
                            payload: index
                          })
                        }
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
};

export default SettingsChartsTab;
