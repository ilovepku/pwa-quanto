import React, { Component } from "react";

import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import {
  editActivityName,
  editDetailName,
  enqueueSnackbar
} from "../redux/actions";

import TextField from "@material-ui/core/TextField";
import IconButton from "@material-ui/core/IconButton";

import CreateIcon from "@material-ui/icons/Create";

import { withStyles } from "@material-ui/core/styles";

const styles = () => ({
  form: {
    display: "flex"
  }
});

const getEditIconColor = (value, name) =>
  value !== name ? "primary" : "default";
const getEditIconStyle = (value, name) => ({
  color: value !== name ? "primary" : "default",
  transition: "transform 0.5s",
  transform: value !== name ? "rotate(180deg)" : "rotate(0deg)"
});

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    { editActivityName, editDetailName, enqueueSnackbar },
    dispatch
  );

class CategoriesInput extends Component {
  state = { value: this.props.item.name };

  handleChange(event) {
    this.setState({ value: event.target.value });
  }

  handleSubmit(event) {
    event.preventDefault();
    const { value } = this.state;
    const {
      item,
      activityId,
      editActivityName,
      editDetailName,
      enqueueSnackbar
    } = this.props;
    if (value === item.name) {
      // focus on text field if no changes have been made
      this.myTextField.focus();
    } else {
      if (!value) {
        enqueueSnackbar({
          message: "Name cannot be empty.",
          options: {
            variant: "error"
          }
        });
        this.setState({ value: item.name });
        this.myFormRef.reset();
      } else if (
        value === "Interruption" ||
        value === "-" ||
        value === "Unsorted"
      ) {
        enqueueSnackbar({
          message: "This name is reserved.",
          options: {
            variant: "error"
          }
        });
        this.setState({ value: item.name });
        this.myFormRef.reset();
      } else {
        // check for item type: acitivty or detail
        if (item.detailIds) {
          // is activity
          editActivityName({
            activityId: item.id,
            name: value
          });
          enqueueSnackbar({
            message: "Activity name edited.",
            options: {
              variant: "success"
            }
          });
        } else {
          // is detail
          editDetailName({
            activityId: activityId,
            detailId: item.id,
            name: value
          });
          enqueueSnackbar({
            message: "Detail name edited.",
            options: {
              variant: "success"
            }
          });
        }
        // clear input after adding new entry
        if (item.id === null) {
          this.setState({ value: null });
          this.myFormRef.reset(); // manually reset form
        }
      }
    }
  }

  render() {
    const { classes, item } = this.props;
    const { value } = this.state;
    return (
      <form
        onSubmit={event => this.handleSubmit(event)}
        className={classes.form}
        ref={el => (this.myFormRef = el)} // ref for manually reset form
      >
        <TextField
          inputRef={el => (this.myTextField = el)} // ref for focus
          defaultValue={value}
          placeholder={!item.name ? "Add a new one here!" : null}
          onChange={event => this.handleChange(event)}
          margin={"dense"}
          variant="outlined"
        />

        <IconButton
          type="submit"
          aria-label="Edit"
          // temp workaround to animate this IconButton
          color={getEditIconColor(value, item.name)}
          style={getEditIconStyle(value, item.name)}
        >
          <CreateIcon />
        </IconButton>
      </form>
    );
  }
}

export default withStyles(styles)(
  connect(
    null,
    mapDispatchToProps
  )(CategoriesInput)
);
