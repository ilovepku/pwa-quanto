import React, { Component } from "react";
import { connect } from "react-redux";
import Pickers from "./components/Pickers";
import Select from "./components/Select";
import FloatingActionButtons from "./components/FloatingActionButtons";

import {
  setActivityDatetime,
  setActivityCategory,
  setActivityDetail,
  setActivityHistory
} from "./actions";

const mapStateToProps = state => {
  return {
    activityList: state.setActivityListReducer.activityList,
    detailList: state.setActivityListReducer.detailList,
    datetime: state.setActivityReducer.datetime,
    category: state.setActivityReducer.category,
    detail: state.setActivityReducer.detail,
    history: state.setHistoryReducer.history
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onActivityDatetimeChange: value => dispatch(setActivityDatetime(value)),
    onActivityCategoryChange: value => dispatch(setActivityCategory(value)),
    onActivityDetailChange: value => dispatch(setActivityDetail(value)),
    onHistoryChange: value => dispatch(setActivityHistory(value))
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
  };

  handleHistoryChange = () => {
    this.setState({
      history: [
        ...this.state.history,
        {
          date: this.state.datetime,
          activity: this.state.activity,
          detail: this.state.detail
        }
      ]
    });
  }; */

  render() {
    return (
      <div>
        <h1>PWA Quanto</h1>
        Started:
        <Pickers
          datetime={this.props.datetime}
          handleChange={this.props.onActivityDatetimeChange}
        />
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
        <FloatingActionButtons handleChange={this.props.onHistoryChange} />
      </div>
    );
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App);
