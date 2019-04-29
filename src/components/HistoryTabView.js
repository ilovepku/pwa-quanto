import React, { Component, Fragment } from "react";

import { connect } from "react-redux";

/* import List from "@material-ui/core/List"; */
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import IconButton from "@material-ui/core/IconButton";
import Dialog from "@material-ui/core/Dialog";

import { FixedSizeList as List } from "react-window";
import AutoSizer from "react-virtualized-auto-sizer";

import CreateIcon from "@material-ui/icons/Create";
import CallSplitIcon from "@material-ui/icons/CallSplit";

import HistoryItemEditDialog from "./HistoryItemEditDialog";
import HistoryItemSplitDialog from "./HistoryItemSplitDialog";

import { withStyles } from "@material-ui/core/styles";

const styles = () => ({
  autoSizer: {
    height: "100vh"
  }
});

const mapStateToProps = state => {
  return {
    history: state.history
  };
};

class HistoryTabViewNew extends Component {
  state = {
    editDialogOpen: false,
    splitDialogOpen: false,
    item: null,
    index: null,
    lastItemDatetime: null,
    nextItemDatetime: null,
    nextNextItemDatetime: null
  };

  handleOpenEditDialog = (
    item,
    index,
    lastItemDatetime,
    nextItemDatetime,
    nextNextItemDatetime
  ) => {
    this.setState({
      editDialogOpen: true,
      item,
      index,
      lastItemDatetime,
      nextItemDatetime,
      nextNextItemDatetime
    });
  };

  handleOpenSplitDialog = (item, index, nextItemDatetime) => {
    this.setState({
      splitDialogOpen: true,
      item,
      index,
      nextItemDatetime
    });
  };

  handleCloseDialog = () => {
    this.setState({
      editDialogOpen: false,
      splitDialogOpen: false
    });
  };

  render() {
    const { history, classes } = this.props;
    const {
      editDialogOpen,
      splitDialogOpen,
      item,
      index,
      lastItemDatetime,
      nextItemDatetime,
      nextNextItemDatetime
    } = this.state;

    const Row = ({ index, style }) => (
      <ListItem
        ContainerComponent={"div"}
        divider
        key={"history-" + index}
        onClick={() =>
          this.handleOpenEditDialog(
            history[index],
            index,
            history[index + 1] ? new Date(history[index + 1].datetime) : null,
            history[index - 1] ? new Date(history[index - 1].datetime) : null,
            history[index - 2] ? new Date(history[index - 2].datetime) : null
          )
        }
      >
        <ListItemIcon>
          <CreateIcon />
        </ListItemIcon>
        <ListItemText
          primary={new Date(history[index].datetime).toLocaleDateString(
            "en-US",
            {
              year: "numeric",
              month: "numeric",
              day: "numeric",
              hour: "numeric",
              minute: "numeric",
              hour12: false
            }
          )}
          secondary={`${history[index].activity}: ${history[index].detail}`}
        />
        <ListItemSecondaryAction
          onClick={() =>
            this.handleOpenSplitDialog(
              history[index],
              index,
              history[index - 1] ? new Date(history[index - 1].datetime) : null
            )
          }
        >
          <IconButton aria-label="Edit">
            <CallSplitIcon />
          </IconButton>
        </ListItemSecondaryAction>
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

        <Dialog open={editDialogOpen} onClose={this.handleCloseDialog}>
          <HistoryItemEditDialog
            item={item}
            index={index}
            lastItemDatetime={lastItemDatetime}
            nextItemDatetime={nextItemDatetime}
            nextNextItemDatetime={nextNextItemDatetime}
            handleCloseDialog={this.handleCloseDialog}
          />
        </Dialog>
        <Dialog open={splitDialogOpen} onClose={this.handleCloseDialog}>
          <HistoryItemSplitDialog
            index={index}
            datetime={item && item.datetime}
            nextItemDatetime={nextItemDatetime}
            handleCloseDialog={this.handleCloseDialog}
          />
        </Dialog>
      </Fragment>
    );
  }
}

export default withStyles(styles)(connect(mapStateToProps)(HistoryTabViewNew));
