import React, { Component } from "react";
import Pickers from "./components/Pickers";
import SelectActivity from "./components/SelectActivity";
import SelectDetail from "./components/SelectDetail";
import FloatingActionButtons from "./components/FloatingActionButtons";

class App extends Component {

  render() {
    return (
      <div>
        <h1>PWA Quanto</h1>
        Started:
        <Pickers />
        Elapsed: X hrs X mins
        <SelectActivity />
        <SelectDetail />
        <FloatingActionButtons />
      </div>
    );
  }
}

export default App;
