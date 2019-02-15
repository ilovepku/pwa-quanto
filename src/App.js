import React, { Component } from "react";
import Pickers from "./components/Pickers";
import Select from "./components/Select";

const activities = [
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

const details = activities.filter(item => item.parent === activities[0].name); // ignoring 0 length

class App extends Component {
  state = {
    activities,
    details,
    activity: activities[0].name, // ignoring 0 length
    detail: details[0].name // ignoring 0 length
  };

  handleActivityChange = value => {
    let details = this.state.activities.filter(item => item.parent === value);
    this.setState({
      activity: value,
      details,
      detail: details.length ? details[0].name : "-"
    });
  };

  handleDetailChange = value => {
    this.setState({ detail: value });
  };

  render() {
    return (
      <div>
        <h1>PWA Quanto</h1>
        Started: <Pickers />
        Elapsed: X hrs X mins
        <Select
          label="Activity"
          items={this.state.activities.filter(item => !item.parent)}
          handleChange={this.handleActivityChange}
        />
        <Select
          label="Detail"
          items={this.state.details}
          handleChange={this.handleDetailChange}
        />
      </div>
    );
  }
}

export default App;
