import React, { useContext } from "react";
import { mount } from "enzyme";

import { SnackbarContext, SnackbarContextProvider } from "./snackbar.context";
import { openSnackbar } from "./snackbar.actions";

describe("SnackbarContextProvider", () => {
  let wrapper;

  beforeEach(() => {
    const TestComponent = () => {
      const { snackbar, dispatchSnackbar } = useContext(SnackbarContext);
      return (
        <>
          <div>{snackbar.open.toString()}</div>
          <button
            onClick={() =>
              dispatchSnackbar(
                openSnackbar({
                  msg: "Sample warning text.",
                  variant: "warning"
                })
              )
            }
          />
        </>
      );
    };

    wrapper = mount(
      <SnackbarContextProvider>
        <TestComponent />
      </SnackbarContextProvider>
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
