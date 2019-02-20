import React, { Component } from "react";
import { connect } from "react-redux";
import Pickers from "./components/Pickers";
import Select from "./components/Select";
import FloatingActionButtons from "./components/FloatingActionButtons";

import { setActivityCategory, setActivityDetail } from "./actions";

const mapStateToProps = state => {
  return {
    activityList: state.setActivityListReducer.activityList,
    detailList: state.setActivityListReducer.detailList,
    datetime: state.setActivityReducer.datetime,
    category: state.setActivityReducer.category,
    detail: state.setActivityReducer.detail
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onActivityCategoryChange: value => dispatch(setActivityCategory(value)),
    onActivityDetailChange: value => dispatch(setActivityDetail(value))
  };
};

class App extends Component {
  /* handleActivityChange = value => {
    let detailList = this.state.activityList.filter(
      item => item.parent === value
    );
    this.setState({
      activity: value,
      detailList,
      detail: detailList.length ? detailList[0].name : "-"
    });
  }; */

  render() {
    return (
      <div>
        <h1>PWA Quanto</h1>
        Started:
        <Pickers />
        Elapsed: X hrs X mins
        <Select
          label="Activity"
          items={this.props.activityList.filter(item => !item.parent)}
          handleChange={this.props.onActivityCategoryChange}
        />
        <Select
          label="Detail"
          items={this.props.detailList}
          handleChange={this.props.onActivityDetailChange}
        />
        <FloatingActionButtons />
      </div>
    );
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App);
