import React, { useContext } from "react";
import { mount } from "enzyme";

import { SettingsContext, SettingsContextProvider } from "./settings.context";
import { toggleChartsDateFilter } from "./settings.actions";

describe("SettingsContextProvider", () => {
  let wrapper;

  beforeEach(() => {
    const TestComponent = () => {
      const { settings, dispatchSettings } = useContext(SettingsContext);
      return (
        <>
          <div>{settings.chartsDateFilter.toString()}</div>
          <button onClick={() => dispatchSettings(toggleChartsDateFilter())} />
        </>
      );
    };

    wrapper = mount(
      <SettingsContextProvider>
        <TestComponent />
      </SettingsContextProvider>
    );
  });

  it("should provide context prop to component", () => {
    expect(wrapper.find("div").text()).toBe("false");
  });

  it("should respond to context dispatch from component", () => {
    wrapper.find("button").simulate("click");
    expect(wrapper.find("div").text()).toBe("true");
  });
});
