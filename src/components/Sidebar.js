import React from "react";
import Icon from "components/icon";

export default () => (
  <div className="sidebar">
    <div className="sidebar--left">
      <div className="sidebar__control--top">
        <Icon />
        <Icon />
        <Icon />
        <Icon />
      </div>
      {/* <div className="sidebar--upgrade">upgrade</div> */}
      <div className="sidebar__control--bottom">
        <Icon />
        <Icon />
        <Icon />
        <Icon />
      </div>
    </div>
    <div className="sidebar--right">
      <div className="sidebar--edit">
        <div className="sidebar__control--text">
          <h1>Workspaces</h1>
          <input placeholder="Search text" />
        </div>
        <div className="sidebar__control--pages">
          <h2>Main</h2>
          <ul className="sidebar__control--link">
            <li>Web Design</li>
            <li>Product</li>
          </ul>
        </div>
      </div>

      <div className="sidebar--downloadapp">
        <btn className="btn btn--white">Download The App</btn>
      </div>
    </div>
  </div>
);
