// react
import React, { Fragment, useState, useContext } from "react";
import { HistoryContext } from "../contexts/historyContext";

// libs
import { FixedSizeList as List } from "react-window";
import AutoSizer from "react-virtualized-auto-sizer";

// material ui
import { withStyles } from "@material-ui/core/styles";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import Dialog from "@material-ui/core/Dialog";
import CreateIcon from "@material-ui/icons/Create";
import CallSplitIcon from "@material-ui/icons/CallSplit";

// components
import HistoryItemEditDialog from "../components/HistoryItemEditDialog";
import HistoryItemSplitDialog from "../components/HistoryItemSplitDialog";

const styles = () => ({
  autoSizer: {
    height: "80vh"
  },
  splitIcon: {
    fill: "#857541"
  },
  editIcon: {
    fill: "#557F2F"
  }
});

const HistoryTabView = props => {
  const { history } = useContext(HistoryContext);
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [splitDialogOpen, setSplitDialogOpen] = useState(false);
  const [item, setItem] = useState(null);
  const [index, setIndex] = useState(null);
  const [lastItemDatetime, setLastItemDatetime] = useState(null);
  const [nextItemDatetime, setNextItemDatetime] = useState(null);
  const [nextNextItemDatetime, setNextNextItemDatetime] = useState(null);

  const { classes } = props;

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
        aria-label="Split"
        onClick={() =>
          handleOpenSplitDialog(
            history[index],
            index,
            history[index - 1] ? new Date(history[index - 1].datetime) : null
          )
        }
      >
        <CallSplitIcon classes={{ root: classes.splitIcon }} />
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
      />

      <ListItemIcon
        aria-label="Edit"
        onClick={() =>
          handleOpenEditDialog(
            history[index],
            index,
            history[index + 1] ? new Date(history[index + 1].datetime) : null,
            history[index - 1] ? new Date(history[index - 1].datetime) : null,
            history[index - 2] ? new Date(history[index - 2].datetime) : null
          )
        }
      >
        <CreateIcon classes={{ root: classes.editIcon }} />
      </ListItemIcon>
    </ListItem>
  );
  return (
    <Fragment>
      <div className={classes.autoSizer}>
        <AutoSizer>
          {({ height, width }) => (
            <List
              height={height}
              itemCount={history.length}
              itemSize={45}
              width={width}
            >
              {Row}
            </List>
          )}
        </AutoSizer>
      </div>

      <Dialog open={editDialogOpen} onClose={handleCloseDialog}>
        <HistoryItemEditDialog
          item={item}
          index={index}
          lastItemDatetime={lastItemDatetime}
          nextItemDatetime={nextItemDatetime}
          nextNextItemDatetime={nextNextItemDatetime}
          handleCloseDialog={handleCloseDialog}
        />
      </Dialog>
      <Dialog open={splitDialogOpen} onClose={handleCloseDialog}>
        <HistoryItemSplitDialog
          index={index}
          datetime={item && item.datetime}
          nextItemDatetime={nextItemDatetime}
          handleCloseDialog={handleCloseDialog}
        />
      </Dialog>
    </Fragment>
  );
};

export default withStyles(styles)(HistoryTabView);
