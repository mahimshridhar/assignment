import {
  MODIFY_DETAILS,
  ADD_COLUMN,
  ADD_ROW,
  UPDATE_STATUS,
  EDIT_TABLE,
  EDIT_TITLE,
  SET_PROJECT_STATUS,
} from "../actions/types";

export const progressStatus = [
  "Working on it",
  "Done",
  "Stuck",
  "Critical",
  "Pending",
];
export const columnTypes = ["Status", "Text", "People", "Timeline", "Tags"];

export const colors = {
  "Working on it": "orange",
  Done: "#28b485",
  Stuck: "red",
  Critical: "#5643fa",
  Pending: "#2998ff",
};
const initialState = {
  titles: ["My group", "Person", "Status", "Date", "Contact"],
  content: [
    ["some shit", "mahim", "Done", "apr 02", "9632464772"],
    ["some shit 2", "agim", "Pending", "apr 07", "9632464772"],
  ],
};

export default (state = initialState, action) => {
  switch (action.type) {
    case SET_PROJECT_STATUS:
      return {
        ...state,
        content: state.content.map((row, i) =>
          row.map((col, j) => {
            if (action.payload.row === i && action.payload.col === j) {
              return action.payload.status;
            } else return col;
          })
        ),
      };
    case EDIT_TABLE:
      return {
        ...state,
        content: state.content.map((row, i) => {
          return row.map((cel, j) => {
            if (
              i === action.payload.rowIndex &&
              j === action.payload.colIndex
            ) {
              return action.payload.cellContent;
            } else return cel;
          });
        }),
      };
    case MODIFY_DETAILS:
      return {
        titles: action.payload.titles,
        content: action.payload.content,
      };

    case ADD_ROW:
      return {
        ...state,
        content: [
          ...state.content,
          new Array(state.content[0].length).fill(""),
        ],
      };
    case ADD_COLUMN:
      return {
        ...state,
        titles: state.titles.concat(action.payload.columnTitle),
        content: state.content.map((childArr) => childArr.concat("")),
      };

    case EDIT_TITLE:
      return {
        ...state,
        titles: state.titles.map((elem, i) => {
          if (i === action.payload.titleIndex) {
            return action.payload.newTitle;
          } else {
            return elem;
          }
        }),
      };

    default:
      return state;
  }
};
