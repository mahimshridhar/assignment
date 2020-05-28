import { MODIFY_DETAILS, ADD_ROW, ADD_COLUMN } from "./types";

export const modify = (data) => ({
  type: MODIFY_DETAILS,
  payload: data,
});

export const addARow = (data) => ({
  type: ADD_ROW,
});

export const addAColumn = (payload) => ({
  type: ADD_COLUMN,
  payload,
});

export const updateStatus = (payload) => ({
  type: "UPDATE_STATUS",
  payload,
});

export const editTitle = (payload) => ({
  type: "EDIT_TITLE",
  payload,
});

export const editTable = (payload) => ({
  type: "EDIT_TABLE",
  payload,
});

export const setProjectStatus = (payload) => ({
  type: "SET_PROJECT_STATUS",
  payload,
});
