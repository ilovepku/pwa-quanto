import React from "react";

import { connect } from "react-redux";
import { editActivityName, editDetailName } from "../redux/actions";

import { withSnackbar } from "notistack";

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

const mapDispatchToProps = dispatch => {
  return {
    editActivityName: payload => dispatch(editActivityName(payload)),
    editDetailName: payload => dispatch(editDetailName(payload))
  };
};

class CategoriesInput extends React.Component {
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
        enqueueSnackbar("Name cannot be empty.", {
          variant: "error"
        });
      } else if (
        value === "Interruption" ||
        value === "-" ||
        value === "Unsorted"
      ) {
        enqueueSnackbar("This name is reserved.", {
          variant: "error"
        });
      } else {
        // check for item type: acitivty or detail
        if (item.detailIds) {
          // is activity
          editActivityName({
            activityId: item.id,
            name: value
          });
          enqueueSnackbar("Activity name edited.", {
            variant: "success"
          });
        } else {
          // is detail
          editDetailName({
            activityId: activityId,
            detailId: item.id,
            name: value
          });
          enqueueSnackbar("Detail name edited.", {
            variant: "success"
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

export default withSnackbar(
  withStyles(styles)(
    connect(
      null,
      mapDispatchToProps
    )(CategoriesInput)
  )
);
