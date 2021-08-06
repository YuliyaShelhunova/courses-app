import { CoursesService } from '../../services/courses.service';
import * as actions from './courses.action';

export const getAllCourses = () => dispatch => {
    CoursesService.getAllCourses().then((courses) => {
        dispatch(actions.receiveAllCourses(courses))
    });
};

export const getCourseById = (id) => dispatch => {
    CoursesService.getCourseById(id).then((course) => {
        dispatch(actions.recieveCourseById(course))
    });
};

export const addCourse = (course) => dispatch => {
    CoursesService.addCourseToList(course).then(result => {
        dispatch(actions.addCourseToList(result, '/'));
    })
};

export const deleteCourse = (id) => dispatch => {
    CoursesService.deleteCourseSync(id).then(() => {
        dispatch(actions.removeCourse(id));
    })
};

export const updateCourse = (id, course) => dispatch => {
    CoursesService.updateCourseSync(id, course).then(() => {
        dispatch(actions.updateCourse(course, '/'));
    })
};
