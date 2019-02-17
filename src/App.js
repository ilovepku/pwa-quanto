import React, { Component } from "react";
import Pickers from "./components/Pickers";
import Select from "./components/Select";
import FloatingActionButtons from "./components/FloatingActionButtons";

const activityList = [
  { name: "Work" },
  { name: "Reading", parent: "Work" },
  { name: "Meetings", parent: "Work" },
  { name: "Email", parent: "Work" },
  { name: "Phone Calls", parent: "Work" },
  { name: "Research", parent: "Work" },
  { name: "Discussion", parent: "Work" },
  { name: "Travel", parent: "Work" },
  { name: "Sleep" },
  { name: "Night", parent: "Sleep" },
  { name: "Nap", parent: "Sleep" },
  { name: "Eat" },
  { name: "Breakfast", parent: "Eat" },
  { name: "Brunch", parent: "Eat" },
  { name: "Lunch", parent: "Eat" },
  { name: "Dinner", parent: "Eat" },
  { name: "Snack", parent: "Eat" },
  { name: "Commute" },
  { name: "Housework" },
  { name: "Exercise" },
  { name: "Sports", parent: "Exercise" },
  { name: "Aerobic", parent: "Exercise" },
  { name: "Strength", parent: "Exercise" },
  { name: "Read" },
  { name: "Books", parent: "Read" },
  { name: "Newspapers", parent: "Read" },
  { name: "Magazines", parent: "Read" },
  { name: "Internet", parent: "Read" },
  { name: "TV" }
];

const detailList = activityList.filter(
  item => item.parent === activityList[0].name
); // ignoring 0 length

class App extends Component {
  state = {
    activityList,
    detailList,
    date: new Date(),
    activity: activityList[0].name, // ignoring 0 length
    detail: detailList[0].name, // ignoring 0 length
    history: []
  };

  handleDateChange = date => {
    this.setState({ date });
  };

  handleActivityChange = value => {
    let detailList = this.state.activityList.filter(
      item => item.parent === value
    );
    this.setState({
      activity: value,
      detailList,
      detail: detailList.length ? detailList[0].name : "-"
    });
  };

  handleDetailChange = value => {
    this.setState({ detail: value });
  };

  handleHistoryChange = () => {
    this.setState({
      history: [
        ...this.state.history,
        {
          date: this.state.date,
          activity: this.state.activity,
          detail: this.state.detail
        }
      ]
    });
  };

  render() {
    return (
      <div>
        <h1>PWA Quanto</h1>
        Started:
        <Pickers date={this.state.date} handleChange={this.handleDateChange} />
        Elapsed: X hrs X mins
        <Select
          label="Activity"
          items={this.state.activityList.filter(item => !item.parent)}
          handleChange={this.handleActivityChange}
        />
        <Select
          label="Detail"
          items={this.state.detailList}
          handleChange={this.handleDetailChange}
        />
        <FloatingActionButtons handleChange={this.handleHistoryChange} />
      </div>
    );
  }
}

export default App;
