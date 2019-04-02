import React from "react";

import { connect } from "react-redux";
import { editActivityName, editDetailName } from "../redux/actions";

import { withStyles } from "@material-ui/core/styles";

import { withSnackbar } from "notistack";

import InputBase from "@material-ui/core/InputBase";
import IconButton from "@material-ui/core/IconButton";

import CreateIcon from "@material-ui/icons/Create";

const styles = () => ({
  form: {
    display: "flex"
  }
});

const mapDispatchToProps = dispatch => {
  return {
    editActivityName: payload => dispatch(editActivityName(payload)),
    editDetailName: payload => dispatch(editDetailName(payload))
  };
};

class ActivityListInput extends React.Component {
  state = { value: this.props.item.name };

  handleChange(event) {
    this.setState({ value: event.target.value });
  }

  handleSubmit(event) {
    event.preventDefault();
    if (!this.state.value) {
      this.props.enqueueSnackbar("Name cannot be empty.", {
        variant: "error"
      });
    } else if (this.state.value === "Interruption" || "-" || "Unclassified") {
      this.props.enqueueSnackbar("This name is reserved.", {
        variant: "error"
      });
    } else {
      // check for item type: acitivty or detail
      if (this.props.item.detailIds) {
        // is activity
        this.props.editActivityName({
          activityId: this.props.item.id,
          name: this.state.value
        });
      } else {
        // is detail
        this.props.editDetailName({
          activityId: this.props.activityId,
          detailId: this.props.item.id,
          name: this.state.value
        });
      }
      // clear input after adding new entry
      if (this.props.item.id === null) {
        this.setState({ value: null });
        this.myFormRef.reset(); // manually reset form
      }
    }
  }

  render() {
    const { classes } = this.props;
    return (
      <form
        onSubmit={event => this.handleSubmit(event)}
        className={classes.form}
        ref={el => (this.myFormRef = el)} // ref for manually reset form
      >
        <InputBase
          defaultValue={this.state.value}
          placeholder={!this.props.item.name ? "Add a new one here!" : null}
          onChange={event => this.handleChange(event)}
        />

        <IconButton type="submit" aria-label="Edit">
          <CreateIcon />
        </IconButton>
      </form>
    );
  }
}

export default withSnackbar(
  withStyles(styles)(
    connect(
      null,
      mapDispatchToProps
    )(ActivityListInput)
  )
);
