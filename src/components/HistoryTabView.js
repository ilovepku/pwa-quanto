import React from "react";

import { connect } from "react-redux";

import { withStyles } from "@material-ui/core/styles";

import HistoryItemExpansionPanel from "./HistoryItemExpansionPanel";

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

function HistoryTabView(props) {
  const { history, classes } = props;
  const panels = history
    .map((item, index) => (
      <HistoryItemExpansionPanel
        key={"history-" + index}
        index={index}
        item={item}
        lastItemDatetime={
          history[index - 1] ? new Date(history[index - 1].datetime) : null
        }
        nextItemDatetime={
          history[index + 1] ? new Date(history[index + 1].datetime) : null
        }
      />
    ))
    .slice()
    .reverse();
  return <div className={classes.view}>{panels}</div>;
}

export default withStyles(styles)(connect(mapStateToProps)(HistoryTabView));
