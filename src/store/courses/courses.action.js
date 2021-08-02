import { CoursesService } from '../../services/courses.service';
import * as types from './courses.types';

const receiveAllCourses = (courses) => {
    return {
        type: types.GET_ALL_COURSES,
        courses
    }
};

export const getAllCourses = () => dispatch => {
    CoursesService.getAllCourses().then((courses) => {
        dispatch(receiveAllCourses(courses))
    });
}

const recieveCourseById = (course) => {
    return {
        type: types.GET_COURSE_BY_ID,
        course
    }
};

export const getCourseById = (id) => dispatch => {
    CoursesService.getCourseById(id).then((course) => {
        dispatch(recieveCourseById(course))
    });
}

const addCourseToList = (course, redirectTo) => {
    return {
        type: types.ADD_COURSE_TO_LIST,
        course,
        redirectTo
    }
};

export const addCourse = (course) => dispatch => {
    CoursesService.addCourseToList(course).then(result => {
        dispatch(addCourseToList(result, '/'));
    })
}

const updateCourse = (course) => {
    return {
        type: types.UPDATE_COURSE,
        course
    }
};

const removeCourse = (id) => {
    return {
        type: types.DELETE_COURSE,
        id
    }
};

export const deleteCourse = (id) => dispatch => {
    CoursesService.deleteCourseSync(id).then(() => {
        dispatch(removeCourse(id));
    })
}

const redirectTo = (redirectTo) => {
    return {
        type: types.REDIRECT,
        redirectTo
    };
};

export { receiveAllCourses, recieveCourseById, addCourseToList, updateCourse, removeCourse, redirectTo };