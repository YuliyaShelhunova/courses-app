import * as types from "./authors.types";
import store from "../store";

const authors_reducer = (state = store.authors, action) => {
  switch (action.type) {
    case types.GET_ALL_AUTHORS:
      return {
        ...state,
        list: action.authors,
      };
    case types.GET_AUTHOR_BY_ID:
      return {
        ...state,
        currentAuthor: state.list.find((item) => item.id === action.id),
      };
    case types.DELETE_AUTHOR:
      return state.list.filter((item) => item.id !== action.id);
    case types.ADD_AUTHOR_TO_LIST:
      return {
        ...state,
        list: [...state.list, action.author],
      };
    default:
      return state;
  }
};

export default authors_reducer;
