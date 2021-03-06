// react
import React, { Fragment, useState, useContext } from "react";
import { HistoryContext } from "../../contexts/history/history.context";

// libs
import { FixedSizeList } from "react-window";
import AutoSizer from "react-virtualized-auto-sizer";

// material ui
import { makeStyles } from "@material-ui/core/styles";
import {
  ListItem,
  ListItemIcon,
  ListItemText,
  Dialog,
  Box
} from "@material-ui/core";
import CreateIcon from "@material-ui/icons/Create";
import CallSplitIcon from "@material-ui/icons/CallSplit";

// components
import HistoryItemEditDialog from "../../components/history-item-edit-dialog/history-item-edit-dialog.component";
import HistoryItemSplitDialog from "../../components/history-item-split-dialog/history-item-split-dialog.component";

const useStyles = makeStyles(theme => ({
  autoSizerContainer: {
    height: "calc(100vh - 125px)"
  },
  splitIcon: {
    fill: "#857541"
  },
  editIcon: {
    fill: "#557F2F"
  },
  listItemIcon: {
    minWidth: theme.spacing(3),
    padding: theme.spacing(1)
  },
  listItemText: {
    padding: theme.spacing(1)
  }
}));

const HistoryPage = () => {
  const classes = useStyles({});
  const { history } = useContext(HistoryContext);
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [splitDialogOpen, setSplitDialogOpen] = useState(false);
  const [index, setIndex] = useState(null);

  const handleOpenEditDialog = index => {
    setEditDialogOpen(true);
    setIndex(index);
  };

  const handleOpenSplitDialog = index => {
    setSplitDialogOpen(true);
    setIndex(index);
  };

  const handleCloseDialog = () => {
    setEditDialogOpen(false);
    setSplitDialogOpen(false);
  };

  const Row = ({ index, style }) => (
    <ListItem style={style} dense divider key={history[index].datetime}>
      <ListItemIcon
        onClick={() => handleOpenSplitDialog(index)}
        className={classes.listItemIcon}
      >
        <CallSplitIcon className={classes.splitIcon} />
      </ListItemIcon>

      <ListItemText
        primary={new Date(history[index].datetime).toLocaleDateString("en-US", {
          year: "numeric",
          month: "numeric",
          day: "numeric",
          hour: "numeric",
          minute: "numeric",
          hour12: false
        })}
        secondary={`${history[index].activity}: ${history[index].detail}`}
        className={classes.listItemText}
      />

      <ListItemIcon
        onClick={() => handleOpenEditDialog(index)}
        className={classes.listItemIcon}
      >
        <CreateIcon className={classes.editIcon} />
      </ListItemIcon>
    </ListItem>
  );
  return (
    <Fragment>
      <Box className={classes.autoSizerContainer}>
        <AutoSizer>
          {({ height, width }) => (
            <FixedSizeList
              height={height}
              itemCount={history.length}
              itemSize={50}
              width={width}
            >
              {Row}
            </FixedSizeList>
          )}
        </AutoSizer>
      </Box>

      <Dialog open={editDialogOpen} onClose={handleCloseDialog}>
        <HistoryItemEditDialog
          index={index}
          handleCloseDialog={handleCloseDialog}
        />
      </Dialog>
      <Dialog open={splitDialogOpen} onClose={handleCloseDialog}>
        <HistoryItemSplitDialog
          index={index}
          handleCloseDialog={handleCloseDialog}
        />
      </Dialog>
    </Fragment>
  );
};

export default HistoryPage;
