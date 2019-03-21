import React from "react";
import { connect } from "react-redux";
import { withStyles } from "@material-ui/core/styles";
import InputBase from "@material-ui/core/InputBase";
import IconButton from "@material-ui/core/IconButton";
import CreateIcon from "@material-ui/icons/Create";

import { editActivityName, editDetailName } from "../actions";

const styles = theme => ({
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

class Input extends React.Component {
  state = { value: this.props.item.name };

  handleChange(event) {
    this.setState({ value: event.target.value });
  }

  handleSubmit(event) {
    event.preventDefault();
    if (this.props.item.detailIds) {
      // check for item type: acitivty or detail
      this.props.editActivityName({
        activityId: this.props.item.id,
        name: this.state.value
      });
    } else {
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

  render() {
    const { classes } = this.props;
    return (
      <form
        onSubmit={event => this.handleSubmit(event)}
        className={classes.form}
        ref={el => (this.myFormRef = el)}
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

export default withStyles(styles)(
  connect(
    null,
    mapDispatchToProps
  )(Input)
);
