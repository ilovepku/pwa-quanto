import React, { Component } from "react";
import Pickers from "./components/Pickers";
import Select from "./components/Select";

const Activities = [
  {name: 'Work'},
  {name: 'Reading', parent: 'Work'},
  {name: 'Meetings', parent: 'Work'},
  {name: 'Email', parent: 'Work'},
  {name: 'Phone Calls', parent: 'Work'},
  {name: 'Research', parent: 'Work'},
  {name: 'Discussion', parent: 'Work'},
  {name: 'Travel', parent: 'Work'},
  {name: 'Sleep'},
  {name: 'Sleep', parent: 'Night'},
  {name: 'Sleep', parent: 'Nap'},
  {name: 'Eat'},
  {name: 'Eat', parent: 'Breakfast'},
  {name: 'Eat', parent: 'Brunch'},
  {name: 'Eat', parent: 'Lunch'},
  {name: 'Eat', parent: 'Dinner'},
  {name: 'Eat', parent: 'Snack'},
  {name: 'Commute'},
  {name: 'Housework'},
  {name: 'Exercise'},
  {name: 'Exercise', parent: 'Sports'},
  {name: 'Exercise', parent: 'Aerobic'},
  {name: 'Exercise', parent: 'Strength'},
  {name: 'Read'},
  {name: 'Read', parent: 'Books'},
  {name: 'Read', parent: 'Newspapers'},
  {name: 'Read', parent: 'Magazines'},
  {name: 'Read', parent: 'Internet'},
  {name: 'TV'},
]

class App extends Component {
  render() {
    return (
      <div>
        <h1>Hello world!</h1>
        Started: <Pickers />
        Elapsed: X hrs X mins
        Activity: <Select />
        Detail: <Select />
      </div>
    );
  }
}

export default App;
