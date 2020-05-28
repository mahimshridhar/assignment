import React from "react";
import ResizableGrid from "components/ResizablePanels";
import Sidebar from "components/Sidebar";
import Main from "components/Main";
import { Route, Link } from "react-router-dom";
import { connect } from "react-redux";
import * as actions from "actions/index";
import "styles/main.scss";

const App = () => (
  <ResizableGrid>
    <Sidebar />
    <Main />
  </ResizableGrid>
);

export default connect(
  (state) => ({
    auth: state.auth,
  }),
  actions
)(App);
