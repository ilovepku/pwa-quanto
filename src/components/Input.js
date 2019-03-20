import React from "react";
import { connect } from "react-redux";
import InputBase from "@material-ui/core/InputBase";
import IconButton from "@material-ui/core/IconButton";
import CreateIcon from "@material-ui/icons/Create";

import { editDetailName } from "../actions";

const mapDispatchToProps = dispatch => {
  return {
    editDetailName: payload => dispatch(editDetailName(payload))
  };
};

class Input extends React.Component {
  state = { value: this.props.detail.content };

  handleChange(event) {
    this.setState({ value: event.target.value });
  }

  handleSubmit(event) {
    this.props.editDetailName({
      detailId: this.props.detail.id,
      content: this.state.value
    });
    event.preventDefault();
  }

  render() {
    return (
      <form onSubmit={event => this.handleSubmit(event)}>
        <InputBase
          defaultValue={this.state.value}
          onChange={event => this.handleChange(event)}
        />
        <IconButton type="submit" aria-label="Edit">
          <CreateIcon />
        </IconButton>
      </form>
    );
  }
}

export default connect(
  null,
  mapDispatchToProps
)(Input);
