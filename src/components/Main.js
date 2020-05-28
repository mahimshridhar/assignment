import React from "react";
import Drag from "components/DraggableRowsAndColums";
import { connect } from "react-redux";
import {
  modify,
  addARow,
  addAColumn,
  updateStatus,
  editTitle,
  editTable,
  setProjectStatus,
} from "actions";

const toolTipCol = ({
  modifyDetails,
  modify,
  addAColumn,
  addARow,
  updateStatus,
  editTitle,
  editTable,
  setProjectStatus,
}) => (
  <div className="main">
    <header className="main__header">
      <div className="main__header--top">
        <div className="main__header__title">
          <h1>Web design</h1>
          <h3>Add board description</h3>
        </div>
        <div className="main__header__controls">
          <div className="btn btn--circle">+</div>
          <div className="btn btn--polygon">Button 2</div>
          <div className="btn btn--polygon">Make Zoom Call</div>
          <div className="btn btn--default">Activities</div>
          <div className="btn btn--rectangle">Activities</div>
        </div>
      </div>
      <div className="main__header--bottom">
        <div className="main__header__title">
          <h3>Main Table</h3>
        </div>
        <div className="main__header__controls">
          <div className="btn btn--blue">New Item</div>
          <div className="btn btn--default">Button test 2</div>
          <div className="btn btn--default">Button Test 4</div>
          <div className="btn btn--blue">Button test 5</div>
        </div>
      </div>
    </header>
    <div className="main__content">
      <Drag
        heads={modifyDetails.titles}
        rows={modifyDetails.content}
        onDragEnd={(data) => modify(data)}
        addARow={addARow}
        addAColumn={addAColumn}
        updateStatus={updateStatus}
        editTitle={editTitle}
        editTable={editTable}
        progressStatus={modifyDetails.progressStatues}
      />
    </div>
  </div>
);

export default connect(
  (state) => ({
    modifyDetails: state.modifyDetails,
  }),

  {
    modify,
    addARow,
    addAColumn,
    updateStatus,
    editTitle,
    editTable,
    setProjectStatus,
  }
)(toolTipCol);
