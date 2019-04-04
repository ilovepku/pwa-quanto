import React, { Component, Fragment } from "react";

import { connect } from "react-redux";
import { clearHistory, defaultActivityList } from "../redux/actions";

import Button from "@material-ui/core/Button";

const mapDispatchToProps = dispatch => {
  return {
    clearHistory: () => dispatch(clearHistory()),
    defaultActivityList: () => dispatch(defaultActivityList())
  };
};

class AboutTabView extends Component {
  render() {
    const { clearHistory, defaultActivityList } = this.props;
    return (
      <Fragment>
        <div>
          <Button variant="contained" color="secondary" onClick={clearHistory}>
            CLEAR HISTORY
          </Button>
        </div>

        <div>
          <Button
            variant="contained"
            color="secondary"
            onClick={defaultActivityList}
          >
            DEFAULT ACTIVITY LIST
          </Button>
        </div>

        <div>By Sean LEE</div>
      </Fragment>
    );
  }
}

export default connect(
  null,
  mapDispatchToProps
)(AboutTabView);
