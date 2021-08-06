import "./CourseCard.css";
import React, { useContext } from "react";
import Button from "../Button/Button";
import { Utils } from "./../../Utils/Utils";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { connect, ReactReduxContext } from "react-redux";
import * as thunk from "../../store/courses/thunk";

const CourseCard = ({ course, isAdmin }) => {
    const { store } = useContext(ReactReduxContext);

    const onRemoveCourse = (e) => {
        e.preventDefault();
        store.dispatch(thunk.deleteCourse(course.id));
    };

    return (
        <div className="course-block">
            <div className="left">
                <h1>{course.title} </h1>
                <div className="description">{course.description} </div>
            </div>
            <div className="right">
                <div>
                    <div className="title">Authors: </div>
                    <span className="authors-line">
                        {course.authors.map((author) => (
                            <span key={author.id}> {author.name} </span>
                        ))}
                    </span>
                </div>
                <div>
                    <div className="title">Created: </div>
                    {Utils.dateFormatter(course.creationDate)}
                </div>
                <div>
                    <div className="title">Duration: </div>
                    {Utils.timeFormatter(course.duration)}
                </div>
                <div className="block-change">
                    <Link to={`/courses/${course.id}`}>
                        <Button type="submit" name="Show course" />
                    </Link>
                    {isAdmin ? (
                        <React.Fragment>
                            <Link to={`/courses/update/${course.id}`}>
                                <Button type="submit" name="Edit" />
                            </Link>
                            <Link to="/courses" onClick={onRemoveCourse}>
                                <Button type="submit" name="Delete" />
                            </Link>
                        </React.Fragment>
                    ) : (
                            <div></div>
                        )}
                </div>
            </div>
        </div>
    );
};

CourseCard.propTypes = {
    course: PropTypes.shape({
        title: PropTypes.string,
        description: PropTypes.string,
        authors: PropTypes.array,
        creationDate: PropTypes.string,
        duration: PropTypes.number,
        id: PropTypes.string.isRequired,
    }),
};

const mapStateToProps = (state, ownProps) => ({ isAdmin: state.user.isAdmin });
export default connect(mapStateToProps)(CourseCard);
