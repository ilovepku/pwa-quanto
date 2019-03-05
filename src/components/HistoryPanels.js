import React from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import DetailedExpansionPanel from "./DetailedExpansionPanel";

const styles = theme => ({
  root: {
    width: "100%"
  }
});

const mapStateToProps = state => {
  return {
    history: state.history
  };
};

function HistoryPanels(props) {
  const { classes, history } = props;
  const panels = history.length
    ? history.slice(0).reverse().map((item, index) => (
        <DetailedExpansionPanel key={index} index={index} item={item} />
      ))
    : null;
  return <div className={classes.root}>{panels}</div>;
}

HistoryPanels.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(connect(mapStateToProps)(HistoryPanels));
