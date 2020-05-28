import React from "react";
import StatusToolTip, { ToopTipForColumn } from "components/ToolTip";
import { progressStatus, columnTypes, colors } from "reducers/details";

const DRAG_DIRECTION_NONE = "";
const DRAG_DIRECTION_ROW = "row";
const DRAG_DIRECTION_COLUMN = "column";
const defaultDrageState = {
  column: -1,
  row: -1,
  startPoint: null,
  direction: DRAG_DIRECTION_NONE, // row=move up down/column=move left right,
  dropIndex: -1,
  editTitle: {
    row: -1,
    value: "",
    status: false,
  },
  editCell: {
    row: -1,
    col: -1,
    value: "",
    status: false,
  },
  statusToolTip: {
    status: false,
    row: -1,
    col: -1,
  },
  showColToolTip: false,
};

export default class Draggable extends React.Component {
  constructor(props) {
    super(props);
    this.state = defaultDrageState;
    this.headsEl = React.createRef();
    this.rowsEl = React.createRef();
    this.preview = React.createRef();
    this.node = null;
  }

  componentDidMount() {
    document.addEventListener("click", this.handleClickOutside);
  }

  componentWillUnmount() {
    document.removeEventListener("click", this.handleClickOutside);
  }

  handleClickOutside = (e) => {
    if (!this.node.contains(e.target)) {
      this.setState({
        ...this.state,
        statusToolTip: {
          ...this.state.statusToolTip,
          status: false,
        },
        showColToolTip: false,
      });
    }
  };

  offsetIndex = (from, to, arr = []) => {
    if (from < to) {
      let start = arr.slice(0, from),
        between = arr.slice(from + 1, to + 1),
        end = arr.slice(to + 1);
      return [...start, ...between, arr[from], ...end];
    }
    if (from > to) {
      let start = arr.slice(0, to),
        between = arr.slice(to, from),
        end = arr.slice(from + 1);
      return [...start, arr[from], ...between, ...end];
    }
    return arr;
  };
  handleEditTitle = (i) => {
    this.setState({
      ...this.state,
      editTitle: {
        row: i,
        value: "",
        status: true,
      },
    });
  };

  handleEditableTitles = (i, editTitle, x) => {
    return this.state.editTitle.status && this.state.editTitle.row === i ? (
      <input
        autoFocus
        onBlur={() => {
          editTitle({
            titleIndex: i,
            newTitle: this.state.editTitle.value,
          });
          this.setState({
            ...this.state,
            editTitle: {
              ...this.state.editTitle,
              status: false,
            },
          });
        }}
        onChange={(e) =>
          this.setState({
            ...this.state,
            editTitle: {
              ...this.state.editTitle,
              value: e.target.value,
            },
          })
        }
      />
    ) : (
      x
    );
  };

  handleEditableCells = (i, j, editTable, y) => {
    return this.state.editCell.status &&
      this.state.editCell.row === i &&
      this.state.editCell.col === j ? (
      <input
        autoFocus
        onBlur={() => {
          console.log("on blur callwd");
          editTable({
            rowIndex: i,
            colIndex: j,
            cellContent: this.state.editCell.value,
          });
          this.setState({
            ...this.state,
            editCell: {
              ...this.state.editCell,
              status: false,
            },
          });
        }}
        onChange={(e) =>
          this.setState({
            ...this.state,
            editCell: {
              ...this.state.editCell,
              value: e.target.value,
            },
          })
        }
      />
    ) : (
      y
    );
  };

  handleStatusUpdateTooltip = (i, j) => {
    return (
      this.state.statusToolTip.status &&
      this.state.statusToolTip.row === i &&
      this.state.statusToolTip.col === j && <StatusToolTip row={i} col={j} />
    );
  };

  handleColumnAddTootip = () => {
    return this.state.showColToolTip && <ToopTipForColumn />;
  };

  handleDragStart = (e, i, j) => {
    e.dataTransfer.setDragImage(this.preview.current, 0, 0);
    this.setState({
      ...this.state,
      row: i,
      column: j,
      startPoint: {
        x: e.pageX,
        y: e.pageY,
      },
    });
  };

  handleDragEnter = (i, j) => {
    console.log(`onDragEnter`);
    if (!this.state.direction) {
      if (this.state.column !== j) {
        console.log("set clumn");
        this.setState({
          ...this.state,
          direction: DRAG_DIRECTION_COLUMN,
          dropIndex: j,
        });
        return;
      }
      if (this.state.row !== i) {
        console.log("set clumn");
        this.setState({
          ...this.state,
          direction: DRAG_DIRECTION_ROW,
          dropIndex: i,
        });
        return;
      }
      return;
    }

    if (this.state.direction === DRAG_DIRECTION_COLUMN) {
      if (j !== this.state.dropIndex) {
        this.setState({
          ...this.state,
          dropIndex: j,
        });
      }
      return;
    }
    if (this.state.direction === DRAG_DIRECTION_ROW) {
      if (i !== this.state.dropIndex) {
        this.setState({
          ...this.state,
          dropIndex: i,
        });
      }
      return;
    }
  };

  handleDragEnd = (heads, rows, onDragEnd) => {
    console.log(`onDragEnd`);
    this.setState({ ...defaultDrageState });
    onDragEnd({
      titles: heads,
      content: rows,
    });
  };

  handleOpcaityWhileDrag = (i, j, y) => ({
    backgroundColor: colors[y],
    position: this.state.statusToolTip && "relative",
    cursor: this.state.direction ? "move" : "grab",
    opacity:
      this.state.direction === DRAG_DIRECTION_COLUMN
        ? this.state.dropIndex === j
          ? 0.5
          : 1
        : this.state.direction === DRAG_DIRECTION_ROW
        ? this.state.dropIndex === i
          ? 0.5
          : 1
        : 1,
  });

  handleProgressStatusToolTip = (i, j, rows) => {
    if (progressStatus.includes(rows[i][j])) {
      this.setState({
        ...this.state,
        statusToolTip: {
          status: true,
          row: i,
          col: j,
        },
      });
    } else {
      this.setState({
        ...this.state,
        editCell: {
          row: i,
          col: j,
          value: "",
          status: true,
        },
      });
    }
  };

  render() {
    let {
      heads = [],
      rows = [],
      onDragEnd,
      addARow,
      editTitle,
      editCellValue,
      editTable,
      progressStatus,
    } = this.props;
    if (this.state.direction === DRAG_DIRECTION_COLUMN) {
      heads = this.offsetIndex(this.state.column, this.state.dropIndex, heads);
      rows = rows.map((x) =>
        this.offsetIndex(this.state.column, this.state.dropIndex, x)
      );
    }

    if (this.state.direction === DRAG_DIRECTION_ROW) {
      rows = this.offsetIndex(this.state.row, this.state.dropIndex, rows);
    }

    return (
      <div ref={(node) => (this.node = node)} className="draggable">
        <table className="draggable__table">
          <AddColumn
            showColToolTip={this.state.showColToolTip}
            setState={() =>
              this.setState({
                showColToolTip: true,
              })
            }
          />
          <thead>
            <tr ref={this.headsEl}>
              {heads.map((x, i) => {
                return (
                  <th onClick={() => this.handleEditTitle(i)} key={i}>
                    {this.handleEditableTitles(i, editTitle, x)}
                  </th>
                );
              })}
            </tr>
          </thead>
          <tbody ref={this.rowsEl}>
            {rows.map((x = [], i) => (
              <tr key={i}>
                {x.map((y, j) => (
                  <td
                    key={j}
                    style={this.handleOpcaityWhileDrag(i, j, y)}
                    draggable="true"
                    onClick={() => this.handleProgressStatusToolTip(i, j, rows)}
                    onDragStart={(e) => this.handleDragStart(e, i, j)}
                    onDragEnter={(e) => this.handleDragEnter(i, j)}
                    onDragEnd={() => this.handleDragEnd(heads, rows, onDragEnd)}
                  >
                    {this.handleEditableCells(i, j, editTable, y)}
                    {this.handleStatusUpdateTooltip(i, j)}
                    {this.state.statusToolTip.status &&
                      this.state.statusToolTip.row === i &&
                      this.state.statusToolTip.col === j && (
                        <StatusToolTip row={i} col={j} />
                      )}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
        <AddRow addARow={addARow} />

        <div
          ref={this.preview}
          style={{
            position: "absolute",
            width: 0,
            height: 0,
            overflow: "hidden",
          }}
        />
      </div>
    );
  }
}

const AddRow = ({ addARow }) => {
  return (
    <div onClick={addARow} className="add-row">
      Add A Row
    </div>
  );
};

const AddColumn = (props) => {
  return (
    <div className="add-column" style={{ position: "absolute" }}>
      <div onClick={props.setState}>+</div>
      {props.showColToolTip && <ToopTipForColumn />}
    </div>
  );
};
