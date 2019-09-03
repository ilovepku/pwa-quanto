// react
import React, { useContext } from "react";
import { HistoryContext } from "../contexts/historyContext";

// components
import TabViews from "./TabViews";

function App() {
  const { dispatch } = useContext(HistoryContext);

  // respond to interaction with push notification
  const channel = new BroadcastChannel("service-worker-channel");
  channel.onmessage = msg => {
    console.log("msg received", msg);
    if (msg.data === "interrupt") {
      dispatch({ type: "INTERRUPT_ACTIVITY" });
    } else if (msg.data === "new") {
      dispatch({ type: "ADD_ACTIVITY" });
    }
    channel.close();
  };
  return <TabViews />;
}
export default App;
