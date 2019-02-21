import React, { Component } from "react";
import FloatingActionButtons from "./components/FloatingActionButtons";
import CurrentActivity from "./components/CurrentActivity";
import History from "./components/History";

class App extends Component {

  render() {
    return (
      <div>
        <h1>PWA Quanto</h1>
        Elapsed: X hrs X mins
        <FloatingActionButtons />
        <CurrentActivity />
        <History />
      </div>
    );
  }
}

export default App;
