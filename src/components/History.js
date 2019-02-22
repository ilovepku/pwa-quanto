import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import ActivityDetails from "./ActivityDetails";

const styles = theme => ({
  root: {
    width: "100%",
    marginTop: theme.spacing.unit * 3,
    overflowX: "auto"
  },
  table: {
    minWidth: 700
  }
});

const mapStateToProps = state => {
  return {
    history: state.history
  };
};

class History extends Component {
  state = {
    selectedIndex: 0
  };

  handleClick = value => {
    this.setState({ selectedIndex: value });
  };

  render() {
    const { classes, history } = this.props;
    const table = history.length
      ? history.map((item, index) => (
          <TableRow key={index} onClick={() => this.handleClick(index)}>
            <TableCell>
              {item.datetime.toLocaleDateString("en-US", {
                month: "numeric",
                day: "numeric"
              })}
            </TableCell>
            <TableCell>
              {item.datetime.toLocaleString("en-US", {
                hour: "numeric",
                minute: "numeric",
                hour12: true
              })}
            </TableCell>
            <TableCell>{item.activity}</TableCell>
            <TableCell>{item.detail}</TableCell>
          </TableRow>
        ))
      : null;
    return (
      <Paper className={classes.root}>
        <Table className={classes.table}>
          <TableBody>{table}</TableBody>
        </Table>
        <ActivityDetails index={this.state.selectedIndex} />
      </Paper>
    );
  }
}

History.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(connect(mapStateToProps)(History));
