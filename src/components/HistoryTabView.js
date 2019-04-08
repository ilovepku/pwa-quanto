import React from "react";

import { connect } from "react-redux";

import { withStyles } from "@material-ui/core/styles";

import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import IconButton from "@material-ui/core/IconButton";
import Dialog from "@material-ui/core/Dialog";

import CreateIcon from "@material-ui/icons/Create";
import CallSplitIcon from "@material-ui/icons/CallSplit";

import HistoryItemDialog from "./HistoryItemDialog";

const styles = () => ({
  view: {
    marginBottom: "100px"
  }
});

const mapStateToProps = state => {
  return {
    history: state.history
  };
};

class HistoryTabViewNew extends React.Component {
  state = {
    open: false,
    item: null,
    index: null,
    lastItemDatetime: null,
    nextItemDatetime: null,
    split: false
  };

  handleOpenEditDialog = (
    item,
    index,
    lastItemDatetime,
    nextItemDatetime,
    split
  ) => {
    this.setState({
      open: true,
      item,
      index,
      lastItemDatetime,
      nextItemDatetime,
      split
    });
  };

  handleCloseEditDialog = () => {
    this.setState({
      open: false
    });
  };

  render() {
    const { history, classes } = this.props;
    const {
      open,
      item,
      index,
      lastItemDatetime,
      nextItemDatetime,
      split
    } = this.state;
    const items = history
      .map((item, index) => (
        <ListItem
          key={"history-" + index}
          onClick={() =>
            this.handleOpenEditDialog(
              item,
              index,
              history[index - 1] ? new Date(history[index - 1].datetime) : null,
              history[index + 1] ? new Date(history[index + 1].datetime) : null,
              false // for split
            )
          }
        >
          <ListItemIcon>
            <CreateIcon />
          </ListItemIcon>
          <ListItemText
            primary={new Date(item.datetime).toLocaleDateString("en-US", {
              year: "numeric",
              month: "numeric",
              day: "numeric",
              hour: "numeric",
              minute: "numeric",
              hour12: false
            })}
            secondary={`${item.activity}: ${item.detail}`}
          />
          <ListItemSecondaryAction
            onClick={() =>
              this.handleOpenEditDialog(
                item,
                index,
                history[index - 1]
                  ? new Date(history[index - 1].datetime)
                  : null,
                history[index + 1]
                  ? new Date(history[index + 1].datetime)
                  : null,
                true
              )
            }
          >
            <IconButton aria-label="Edit">
              <CallSplitIcon />
            </IconButton>
          </ListItemSecondaryAction>
        </ListItem>
      ))
      .slice()
      .reverse();
    return (
      <React.Fragment>
        <List className={classes.view}>{items}</List>
        <Dialog open={open} onClose={this.handleCloseEditDialog}>
          <HistoryItemDialog
            item={item}
            index={index}
            lastItemDatetime={lastItemDatetime}
            nextItemDatetime={nextItemDatetime}
            handleCloseEditDialog={this.handleCloseEditDialog}
            split={split}
          />
        </Dialog>
      </React.Fragment>
    );
  }
}

export default withStyles(styles)(connect(mapStateToProps)(HistoryTabViewNew));
