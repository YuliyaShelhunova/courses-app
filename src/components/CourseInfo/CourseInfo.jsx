import "./CourseInfo.css";
import React, { useEffect, useContext } from "react";
import { Utils } from "./../../Utils/Utils";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { connect, ReactReduxContext } from "react-redux";
import * as thunk from "../../store/courses/thunk";

const CourseInfo = ({ currentCourse, match }) => {
    const { store } = useContext(ReactReduxContext);

    useEffect(() => {
        store.dispatch(thunk.getCourseById(match?.params?.id));
    }, [match?.params?.id, store]);

    return (
        <div>
            <div>
                <Link to="/courses" className="link-back">
                    Back to courses
        </Link>
            </div>
            <div className="course-info-block">
                <div className="left-info">
                    <h1 className="title-info">{currentCourse?.title} </h1>
                    <div className="description-block">{currentCourse?.description}</div>
                </div>
                <div className="right-info">
                    <div className="info-row">
                        <span className="title-course-info">ID: </span>
                        <span className="authors-line">{currentCourse?.id}</span>
                    </div>
                    <div className="info-row">
                        <div className="title-course-info">Duration: </div>
                        {Utils.timeFormatter(currentCourse?.duration)}
                    </div>
                    <div className="info-row">
                        <div className="title-course-info">Created: </div>
                        {Utils.dateFormatter(currentCourse?.creationDate)}
                    </div>
                    <div className="info-row">
                        <span className="title-course-info">Authors: </span>
                        <span className="authors-line">
                            {currentCourse.authors?.map((author) => (
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
        id: PropTypes.number.isRequired,
    }),
};

const mapStateToProps = (state) => {
    return {
        currentCourse: state.courses.currentCourse,
    };
};

export default connect(mapStateToProps)(CourseInfo);
