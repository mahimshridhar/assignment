import React from "react";
import { mount } from "enzyme";
import CommentBox from "components/CommentBox";
import Root from "../../root";

let wrapped;

beforeEach(() => {
  wrapped = mount(
    <Root>
      <CommentBox />
    </Root>
  );
});

afterEach(() => {
  wrapped.unmount();
});

it("has text area and button", () => {
  expect(wrapped.find("textarea").length).toBe(1);
  expect(wrapped.find("button").length).toBe(2);
});

describe("text area", () => {
  beforeEach(() => {
    wrapped.find("textarea").simulate("change", {
      target: {
        value: "some comment",
      },
    });
    wrapped.update();
  });
  it("has text area that users can type", () => {
    expect(wrapped.find("textarea").prop("value")).toEqual("some comment");
  });

  it("text area cleared after submit", () => {
    wrapped.find("form").simulate("submit");
    expect(wrapped.find("textarea").prop("value")).toEqual("");
  });
});
