// react
import React, { Fragment, useContext, useState } from "react";

// contexts
import { CategoriesContext } from "../../contexts/categories/categories.context";
import { HistoryContext } from "../../contexts/history/history.context";
import { SnackbarContext } from "../../contexts/snackbar/snackbar.context";
import { defaultCategories } from "../../contexts/categories/categories.actions";
import { purgeHistory } from "../../contexts/history/history.actions";
import { openSnackbar } from "../../contexts/snackbar/snackbar.actions";

// material ui
import { makeStyles } from "@material-ui/core/styles";
import {
  ListItem,
  ListSubheader,
  ListItemText,
  ListItemSecondaryAction,
  IconButton,
  Divider
} from "@material-ui/core";
import { MuiPickersUtilsProvider, DatePicker } from "@material-ui/pickers";
import SettingsBackupRestoreIcon from "@material-ui/icons/SettingsBackupRestore";

// libs
import DateFnsUtils from "@date-io/date-fns";

// components
import ConfirmDialog from "../confirm-dialog/confirm-dialog.component";

const useStyles = makeStyles(() => ({
  listItem: {
    display: "block"
  }
}));

const ClearDataSettings = () => {
  const classes = useStyles();
  const { dispatchCategories } = useContext(CategoriesContext);
  const { dispatchHistory } = useContext(HistoryContext);
  const { dispatchSnackbar } = useContext(SnackbarContext);
  const [date, setDate] = useState(new Date());
  const [purgeHistoryDialogOpen, setPurgeHistoryDialogOpen] = useState(false);
  const [
    defaultCategoriesDialogOpen,
    setDefaultCategoriesDialogOpen
  ] = useState(false);

  const handleCloseDialog = () => {
    setPurgeHistoryDialogOpen(false);
    setDefaultCategoriesDialogOpen(false);
  };

  const handlePurgeHistory = () => {
    dispatchHistory(purgeHistory(date));
    dispatchSnackbar(
      openSnackbar({
        msg: "History purged.",
        variant: "success"
      })
    );
  };

  const handleDefaultCategories = () => {
    dispatchCategories(defaultCategories());
    dispatchSnackbar(
      openSnackbar({
        msg: "Categories restored.",
        variant: "success"
      })
    );
  };
  return (
    <Fragment>
      <ListSubheader>Clear Data</ListSubheader>
      <ListItem className={classes.listItem}>
        <ListItemText
          primary="Purge History"
          secondary={"Delete activities on and before date"}
        />
        <MuiPickersUtilsProvider utils={DateFnsUtils}>
          <DatePicker
            openTo="date"
            format="yyyy/MM/dd"
            value={date}
            onChange={date => setDate(date.setHours(23, 59, 59, 999))}
            showTodayButton
          />
        </MuiPickersUtilsProvider>
        <ListItemSecondaryAction>
          <IconButton
            edge="end"
            onClick={() => setPurgeHistoryDialogOpen(true)}
          >
            <SettingsBackupRestoreIcon />
          </IconButton>
        </ListItemSecondaryAction>
      </ListItem>
      <Divider variant="middle" component="li" />
      <ListItem className={classes.listItem}>
        <ListItemText
          primary="Default Categories"
          secondary={"Restore to default categoires"}
        />
        <ListItemSecondaryAction>
          <IconButton
            edge="end"
            onClick={() => setDefaultCategoriesDialogOpen(true)}
          >
            <SettingsBackupRestoreIcon />
          </IconButton>
        </ListItemSecondaryAction>
      </ListItem>
      <ConfirmDialog
        title={"Purge History?"}
        desc={`History entries on and before ${date.toLocaleDateString(
          "zh-Hans-CN"
        )} will be deleted (a new activity will be started if the entire history is purged)`}
        open={purgeHistoryDialogOpen}
        handleCloseDialog={handleCloseDialog}
        handleConfirmAction={handlePurgeHistory}
      />
      <ConfirmDialog
        title={"Restore Default Categories?"}
        desc={"All your customary category changes wil be undone"}
        open={defaultCategoriesDialogOpen}
        handleCloseDialog={handleCloseDialog}
        handleConfirmAction={handleDefaultCategories}
      />
    </Fragment>
  );
};

export default ClearDataSettings;
