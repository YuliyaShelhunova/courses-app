import "./CourseCard.css";
import React, { useContext } from "react";
import Button from "../Button/Button";
import { Utils } from "./../../Utils/Utils";
import { Link } from "react-router-dom";
import PropTypes from 'prop-types';
import { connect, ReactReduxContext } from 'react-redux';
import * as actions from '../../store/courses/courses.action';

const CourseCard = (props) => {
    const { store } = useContext(ReactReduxContext);

    const onRemoveCourse = (e) => {
        e.preventDefault();
        store.dispatch(actions.deleteCourse(props.course.id));
    };

    return (
        <div className="course-block">
            <div className="left">
                <h1>{props.course.title} </h1>
                <div className="description">{props.course.description} </div>
            </div>
            <div className="right">
                <div>
                    <div className="title">Authors: </div>
                    <span className="authors-line">
                        {props.course.authors.map((author) => (
                            <span key={author.id}> {author.name} </span>
                        ))}
                    </span>
                </div>
                <div>
                    <div className="title">Created: </div>
                    {Utils.dateFormatter(props.course.creationDate)}
                </div>
                <div>
                    <div className="title">Duration: </div>
                    {Utils.timeFormatter(props.course.duration)}
                </div>
                <div className="block-change">
                    <Link to={`/courses/${props.course.id}`}>
                        <Button type="submit" name="Show course" />
                    </Link>

                    <Button type="submit" name="Edit" />
                    <Link to='/courses' onClick={onRemoveCourse}>
                        <Button type="submit" name="Delete" />
                    </Link>
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
        id: PropTypes.string.isRequired
    })
}

export default connect(null)(CourseCard);
