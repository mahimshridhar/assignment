import React from "react";
import ReactDOM from "react-dom";
import Root from "./root";
import { BrowserRouter, Route } from "react-router-dom";

import App from "./components/App";

ReactDOM.render(
  <Root>
    <BrowserRouter>
      <Route path="/" component={App} />
    </BrowserRouter>
  </Root>,
  document.getElementById("root")
);
