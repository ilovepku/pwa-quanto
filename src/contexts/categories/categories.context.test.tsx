import React, { useContext } from "react";
import { mount } from "enzyme";

import {
  CategoriesContext,
  CategoriesContextProvider
} from "./categories.context";
import { deleteActivityName } from "./categories.actions";

describe("CategoriesContextProvider", () => {
  let wrapper;

  beforeEach(() => {
    const TestComponent = () => {
      const { categories, dispatchCategories } = useContext(CategoriesContext);
      return (
        <>
          <div>{categories.activityIds[0]}</div>
          <button
            onClick={() => dispatchCategories(deleteActivityName("activity-1"))}
          />
        </>
      );
    };

    wrapper = mount(
      <CategoriesContextProvider>
        <TestComponent />
      </CategoriesContextProvider>
    );
  });

  it("should provide context prop to component", () => {
    expect(wrapper.find("div").text()).toBe("activity-1");
  });

  it("should respond to context dispatch from component", () => {
    wrapper.find("button").simulate("click");
    expect(wrapper.find("div").text()).toBe("activity-2");
  });
});
