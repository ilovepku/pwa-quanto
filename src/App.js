import React, { Component } from "react";
import Pickers from "./components/Pickers";
import Select from "./components/Select";

class App extends Component {
  render() {
    return (
      <div>
        <h1>Hello world!</h1>
        Started: <Pickers />
        Elapsed: X Minutes
        Activity: <Select />
        Detail: <Select />
      </div>
    );
  }
}

export default App;
