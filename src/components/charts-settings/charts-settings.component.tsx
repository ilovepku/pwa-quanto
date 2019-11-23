// react
import React, { FormEvent, Fragment, useContext, useState, useRef } from "react";

// contexts
import { SettingsContext } from "../../contexts/settings/settings.context";
import { SnackbarContext } from "../../contexts/snackbar/snackbar.context";
import {
  switchChartsDateFilter,
  setChartsFilterDate,
  switchChartsKeyFilter,
  addChartsFilterKey,
  delChartsFilterKey
} from "../../contexts/settings/settings.actions";
import { openSnackbar } from "../../contexts/snackbar/snackbar.actions";

// material ui
import { makeStyles } from "@material-ui/core/styles";
import {
  ListItem,
  ListSubheader,
  ListItemText,
  ListItemSecondaryAction,
  Divider,
  Switch,
  TextField,
  IconButton,
  Chip,
  Grid
} from "@material-ui/core";
import AddIcon from "@material-ui/icons/Add";
import { MuiPickersUtilsProvider, DatePicker } from "@material-ui/pickers";

// libs
import DateFnsUtils from "@date-io/date-fns";

const useStyles = makeStyles(theme => ({
  listItem: {
    display: "block"
  },
  chip: {
    margin: theme.spacing(0.5)
  }
}));

const ChartsSettings = () => {
  const classes = useStyles({});
  const { settings, dispatchSettings } = useContext(SettingsContext);
  const { dispatchSnackbar } = useContext(SnackbarContext);
  const [value, setValue] = useState("");
  const formRef = useRef<HTMLFormElement>(null);
  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!value) {
      dispatchSnackbar(
        openSnackbar({
          msg: "Keyword is empty.",
          variant: "error"
        })
      );
    } else if (settings.chartsFilterKeyList.includes(value)) {
      dispatchSnackbar(
        openSnackbar({
          msg: "Keyword already exists.",
          variant: "error"
        })
      );
    } else {
      dispatchSettings(addChartsFilterKey(value));
      formRef.current.reset(); // manually reset form
    }
  };
  return (
    <Fragment>
      <ListSubheader>Charts and Stats View</ListSubheader>
      <ListItem alignItems="flex-start" className={classes.listItem}>
        <ListItemText
          primary="Date Filter"
          secondary={"Only show activities in range"}
        />

        <MuiPickersUtilsProvider utils={DateFnsUtils}>
          <Grid container justify="space-between">
            <DatePicker
              margin="dense"
              openTo="date"
              label="Start"
              format="yyyy/MM/dd"
              value={new Date(settings.chartsFilterDateStart)}
              onChange={date =>
                dispatchSettings(
                  setChartsFilterDate({
                    type: "chartsFilterDateStart",
                    date: new Date(date.setHours(0, 0, 0, 0))
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
              value={new Date(settings.chartsFilterDateEnd)}
              onChange={date =>
                dispatchSettings(
                  setChartsFilterDate({
                    type: "chartsFilterDateEnd",
                    date: new Date(date.setHours(23, 59, 59, 999))
                  })
                )
              }
              showTodayButton
            />
          </Grid>
        </MuiPickersUtilsProvider>
        <ListItemSecondaryAction>
          <Switch
            edge="end"
            onChange={() => {
              if (
                new Date(settings.chartsFilterDateStart) >
                new Date(settings.chartsFilterDateEnd)
              ) {
                dispatchSnackbar(
                  openSnackbar({
                    msg: "End date earlier than start date.",
                    variant: "error"
                  })
                );
              } else {
                dispatchSettings(switchChartsDateFilter());
              }
            }}
            checked={settings.chartsDateFilter}
          />
        </ListItemSecondaryAction>
      </ListItem>
      <Divider variant="middle" component="li" />
      <ListItem alignItems="flex-start" className={classes.listItem}>
        <ListItemText
          primary="Keyword Filter"
          secondary={"Exclude activities from keyword list"}
        />
        <form
          onSubmit={event => handleSubmit(event)}
          ref={formRef} // ref for manually reset form
        >
          <TextField
            placeholder={"Add a new one here!"}
            onChange={e => setValue(e.target.value)}
          />

          <IconButton type="submit">
            <AddIcon />
          </IconButton>
        </form>
        {settings.chartsFilterKeyList.length
          ? settings.chartsFilterKeyList.map((item: string, index: number) => {
              return (
                <Chip
                  key={"chartsFilterKey-" + index}
                  label={item}
                  onDelete={() => dispatchSettings(delChartsFilterKey(index))}
                  className={classes.chip}
                />
              );
            })
          : "List is currently empty."}
        <ListItemSecondaryAction>
          <Switch
            edge="end"
            onChange={() => {
              dispatchSettings(switchChartsKeyFilter());
            }}
            checked={settings.chartsKeyFilter}
          />
        </ListItemSecondaryAction>
      </ListItem>
    </Fragment>
  );
};

export default ChartsSettings;
