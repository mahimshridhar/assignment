import React from "react";
import { mount } from "enzyme";
import Root from "root";
import CommentList from "components/CommenList";
import moxios from "moxios";

let wrapped;

beforeEach(() => {
  const initialState = {
    comments: ["Comment1", "comment2"],
  };
  wrapped = mount(
    <Root initialState={initialState}>
      <CommentList />
    </Root>
  );
});

it("created one li per comment", () => {
  wrapped.update();
  expect(wrapped.find("li").length).toEqual(2);
});
