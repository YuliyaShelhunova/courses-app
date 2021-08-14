import React from 'react';
import '@testing-library/jest-dom'
import { render, fireEvent, cleanup, screen } from '../../Utils/test-util'
import CourseForm, { mapStateToProps as mapStateToPropsForm } from './CourseForm';
import Courses, { mapStateToProps } from '../Courses/Courses';

jest.mock('../../store/courses/courses.action', () => ({
    ...jest.requireActual('../../store/courses/courses.action'),
    courses: ({ title, description, duration, authors }) => ({
        type: 'ADD_COURSE_TO_LIST',
        payload: { title, description, duration, authors }
    })
}));

afterEach(cleanup);
describe('Testing Form', () => {

    it('title should to be for creating', () => {
        render(<CourseForm></CourseForm>);
        fireEvent.change(screen.getByPlaceholderText(/Enter title/), { target: { value: 'title1' } });
        setTimeout(() => {
            expect(screen.getByText('title1')).toHaveTextContent('title1');
        }, 100)
    });

    it('description should to be for creating', () => {
        render(<CourseForm></CourseForm>);
        fireEvent.change(screen.getByPlaceholderText(/Enter description/), { target: { value: 'description' } });
        setTimeout(() => {
            expect(screen.getByText('description')).toHaveTextContent('description');
        }, 100)
    });

    it('duration should to be for creating', () => {
        render(<CourseForm></CourseForm>);
        fireEvent.change(screen.getByPlaceholderText(/Enter duration in minutes/), { target: { value: 120 } });
        setTimeout(() => {
            expect(screen.getByText('120')).toHaveTextContent(120);
        }, 100)
    });

    it('should show authors list', () => {
        render(<CourseForm></CourseForm>);
        mapStateToPropsForm({
            authors: {
                list: [
                    {
                        "name": "author",
                        "id": "9b87e8b8-6ba5-40fc-a439-c4e30a373d36"
                    },
                    {
                        "name": "author2",
                        "id": "1c972c52-3198-4098-b6f7-799b45903199"
                    }
                ]
            },
            user: {
                isAdmin: true
            },
            courses: {
                currentCourse: {}
            }
        });
        setTimeout(() => {
            expect(screen.getByText('author2')).toHaveTextContent('author2');
        }, 100)
    });

    it('should show after a click on a button "Add new course".', () => {
        const { container, getByText } = render(<Courses></Courses>);
        mapStateToProps({
            user: {
                isAdmin: true
            },
            courses: {
                list: []
            }
        })
        setTimeout(() => {
            fireEvent.click(getByText(/Add new course/i));
            expect(container.querySelector('.new-course-block')).toBeInTheDocument();
        }, 100)
    });

    it('should added an author to course authors list.', () => {
        const { getByText } = render(<CourseForm></CourseForm>);
        fireEvent.change(screen.getByPlaceholderText(/Enter author name/), { target: { value: "Yuliya S"} });
        setTimeout(() => {
            fireEvent.click(getByText(/Create author/));
            expect(screen.getByText('Yuliya S')).toHaveTextContent('Yuliya S');
        }, 100)
    });
})