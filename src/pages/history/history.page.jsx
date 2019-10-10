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
    //fill: "#857541"
  },
  editIcon: {
    //fill: "#557F2F"
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
  const classes = useStyles();
  const { history } = useContext(HistoryContext);
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [splitDialogOpen, setSplitDialogOpen] = useState(false);
  const [item, setItem] = useState(null);
  const [index, setIndex] = useState(null);
  const [lastItemDatetime, setLastItemDatetime] = useState(null);
  const [nextItemDatetime, setNextItemDatetime] = useState(null);
  const [nextNextItemDatetime, setNextNextItemDatetime] = useState(null);

  const handleOpenEditDialog = (
    item,
    index,
    lastItemDatetime,
    nextItemDatetime,
    nextNextItemDatetime
  ) => {
    setEditDialogOpen(true);
    setItem(item);
    setIndex(index);
    setLastItemDatetime(lastItemDatetime);
    setNextItemDatetime(nextItemDatetime);
    setNextNextItemDatetime(nextNextItemDatetime);
  };

  const handleOpenSplitDialog = (item, index, nextItemDatetime) => {
    setSplitDialogOpen(true);
    setItem(item);
    setIndex(index);
    setNextItemDatetime(nextItemDatetime);
  };

  const handleCloseDialog = () => {
    setEditDialogOpen(false);
    setSplitDialogOpen(false);
  };

  const Row = ({ index, style }) => (
    <ListItem style={style} dense divider key={"history-" + index}>
      <ListItemIcon
        onClick={() =>
          handleOpenSplitDialog(
            history[index],
            index,
            history[index - 1] ? new Date(history[index - 1].datetime) : null
          )
        }
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
        onClick={() =>
          handleOpenEditDialog(
            history[index],
            index,
            history[index + 1] ? new Date(history[index + 1].datetime) : null,
            history[index - 1] ? new Date(history[index - 1].datetime) : null,
            history[index - 2] ? new Date(history[index - 2].datetime) : null
          )
        }
        className={classes.listItemIcon}
      >
        <CreateIcon className={classes.editIcon} />
      </ListItemIcon>
    </ListItem>
  );
  return (
    <Fragment>
      <Box className={classes.autoSizerContainer}>
        <AutoSizer className={classes.autoSizer}>
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
          item={item}
          index={index}
          lastItemDatetime={lastItemDatetime}
          nextItemDatetimeProp={nextItemDatetime}
          nextNextItemDatetime={nextNextItemDatetime}
          handleCloseDialog={handleCloseDialog}
        />
      </Dialog>
      <Dialog open={splitDialogOpen} onClose={handleCloseDialog}>
        <HistoryItemSplitDialog
          index={index}
          datetime={item && new Date(item.datetime)}
          nextItemDatetime={nextItemDatetime}
          handleCloseDialog={handleCloseDialog}
        />
      </Dialog>
    </Fragment>
  );
};

export default HistoryPage;