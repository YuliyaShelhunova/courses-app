import "./CourseInfo.css";
import React, { useEffect, useState } from "react";
import { Utils } from "./../../Utils/Utils";
import { CoursesService } from "../../services/courses.service";
import { Link } from "react-router-dom";
import PropTypes from 'prop-types';

const CourseInfo = (props) => {
    const [course, setCourse] = useState({});

    useEffect(() => {
        async function fetchData() {
            const response = await CoursesService.getCourseById(
                props.match?.params?.id
            );
            setCourse(response);
        }
        fetchData();
    }, [props.match?.params?.id]);

    return (
        <div>
            <div>
                <Link to="/courses" className="link-back">
                    Back to courses
                </Link>
            </div>
            <div className="course-info-block">
                <div className="left-info">
                    <h1 className="title-info">{course?.title} </h1>
                    <div className="description-block">{course?.description}</div>
                </div>
                <div className="right-info">
                    <div className="info-row">
                        <span className="title-course-info">ID: </span>
                        <span className="authors-line">{course?.id}</span>
                    </div>
                    <div className="info-row">
                        <div className="title-course-info">Duration: </div>
                        {Utils.timeFormatter(course?.duration)}
                    </div>
                    <div className="info-row">
                        <div className="title-course-info">Created: </div>
                        {Utils.dateFormatter(course?.creationDate)}
                    </div>
                    <div className="info-row">
                        <span className="title-course-info">Authors: </span>
                        <span className="authors-line">
                            {course.authors?.map((author) => (
                                <span key={author.id}> {author.name} </span>
                            ))}
                        </span>
                    </div>
                </div>
            </div>
        </div>
    );
};

CourseInfo.propTypes = {
    course: PropTypes.shape({
        title: PropTypes.string,
        description: PropTypes.string,
        authors: PropTypes.array,
        creationDate: PropTypes.string,
        duration: PropTypes.number,
        id: PropTypes.number.isRequired
    })
}

export default CourseInfo;
