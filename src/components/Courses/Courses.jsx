import "./Courses.css";
import React, { useEffect, useState } from "react";
import Search from "../Search/Search";
import CourseCard from "../CourseCard/CourseCard";
import { CoursesService } from "../../services/courses.service";
import Button from "../Button/Button";
import PropTypes from 'prop-types';

const Courses = () => {
    const [courses, setCourses] = useState([]);
    const [filteredData, setFilteredData] = useState([]);

    useEffect(() => {
        async function fetchData() {
            const response = await CoursesService.getAllCourses();
            setCourses(response);
        }
        fetchData();
    }, []);

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
    courses : PropTypes.array,
    filteredData: PropTypes.array
}

export default Courses;
