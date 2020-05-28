import React from "react";
import { connect } from "react-redux";
import { setProjectStatus } from "actions";
import { addAColumn } from "actions";
import { progressStatus, columnTypes, colors } from "reducers/details";

const ToopTip = ({ row, col, setProjectStatus }) => {
  return (
    <div className="tooltip--status">
      <ul className="tooltip__list">
        {progressStatus.map((status, i) => (
          <li
            style={{
              backgroundColor: colors[status],
            }}
            className="tooltip__item"
            onClick={(e) => {
              e.stopPropagation();
              setProjectStatus({
                status,
                row,
                col,
              });
            }}
            key={`${status}`}
          >
            {status}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default connect(null, {
  setProjectStatus,
})(ToopTip);

const ToopTip2 = ({ addAColumn }) => {
  return (
    <div className="tooltip--col">
      <ul className="tooltip--col__list">
        {columnTypes.map((item, i) => (
          <li
            className="tooltip--col__item"
            onClick={(e) => {
              e.stopPropagation();
              addAColumn({
                columnTitle: item,
              });
            }}
            key={`${item}`}
          >
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
};

export const ToopTipForColumn = connect(null, {
  addAColumn,
})(ToopTip2);
