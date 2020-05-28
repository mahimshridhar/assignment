import React from "react";
import { shallow } from "enzyme";
import App from "components/App";
import CommentBox from "components/CommentBox";
import CommentList from "components/CommenList";

let wrapped;

beforeEach(() => {
  wrapped = shallow(<App />);
});

it("shows a comment box", () => {
  expect(wrapped.find(CommentBox).length).toEqual(1);
});

it("shows a comment List", () => {
  expect(wrapped.find(CommentList).length).toEqual(1);
});
