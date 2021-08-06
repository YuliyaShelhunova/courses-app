import * as types from "./courses.types";
import store from "../store";

const courses_reducer = (state = store.courses, action) => {
  switch (action.type) {
    case types.GET_ALL_COURSES:
      return {
        ...state,
        list: action.courses,
      };
    case types.GET_COURSE_BY_ID:
      return {
        ...state,
        currentCourse: action.course,
      };
    case types.UPDATE_COURSE:
      return {
        ...state,
        redirectTo: action.redirectTo,
      };
    case types.DELETE_COURSE:
      return {
        ...state,
        list: state.list.filter((item) => item.id !== action.id),
      };
    case types.ADD_COURSE_TO_LIST:
      return {
        ...state,
        list: [...state.list, action.course],
        redirectTo: action.redirectTo,
      };
    default:
      return state;
  }
};
export default courses_reducer;
