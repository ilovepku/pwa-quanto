import React from "react";
import { VictoryPie } from "victory";

function ExampleCharts() {
  return (
    <VictoryPie
      data={[
        { x: "Cats", y: 25 },
        { x: "Cats", y: 25 },
        { x: "Dogs", y: 25 },
        { x: "Birds", y: 25 }
      ]}
    />
  );
}

export default ExampleCharts;
