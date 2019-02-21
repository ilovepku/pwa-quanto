import React from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";

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

function History({ classes, history }) {
  const table = history.length
    ? history.map((item, idx) => (
        <TableRow key={idx}>
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
    </Paper>
  );
}

History.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(connect(mapStateToProps)(History));
