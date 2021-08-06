import "./Courses.css";
import React, { useState, useEffect, useContext } from "react";
import Search from "../Search/Search";
import CourseCard from "../CourseCard/CourseCard";
import Button from "../Button/Button";
import PropTypes from "prop-types";
import { connect, ReactReduxContext } from "react-redux";
import * as thunk from "../../store/courses/thunk";

const Courses = ({ courses }) => {
    const [filteredData, setFilteredData] = useState([]);
    const { store } = useContext(ReactReduxContext);

    useEffect(() => {
        store.dispatch(thunk.getAllCourses());
    }, [store]);

    const onSearchCourses = (searchTerm) => {
        const results = courses.filter(
            (course) =>
                course.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
                course.title.toLowerCase().includes(searchTerm.toLowerCase())
        );
        if (results.length) {
            setFilteredData(results);
        }
    };

    return (
        <div className="search-new-course-panel">
            <Search courses={courses} onSearchCourses={onSearchCourses} />
            <Button
                name="Add new course"
                class="main-button new-course"
                path="/courses/add"
            />
            <div>
                {filteredData.length
                    ? filteredData.map((course) => (
                        <CourseCard key={course.id} course={course} />
                    ))
                    : courses.map((course) => (
                        <CourseCard key={course.id} course={course} />
                    ))}
            </div>
        </div>
    );
};

Courses.propTypes = {
    courses: PropTypes.array,
    filteredData: PropTypes.array,
};

const mapStateToProps = (state) => {
    return {
        courses: state.courses.list,
    };
};

export default connect(mapStateToProps)(Courses);
