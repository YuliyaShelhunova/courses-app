import * as types from './courses.types';

const receiveAllCourses = (courses) => {
    return {
        type: types.GET_ALL_COURSES,
        courses
    }
};

const recieveCourseById = (course) => {
    return {
        type: types.GET_COURSE_BY_ID,
        course
    }
};

const addCourseToList = (course, redirectTo) => {
    return {
        type: types.ADD_COURSE_TO_LIST,
        course,
        redirectTo
    }
};

const updateCourse = (course, redirectTo) => {
    return {
        type: types.UPDATE_COURSE,
        course,
        redirectTo
    }
};

const removeCourse = (id) => {
    return {
        type: types.DELETE_COURSE,
        id
    }
};

const redirectTo = (redirectTo) => {
    return {
        type: types.REDIRECT,
        redirectTo
    };
};

export { receiveAllCourses, recieveCourseById, addCourseToList, updateCourse, removeCourse, redirectTo };