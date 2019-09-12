// react
import React, { Fragment, useContext, useState, useRef } from "react";

// contexts
import { SettingsContext } from "../../contexts/settings/settings.context";
import { SnackbarContext } from "../../contexts/snackbar/snackbar.context";
import {
  chartsFilterSwitch,
  chartsFilterSet,
  chartsExcludeSwitch,
  addChartsExcludeKey,
  delChartsExcludeKey
} from "../../contexts/settings/settings.actions";
import { openSnackbar } from "../../contexts/snackbar/snackbar.actions";

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

const theme = createMuiTheme({
  overrides: {
    MuiSwitch: {
      root: {
        "&$checked": {
          color: "#deb887"
        }
      }
    },
    MuiIconButton: {
      colorPrimary: {
        color: "#2f4353"
      }
    }
  }
});

const SettingsChartsTab = () => {
  const [value, setValue] = useState(null);
  const { settings, dispatchSettings } = useContext(SettingsContext);
  const { dispatchSnackbar } = useContext(SnackbarContext);
  const formRef = useRef(null);

  const handleSubmit = e => {
    e.preventDefault();
    if (!value) {
      dispatchSnackbar(
        openSnackbar({
          msg: "Keyword is empty.",
          variant: "error"
        })
      );
    } else if (settings.chartsExcludeList.includes(value)) {
      dispatchSnackbar(
        openSnackbar({
          msg: "Keyword already exists.",
          variant: "error"
        })
      );
    } else {
      dispatchSettings(addChartsExcludeKey(value));
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
                      dispatchSnackbar(
                        openSnackbar({
                          msg: "End date earlier than start date.",
                          variant: "error"
                        })
                      );
                    } else {
                      dispatchSettings(chartsFilterSwitch());
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
                  dispatchSettings(
                    chartsFilterSet({
                      type: "chartsFilterStart",
                      date: date.setHours(0, 0, 0, 0)
                    })
                  )
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
                  dispatchSettings(
                    chartsFilterSet({
                      type: "chartsFilterEnd",
                      date: date.setHours(23, 59, 59, 999)
                    })
                  )
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
                    dispatchSettings(chartsExcludeSwitch());
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
                          dispatchSettings(delChartsExcludeKey(index))
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
